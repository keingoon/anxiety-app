//これはreactの色々な動作を学ぶ時に使うコンポーネントにするにょーーーーー
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import Home from './Home';
import About from './About';

class HelloWorld extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path={'/'} component={Home}/>
              <Route path={'/about'} component={About}/>
            </Switch>
          </div>
        </BrowserRouter>
      </>
    )
  }
}

export default HelloWorld
