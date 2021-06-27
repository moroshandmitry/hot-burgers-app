import { Component } from "react";
import PT from "prop-types";

import { Header } from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import { Burger } from "./Burger";
import SignIn from "./Auth/SignIn";

import sampleBurgers from "../sample-burgers";
import base from "../base";
import firebase from "firebase/app";

export default class App extends Component {
  static propTypes = {
    match: PT.object,
  };

  state = {
    burgers: {},
    order: {},
  };

  componentDidMount() {
    // this.ref => сыллка на объект внутри db
    const { params } = this.props.match;

    const localStorageRef = localStorage.getItem(params.restaurantId);

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.restaurantId}/burgers`, {
      context: this,
      state: "burgers",
    });
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addBurger = (burger) => {
    // Копия объекта стейт
    const burgers = { ...this.state.burgers };
    // Новый бургер в переменную burgers
    burgers[`burger${Date.now()}`] = burger;
    // Новый бургер в стейт
    this.setState({
      burgers,
    });
  };

  updatedBurger = (key, updatedBurger) => {
    // Копия объекта стейт
    const burgers = { ...this.state.burgers };
    // Обновляе нужный бургер
    burgers[key] = updatedBurger;
    // Новый бургер в стейт
    this.setState({
      burgers,
    });
  };

  deleteBurger = (key) => {
    // Копия объекта стейт
    const burgers = { ...this.state.burgers };
    // Удаляем бургер
    burgers[key] = null;
    // Новый бургер в стейт
    this.setState({
      burgers,
    });
  };

  loadSampleBurgers = () => {
    this.setState({ burgers: sampleBurgers });
  };

  addToOrder = (key) => {
    // Копия объекта стейт
    const order = { ...this.state.order };
    // Добавить ключ со значением
    order[key] = order[key] + 1 || 1;
    // Обновить стейт
    this.setState({ order });
  };

  deleteFromOrder = (key) => {
    // Копия объекта стейт
    const order = { ...this.state.order };
    // Удалить ключ со значением
    delete order[key];
    // Обновить стейт
    this.setState({ order });
  };

  handleLogout = async () => {
    await firebase.auth().signOut();

    window.location.reload();
  };

  render() {
    return (
      <SignIn>
        <div className="burger-paradise">
          <div className="menu">
            <Header title="Hot Burger" />
            <ul className="burgers">
              {Object.keys(this.state.burgers).map((keyBurger) => (
                <Burger
                  key={keyBurger}
                  index={keyBurger}
                  addToOrder={this.addToOrder}
                  details={this.state.burgers[keyBurger]}
                />
              ))}
            </ul>
          </div>
          <Order
            {...this.state}
            deleteFromOrder={this.deleteFromOrder}
            // burgers={this.state.burgers}
            // order={this.state.order}
          />
          <MenuAdmin
            addBurger={this.addBurger}
            loadSampleBurgers={this.loadSampleBurgers}
            burgers={this.state.burgers}
            updatedBurger={this.updatedBurger}
            deleteBurger={this.deleteBurger}
            handleLogout={this.handleLogout}
          />
        </div>
      </SignIn>
    );
  }
}
