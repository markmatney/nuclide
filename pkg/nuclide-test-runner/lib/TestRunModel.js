var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

/**
 * Status codes returned in the "status" field of the testing utility's JSON response.
 */
var Ansi = require('./Ansi');

var Status = {
  PASSED: 1,
  FAILED: 2,
  SKIPPED: 3,
  FATAL: 4,
  TIMEOUT: 5
};

var StatusSymbol = {};
StatusSymbol[Status.PASSED] = Ansi.GREEN + '✓' + Ansi.RESET;
StatusSymbol[Status.FAILED] = Ansi.RED + '✗' + Ansi.RESET;
StatusSymbol[Status.SKIPPED] = Ansi.YELLOW + '?' + Ansi.RESET;
StatusSymbol[Status.FATAL] = Ansi.RED + '✘' + Ansi.RESET;
StatusSymbol[Status.TIMEOUT] = Ansi.BLUE + '✉' + Ansi.RESET;

var StatusMessage = {};
StatusMessage[Status.PASSED] = Ansi.GREEN + '(PASS)' + Ansi.RESET;
StatusMessage[Status.FAILED] = Ansi.RED + '(FAIL)' + Ansi.RESET;
StatusMessage[Status.SKIPPED] = Ansi.YELLOW + '(SKIP)' + Ansi.RESET;
StatusMessage[Status.FATAL] = Ansi.RED + '(FATAL)' + Ansi.RESET;
StatusMessage[Status.TIMEOUT] = Ansi.BLUE + '(TIMEOUT)' + Ansi.RESET;

var TestRunModel = (function () {
  _createClass(TestRunModel, null, [{
    key: 'Status',
    value: Status,
    enumerable: true
  }]);

  function TestRunModel(label, dispose) {
    _classCallCheck(this, TestRunModel);

    this.label = label;
    this.dispose = dispose;
  }

  _createClass(TestRunModel, [{
    key: 'getDuration',
    value: function getDuration() {
      if (this.startTime && this.endTime) {
        return this.endTime - this.startTime;
      }
    }
  }, {
    key: 'start',
    value: function start() {
      this.startTime = Date.now();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.endTime = Date.now();
    }

    /**
     * @return A summary of the test run including its name, its duration, and whether it passed,
     * failed, skipped, etc.
     */
  }], [{
    key: 'formatStatusMessage',
    value: function formatStatusMessage(name, duration, status) {
      var durationStr = duration.toFixed(3);
      return '      ' + StatusSymbol[status] + ' ' + name + ' ' + durationStr + 's ' + StatusMessage[status];
    }
  }]);

  return TestRunModel;
})();

module.exports = TestRunModel;
//# sourceMappingURL=data:application/json;base64,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QUFDLE1BQU0sQ0FBQyxDQUFHO0tBQ3pGOzs7U0FuQ0csWUFBWTs7O0FBc0NsQixNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyIsImZpbGUiOiJUZXN0UnVuTW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbi8qIEBmbG93ICovXG5cbi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5jb25zdCBBbnNpID0gcmVxdWlyZSgnLi9BbnNpJyk7XG5cbmltcG9ydCB0eXBlIHtUZXN0UnVuU3RhdHVzfSBmcm9tICcuLi8uLi9udWNsaWRlLXRlc3QtcnVubmVyLWludGVyZmFjZXMnO1xuXG4vKipcbiAqIFN0YXR1cyBjb2RlcyByZXR1cm5lZCBpbiB0aGUgXCJzdGF0dXNcIiBmaWVsZCBvZiB0aGUgdGVzdGluZyB1dGlsaXR5J3MgSlNPTiByZXNwb25zZS5cbiAqL1xuY29uc3QgU3RhdHVzOiB7W2tleTogc3RyaW5nXTogVGVzdFJ1blN0YXR1c30gPSB7XG4gIFBBU1NFRDogMSxcbiAgRkFJTEVEOiAyLFxuICBTS0lQUEVEOiAzLFxuICBGQVRBTDogNCxcbiAgVElNRU9VVDogNSxcbn07XG5cbmNvbnN0IFN0YXR1c1N5bWJvbDoge1trZXk6IFRlc3RSdW5TdGF0dXNdOiBzdHJpbmd9ID0ge307XG5TdGF0dXNTeW1ib2xbU3RhdHVzLlBBU1NFRF0gPSBgJHtBbnNpLkdSRUVOfeKckyR7QW5zaS5SRVNFVH1gO1xuU3RhdHVzU3ltYm9sW1N0YXR1cy5GQUlMRURdID0gYCR7QW5zaS5SRUR94pyXJHtBbnNpLlJFU0VUfWA7XG5TdGF0dXNTeW1ib2xbU3RhdHVzLlNLSVBQRURdID0gYCR7QW5zaS5ZRUxMT1d9PyR7QW5zaS5SRVNFVH1gO1xuU3RhdHVzU3ltYm9sW1N0YXR1cy5GQVRBTF0gPSBgJHtBbnNpLlJFRH3inJgke0Fuc2kuUkVTRVR9YDtcblN0YXR1c1N5bWJvbFtTdGF0dXMuVElNRU9VVF0gPSBgJHtBbnNpLkJMVUV94pyJJHtBbnNpLlJFU0VUfWA7XG5cbmNvbnN0IFN0YXR1c01lc3NhZ2U6IHtba2V5OiBUZXN0UnVuU3RhdHVzXTogc3RyaW5nfSA9IHt9O1xuU3RhdHVzTWVzc2FnZVtTdGF0dXMuUEFTU0VEXSA9IGAke0Fuc2kuR1JFRU59KFBBU1MpJHtBbnNpLlJFU0VUfWA7XG5TdGF0dXNNZXNzYWdlW1N0YXR1cy5GQUlMRURdID0gYCR7QW5zaS5SRUR9KEZBSUwpJHtBbnNpLlJFU0VUfWA7XG5TdGF0dXNNZXNzYWdlW1N0YXR1cy5TS0lQUEVEXSA9IGAke0Fuc2kuWUVMTE9XfShTS0lQKSR7QW5zaS5SRVNFVH1gO1xuU3RhdHVzTWVzc2FnZVtTdGF0dXMuRkFUQUxdID0gYCR7QW5zaS5SRUR9KEZBVEFMKSR7QW5zaS5SRVNFVH1gO1xuU3RhdHVzTWVzc2FnZVtTdGF0dXMuVElNRU9VVF0gPSBgJHtBbnNpLkJMVUV9KFRJTUVPVVQpJHtBbnNpLlJFU0VUfWA7XG5cbmNsYXNzIFRlc3RSdW5Nb2RlbCB7XG5cbiAgc3RhdGljIFN0YXR1czoge1trZXk6IHN0cmluZ106IFRlc3RSdW5TdGF0dXN9ID0gU3RhdHVzO1xuXG4gIHN0YXJ0VGltZTogP251bWJlcjtcbiAgZW5kVGltZTogP251bWJlcjtcbiAgbGFiZWw6IHN0cmluZztcbiAgZGlzcG9zZTogPygpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IobGFiZWw6IHN0cmluZywgZGlzcG9zZTogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICB0aGlzLmRpc3Bvc2UgPSBkaXNwb3NlO1xuICB9XG5cbiAgZ2V0RHVyYXRpb24oKTogP251bWJlciB7XG4gICAgaWYgKHRoaXMuc3RhcnRUaW1lICYmIHRoaXMuZW5kVGltZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZW5kVGltZSAtIHRoaXMuc3RhcnRUaW1lO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgfVxuXG4gIHN0b3AoKTogdm9pZCB7XG4gICAgdGhpcy5lbmRUaW1lID0gRGF0ZS5ub3coKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIEEgc3VtbWFyeSBvZiB0aGUgdGVzdCBydW4gaW5jbHVkaW5nIGl0cyBuYW1lLCBpdHMgZHVyYXRpb24sIGFuZCB3aGV0aGVyIGl0IHBhc3NlZCxcbiAgICogZmFpbGVkLCBza2lwcGVkLCBldGMuXG4gICAqL1xuICBzdGF0aWMgZm9ybWF0U3RhdHVzTWVzc2FnZShuYW1lOiBzdHJpbmcsIGR1cmF0aW9uOiBudW1iZXIsIHN0YXR1czogVGVzdFJ1blN0YXR1cyk6IHN0cmluZyB7XG4gICAgY29uc3QgZHVyYXRpb25TdHIgPSBkdXJhdGlvbi50b0ZpeGVkKDMpO1xuICAgIHJldHVybiBgICAgICAgJHtTdGF0dXNTeW1ib2xbc3RhdHVzXX0gJHtuYW1lfSAke2R1cmF0aW9uU3RyfXMgJHtTdGF0dXNNZXNzYWdlW3N0YXR1c119YDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRlc3RSdW5Nb2RlbDtcbiJdfQ==