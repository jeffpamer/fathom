import React, { useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import ace from "ace-builds/src-noconflict/ace";
import vim from "ace-builds/src-noconflict/keybinding-vim";
import glsl from "ace-builds/src-noconflict/mode-glsl";

import "./spectral-glow";
let editor;

function FathomEditor({ defaultFrag, updateFrag, shaderErrors }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    editor = ace.edit("editor");
    editor.setKeyboardHandler(vim.handler);
    editor.setTheme("ace/theme/spectral_glow");
    editor.session.setOptions({
      mode: new glsl.Mode(),
      tabSize: 2,
      useSoftTabs: true,
    });
    editor.renderer.setOptions({
      fontSize: 14,
      showFoldWidgets: false,
      fontFamily: "IBM Plex Mono",
    });
    editor.session.on(
      "change",
      debounce(() => {
        updateFrag(editor.getValue.bind(editor));
      }, 500),
    );
    editor.focus();
  }, []);

  useEffect(() => {
    editor.session.setAnnotations(shaderErrors);
  }, [shaderErrors]);

  return (
    <div className="fathom-editor-container">
      <pre ref={editorRef} id="editor" className="fathom-editor">
        {defaultFrag}
      </pre>
    </div>
  );
}

export default FathomEditor;
