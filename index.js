import React from 'react';
import ReactDOM from 'react-dom';

import TestSketch from './test-sketch';

class App extends React.Component {
  render() {
    return <TestSketch />
  }
}

const mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
