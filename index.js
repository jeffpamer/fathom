import React from 'react';
import ReactDOM from 'react-dom';

import TestGLSketch from './test-gl-sketch/test-gl-sketch';

class App extends React.Component {
  render() {
    return <TestGLSketch />
  }
}

const mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
