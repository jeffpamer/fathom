import React from 'react';
import ReactDOM from 'react-dom';

if (module.hot) {
  module.hot.accept();
}

class HellWorld extends React.Component {
  render() {
    return <div>Hell World</div>;
  }
}

const mountNode = document.getElementById("app");
ReactDOM.render(<HellWorld />, mountNode);
