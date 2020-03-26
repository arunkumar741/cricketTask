import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/tachyons/css/tachyons.min.css";
import "./index.css";
import App from "./App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri: "https://api.devcdc.com/cricket"
});

const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
ReactDOM.render(ApolloApp(App), document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
