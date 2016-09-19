/**
 * worker-app module
 * @author Yuncong Zhang
 *
 */
(function(angular) {
  "use strict";

  angular.module('worker-app', ['pdf-prep']).
  run(function(PdfPrepFactory, $window) {
    $window.onmessage = function(e) {
      var workerResult = PdfPrepFactory.prep(e.data.cols, e.data.data);
      $window.postMessage(workerResult);
    };
  });
})(angular);
