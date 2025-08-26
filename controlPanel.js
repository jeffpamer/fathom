import React from "react";

function ControlPanel({ toggleCircular }) {
  return (
    <div className="control-panel">
      {/* <button type="button">CLIP</button>*/}
      <button type="button" onClick={() => toggleCircular()}>
        Toggle
      </button>
    </div>
  );
}

export default ControlPanel;
