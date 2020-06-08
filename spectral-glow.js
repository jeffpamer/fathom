import ace from 'ace-builds/src-noconflict/ace';

ace.define('ace/theme/spectral_glow', ['require', 'export', 'module', 'ace/lib/dom'], function(require, exports, module) {
  exports.isDark = true;
  exports.cssClass = 'ace-spectral-glow';
  exports.cssText = '';
  
  var dom = require("../lib/dom");
  dom.importCssString(exports.cssText, exports.cssClass);
});
