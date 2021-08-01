import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react"; // Redux-persist.

import * as serviceWorker from "./serviceWorker";

import { store, persistor } from "./App/store";
import App from "./App";

// Production requirements.
import { disableReactDevTools } from "./prod";

// Remove react dev tools for production build to avoid state manipulation by user
if (process.env.NODE_ENV === "production") disableReactDevTools();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);


try{
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.register();
}
catch(err){}