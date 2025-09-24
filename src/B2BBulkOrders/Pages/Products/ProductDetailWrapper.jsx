import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "../../../services/firebaseServices";
import ProductDetailPage from "./ProductDetails";

const ProductDetailWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await productService.fetchAllProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  return (
    <ProductDetailPage
      product={product}
      allProducts={products}
      onBackClick={() => navigate(-1)}
      onNavigateToTryOn={({ garmentImage }) =>
        navigate("/TryYourOutfit", { state: { garmentImage } })
      }
      onProductClick={(p) => navigate(`/products/${p.id}`)}
    />
  );
};

export default ProductDetailWrapper;
