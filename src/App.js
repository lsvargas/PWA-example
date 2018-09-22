import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Layout from './containers/Layout/Layout';
import Home from './containers/Home/Home';

library.add(faPlusCircle);

class App extends Component {
  render() {
    return (
      <Layout>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Layout>
    );
  }
}

export default App;
