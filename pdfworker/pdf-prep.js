/**
 * pdf-prep module
 * @author Yuncong Zhang
 *
 */
(function(angular) {
  "use strict";
  
  angular.module('pdf-prep', [])
  .factory('PdfPrepFactory', function($filter) {
    return {
      prep : function (cols, data) {
        var thead = [];
        if(typeof cols !== 'undefined' && Array.isArray(cols)) {
          cols.forEach(function(col) {
            if(col.visible !== false) {
              thead.push(col.displayName ? col.displayName : col.name);
            }
          });
        }

        var tbody = data.map(function(datus) {
          var d = [];
          cols.forEach(function(col) {
            if(col.displayName && col.name) {
              if(col.cellFilter) {
                var filters = col.cellFilter.split(":", 1);
                var filterName = filters[0];
                d.push($filter(filterName)(datus[col.name], filters[1]));
              } else {
                d.push(datus[col.name].toString().trim());
              }
            }
          });
          return d;
        });
        
        return {
          thead:thead,
          tbody:tbody
        };
      }
    };
  });

})(angular);
