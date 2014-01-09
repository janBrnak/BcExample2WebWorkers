const DEVICE_TYPE = 'mobile';  // browser or mobile

var loader = null
var navig = null;
var sessionStorage = null;
var localStorage = null;
var prefix = "searchResult: ";

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        switch (DEVICE_TYPE) {
            case 'mobile':
                document.addEventListener('deviceready', this.onDeviceReady, false);
                break;
            case 'browser':
                this.onDeviceReady();
                break;
            default:
                this.onDeviceReady();
                break;
        }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        onLoad();
        console.log("SUCCESS: Load device");
    }
};

// on load
function onLoad() {
    loader = $(".loader");
};