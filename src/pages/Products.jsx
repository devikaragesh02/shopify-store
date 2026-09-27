
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Cloud Knit Sweater", price: 1899 },
  { id: 2, name: "Ceramic Coffee Set", price: 1299 },
  { id: 3, name: "Everyday Tote Bag", price: 999 },
  { id: 4, name: "Minimalist Watch", price: 2499 },
  { id: 5, name: "Classic Linen Shirt", price: 1599 },
  { id: 6, name: "Soft Lounge Chair", price: 4999 },
];

export default function Products() {
  return (
    <section className="collection">
      <h2>Our Collection</h2>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>₹{product.price.toLocaleString("en-IN")}</p>
            <Link to={`/product/${product.id}`} className="primary-button">
              View Details →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}