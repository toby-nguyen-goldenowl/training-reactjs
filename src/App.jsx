import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import RouteConfig, { Routes } from './routes';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div>{RouteConfig({ routes: Routes })}</div>
        </div>
      </Router>
    );
  }
}

export default App;
