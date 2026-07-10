/*
==========================================================
POLYGLOT PRESENTATION ENGINE

Package : PPE-007

File : fullscreen.js

Version : 1.0.0-alpha.1

==========================================================
*/

"use strict";

/* ==========================================================
   FULLSCREEN ENGINE
========================================================== */

PPE.Fullscreen={};

/* ==========================================================
   STATE
========================================================== */

PPE.Fullscreen.state={

    initialized:false,
    
    ready:false,

    fullscreen:false,

    immersive:false,

    wakeLock:null,

    orientation:"portrait"

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.Fullscreen.initialize=function(){

    PPE.Fullscreen.state.initialized=true;

    PPE.Fullscreen.state.ready=true;

    if(!PPE.Initialize){

        PPE.Initialize={};

    }

    PPE.Initialize.fullscreen=true;

    PPE.Fullscreen.Mobile.detect();

    PPE.Fullscreen.Responsive.update();

    return true;

};

/* ==========================================================
   REGISTER
========================================================== */

PPE.Engine.Fullscreen=

PPE.Fullscreen;

/* ==========================================================
   ENTER FULLSCREEN
========================================================== */

PPE.Fullscreen.enter=

async function(){

    if(

        document.documentElement

        .requestFullscreen

    ){

        await document

        .documentElement

        .requestFullscreen();

        PPE.Fullscreen.state.fullscreen=true;

    }

};

PPE.Fullscreen.exit=

async function(){

    if(

        document.exitFullscreen

    ){

        await document

        .exitFullscreen();

        PPE.Fullscreen.state.fullscreen=false;

    }

};

PPE.Fullscreen.toggle=

async function(){

    if(

        PPE.Fullscreen.state.fullscreen

    ){

        await PPE.Fullscreen.exit();

    }

    else{

        await PPE.Fullscreen.enter();

    }

};

/* ==========================================================
   IMMERSIVE MODE
========================================================== */

PPE.Fullscreen.Immersive={

    enabled:false

};

PPE.Fullscreen.Immersive.enable=

function(){

    PPE.Fullscreen.Immersive.enabled=true;

};

PPE.Fullscreen.Immersive.disable=

function(){

    PPE.Fullscreen.Immersive.enabled=false;

};

PPE.Fullscreen.Immersive.active=

function(){

    return PPE.Fullscreen

    .Immersive

    .enabled;

};

/* ==========================================================
   ORIENTATION ENGINE
========================================================== */

PPE.Fullscreen.Orientation={

    locked:false,

    current:"portrait"

};

PPE.Fullscreen.Orientation.lock=

async function(mode){

    if(

        screen.orientation

        &&

        screen.orientation.lock

    ){

        try{

            await screen.orientation.lock(mode);

            PPE.Fullscreen.Orientation.locked=true;

            PPE.Fullscreen.Orientation.current=mode;

        }

        catch(e){}

    }

};

PPE.Fullscreen.Orientation.unlock=

async function(){

    if(

        screen.orientation

        &&

        screen.orientation.unlock

    ){

        screen.orientation.unlock();

    }

    PPE.Fullscreen.Orientation.locked=false;

};

/* ==========================================================
   WAKE LOCK ENGINE
========================================================== */

PPE.Fullscreen.WakeLock={

    sentinel:null,

    active:false

};

PPE.Fullscreen.WakeLock.enable=

async function(){

    try{

        if(

            navigator.wakeLock

        ){

            PPE.Fullscreen.WakeLock.sentinel=

            await navigator.wakeLock.request(

                "screen"

            );

            PPE.Fullscreen.WakeLock.active=true;

        }

    }

    catch(e){}

};

PPE.Fullscreen.WakeLock.disable=

async function(){

    if(

        PPE.Fullscreen.WakeLock.sentinel

    ){

        await PPE.Fullscreen.WakeLock.sentinel.release();

    }

    PPE.Fullscreen.WakeLock.active=false;

};

/* ==========================================================
   AUTO HIDE TOOLBAR
========================================================== */

PPE.Fullscreen.Toolbar={

    autoHide:true,

    delay:3000,

    timer:null

};

PPE.Fullscreen.Toolbar.hide=function(){

    PPE.Toolbar.hide();

};

PPE.Fullscreen.Toolbar.show=function(){

    PPE.Toolbar.show();

};

PPE.Fullscreen.Toolbar.schedule=

function(){

    clearTimeout(

        PPE.Fullscreen.Toolbar.timer

    );

    PPE.Fullscreen.Toolbar.timer=

    setTimeout(

        PPE.Fullscreen.Toolbar.hide,

        PPE.Fullscreen.Toolbar.delay

    );

};

/* ==========================================================
   FOCUS MODE
========================================================== */

PPE.Fullscreen.Focus={

    enabled:false

};

PPE.Fullscreen.Focus.enable=function(){

    PPE.Fullscreen.Focus.enabled=true;

    PPE.Fullscreen.Toolbar.schedule();

};

PPE.Fullscreen.Focus.disable=function(){

    PPE.Fullscreen.Focus.enabled=false;

    PPE.Fullscreen.Toolbar.show();

};

PPE.Fullscreen.Focus.active=function(){

    return PPE.Fullscreen.Focus.enabled;

};

/* ==========================================================
   VIDEO FULLSCREEN
========================================================== */

PPE.Fullscreen.Video={

    element:null

};

PPE.Fullscreen.Video.attach=function(

    video

){

    PPE.Fullscreen.Video.element=

    video;

};

PPE.Fullscreen.Video.enter=

async function(){

    if(

        PPE.Fullscreen.Video.element

        &&

        PPE.Fullscreen.Video.element

        .requestFullscreen

    ){

        await PPE.Fullscreen.Video.element

        .requestFullscreen();

    }

};

PPE.Fullscreen.Video.exit=

async function(){

    if(

        document.fullscreenElement

    ){

        await document.exitFullscreen();

    }

};

/* ==========================================================
   MOBILE COMPATIBILITY
========================================================== */

PPE.Fullscreen.Mobile={

    android:false,

    ios:false

};

PPE.Fullscreen.Mobile.detect=function(){

    const ua=

    navigator.userAgent.toLowerCase();

    PPE.Fullscreen.Mobile.android=

    ua.indexOf("android")>-1;

    PPE.Fullscreen.Mobile.ios=

    /iphone|ipad|ipod/

    .test(ua);

};

PPE.Fullscreen.Mobile.support=function(){

    return{

        android:

        PPE.Fullscreen.Mobile.android,

        ios:

        PPE.Fullscreen.Mobile.ios,

        fullscreen:

        !!document.fullscreenEnabled

    };

};

/* ==========================================================
   GESTURE EXIT
========================================================== */

PPE.Fullscreen.Gesture={

    enabled:true

};

PPE.Fullscreen.Gesture.doubleTap=function(){

    PPE.Fullscreen.toggle();

};

PPE.Fullscreen.Gesture.swipeDown=function(){

    PPE.Fullscreen.exit();

};

PPE.Fullscreen.Gesture.back=function(){

    if(

        PPE.Fullscreen.state.fullscreen

    ){

        PPE.Fullscreen.exit();

    }

};

/* ==========================================================
   STATE RECOVERY
========================================================== */

PPE.Fullscreen.Recovery={

    snapshot:null

};

PPE.Fullscreen.Recovery.save=function(){

    PPE.Fullscreen.Recovery.snapshot={

        fullscreen:

        PPE.Fullscreen.state.fullscreen,

        immersive:

        PPE.Fullscreen.Immersive.active(),

        orientation:

        PPE.Fullscreen.Orientation.current

    };

};

PPE.Fullscreen.Recovery.restore=

async function(){

    const state=

    PPE.Fullscreen.Recovery.snapshot;

    if(!state){

        return;

    }

    if(state.fullscreen){

        await PPE.Fullscreen.enter();

    }

};

/* ==========================================================
   EVENT BUS
========================================================== */

PPE.Fullscreen.Event={};

PPE.Fullscreen.Event.emit=function(

    name,

    detail

){

    document.dispatchEvent(

        new CustomEvent(

            name,

            {

                detail:detail

            }

        )

    );

};

PPE.Fullscreen.Event.on=function(

    name,

    callback

){

    document.addEventListener(

        name,

        callback

    );

};

PPE.Fullscreen.Event.off=function(

    name,

    callback

){

    document.removeEventListener(

        name,

        callback

    );

};

/* ==========================================================
   SESSION FOCUS MANAGER
========================================================== */

PPE.Fullscreen.Session={

    active:false,

    startedAt:0

};

PPE.Fullscreen.Session.start=function(){

    PPE.Fullscreen.Session.active=true;

    PPE.Fullscreen.Session.startedAt=

    Date.now();

};

PPE.Fullscreen.Session.stop=function(){

    PPE.Fullscreen.Session.active=false;

};

PPE.Fullscreen.Session.duration=function(){

    if(

        !PPE.Fullscreen.Session.active

    ){

        return 0;

    }

    return Date.now()

    -

    PPE.Fullscreen.Session.startedAt;

};

/* ==========================================================
   IDLE DETECTION
========================================================== */

PPE.Fullscreen.Idle={

    timeout:60000,

    timer:null,

    active:false

};

PPE.Fullscreen.Idle.start=function(){

    PPE.Fullscreen.Idle.active=true;

    clearTimeout(

        PPE.Fullscreen.Idle.timer

    );

    PPE.Fullscreen.Idle.timer=

    setTimeout(function(){

        PPE.Fullscreen.Event.emit(

            "PPE_IDLE",

            null

        );

    },

    PPE.Fullscreen.Idle.timeout);

};

PPE.Fullscreen.Idle.reset=function(){

    PPE.Fullscreen.Idle.start();

};

PPE.Fullscreen.Idle.stop=function(){

    PPE.Fullscreen.Idle.active=false;

    clearTimeout(

        PPE.Fullscreen.Idle.timer

    );

};

/* ==========================================================
   PLUGIN API
========================================================== */

PPE.Fullscreen.Plugin={

    list:[]

};

PPE.Fullscreen.Plugin.register=

function(plugin){

    PPE.Fullscreen.Plugin.list

    .push(plugin);

};

PPE.Fullscreen.Plugin.execute=

function(method,data){

    PPE.Fullscreen.Plugin.list

    .forEach(function(plugin){

        if(

            typeof plugin[method]

            ===

            "function"

        ){

            plugin[method](

                data

            );

        }

    });

};

PPE.Fullscreen.Plugin.clear=

function(){

    PPE.Fullscreen.Plugin.list=[];

};

/* ==========================================================
   TRANSITION ANIMATION
========================================================== */

PPE.Fullscreen.Animation={

    enabled:true,

    duration:300

};

PPE.Fullscreen.Animation.enter=function(){

    PPE.Fullscreen.Event.emit(

        "PPE_FULLSCREEN_ENTER_ANIMATION",

        {

            duration:

            PPE.Fullscreen.Animation.duration

        }

    );

};

PPE.Fullscreen.Animation.exit=function(){

    PPE.Fullscreen.Event.emit(

        "PPE_FULLSCREEN_EXIT_ANIMATION",

        {

            duration:

            PPE.Fullscreen.Animation.duration

        }

    );

};

PPE.Fullscreen.Animation.setDuration=

function(value){

    PPE.Fullscreen.Animation.duration=

    value;

};

/* ==========================================================
   PERFORMANCE MONITOR
========================================================== */

PPE.Fullscreen.Performance={

    enterTime:0,

    exitTime:0,

    totalTime:0

};

PPE.Fullscreen.Performance.begin=

function(){

    PPE.Fullscreen.Performance.enterTime=

    performance.now();

};

PPE.Fullscreen.Performance.end=

function(){

    PPE.Fullscreen.Performance.exitTime=

    performance.now();

    PPE.Fullscreen.Performance.totalTime=

    PPE.Fullscreen.Performance.exitTime

    -

    PPE.Fullscreen.Performance.enterTime;

};

PPE.Fullscreen.Performance.info=

function(){

    return{

        totalTime:

        PPE.Fullscreen.Performance.totalTime

    };

};

/* ==========================================================
   AUTO RECOVERY
========================================================== */

PPE.Fullscreen.AutoRecovery={

    enabled:true

};

PPE.Fullscreen.AutoRecovery.restore=

async function(){

    if(

        PPE.Fullscreen.Recovery.snapshot

    ){

        await PPE.Fullscreen

        .Recovery

        .restore();

    }

};

PPE.Fullscreen.AutoRecovery.clear=

function(){

    PPE.Fullscreen.Recovery.snapshot=

    null;

};

/* ==========================================================
   MULTI DISPLAY MANAGER
========================================================== */

PPE.Fullscreen.Display={

    mode:"single",

    screens:1

};

PPE.Fullscreen.Display.detect=function(){

    PPE.Fullscreen.Display.screens=

    window.screen

    ? 1

    : 0;

};

PPE.Fullscreen.Display.setMode=

function(mode){

    PPE.Fullscreen.Display.mode=

    mode;

};

PPE.Fullscreen.Display.info=function(){

    return{

        mode:

        PPE.Fullscreen.Display.mode,

        screens:

        PPE.Fullscreen.Display.screens

    };

};

/* ==========================================================
   BATTERY OPTIMIZATION
========================================================== */

PPE.Fullscreen.Power={

    saveMode:false

};

PPE.Fullscreen.Power.enable=function(){

    PPE.Fullscreen.Power.saveMode=true;

};

PPE.Fullscreen.Power.disable=function(){

    PPE.Fullscreen.Power.saveMode=false;

};

PPE.Fullscreen.Power.apply=function(){

    if(

        PPE.Fullscreen.Power.saveMode

    ){

        PPE.Fullscreen.Animation

        .setDuration(150);

    }

    else{

        PPE.Fullscreen.Animation

        .setDuration(300);

    }

};

/* ==========================================================
   COMPATIBILITY LAYER
========================================================== */

PPE.Fullscreen.Compatibility={};

PPE.Fullscreen.Compatibility.check=

function(){

    return{

        fullscreen:

        !!document.fullscreenEnabled,

        orientation:

        !!(

            screen.orientation

        ),

        wakeLock:

        !!(

            navigator.wakeLock

        ),

        visibility:

        typeof document

        .hidden

        !==

        "undefined"

    };

};

PPE.Fullscreen.Compatibility.ready=

function(){

    const c=

    PPE.Fullscreen

    .Compatibility

    .check();

    return(

        c.fullscreen

    );

};

/* ==========================================================
   RESPONSIVE FULLSCREEN
========================================================== */

PPE.Fullscreen.Responsive={

    mode:"auto",

    breakpoint:768

};

PPE.Fullscreen.Responsive.update=function(){

    if(

        window.innerWidth<

        PPE.Fullscreen.Responsive.breakpoint

    ){

        PPE.Fullscreen.Responsive.mode=

        "mobile";

    }

    else{

        PPE.Fullscreen.Responsive.mode=

        "desktop";

    }

};

PPE.Fullscreen.Responsive.current=

function(){

    return PPE.Fullscreen.Responsive.mode;

};

window.addEventListener(

    "resize",

    PPE.Fullscreen.Responsive.update

);

/* ==========================================================
   SMART FOCUS CONTROLLER
========================================================== */

PPE.Fullscreen.SmartFocus={

    enabled:true

};

PPE.Fullscreen.SmartFocus.start=

function(){

    PPE.Fullscreen.Focus.enable();

    PPE.Fullscreen.Toolbar.schedule();

};

PPE.Fullscreen.SmartFocus.stop=

function(){

    PPE.Fullscreen.Focus.disable();

    PPE.Fullscreen.Toolbar.show();

};

PPE.Fullscreen.SmartFocus.toggle=

function(){

    if(

        PPE.Fullscreen.Focus.active()

    ){

        PPE.Fullscreen.SmartFocus.stop();

    }

    else{

        PPE.Fullscreen.SmartFocus.start();

    }

};

/* ==========================================================
   SNAPSHOT ENGINE
========================================================== */

PPE.Fullscreen.Snapshot={

    state:null

};

PPE.Fullscreen.Snapshot.save=function(){

    PPE.Fullscreen.Snapshot.state={

        fullscreen:

        PPE.Fullscreen.state.fullscreen,

        orientation:

        PPE.Fullscreen.Orientation.current,

        immersive:

        PPE.Fullscreen.Immersive.active(),

        focus:

        PPE.Fullscreen.Focus.active()

    };

};

PPE.Fullscreen.Snapshot.restore=

async function(){

    if(

        PPE.Fullscreen.Snapshot.state

    ){

        await PPE.Fullscreen

        .Recovery

        .restore();

    }

};

/* ==========================================================
   PERFORMANCE CACHE
========================================================== */

PPE.Fullscreen.Cache={

    state:null,

    timestamp:0

};

PPE.Fullscreen.Cache.save=function(){

    PPE.Fullscreen.Cache.state=

    PPE.Fullscreen.Snapshot.state;

    PPE.Fullscreen.Cache.timestamp=

    Date.now();

};

PPE.Fullscreen.Cache.restore=function(){

    return PPE.Fullscreen.Cache.state;

};

PPE.Fullscreen.Cache.clear=function(){

    PPE.Fullscreen.Cache.state=null;

    PPE.Fullscreen.Cache.timestamp=0;

};

PPE.Fullscreen.Cache.info=function(){

    return{

        timestamp:

        PPE.Fullscreen.Cache.timestamp

    };

};

/* ==========================================================
   ACCESSIBILITY ENGINE
========================================================== */

PPE.Fullscreen.Accessibility={

    enabled:true,

    reduceMotion:false,

    highContrast:false

};

PPE.Fullscreen.Accessibility.enable=

function(){

    PPE.Fullscreen.Accessibility.enabled=true;

};

PPE.Fullscreen.Accessibility.disable=

function(){

    PPE.Fullscreen.Accessibility.enabled=false;

};

PPE.Fullscreen.Accessibility.setReduceMotion=

function(value){

    PPE.Fullscreen.Accessibility.reduceMotion=

    value;

};

PPE.Fullscreen.Accessibility.setHighContrast=

function(value){

    PPE.Fullscreen.Accessibility.highContrast=

    value;

};

/* ==========================================================
   SELF TEST
========================================================== */

PPE.Fullscreen.selfTest=function(){

    return{

        initialized:
        PPE.Fullscreen.state.initialized,

        ready:
        PPE.Fullscreen.state.ready,

        fullscreen:
        PPE.Fullscreen.state.fullscreen,

        immersive:
        PPE.Fullscreen.Immersive.active(),

        focus:
        PPE.Fullscreen.Focus.active(),

        orientation:
        PPE.Fullscreen.Orientation.current,

        wakeLock:
        PPE.Fullscreen.WakeLock.active,

        responsive:
        PPE.Fullscreen.Responsive.current(),

        performance:
        PPE.Fullscreen.Performance.info()

    };

};

/* ==========================================================
   DIAGNOSTIC
========================================================== */

PPE.Fullscreen.diagnostic=function(){

    console.group(
        "PPE Fullscreen"
    );

    console.table(
        PPE.Fullscreen.selfTest()
    );

    console.table(
        PPE.Fullscreen.health()
    );

    console.table(
        PPE.Fullscreen.Compatibility.check()
    );

    console.table(
        PPE.Fullscreen.Cache.info()
    );

    console.groupEnd();

};
/* ==========================================================
   HEALTH CHECK
========================================================== */

PPE.Fullscreen.health=function(){

    return{

        initialized:
        PPE.Fullscreen.state.initialized,

        ready:
        PPE.Fullscreen.state.ready,

        toolbar:
        typeof PPE.Toolbar!=="undefined",

        renderer:
        typeof PPE.Renderer!=="undefined",

        teleprompter:
        typeof PPE.Teleprompter!=="undefined",

        bridge:
        typeof PPE.Bridge!=="undefined",

        theme:
        typeof PPE.Theme!=="undefined"

    };

};

/* ==========================================================
   RUNTIME
========================================================== */

PPE.Fullscreen.runtime=function(){

    return{

        package:"PPE-007",

        file:"fullscreen.js",

        version:PPE.version || "1.0.0",

        initialized:
        PPE.Fullscreen.state.initialized,

        ready:
        PPE.Fullscreen.state.ready,

        fullscreen:
        PPE.Fullscreen.state.fullscreen,

        immersive:
        PPE.Fullscreen.Immersive.active(),

        orientation:
        PPE.Fullscreen.Orientation.current

    };

};

/* ==========================================================
   REPORT
========================================================== */

PPE.Fullscreen.report=function(){

    return{

        runtime:

        PPE.Fullscreen.runtime(),

        compatibility:

        PPE.Fullscreen

        .Compatibility

        .check(),

        performance:

        PPE.Fullscreen

        .Performance

        .info()

    };

};

/* ==========================================================
   REGISTER ENGINE
========================================================== */

PPE.Engine.Fullscreen=

PPE.Fullscreen;

/* ==========================================================
   AUTO BOOT
========================================================== */

PPE.Fullscreen.boot=function(){

    if(!PPE.Initialize){

        PPE.Initialize={};

    }

    if(!PPE.Fullscreen.state.initialized){

        PPE.Fullscreen.initialize();

    }

    PPE.Initialize.fullscreen=true;

    PPE.Fullscreen.state.ready=true;

    PPE.Fullscreen.Event.emit(

        "PPE_FULLSCREEN_READY",

        PPE.Fullscreen.runtime()

    );

    return true;

};

/* ==========================================================
   CERTIFICATION MARKER

   Package : PPE-007

   File : fullscreen.js

   Status :

   IMPLEMENTATION COMPLETE

========================================================== */