import { useEffect, useState } from "react";

import { Container } from "./styles";

export function ChangeQuantity({ quantity, callbackToHandleQuantity }) {
	const [currentQuantity, setCurrentQuantity] = useState(quantity || 1);

	useEffect(() => callbackToHandleQuantity(currentQuantity), [currentQuantity]);

	const handleDecrement = () => {
		if (currentQuantity === 1) return;

		setCurrentQuantity((prev) => prev - 1);
	};

	const handleIncrement = () => {
		if (currentQuantity === 99) return;

		setCurrentQuantity((prev) => prev + 1);
	};

	const handleInputChange = ({ target }) => {
		if (target.value.length >= 3) return;

		if (target.value == 0) return setCurrentQuantity(1);

		setCurrentQuantity(Number(target.value));
	};

	return (
		<Container>
			<button onClick={handleDecrement}>-</button>
			<label>
				<span>Quantidade de Produtos</span>
				<input
					type="number"
					onChange={handleInputChange}
					value={currentQuantity}
				/>
			</label>
			<button onClick={handleIncrement}>+</button>
		</Container>
	);
}
