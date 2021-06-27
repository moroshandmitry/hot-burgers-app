import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./App";
import { Landing } from "./Landing";
import { NotFound } from "./NotFound";

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/restaurant/:restaurantId" component={App} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
