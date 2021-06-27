import PT from "prop-types";

export const Burger = ({ addToOrder, index, details }) => {
  const handleAddBurgerToOrder = () => addToOrder(index);

  const { image, name, price, desc, status } = details;

  const isAvailable = status === "available";

  return (
    <li className="menu-burger">
      <div className="image-container">
        <img src={image} alt={name} title={name} />
      </div>

      <div className="burger-details">
        <h3 className="burger-name">
          {name}
          <span className="price">{price} MDL</span>
        </h3>
        <p>{desc}</p>

        <button
          onClick={handleAddBurgerToOrder}
          className="buttonOrder"
          disabled={!isAvailable}
        >
          {isAvailable ? "Заказать" : "Временно нет"}
        </button>
      </div>
    </li>
  );
};

Burger.propTypes = {
  details: PT.shape({
    image: PT.string,
    name: PT.string,
    price: PT.number,
    desc: PT.string,
    status: PT.string,
  }),
  index: PT.string,
  addToOrder: PT.func,
};
