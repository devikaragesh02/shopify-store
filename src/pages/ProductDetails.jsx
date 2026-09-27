
import { Link, useParams } from "react-router-dom";

const products = [
  { id: 1, name: "Cloud Knit Sweater", price: 1899, description: "A soft and cozy knit sweater for everyday comfort." },
  { id: 2, name: "Ceramic Coffee Set", price: 1299, description: "A minimal ceramic coffee set for slow mornings." },
  { id: 3, name: "Everyday Tote Bag", price: 999, description: "A versatile tote bag for everyday essentials." },
  { id: 4, name: "Minimalist Watch", price: 2499, description: "A timeless watch with a clean, minimalist design." },
  { id: 5, name: "Classic Linen Shirt", price: 1599, description: "A breathable linen shirt for effortless style." },
  { id: 6, name: "Soft Lounge Chair", price: 4999, description: "A comfortable lounge chair for a peaceful space." },
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <p className="empty-state">Product not found.</p>;
  }

  return (
    <section className="collection">
      <p className="eyebrow">PRODUCT DETAILS</p>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>₹{product.price.toLocaleString("en-IN")}</h3>
      <Link to="/products" className="primary-button">
        Back to Shop
      </Link>
    </section>
  );
}