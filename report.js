angular.module('app', [
  'ui.grid',
  'ui.grid.exporter']).

controller('MainCtrl', [
  '$scope',
  '$http',
  function($scope, $http) {
    "use strict";

    $scope.gridOptions = {
      paginationPageSizes: [100, 500],
      showGridFooter: false,
      showColumnFooter: false,
      enableGridMenu: true,
      showGroupPanel: true,
      enableVerticalScrollbar: true,
      enableHorizontalScrollbar: false,
      exporterMenuCsv: false,
      exporterPdfFilename: 'Report.pdf',
      exporterPdfTableStyle: {margin:[10, 5, 10, 15]},
      exporterPdfDefaultStyle: {
        fontSize: 9,
      },
      exporterPdfHeader: {
        text: "Report",
        style: {
          fontSize: 22,
          bold: true,
          color: 'black',
          alignment: "center"
        }
      },
      columnDefs: [
        {name:'id', displayName:'ID', width: '10%'},
        {name:'description', displayName:'Description', width: '25%'},
        {name:'value', displayName:'Sale Value', cellClass: 'text-right', width: '10%', cellFilter: 'currency:"$":0'},
        {name:'type', displayName:'Type', width: '10%', cellTooltip: 'P = Product, S = Service'},
        {name:'cts', displayName:'Creation Timestamp', width: '20%', cellFilter: 'date:"yyyy-MM-dd hh:mm"'},
        {name:'accountNum', displayName:'User Id', width: '15%'}
      ],
      onRegisterApi: function(gridApi) {
        $scope.gridApi = gridApi;
      },
      rowTemplate: "row-template.html"
    };

    $http.get("/report.json").then(function(res) {
      if(typeof res.data.activities !== 'undefined'){
        $scope.gridOptions.data = res.data.activities;
      }
    }, function(err) {
      window.alert("Failed to get json data");
    });

    $scope.exportAllAsPdf = function(options) {
      var worker = new Worker("/pdfworker/worker.js");
      worker.postMessage({cols:options.columnDefs, data:options.data});
      worker.onmessage = function(evt) {
        var doc = new jsPDF('landscape', 'pt', 'a2');
        doc.autoTable(evt.data.thead, evt.data.tbody);
        doc.save("Report.pdf");
      };
    };
  }]
);
