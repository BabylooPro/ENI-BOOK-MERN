import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
	const { productId } = useParams();
	return <h2>Détails du produit {productId}</h2>;
};

export default ProductDetails;
