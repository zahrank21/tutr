import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './Components/Store'
import Navigation from './Components/Navigation'

const URL = 'http://localhost:3000/api/v1/'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Navigation />
        </div>
      </Provider>
    );
  }
}

export default App;
