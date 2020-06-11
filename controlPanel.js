import React from 'react';

class ControlPanel extends React.Component {
  render() {
    const { toggleCircular } = this.props;

    return (
      <div className="control-panel">
        <button type="button">CLIP</button>
        <button type="button" onClick={() => toggleCircular()}>Toggle</button>
      </div>
    )
  }
}

export default ControlPanel;
