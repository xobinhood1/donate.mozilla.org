/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';
import { IntlProvider, addLocaleData } from 'react-intl';
import routes from './routes.jsx';
import queryParser from '../scripts/queryParser.js';
import redirectURLParser from '../scripts/redirectURLParser.js';

function createElement(Component, props) {
  var queryString = props.location.query;
  var queryData = queryParser(queryString, props.location.pathname);
  var ReactIntlLocaleData = window.ReactIntlLocaleData;

  Object.keys(ReactIntlLocaleData).forEach((lang) => {
    addLocaleData(ReactIntlLocaleData[lang]);
  });

  return (
    <IntlProvider locale={queryData.locale} messages={queryData.messages}>
      <Component {...queryData} {...props}/>
    </IntlProvider>
  );
}

function onEnter(nextState, replaceState) {
  var result = redirectURLParser(nextState.location);
  if (result.pathname) {
    replaceState({}, result.pathname, result.query);
  }
}

ReactDOM.render(
  <Router createElement={createElement} history={createHistory()}>
    <Route onEnter={onEnter}>
      {routes}
    </Route>
  </Router>,
  document.querySelector("#my-app")
);
