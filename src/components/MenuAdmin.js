import { Component } from "react";
import PT from "prop-types";

import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";

import firebase from "firebase/app";

export default class MenuAdmin extends Component {
  state = {
    photo: "",
    user: "",
  };

  static propTypes = {
    burgers: PT.object,
    deleteBurger: PT.func,
    updatedBurger: PT.func,
    addBurger: PT.func,
    loadSampleBurgers: PT.func,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async (authData) => {
    const { email, photoURL } = authData.user;

    this.setState({ user: email, photo: photoURL });
  };

  render() {
    const { user, photo } = this.state;
    const avatar = photo ? photo : "/images/avatar.png";
    return (
      <div className="menu-admin">
        {user && (
          <div className="login-header">
            <div className="avatar">
              <img src={avatar} alt={user} />
            </div>
            <button onClick={this.props.handleLogout} className="buttonLogout">
              Выйти
            </button>
          </div>
        )}
        <h2>Управление меню</h2>
        {Object.keys(this.props.burgers).map((key) => (
          <EditBurgerForm
            key={key}
            index={key}
            deleteBurger={this.props.deleteBurger}
            updatedBurger={this.props.updatedBurger}
            burger={this.props.burgers[key]}
          />
        ))}
        <AddBurgerForm addBurger={this.props.addBurger} />
        <button onClick={this.props.loadSampleBurgers}>
          Загрузить бургеры
        </button>
      </div>
    );
  }
}
