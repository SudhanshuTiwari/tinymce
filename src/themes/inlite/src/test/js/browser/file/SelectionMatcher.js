/**
 * SelectionMatcher.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import Matcher from 'tinymce/themes/inlite/core/Matcher';
import Measure from 'tinymce/themes/inlite/core/Measure';

// textSelection :: String -> (Editor -> Matcher.result | Null)
var textSelection = function (id) {
  return function (editor) {
    if (!editor.selection.isCollapsed()) {
      return Matcher.result(id, Measure.getSelectionRect(editor));
    }

    return null;
  };
};

// emptyTextBlock :: [Elements], String -> (Editor -> Matcher.result | Null)
var emptyTextBlock = function (elements, id) {
  return function (editor) {
    var i, textBlockElementsMap = editor.schema.getTextBlockElements();

    for (i = 0; i < elements.length; i++) {
      if (elements[i].nodeName === 'TABLE') {
        return null;
      }
    }

    for (i = 0; i < elements.length; i++) {
      if (elements[i].nodeName in textBlockElementsMap) {
        if (editor.dom.isEmpty(elements[i])) {
          return Matcher.result(id, Measure.getSelectionRect(editor));
        }

        return null;
      }
    }

    return null;
  };
};

export default <any> {
  textSelection: textSelection,
  emptyTextBlock: emptyTextBlock
};