// $scope, $element, $attrs, $injector, $sce, $timeout, $http, $ionicPopup, and $ionicPopover services are available



$scope.$on("$ionicView.loaded", function (event) {
  $rootScope.logger.output("Initialization: ", "View2.js - $ionicView.loaded");
});


$scope.loop1 = function () {
  let count = 0;
  $rootScope.logger.output("Starting Loop 1", "loop1()")
  const intervalId = setInterval(() => {
    $rootScope.logger.output(`Interval count: ${count}`, "loop1()", 2);
    count++;

    // Stop the interval after 10 iterations
    if (count >= 10) {
      clearInterval(intervalId);
      $rootScope.logger.output('Interval stopped.', "loop1()");
    }
  }, 1000);
}

$scope.loop2 = function () {
  let count = 0;
  $rootScope.logger.output("Starting Loop 2", "loop2()")
  const intervalId = setInterval(() => {
    $rootScope.logger.output(`Interval count: ${count}`, "loop2()", 2);
    count++;

    // Stop the interval after 10 iterations
    if (count >= 10) {
      clearInterval(intervalId);
      $rootScope.logger.output('Interval stopped.', "loop2()");
    }
  }, 750);
}



$scope.loop3 = function () {
  let count = 0;
  $rootScope.logger.output("Starting Loop 3", "loop3()")
  const intervalId = setInterval(() => {
    $rootScope.logger.output(`Outer loop count: ${count}`, "loop3()", 2);

    for (let innerCount = 0; innerCount < 3; innerCount++) {
      $rootScope.logger.output(`  Inner loop count: ${innerCount}`, "loop 3()", 3);
    }
    count++;

    // Stop the interval after 10 iterations
    if (count >= 10) {
      clearInterval(intervalId);
      $rootScope.logger.output('Interval stopped.', "loop 3()");
    }
  }, 500); 
}


$scope.debugChange = function () {
  $rootScope.logger.output("Starting of debugChange", "debugChange() - View 2")
  let dbgVal = $scope.view.wdg['checkbox-1'].value;
  $rootScope.logger.output("Value is now = " + dbgVal, "debugChange() - View 2", 2)
  $rootScope.logger.setShowOutput(dbgVal);
  $scope.app.params.jloggerdebug = dbgVal;
}