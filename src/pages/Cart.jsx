
export default function Cart({ cart, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="collection">
      <h2>Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-state">Your cart is empty. Start shopping!</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <article className="cart-message" key={`${item.id}-${index}`}>
              <span>{item.name} — ₹{item.price.toLocaleString("en-IN")}</span>
              <button onClick={() => onRemove(index)}>Remove</button>
            </article>
          ))}
          <h3>Total: ₹{total.toLocaleString("en-IN")}</h3>
        </>
      )}
    </section>
  );
}