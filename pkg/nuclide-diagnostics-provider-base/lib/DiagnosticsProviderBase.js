var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var UPDATE_EVENT = 'update';
var INVALIDATE_EVENT = 'invalidate';

var _require = require('atom');

var CompositeDisposable = _require.CompositeDisposable;
var Emitter = _require.Emitter;

function getTextEventDispatcher() {
  return require('../../nuclide-text-event-dispatcher').getInstance();
}

var DiagnosticsProviderBase = (function () {
  function DiagnosticsProviderBase(options) {
    var textEventDispatcher = arguments.length <= 1 || arguments[1] === undefined ? getTextEventDispatcher() : arguments[1];

    _classCallCheck(this, DiagnosticsProviderBase);

    this._textEventDispatcher = textEventDispatcher;
    this._emitter = new Emitter();
    this._disposables = new CompositeDisposable();

    this._textEventCallback = callbackOrNoop(options.onTextEditorEvent);
    this._newUpdateSubscriberCallback = callbackOrNoop(options.onNewUpdateSubscriber);
    this._newInvalidateSubscriberCallback = callbackOrNoop(options.onNewInvalidateSubscriber);

    // The Set constructor creates an empty Set if passed null or undefined.
    this._grammarScopes = new Set(options.grammarScopes);
    this._allGrammarScopes = !!options.enableForAllGrammars;
    this._subscribeToTextEditorEvent(!!options.shouldRunOnTheFly);
  }

  /**
   * Subscribes to the appropriate event depending on whether we should run on
   * the fly or not.
   */

  _createClass(DiagnosticsProviderBase, [{
    key: '_subscribeToTextEditorEvent',
    value: function _subscribeToTextEditorEvent(shouldRunOnTheFly) {
      this._disposeEventSubscription();
      var dispatcher = this._textEventDispatcher;
      var subscription = undefined;
      if (shouldRunOnTheFly) {
        if (this._allGrammarScopes) {
          subscription = dispatcher.onAnyFileChange(this._textEventCallback);
        } else {
          subscription = dispatcher.onFileChange(this._grammarScopes, this._textEventCallback);
        }
      } else {
        if (this._allGrammarScopes) {
          subscription = dispatcher.onAnyFileSave(this._textEventCallback);
        } else {
          subscription = dispatcher.onFileSave(this._grammarScopes, this._textEventCallback);
        }
      }
      this._currentEventSubscription = subscription;
    }
  }, {
    key: 'setRunOnTheFly',
    value: function setRunOnTheFly(runOnTheFly) {
      this._subscribeToTextEditorEvent(runOnTheFly);
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      this._emitter.dispose();
      this._disposables.dispose();
      this._disposeEventSubscription();
    }
  }, {
    key: '_disposeEventSubscription',
    value: function _disposeEventSubscription() {
      if (this._currentEventSubscription) {
        this._currentEventSubscription.dispose();
        this._currentEventSubscription = null;
      }
    }

    /**
     * Clients can call these methods to publish messages
     */

  }, {
    key: 'publishMessageUpdate',
    value: function publishMessageUpdate(update) {
      this._emitter.emit(UPDATE_EVENT, update);
    }
  }, {
    key: 'publishMessageInvalidation',
    value: function publishMessageInvalidation(message) {
      this._emitter.emit(INVALIDATE_EVENT, message);
    }

    /**
     * Clients should delegate to these
     */

  }, {
    key: 'onMessageUpdate',
    value: function onMessageUpdate(callback) {
      var disposable = this._emitter.on(UPDATE_EVENT, callback);
      this._newUpdateSubscriberCallback(callback);
      return disposable;
    }
  }, {
    key: 'onMessageInvalidation',
    value: function onMessageInvalidation(callback) {
      var disposable = this._emitter.on(INVALIDATE_EVENT, callback);
      this._newInvalidateSubscriberCallback(callback);
      return disposable;
    }
  }]);

  return DiagnosticsProviderBase;
})();

function callbackOrNoop(callback) {
  return callback ? callback.bind(undefined) : function () {};
}

module.exports = DiagnosticsProviderBase;

/** The callback by which a provider is notified of text events, such as a file save. */

/**
 * The callback by which a provider is notified that a new consumer has subscribed to diagnostic
 * updates.
 */

/**
 * The callback by which a provider is notified that a new consumer has subscribed to diagnostic
 * invalidations.
 */

/**
 * If true, this will cause onTextEditorEvent to get called more often -- approximately whenever
 * the user stops typing. If false, it will get called only when the user saves.
 */

/**
 * The following two options specify which grammars the provider is interested in. Most providers
 * will include a set of grammarScopes, and will therefore get notifications only about
 * TextEditors that are associated with those grammarScopes. Instead, a provider may set
 * enableForAllGrammars to true, and then it will get notified of changes in all TextEditors. If
 * enableForAllGrammars is true, it overrides the grammars in grammarScopes.
 */

// callbacks provided by client
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRpYWdub3N0aWNzUHJvdmlkZXJCYXNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQWdEQSxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUM7QUFDOUIsSUFBTSxnQkFBZ0IsR0FBRyxZQUFZLENBQUM7O2VBRUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7SUFBL0MsbUJBQW1CLFlBQW5CLG1CQUFtQjtJQUFFLE9BQU8sWUFBUCxPQUFPOztBQUVuQyxTQUFTLHNCQUFzQixHQUFHO0FBQ2hDLFNBQU8sT0FBTyxDQUFDLHFDQUFxQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7Q0FDckU7O0lBRUssdUJBQXVCO0FBaUJoQixXQWpCUCx1QkFBdUIsQ0FrQnpCLE9BQTRCLEVBRTVCO1FBREEsbUJBQXlDLHlEQUFHLHNCQUFzQixFQUFFOzswQkFuQmxFLHVCQUF1Qjs7QUFxQnpCLFFBQUksQ0FBQyxvQkFBb0IsR0FBRyxtQkFBbUIsQ0FBQztBQUNoRCxRQUFJLENBQUMsUUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7QUFDOUIsUUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUM7O0FBRTlDLFFBQUksQ0FBQyxrQkFBa0IsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDcEUsUUFBSSxDQUFDLDRCQUE0QixHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNsRixRQUFJLENBQUMsZ0NBQWdDLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOzs7QUFHMUYsUUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDckQsUUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUM7QUFDeEQsUUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztHQUMvRDs7Ozs7OztlQWpDRyx1QkFBdUI7O1dBdUNBLHFDQUFDLGlCQUEwQixFQUFFO0FBQ3RELFVBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0FBQ2pDLFVBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztBQUM3QyxVQUFJLFlBQVksWUFBQSxDQUFDO0FBQ2pCLFVBQUksaUJBQWlCLEVBQUU7QUFDckIsWUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7QUFDMUIsc0JBQVksR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3BFLE1BQU07QUFDTCxzQkFBWSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUN0RjtPQUNGLE1BQU07QUFDTCxZQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtBQUMxQixzQkFBWSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDbEUsTUFBTTtBQUNMLHNCQUFZLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3BGO09BQ0Y7QUFDRCxVQUFJLENBQUMseUJBQXlCLEdBQUcsWUFBWSxDQUFDO0tBQy9DOzs7V0FFYSx3QkFBQyxXQUFvQixFQUFFO0FBQ25DLFVBQUksQ0FBQywyQkFBMkIsQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUMvQzs7O1dBRU0sbUJBQVM7QUFDZCxVQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3hCLFVBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDNUIsVUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7S0FDbEM7OztXQUV3QixxQ0FBUztBQUNoQyxVQUFJLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtBQUNsQyxZQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDekMsWUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQztPQUN2QztLQUNGOzs7Ozs7OztXQU1tQiw4QkFBQyxNQUFnQyxFQUFRO0FBQzNELFVBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztLQUMxQzs7O1dBRXlCLG9DQUFDLE9BQTRCLEVBQVE7QUFDN0QsVUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDL0M7Ozs7Ozs7O1dBTWMseUJBQUMsUUFBK0IsRUFBZTtBQUM1RCxVQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDNUQsVUFBSSxDQUFDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLGFBQU8sVUFBVSxDQUFDO0tBQ25COzs7V0FFb0IsK0JBQUMsUUFBcUMsRUFBZTtBQUN4RSxVQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNoRSxVQUFJLENBQUMsZ0NBQWdDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEQsYUFBTyxVQUFVLENBQUM7S0FDbkI7OztTQXRHRyx1QkFBdUI7OztBQXlHN0IsU0FBUyxjQUFjLENBQUksUUFBNEIsRUFBcUI7QUFDMUUsU0FBTyxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxZQUFNLEVBQUcsQ0FBQztDQUN4RDs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDIiwiZmlsZSI6IkRpYWdub3N0aWNzUHJvdmlkZXJCYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG4vKiBAZmxvdyAqL1xuXG4vKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIGxpY2Vuc2UgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpblxuICogdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IHR5cGUge1xuICBEaWFnbm9zdGljUHJvdmlkZXJVcGRhdGUsXG4gIEludmFsaWRhdGlvbk1lc3NhZ2UsXG4gIE1lc3NhZ2VJbnZhbGlkYXRpb25DYWxsYmFjayxcbiAgTWVzc2FnZVVwZGF0ZUNhbGxiYWNrLFxufSBmcm9tICcuLi8uLi9udWNsaWRlLWRpYWdub3N0aWNzLWJhc2UnO1xuaW1wb3J0IHR5cGUge1RleHRFdmVudERpc3BhdGNoZXJ9IGZyb20gJy4uLy4uL251Y2xpZGUtdGV4dC1ldmVudC1kaXNwYXRjaGVyJztcblxudHlwZSBQcm92aWRlckJhc2VPcHRpb25zID0ge1xuICAvKiogVGhlIGNhbGxiYWNrIGJ5IHdoaWNoIGEgcHJvdmlkZXIgaXMgbm90aWZpZWQgb2YgdGV4dCBldmVudHMsIHN1Y2ggYXMgYSBmaWxlIHNhdmUuICovXG4gIG9uVGV4dEVkaXRvckV2ZW50PzogKGVkaXRvcjogVGV4dEVkaXRvcikgPT4gbWl4ZWQ7XG4gIC8qKlxuICAgKiBUaGUgY2FsbGJhY2sgYnkgd2hpY2ggYSBwcm92aWRlciBpcyBub3RpZmllZCB0aGF0IGEgbmV3IGNvbnN1bWVyIGhhcyBzdWJzY3JpYmVkIHRvIGRpYWdub3N0aWNcbiAgICogdXBkYXRlcy5cbiAgICovXG4gIG9uTmV3VXBkYXRlU3Vic2NyaWJlcj86IChjYWxsYmFjazogTWVzc2FnZVVwZGF0ZUNhbGxiYWNrKSA9PiBtaXhlZDtcbiAgLyoqXG4gICAqIFRoZSBjYWxsYmFjayBieSB3aGljaCBhIHByb3ZpZGVyIGlzIG5vdGlmaWVkIHRoYXQgYSBuZXcgY29uc3VtZXIgaGFzIHN1YnNjcmliZWQgdG8gZGlhZ25vc3RpY1xuICAgKiBpbnZhbGlkYXRpb25zLlxuICAgKi9cbiAgb25OZXdJbnZhbGlkYXRlU3Vic2NyaWJlcj86IChjYWxsYmFjazogTWVzc2FnZUludmFsaWRhdGlvbkNhbGxiYWNrKSA9PiBtaXhlZDtcbiAgLyoqXG4gICAqIElmIHRydWUsIHRoaXMgd2lsbCBjYXVzZSBvblRleHRFZGl0b3JFdmVudCB0byBnZXQgY2FsbGVkIG1vcmUgb2Z0ZW4gLS0gYXBwcm94aW1hdGVseSB3aGVuZXZlclxuICAgKiB0aGUgdXNlciBzdG9wcyB0eXBpbmcuIElmIGZhbHNlLCBpdCB3aWxsIGdldCBjYWxsZWQgb25seSB3aGVuIHRoZSB1c2VyIHNhdmVzLlxuICAgKi9cbiAgc2hvdWxkUnVuT25UaGVGbHk/OiBib29sZWFuO1xuICAvKipcbiAgICogVGhlIGZvbGxvd2luZyB0d28gb3B0aW9ucyBzcGVjaWZ5IHdoaWNoIGdyYW1tYXJzIHRoZSBwcm92aWRlciBpcyBpbnRlcmVzdGVkIGluLiBNb3N0IHByb3ZpZGVyc1xuICAgKiB3aWxsIGluY2x1ZGUgYSBzZXQgb2YgZ3JhbW1hclNjb3BlcywgYW5kIHdpbGwgdGhlcmVmb3JlIGdldCBub3RpZmljYXRpb25zIG9ubHkgYWJvdXRcbiAgICogVGV4dEVkaXRvcnMgdGhhdCBhcmUgYXNzb2NpYXRlZCB3aXRoIHRob3NlIGdyYW1tYXJTY29wZXMuIEluc3RlYWQsIGEgcHJvdmlkZXIgbWF5IHNldFxuICAgKiBlbmFibGVGb3JBbGxHcmFtbWFycyB0byB0cnVlLCBhbmQgdGhlbiBpdCB3aWxsIGdldCBub3RpZmllZCBvZiBjaGFuZ2VzIGluIGFsbCBUZXh0RWRpdG9ycy4gSWZcbiAgICogZW5hYmxlRm9yQWxsR3JhbW1hcnMgaXMgdHJ1ZSwgaXQgb3ZlcnJpZGVzIHRoZSBncmFtbWFycyBpbiBncmFtbWFyU2NvcGVzLlxuICAgKi9cbiAgZ3JhbW1hclNjb3Blcz86IFNldDxzdHJpbmc+O1xuICBlbmFibGVGb3JBbGxHcmFtbWFycz86IGJvb2xlYW47XG59XG5cbmNvbnN0IFVQREFURV9FVkVOVCA9ICd1cGRhdGUnO1xuY29uc3QgSU5WQUxJREFURV9FVkVOVCA9ICdpbnZhbGlkYXRlJztcblxuY29uc3Qge0NvbXBvc2l0ZURpc3Bvc2FibGUsIEVtaXR0ZXJ9ID0gcmVxdWlyZSgnYXRvbScpO1xuXG5mdW5jdGlvbiBnZXRUZXh0RXZlbnREaXNwYXRjaGVyKCkge1xuICByZXR1cm4gcmVxdWlyZSgnLi4vLi4vbnVjbGlkZS10ZXh0LWV2ZW50LWRpc3BhdGNoZXInKS5nZXRJbnN0YW5jZSgpO1xufVxuXG5jbGFzcyBEaWFnbm9zdGljc1Byb3ZpZGVyQmFzZSB7XG4gIF90ZXh0RXZlbnREaXNwYXRjaGVyOiBUZXh0RXZlbnREaXNwYXRjaGVyO1xuXG4gIF9lbWl0dGVyOiBFbWl0dGVyO1xuXG4gIF9ncmFtbWFyU2NvcGVzOiBTZXQ8c3RyaW5nPjtcbiAgX2FsbEdyYW1tYXJTY29wZXM6ID9ib29sZWFuO1xuXG4gIF9jdXJyZW50RXZlbnRTdWJzY3JpcHRpb246ID9JRGlzcG9zYWJsZTtcblxuICBfZGlzcG9zYWJsZXM6IGF0b20kQ29tcG9zaXRlRGlzcG9zYWJsZTtcblxuICAvLyBjYWxsYmFja3MgcHJvdmlkZWQgYnkgY2xpZW50XG4gIF90ZXh0RXZlbnRDYWxsYmFjazogKGVkaXRvcjogVGV4dEVkaXRvcikgPT4gbWl4ZWQ7XG4gIF9uZXdVcGRhdGVTdWJzY3JpYmVyQ2FsbGJhY2s6IChjYWxsYmFjazogTWVzc2FnZVVwZGF0ZUNhbGxiYWNrKSA9PiBtaXhlZDtcbiAgX25ld0ludmFsaWRhdGVTdWJzY3JpYmVyQ2FsbGJhY2s6IChjYWxsYmFjazogTWVzc2FnZUludmFsaWRhdGlvbkNhbGxiYWNrKSA9PiBtaXhlZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBvcHRpb25zOiBQcm92aWRlckJhc2VPcHRpb25zLFxuICAgIHRleHRFdmVudERpc3BhdGNoZXI/OiBUZXh0RXZlbnREaXNwYXRjaGVyID0gZ2V0VGV4dEV2ZW50RGlzcGF0Y2hlcigpLFxuICApIHtcbiAgICB0aGlzLl90ZXh0RXZlbnREaXNwYXRjaGVyID0gdGV4dEV2ZW50RGlzcGF0Y2hlcjtcbiAgICB0aGlzLl9lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgICB0aGlzLl9kaXNwb3NhYmxlcyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG5cbiAgICB0aGlzLl90ZXh0RXZlbnRDYWxsYmFjayA9IGNhbGxiYWNrT3JOb29wKG9wdGlvbnMub25UZXh0RWRpdG9yRXZlbnQpO1xuICAgIHRoaXMuX25ld1VwZGF0ZVN1YnNjcmliZXJDYWxsYmFjayA9IGNhbGxiYWNrT3JOb29wKG9wdGlvbnMub25OZXdVcGRhdGVTdWJzY3JpYmVyKTtcbiAgICB0aGlzLl9uZXdJbnZhbGlkYXRlU3Vic2NyaWJlckNhbGxiYWNrID0gY2FsbGJhY2tPck5vb3Aob3B0aW9ucy5vbk5ld0ludmFsaWRhdGVTdWJzY3JpYmVyKTtcblxuICAgIC8vIFRoZSBTZXQgY29uc3RydWN0b3IgY3JlYXRlcyBhbiBlbXB0eSBTZXQgaWYgcGFzc2VkIG51bGwgb3IgdW5kZWZpbmVkLlxuICAgIHRoaXMuX2dyYW1tYXJTY29wZXMgPSBuZXcgU2V0KG9wdGlvbnMuZ3JhbW1hclNjb3Blcyk7XG4gICAgdGhpcy5fYWxsR3JhbW1hclNjb3BlcyA9ICEhb3B0aW9ucy5lbmFibGVGb3JBbGxHcmFtbWFycztcbiAgICB0aGlzLl9zdWJzY3JpYmVUb1RleHRFZGl0b3JFdmVudCghIW9wdGlvbnMuc2hvdWxkUnVuT25UaGVGbHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgdG8gdGhlIGFwcHJvcHJpYXRlIGV2ZW50IGRlcGVuZGluZyBvbiB3aGV0aGVyIHdlIHNob3VsZCBydW4gb25cbiAgICogdGhlIGZseSBvciBub3QuXG4gICAqL1xuICBfc3Vic2NyaWJlVG9UZXh0RWRpdG9yRXZlbnQoc2hvdWxkUnVuT25UaGVGbHk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNwb3NlRXZlbnRTdWJzY3JpcHRpb24oKTtcbiAgICBjb25zdCBkaXNwYXRjaGVyID0gdGhpcy5fdGV4dEV2ZW50RGlzcGF0Y2hlcjtcbiAgICBsZXQgc3Vic2NyaXB0aW9uO1xuICAgIGlmIChzaG91bGRSdW5PblRoZUZseSkge1xuICAgICAgaWYgKHRoaXMuX2FsbEdyYW1tYXJTY29wZXMpIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gZGlzcGF0Y2hlci5vbkFueUZpbGVDaGFuZ2UodGhpcy5fdGV4dEV2ZW50Q2FsbGJhY2spO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gZGlzcGF0Y2hlci5vbkZpbGVDaGFuZ2UodGhpcy5fZ3JhbW1hclNjb3BlcywgdGhpcy5fdGV4dEV2ZW50Q2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fYWxsR3JhbW1hclNjb3Blcykge1xuICAgICAgICBzdWJzY3JpcHRpb24gPSBkaXNwYXRjaGVyLm9uQW55RmlsZVNhdmUodGhpcy5fdGV4dEV2ZW50Q2FsbGJhY2spO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gZGlzcGF0Y2hlci5vbkZpbGVTYXZlKHRoaXMuX2dyYW1tYXJTY29wZXMsIHRoaXMuX3RleHRFdmVudENhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fY3VycmVudEV2ZW50U3Vic2NyaXB0aW9uID0gc3Vic2NyaXB0aW9uO1xuICB9XG5cbiAgc2V0UnVuT25UaGVGbHkocnVuT25UaGVGbHk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zdWJzY3JpYmVUb1RleHRFZGl0b3JFdmVudChydW5PblRoZUZseSk7XG4gIH1cblxuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuX2VtaXR0ZXIuZGlzcG9zZSgpO1xuICAgIHRoaXMuX2Rpc3Bvc2FibGVzLmRpc3Bvc2UoKTtcbiAgICB0aGlzLl9kaXNwb3NlRXZlbnRTdWJzY3JpcHRpb24oKTtcbiAgfVxuXG4gIF9kaXNwb3NlRXZlbnRTdWJzY3JpcHRpb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRFdmVudFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5fY3VycmVudEV2ZW50U3Vic2NyaXB0aW9uLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuX2N1cnJlbnRFdmVudFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsaWVudHMgY2FuIGNhbGwgdGhlc2UgbWV0aG9kcyB0byBwdWJsaXNoIG1lc3NhZ2VzXG4gICAqL1xuXG4gIHB1Ymxpc2hNZXNzYWdlVXBkYXRlKHVwZGF0ZTogRGlhZ25vc3RpY1Byb3ZpZGVyVXBkYXRlKTogdm9pZCB7XG4gICAgdGhpcy5fZW1pdHRlci5lbWl0KFVQREFURV9FVkVOVCwgdXBkYXRlKTtcbiAgfVxuXG4gIHB1Ymxpc2hNZXNzYWdlSW52YWxpZGF0aW9uKG1lc3NhZ2U6IEludmFsaWRhdGlvbk1lc3NhZ2UpOiB2b2lkIHtcbiAgICB0aGlzLl9lbWl0dGVyLmVtaXQoSU5WQUxJREFURV9FVkVOVCwgbWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xpZW50cyBzaG91bGQgZGVsZWdhdGUgdG8gdGhlc2VcbiAgICovXG5cbiAgb25NZXNzYWdlVXBkYXRlKGNhbGxiYWNrOiBNZXNzYWdlVXBkYXRlQ2FsbGJhY2spOiBJRGlzcG9zYWJsZSB7XG4gICAgY29uc3QgZGlzcG9zYWJsZSA9IHRoaXMuX2VtaXR0ZXIub24oVVBEQVRFX0VWRU5ULCBjYWxsYmFjayk7XG4gICAgdGhpcy5fbmV3VXBkYXRlU3Vic2NyaWJlckNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICByZXR1cm4gZGlzcG9zYWJsZTtcbiAgfVxuXG4gIG9uTWVzc2FnZUludmFsaWRhdGlvbihjYWxsYmFjazogTWVzc2FnZUludmFsaWRhdGlvbkNhbGxiYWNrKTogSURpc3Bvc2FibGUge1xuICAgIGNvbnN0IGRpc3Bvc2FibGUgPSB0aGlzLl9lbWl0dGVyLm9uKElOVkFMSURBVEVfRVZFTlQsIGNhbGxiYWNrKTtcbiAgICB0aGlzLl9uZXdJbnZhbGlkYXRlU3Vic2NyaWJlckNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICByZXR1cm4gZGlzcG9zYWJsZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsYmFja09yTm9vcDxUPihjYWxsYmFjazogPyhhcmc6IFQpID0+IG1peGVkKTogKGFyZzogVCkgPT4gbWl4ZWQge1xuICByZXR1cm4gY2FsbGJhY2sgPyBjYWxsYmFjay5iaW5kKHVuZGVmaW5lZCkgOiAoKSA9PiB7IH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGlhZ25vc3RpY3NQcm92aWRlckJhc2U7XG4iXX0=