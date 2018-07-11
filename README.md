# JankCb.js

A JavaScript plugin to track the real-time frames per second (FPS) and trigger a predefined callback when performance dips below a predefined level. 

## Purpose

One of the challenges of building for the web is the vast number of different devices and browsers that can access your site. But the challenge goes beyond just the sheer number of combinations. You also have no idea how many resources a user's specific device/browser will have available, or what else it may be trying to do at the same time. Because of this, sniffing for browsers, devices, or even browser features, only goes so far. Even higher-powered devices, with newer browsers, may still have issues at times---it all depends on what else they're trying to do in any given moment.

Utilizing `requestAnimationFrame()`, this plugin keeps a tally of the actual number of frames that are being displayed every second, and then tracks how many times this number dropped below a certain threshold. Once performance dips below this threshold a predetermined number of times, the plugin will trigger a callback. 

The motivation and genesis of [this approach is described in this post](https://www.afasterweb.com/2018/06/29/responding-to-jank-in-real-time/).


## Usage

Include JankCb script in the document.

    <script src="/path/to/jankcb.min.js"></script>

With this function in place, you can call `jankCb.init()` from elsewhere in the application, passing in the options for the plugin.

    function customCallback() {
      // Actions to take if jank starts to occur...
    }

    jankCb.init({ 
      minFps: 48,  
      maxMisses: 3,
      showLog: true,
      callback: customCallback
    });


## Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| minFps | number | 48 | Minimum FPS that must be met. |
| maxMisses | number | 3 | Number of misses before callback is triggered. |
| showLog | boolean | true | Log FPS information to console. |
| callback | function | function() {} | Function to be used as callback. |


## License

Released under [MIT License](https://opensource.org/licenses/MIT).