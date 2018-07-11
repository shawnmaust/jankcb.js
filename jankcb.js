/*!
 * JankCb v1.0: Real-time jank monitoring with callback 
 * Copyright (c) 2018 Shawn Maust
 * MIT License
 * https://github.com/shawnmaust/jankcb.js 
 **/

(function(root, factory) {
  root.jankCb = factory(root);
})(window, function(root) {
  'use strict';

  // Variables 

  var jankCb = {};
  var supports = !!root.requestAnimationFrame && !!root.cancelAnimationFrame;
  var settings;
  var defaults = {
    minFps: 48,
    maxMisses: 3,
    showLog: true,
    callback: function() {}
  };
  var rAF;
  var cAF;
  var rAFId;
  var delta;
  var fps;
  var lastTimestamp;
  var ticks = 0;
  var misses = 0;

  // Methods 

  /**
   * Merge defaults with user options
   * @private
   * @param {Object} defaults Default settings
   * @param {Object} options User options
   * @returns {Object} Merged values of defaults and options
   */
  var extend = function(defaults, options) {
    var extended = {};
    for (var prop in defaults) { extended[prop] = defaults[prop]; };
    for (var prop in options) { extended[prop] = options[prop]; };
    return extended;
  };

  /**
   * Monitor current frames per second
   * @private
   * @param {Number} timestamp Current timestamp
   */
  var monitorFps = function(timestamp) {
    if (ticks == 0) 
      lastTimestamp = timestamp;

    ticks += 1;

    if (lastTimestamp < (timestamp - 1000)) {
      delta = timestamp - lastTimestamp;
      fps = ticks / (delta / 1000);
      if (settings.showLog) 
        console.log('FPS:', fps);
      if (fps < settings.minFps) {
        misses += 1;
        if (settings.debug) 
          console.log("Miss: ", misses);
        if (misses >= settings.maxMisses) {
          if (settings.showLog) console.log("Triggering Callback");
          settings.callback();
          jankCb.destroy();
          return;
        }
      }
      ticks = 0;
    }
    rAFId = rAF(monitorFps);
  }

  /**
   * Destroy the current initialization.
   * @public
   */
  jankCb.destroy = function() {
    if (!settings) 
      return;

    if (settings.showLog) 
      console.log('Ending JankCb');

    cAF(rAFId);
    settings = null;
  };

  /**
   * Initialize Plugin
   * @public
   * @param {Object} options User settings
   */
  jankCb.init = function(options) {
    if (!supports) 
      return;

    jankCb.destroy();

    rAF = root.requestAnimationFrame;
    cAF = root.cancelAnimationFrame;
    settings = extend(defaults, options || {});
    if (settings.showLog) 
      console.log('Starting JankCb...');
    rAFId = rAF(monitorFps);
  };

  // Public API
  return jankCb;
});