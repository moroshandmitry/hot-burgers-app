import { Component } from "react";
import PT from "prop-types";

export default class EditBurgerForm extends Component {
  static propTypes = {
    burger: PT.shape({
      image: PT.string,
      name: PT.string,
      price: PT.number,
      desc: PT.string,
      status: PT.string,
    }),
    index: PT.string,
    updatedBurger: PT.func,
    deleteBurger: PT.func,
  };

  handleChangeBurger = (event) => {
    const updatedBurger = {
      ...this.props.burger,
      [event.currentTarget.name]:
        event.currentTarget.name === "price"
          ? +event.currentTarget.value || 0
          : event.currentTarget.value,
    };

    this.props.updatedBurger(this.props.index, updatedBurger);
  };

  render() {
    return (
      <div className="burger-edit">
        <input
          onChange={this.handleChangeBurger}
          name="name"
          type="text"
          value={this.props.burger.name}
        />
        <input
          onChange={this.handleChangeBurger}
          name="price"
          type="text"
          value={this.props.burger.price}
        />
        <select
          onChange={this.handleChangeBurger}
          name="status"
          className="status"
          value={this.props.burger.status}
        >
          <option value="available">Доступно!</option>
          <option value="unavailable">Не доступно!</option>
        </select>
        <textarea
          onChange={this.handleChangeBurger}
          name="desc"
          value={this.props.burger.desc}
        />
        <input
          onChange={this.handleChangeBurger}
          name="image"
          type="text"
          value={this.props.burger.image}
        />
        <button onClick={() => this.props.deleteBurger(this.props.index)}>
          Удалить из меню
        </button>
      </div>
    );
  }
}
