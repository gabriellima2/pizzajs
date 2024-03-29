import { useState } from "react";

import { useFetch } from "../../../hooks/useFetch";

import { Loading } from "../../Loading";
import { DynamicForm } from "../../DynamicForm";

import { debounce } from "../../../utils/debounce";
import { fieldAttributes, schema } from "./utils";

import { Error } from "../../../GlobalStyles";
import { ContainerAddress, DynamicEvents } from "./styles";

function testZipCodeWithRegex(zipCode) {
	const regexZipCode = /^[0-9]{8}$/;

	return regexZipCode.test(zipCode);
}

function Address({ logradouro, bairro, localidade, uf }) {
	return (
		<ContainerAddress>
			<small>
				{logradouro || "Logradouro"}
				{" - "}
				{bairro || "Bairro"}
			</small>
			<small>
				{localidade || "Cidade"}
				{" - "}
				{uf || "UF"}
			</small>
		</ContainerAddress>
	);
}

export function Form({ sendData }) {
	const [address, setAddress] = useState({});
	const { clearState, errorRequest, isLoading, makeRequisition } = useFetch();

	const handleFormSubmit = (data) => {
		if (errorRequest.message) return;

		sendData(data);
	};

	const searchAddressWithZipCode = async (zipCode) => {
		const response = await makeRequisition(
			`https://viacep.com.br/ws/${zipCode}/json/`
		);

		if (!response) return;

		setAddress(response);
	};

	const validateZipCode = (zipCode) => {
		const withoutTrace = zipCode.replace("-", "");
		if (!withoutTrace || !testZipCodeWithRegex(withoutTrace)) return;

		searchAddressWithZipCode(withoutTrace);
	};

	const handleZipCode = (e) => {
		const value = e.target.value;
		const userAction = e.nativeEvent.inputType;

		// Para criar uma espécie de mascára de CEP. E não executar quando estiver apagando.
		if (userAction !== "deleteContentBackward" && value.length === 5) {
			e.target.value += "-";
		}

		debounce(() => validateZipCode(value), 800);
		setAddress({});
	}

	const handleFieldsChange = (e) => {
		clearState();

		if (e.target.id === "zip-code") {
			handleZipCode(e);
		}
	};

	return (
		<DynamicForm
			fields={{
				attributes: fieldAttributes,
				handleEvents: {
					onChange: handleFieldsChange,
				},
			}}
			yupSchema={schema}
			handleFormSubmit={handleFormSubmit}
			disableSubmitButton={isLoading || !Object.keys(address).length}
		>
			<DynamicEvents>
				{isLoading && (
					<>
						<Loading />
						<small>Buscando CEP...</small>
					</>
				)}
				{!isLoading && !errorRequest.message && <Address {...address} />}
				<Error>{errorRequest?.message}</Error>
			</DynamicEvents>
		</DynamicForm>
	);
}
