import { useState } from "react";
import PT from "prop-types";

import restaurants from "../sample-restaurants";

export const Landing = ({ history }) => {
  const [display, setDisplay] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const displayList = () => {
    setDisplay({ display: !display });
  };

  const getTitle = (restaurant) => {
    const { title, url } = restaurant;

    setTitle(title);
    setUrl(url);
    setDisplay(false);
  };

  const goToRestaurant = () => {
    history.push(`/restaurant/${url}`);
  };

  return (
    <div className="restaurant_select">
      <div className="restaurant_select_top">
        <div
          onClick={displayList}
          className="restaurant_select_top-header font-effect-outline"
        >
          {title ? title : "Выберите ресторан"}
        </div>

        <div className="arrow_picker">
          <div className="arrow_picker-up"></div>
          <div className="arrow_picker-down"></div>
        </div>
      </div>

      {display && (
        <div className="restaurant_select_bottom">
          <ul>
            {restaurants.map((restaurant) => (
              <li onClick={() => getTitle(restaurant)} key={restaurant.id}>
                {restaurant.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {title && !display && (
        <button onClick={goToRestaurant}>Перейти в ресторан</button>
      )}
    </div>
  );
};

Landing.propTypes = {
  history: PT.object,
};
