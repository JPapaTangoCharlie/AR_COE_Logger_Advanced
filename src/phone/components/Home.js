// $scope, $element, $attrs, $injector, $sce, $timeout, $http, $ionicPopup, and $ionicPopover services are available

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Globals
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
$scope.viewLoaded = false;

$scope.systemFullyInit = function () {
  if ($rootScope.dataRead && $scope.viewLoaded) {
    

    let test = $scope.app.params.jloggerdebug;
    $rootScope.logger.output ("TESTING the value of debug = " + test);

    //Special Logger functions:
    // setWidgetOut : Set a boolean flag, if true the logger will also call the WidgetOutFun to display logs in APP
    // setWidgetOutFunc : A function local to the view that will address the logger output display.  Ensure function and code exists.

    //$rootScope.logger.setWidgetOut(true);
    //$rootScope.logger.setWidgetOutFunc(showLoggerData);      
    $rootScope.logger.output("Fully Init: All Conditions pass", "Start.js - systemFullyInit");

  }
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Load Libary functions - readFiles will launch on loading the experience 
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function readFiles(src) {
  return new Promise(function (resolve, reject) {
    var head = document.head || document.getElementsByTagName('head')[0],
      script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'app/resources/' + src;
    head.appendChild(script);
    script.onload = resolve; // Resolve when script is loaded
    script.onerror = reject; // Reject if loading fails
  });
}

if (!$rootScope.logger) {
  readFiles("Uploaded/jlogger.js")
    .then(function () {      
      $rootScope.logger = new Jlogger("AR_COE_Logger", "GLOBAL");
      let debug = JSON.parse($scope.app.params.jloggerdebug);
      $rootScope.logger.setShowOutput(debug);
      $rootScope.logger.output("Logger is initialized and ready", "Home.js - loadLibrary");
      $rootScope.dataRead = true;
      // Custom Logger
      // Sample
      // $rootScope.logger.output("Scan is finished, VIN = " + scaninfo, "scanfinshed")
      // $rootScope.logger.output(<message>, <location -OPTIONAL>, <depth -OPTIONAL>)
    })
    .catch(function (error) {
      console.error("Error loading logger:", error);
    });
}

$scope.$on("$ionicView.loaded", function (event) {
  $scope.viewLoaded = true;
  $scope.systemFullyInit();
});

$scope.playStarted = function () {
  $rootScope.logger.output("AR Sequence Play Started", "playStarted()");
}

//Will execute with the Select Widget Value is changed.
$scope.selectChanged = function () {
  $rootScope.logger.output("Select Widget Value Changed", "selectChanged()");
  let val = $scope.view.wdg['select-1'].value;
  $rootScope.logger.output("The current value is: " + val, "selectChanged()", 2)
  if (val === 'l-Creo 3D - Figure4.pvi') {
    $rootScope.logger.output("We have a match", "selectChanged()", 3)
  }
};

$scope.debugChange = function () {
  $rootScope.logger.output("Starting of debugChange", "debugChange()")
  let dbgVal = $scope.view.wdg['checkbox-1'].value;
  $rootScope.logger.output("Value is now = " + dbgVal, "debugChange()", 2)
  $rootScope.logger.setShowOutput(dbgVal);
  $scope.app.params.jloggerdebug = dbgVal; 
}