

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var _nuclideDebuggerCommonLibOutputServiceManager = require('../../nuclide-debugger-common/lib/OutputServiceManager');

module.exports = {
  activate: function activate(state) {},

  consumeOutputService: function consumeOutputService(api) {
    (0, _nuclideDebuggerCommonLibOutputServiceManager.setOutputService)(api);
  },

  provideNuclideDebuggerLLDB: function provideNuclideDebuggerLLDB() {
    var Service = require('./Service');
    return Service;
  },

  createDebuggerProvider: function createDebuggerProvider() {
    return require('./DebuggerProvider');
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs0REFpQitCLHdEQUF3RDs7QUFFdkYsTUFBTSxDQUFDLE9BQU8sR0FBRztBQUNmLFVBQVEsRUFBQSxrQkFBQyxLQUFZLEVBQVEsRUFDNUI7O0FBRUQsc0JBQW9CLEVBQUEsOEJBQUMsR0FBa0IsRUFBUTtBQUM3Qyx3RUFBaUIsR0FBRyxDQUFDLENBQUM7R0FDdkI7O0FBRUQsNEJBQTBCLEVBQUEsc0NBQTZCO0FBQ3JELFFBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyQyxXQUFPLE9BQU8sQ0FBQztHQUNoQjs7QUFFRCx3QkFBc0IsRUFBQSxrQ0FBNEI7QUFDaEQsV0FBTyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztHQUN0QztDQUNGLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuLyogQGZsb3cgKi9cblxuLypcbiAqIENvcHlyaWdodCAoYykgMjAxNS1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBsaWNlbnNlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW5cbiAqIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCB0eXBlIHtcbiAgbnVjbGlkZV9kZWJ1Z2dlciRTZXJ2aWNlLFxuICBOdWNsaWRlRGVidWdnZXJQcm92aWRlcixcbn0gZnJvbSAnLi4vLi4vbnVjbGlkZS1kZWJ1Z2dlci1pbnRlcmZhY2VzL3NlcnZpY2UnO1xuaW1wb3J0IHR5cGUgT3V0cHV0U2VydmljZSBmcm9tICcuLi8uLi9udWNsaWRlLW91dHB1dC9saWIvT3V0cHV0U2VydmljZSc7XG5cbmltcG9ydCB7c2V0T3V0cHV0U2VydmljZX0gZnJvbSAnLi4vLi4vbnVjbGlkZS1kZWJ1Z2dlci1jb21tb24vbGliL091dHB1dFNlcnZpY2VNYW5hZ2VyJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFjdGl2YXRlKHN0YXRlOiBtaXhlZCk6IHZvaWQge1xuICB9LFxuXG4gIGNvbnN1bWVPdXRwdXRTZXJ2aWNlKGFwaTogT3V0cHV0U2VydmljZSk6IHZvaWQge1xuICAgIHNldE91dHB1dFNlcnZpY2UoYXBpKTtcbiAgfSxcblxuICBwcm92aWRlTnVjbGlkZURlYnVnZ2VyTExEQigpOiBudWNsaWRlX2RlYnVnZ2VyJFNlcnZpY2Uge1xuICAgIGNvbnN0IFNlcnZpY2UgPSByZXF1aXJlKCcuL1NlcnZpY2UnKTtcbiAgICByZXR1cm4gU2VydmljZTtcbiAgfSxcblxuICBjcmVhdGVEZWJ1Z2dlclByb3ZpZGVyKCk6IE51Y2xpZGVEZWJ1Z2dlclByb3ZpZGVyIHtcbiAgICByZXR1cm4gcmVxdWlyZSgnLi9EZWJ1Z2dlclByb3ZpZGVyJyk7XG4gIH0sXG59O1xuIl19