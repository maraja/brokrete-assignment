import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import User from "#root/components/Root/User";
import Home from "#root/components/Root/Home";

import * as theme from "./theme";
import './index.less';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  body {
    font-family: Roboto, sans-serif;
  }
`;

render(
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/user/:id" component={User} />
          </Switch>
        </Router>
      </ThemeProvider>,
  document.getElementById("app")
);
