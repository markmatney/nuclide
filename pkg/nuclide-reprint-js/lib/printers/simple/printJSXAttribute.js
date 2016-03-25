

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var flatten = require('../../utils/flatten');
var markers = require('../../constants/markers');

function printJSXAttribute(print, node) {
  return flatten([print(node.name), node.value ? [markers.noBreak, '=', markers.noBreak, print(node.value)] : markers.empty]);
}

module.exports = printJSXAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaW50SlNYQXR0cmlidXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFjQSxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUMvQyxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQzs7QUFFbkQsU0FBUyxpQkFBaUIsQ0FBQyxLQUFZLEVBQUUsSUFBa0IsRUFBUztBQUNsRSxTQUFPLE9BQU8sQ0FBQyxDQUNiLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQ04sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FDMUQsT0FBTyxDQUFDLEtBQUssQ0FDbEIsQ0FBQyxDQUFDO0NBQ0o7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyIsImZpbGUiOiJwcmludEpTWEF0dHJpYnV0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuLyogQGZsb3cgKi9cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCB0eXBlIHtKU1hBdHRyaWJ1dGV9IGZyb20gJ2FzdC10eXBlcy1mbG93JztcbmltcG9ydCB0eXBlIHtMaW5lcywgUHJpbnR9IGZyb20gJy4uLy4uL3R5cGVzL2NvbW1vbic7XG5cbmNvbnN0IGZsYXR0ZW4gPSByZXF1aXJlKCcuLi8uLi91dGlscy9mbGF0dGVuJyk7XG5jb25zdCBtYXJrZXJzID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL21hcmtlcnMnKTtcblxuZnVuY3Rpb24gcHJpbnRKU1hBdHRyaWJ1dGUocHJpbnQ6IFByaW50LCBub2RlOiBKU1hBdHRyaWJ1dGUpOiBMaW5lcyB7XG4gIHJldHVybiBmbGF0dGVuKFtcbiAgICBwcmludChub2RlLm5hbWUpLFxuICAgIG5vZGUudmFsdWVcbiAgICAgID8gW21hcmtlcnMubm9CcmVhaywgJz0nLCBtYXJrZXJzLm5vQnJlYWssIHByaW50KG5vZGUudmFsdWUpXVxuICAgICAgOiBtYXJrZXJzLmVtcHR5LFxuICBdKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwcmludEpTWEF0dHJpYnV0ZTtcbiJdfQ==