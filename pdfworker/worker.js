/**
 * @author Yuncong Zhang
 *
 */

// Angular needs a global window object
self.window = self;

// Skeleton properties to get Angular to load and bootstrap.
self.history = {};
self.document = {
  readyState: 'complete',
  querySelector: function() {},
  createElement: function() {
    return {
      pathname: '',
      setAttribute: function() {}
    }
  }
};

self.Node = {
  prototype:{
    contains:function() {}
  }
};

// Load Angular: must be on same domain as this script
self.importScripts('/bower_components/angular/angular.min.js');

// Put angular on global scope
self.angular = window.angular;

// Standard angular module definitions
self.importScripts('worker-app.js');
self.importScripts('pdf-prep.js');

// No root element seems to work fine
self.angular.bootstrap(null, ['worker-app']);
