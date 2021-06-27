import { Component, createRef } from "react";
import PT from "prop-types";

export default class AddBurgerForm extends Component {
  static propTypes = {
    addBurger: PT.func,
  };

  nameRef = createRef();
  priceRef = createRef();
  statusRef = createRef();
  descRef = createRef();
  imageRef = createRef();

  createBurger = (event) => {
    event.preventDefault();
    const burger = {
      name: this.nameRef.current.value,
      price: +this.priceRef.current.value || 0,
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    };

    this.props.addBurger(burger);

    event.currentTarget.reset();
  };
  render() {
    return (
      <form className="burger-edit" onSubmit={this.createBurger}>
        <input
          ref={this.nameRef}
          type="text"
          name="name"
          placeholder="name"
          autoComplete="off"
          required
        />

        <input
          ref={this.priceRef}
          price="price"
          type="text"
          placeholder="Price"
          autoComplete="off"
          required
        />

        <select ref={this.statusRef} status="status" className="status">
          <option value="available">Доступно</option>
          <option value="unavailable">Убрать из меню</option>
        </select>

        <textarea ref={this.descRef} desc="desc" placeholder="Desc" />

        <input
          ref={this.imageRef}
          image="image"
          type="text"
          placeholder="image"
          autoComplete="off"
          required
        />

        <button type="submit">+ Добавить в меню</button>
      </form>
    );
  }
}
