import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import { useState } from "react";
import "./index.css";

const products = [
  {
    id: 1,
    name: "Cloud Knit Sweater",
    category: "Fashion",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80",
    tag: "BESTSELLER",
  },
  {
    id: 2,
    name: "Ceramic Coffee Set",
    category: "Home",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80",
    tag: "NEW",
  },
  {
    id: 3,
    name: "Everyday Tote Bag",
    category: "Accessories",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80",
    tag: "POPULAR",
  },
  {
    id: 4,
    name: "Minimalist Watch",
    category: "Accessories",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80",
    tag: "NEW",
  },
  {
    id: 5,
    name: "Classic Linen Shirt",
    category: "Fashion",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80",
    tag: "",
  },
  {
    id: 6,
    name: "Soft Lounge Chair",
    category: "Home",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=700&q=80",
    tag: "FEATURED",
  },
];

const categories = ["All", "Fashion", "Home", "Accessories"];

function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <a href="#" className="logo">
        lumora<span>.</span>
      </a>

      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#products">Shop</a>
        <a href="#about">About</a>
      </nav>

      <a href="#products" className="cart-button">
        <span className="cart-icon">♧</span>
        Cart <span className="cart-count">{cartCount}</span>
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <span className="eyebrow">THE EVERYDAY EDIT · 2026</span>
        <h1>
          Find your
          <br />
          kind of <em>beautiful.</em>
        </h1>
        <p>
          Thoughtfully chosen pieces for your home,
          your wardrobe, and everything in between.
        </p>
        <a href="#products" className="primary-button">
          Explore the collection <span>↗</span>
        </a>
        <div className="hero-note">
          <span className="note-line" />
          A little more you, every day.
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85"
          alt="Warm, minimal living room with thoughtfully styled furniture"
        />
        <div className="image-caption">
          <span>THE SLOW LIVING COLLECTION</span>
          <span>01 / 03</span>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button
          className="quick-add"
          onClick={() => onAdd(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          +
        </button>
      </div>

      <div className="product-info">
        <div>
          <p className="product-category">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <span className="product-price">
          ₹{product.price.toLocaleString("en-IN")}
        </span>
      </div>
    </article>
  );
}


function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((current) => [...current, product]);
  }

  function removeFromCart(index) {
    setCart((current) => current.filter((_, i) => i !== index));
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <BrowserRouter>
      <div className="announcement">
        A little treat for you — free shipping on orders over ₹2,000
      </div>

      <Navbar cartCount={cart.length} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />

              <section className="collection" id="products">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">CURATED FOR YOU</span>
                    <h2>Things you'll <em>love.</em></h2>
                  </div>
                  <Link to="/products" className="primary-button">
                    View All Products →
                  </Link>
                </div>

                <div className="shop-controls">
                  <div className="category-list">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`category-button ${
                          activeCategory === category ? "active" : ""
                        }`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  <label className="search-box">
                    <span>⌕</span>
                    <input
                      type="search"
                      placeholder="Find something lovely..."
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </label>
                </div>

                <div className="product-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAdd={addToCart}
                    />
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <p className="empty-state">No products found.</p>
                )}
              </section>

              <section className="about-section" id="about">
                <span className="eyebrow">A LITTLE ABOUT US</span>
                <h2>Less, but <em>more meaningful.</em></h2>
                <p>
                  At Lumora, we believe the things around us should make
                  everyday life feel a little more special.
                </p>
              </section>
            </>
          }
        />

        <Route path="/products" element={<Products />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart cart={cart} onRemove={removeFromCart} />}
        />
      </Routes>

      <footer className="footer">
        <Link to="/" className="logo">
          lumora<span>.</span>
        </Link>
        <p>Made for the little things in life. © 2026 Lumora.</p>
        <Link to="/">Back to home ↑</Link>
      </footer>
    </BrowserRouter>
  );
}

export default App;