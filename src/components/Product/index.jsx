import NotFound from "../NotFound";
import Container from "../Container";
import ActionsButtons from "../ActionsButtons";

import { pages } from "../ActionsButtons/constants";

import { Main, Property, Description, ContentDescription } from "./styles";

export default function Product({ currentProduct }) {
	if (currentProduct.length === 0) {
		return <NotFound text="Produto não encontrado!" />;
	}

	const [product] = currentProduct;

	return (
		<Container>
			<Main>
				<img src={product.image.src} />
				<Property>
					<p>{product.name}</p>
					<p>R${product.price.toFixed(2)}</p>
				</Property>
				<ActionsButtons page={pages.PRODUCT_DETAILS} product={product} />
			</Main>

			<Description>
				<ContentDescription>
					<h1>Descrição</h1>
					<p>{product.description}</p>
				</ContentDescription>
			</Description>
		</Container>
	);
}
