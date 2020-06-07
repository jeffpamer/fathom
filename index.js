import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import InspectralEditor from './editor';

class Inspectral extends React.Component {
  render() {
    return (
      <div className="inspectral-container">
        <InspectralEditor />
      </div>
    );
  }
}

const mountNode = document.getElementById("app");
ReactDOM.render(<Inspectral />, mountNode);
