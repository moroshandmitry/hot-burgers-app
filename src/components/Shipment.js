import { Component } from "react";
import PT from "prop-types";

export default class Shipment extends Component {
  static propTypes = {
    total: PT.number,
  };

  render() {
    const { total } = this.props;
    const shipping = total > 0 && total < 200 ? 40 : 25;
    const shippingNeon =
      shipping === 25 ? (
        <span className="font-effect-neon total_wrap-cheap">
          {shipping} MLD
        </span>
      ) : (
        <span>{shipping} MLD</span>
      );

    return (
      <div className="total">
        <div className="total_wrap">
          <div>
            <div>Доставка: {total > 0 && shippingNeon}</div>
            <div className="total_wrap-free">
              {total < 200 &&
                `Закажите ещё на ${200 - total} MDL для доставки за 25 MDL`}
            </div>
          </div>
          <div className="total_wrap-final">Итого: {total}</div>
        </div>
      </div>
    );
  }
}
