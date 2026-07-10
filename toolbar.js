/*
==========================================================
POLYGLOT PRESENTATION ENGINE

Package : PPE-006

File : toolbar.js

Version : 1.0.0-alpha.1

==========================================================
*/

"use strict";

/* ==========================================================
   TOOLBAR ENGINE
========================================================== */

PPE.Toolbar={};

/* ==========================================================
   STATE
========================================================== */

PPE.Toolbar.state={

    initialized:false,
    
    ready:false,

    visible:true,

    enabled:true,

    fullscreen:false,

    locked:false

};

/* ==========================================================
   ELEMENT
========================================================== */

PPE.Toolbar.element={

    root:null,

    play:null,

    pause:null,

    next:null,

    previous:null,

    translate:null,

    fullscreen:null,

    settings:null

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.Toolbar.initialize=function(toolbarId){

    PPE.Toolbar.element.root=
    document.getElementById(toolbarId);

    PPE.Toolbar.state.initialized=true;

    PPE.Toolbar.state.ready=true;

    if(!PPE.Initialize){
        PPE.Initialize={};
    }

    PPE.Initialize.toolbar=true;

};

/* ==========================================================
   REGISTER
========================================================== */

PPE.Engine.Toolbar=

PPE.Toolbar;

/* ==========================================================
   VISIBILITY
========================================================== */

PPE.Toolbar.show=function(){

    PPE.Toolbar.state.visible=true;

    if(

        PPE.Toolbar.element.root

    ){

        PPE.Toolbar.element.root

        .style.display="flex";

    }

};

PPE.Toolbar.hide=function(){

    PPE.Toolbar.state.visible=false;

    if(

        PPE.Toolbar.element.root

    ){

        PPE.Toolbar.element.root

        .style.display="none";

    }

};

PPE.Toolbar.toggle=function(){

    if(

        PPE.Toolbar.state.visible

    ){

        PPE.Toolbar.hide();

    }

    else{

        PPE.Toolbar.show();

    }

};

/* ==========================================================
   ENABLE / DISABLE
========================================================== */

PPE.Toolbar.enable=function(){

    PPE.Toolbar.state.enabled=true;

};

PPE.Toolbar.disable=function(){

    PPE.Toolbar.state.enabled=false;

};

PPE.Toolbar.isEnabled=function(){

    return PPE.Toolbar.state.enabled;

};

/* ==========================================================
   LOCK
========================================================== */

PPE.Toolbar.lock=function(){

    PPE.Toolbar.state.locked=true;

};

PPE.Toolbar.unlock=function(){

    PPE.Toolbar.state.locked=false;

};

PPE.Toolbar.isLocked=function(){

    return PPE.Toolbar.state.locked;

};

/* ==========================================================
   ACTION ENGINE
========================================================== */

PPE.Toolbar.Action={};

PPE.Toolbar.Action.play=function(){

    PPE.Teleprompter.play();

};

PPE.Toolbar.Action.pause=function(){

    PPE.Teleprompter.pause();

};

PPE.Toolbar.Action.stop=function(){

    PPE.Teleprompter.stop();

};

PPE.Toolbar.Action.next=function(){

    PPE.Renderer.nextParagraph();

};

PPE.Toolbar.Action.previous=function(){

    PPE.Renderer.previousParagraph();

};

/* ==========================================================
   SHORTCUT ENGINE
========================================================== */

PPE.Toolbar.Shortcut={};

PPE.Toolbar.Shortcut.handle=function(event){

    switch(event.key){

        case " ":

            PPE.Toolbar.Action.play();

            break;

        case "ArrowRight":

            PPE.Toolbar.Action.next();

            break;

        case "ArrowLeft":

            PPE.Toolbar.Action.previous();

            break;

        case "Escape":

            PPE.Teleprompter.stop();

            break;

    }

};

document.addEventListener(

    "keydown",

    PPE.Toolbar.Shortcut.handle

);

/* ==========================================================
   EVENT ENGINE
========================================================== */

PPE.Toolbar.Event={};

PPE.Toolbar.Event.emit=function(

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

PPE.Toolbar.Event.on=function(

    name,

    callback

){

    document.addEventListener(

        name,

        callback

    );

};

PPE.Toolbar.Event.off=function(

    name,

    callback

){

    document.removeEventListener(

        name,

        callback

    );

};

/* ==========================================================
   TOOLBAR MODE
========================================================== */

PPE.Toolbar.Mode={

    current:"normal",

    available:[

        "minimal",

        "normal",

        "advanced"

    ]

};

PPE.Toolbar.Mode.set=function(mode){

    if(

        PPE.Toolbar.Mode.available

        .includes(mode)

    ){

        PPE.Toolbar.Mode.current=

        mode;

    }

};

PPE.Toolbar.Mode.get=function(){

    return PPE.Toolbar.Mode.current;

};

PPE.Toolbar.Mode.is=function(mode){

    return PPE.Toolbar.Mode.current===mode;

};

/* ==========================================================
   TRANSLATION ACTION
========================================================== */

PPE.Toolbar.Action.translate=

function(){

    PPE.Teleprompter

    .toggleTranslation();

};

PPE.Toolbar.Action.showTranslation=

function(text){

    PPE.Teleprompter

    .showTranslation(text);

};

PPE.Toolbar.Action.hideTranslation=

function(){

    PPE.Teleprompter

    .hideTranslation();

};

/* ==========================================================
   BOOKMARK ACTION
========================================================== */

PPE.Toolbar.Action.bookmark=

function(){

    PPE.Teleprompter

    .saveBookmark();

};

PPE.Toolbar.Action.restoreBookmark=

function(){

    PPE.Teleprompter

    .restoreBookmark();

};

PPE.Toolbar.Action.favorite=

function(id){

    PPE.Toolbar.Event.emit(

        "PPE_FAVORITE",

        {

            id:id

        }

    );

};

/* ==========================================================
   THEME ACTION
========================================================== */

PPE.Toolbar.Action.theme=function(

    theme

){

    if(

        PPE.Theme

    ){

        PPE.Theme.set(

            theme

        );

    }

};

PPE.Toolbar.Action.darkMode=

function(){

    PPE.Toolbar.Action.theme(

        "dark"

    );

};

PPE.Toolbar.Action.lightMode=

function(){

    PPE.Toolbar.Action.theme(

        "light"

    );

};

/* ==========================================================
   FULLSCREEN ACTION
========================================================== */

PPE.Toolbar.Action.fullscreen=

function(){

    if(

        PPE.Fullscreen

    ){

        PPE.Fullscreen.toggle();

    }

};

PPE.Toolbar.Action.enterFullscreen=

function(){

    if(

        PPE.Fullscreen

    ){

        PPE.Fullscreen.enter();

    }

};

PPE.Toolbar.Action.exitFullscreen=

function(){

    if(

        PPE.Fullscreen

    ){

        PPE.Fullscreen.exit();

    }

};

/* ==========================================================
   SETTINGS ACTION
========================================================== */

PPE.Toolbar.Settings={

    language:"en",

    fontSize:18,

    autoScroll:true,

    showTranslation:true

};

PPE.Toolbar.Settings.update=

function(data){

    Object.assign(

        PPE.Toolbar.Settings,

        data

    );

};

PPE.Toolbar.Settings.get=

function(){

    return{

        language:

        PPE.Toolbar.Settings.language,

        fontSize:

        PPE.Toolbar.Settings.fontSize,

        autoScroll:

        PPE.Toolbar.Settings.autoScroll,

        showTranslation:

        PPE.Toolbar.Settings.showTranslation

    };

};

/* ==========================================================
   VOICE COMMAND ACTION
========================================================== */

PPE.Toolbar.Action.voice=function(command){

    switch(command){

        case "play":

            PPE.Toolbar.Action.play();

            break;

        case "pause":

            PPE.Toolbar.Action.pause();

            break;

        case "next":

            PPE.Toolbar.Action.next();

            break;

        case "previous":

            PPE.Toolbar.Action.previous();

            break;

        case "translate":

            PPE.Toolbar.Action.translate();

            break;

    }

};

PPE.Toolbar.Action.voiceEnabled=

true;

/* ==========================================================
   AI ACTION
========================================================== */

PPE.Toolbar.Action.ai=function(

    action,

    data

){

    PPE.Toolbar.Event.emit(

        "PPE_AI_ACTION",

        {

            action:action,

            data:data

        }

    );

};

PPE.Toolbar.Action.askAI=function(prompt){

    PPE.Toolbar.Action.ai(

        "prompt",

        prompt

    );

};

PPE.Toolbar.Action.analysis=function(){

    PPE.Toolbar.Action.ai(

        "analysis",

        null

    );

};

/* ==========================================================
   SHARE ACTION
========================================================== */

PPE.Toolbar.Action.share=function(data){

    PPE.Toolbar.Event.emit(

        "PPE_SHARE",

        data

    );

};

PPE.Toolbar.Action.export=function(){

    PPE.Toolbar.Event.emit(

        "PPE_EXPORT",

        null

    );

};

PPE.Toolbar.Action.print=function(){

    PPE.Toolbar.Event.emit(

        "PPE_PRINT",

        null

    );

};

/* ==========================================================
   NOTIFICATION ACTION
========================================================== */

PPE.Toolbar.Notification={

    enabled:true

};

PPE.Toolbar.Notification.show=function(

    title,

    message

){

    PPE.Toolbar.Event.emit(

        "PPE_NOTIFICATION",

        {

            title:title,

            message:message

        }

    );

};

PPE.Toolbar.Notification.success=

function(message){

    PPE.Toolbar.Notification.show(

        "Success",

        message

    );

};

PPE.Toolbar.Notification.error=

function(message){

    PPE.Toolbar.Notification.show(

        "Error",

        message

    );

};

/* ==========================================================
   CONTEXT MENU
========================================================== */

PPE.Toolbar.ContextMenu={

    visible:false,

    items:[]

};

PPE.Toolbar.ContextMenu.show=function(

    items

){

    PPE.Toolbar.ContextMenu.visible=true;

    PPE.Toolbar.ContextMenu.items=

    items||[];

};

PPE.Toolbar.ContextMenu.hide=function(){

    PPE.Toolbar.ContextMenu.visible=false;

};

PPE.Toolbar.ContextMenu.toggle=function(){

    PPE.Toolbar.ContextMenu.visible=

    !PPE.Toolbar.ContextMenu.visible;

}


/* ==========================================================
   DYNAMIC LAYOUT
========================================================== */

PPE.Toolbar.Layout={

    mode:"normal"

};

PPE.Toolbar.Layout.apply=function(

    mode

){

    PPE.Toolbar.Layout.mode=mode;

    PPE.Toolbar.Event.emit(

        "PPE_TOOLBAR_LAYOUT",

        {

            mode:mode

        }

    );

};

PPE.Toolbar.Layout.reset=function(){

    PPE.Toolbar.Layout.apply(

        "normal"

    );

};

PPE.Toolbar.Layout.current=function(){

    return PPE.Toolbar.Layout.mode;

};

/* ==========================================================
   ANIMATION ENGINE
========================================================== */

PPE.Toolbar.Animation={

    duration:250,

    enabled:true

};

PPE.Toolbar.Animation.show=function(

    element

){

    if(!element){

        return;

    }

    element.style.opacity="1";

    element.style.transition=

    "opacity "+

    PPE.Toolbar.Animation.duration+

    "ms";

};

PPE.Toolbar.Animation.hide=function(

    element

){

    if(!element){

        return;

    }

    element.style.opacity="0";

};

PPE.Toolbar.Animation.toggle=function(

    element,

    visible

){

    if(visible){

        PPE.Toolbar.Animation.show(

            element

        );

    }

    else{

        PPE.Toolbar.Animation.hide(

            element

        );

    }

};

/* ==========================================================
   GESTURE ENGINE
========================================================== */

PPE.Toolbar.Gesture={

    enabled:true

};

PPE.Toolbar.Gesture.swipeLeft=

function(){

    PPE.Toolbar.Action.next();

};

PPE.Toolbar.Gesture.swipeRight=

function(){

    PPE.Toolbar.Action.previous();

};

PPE.Toolbar.Gesture.doubleTap=

function(){

    PPE.Toolbar.Action.play();

};

PPE.Toolbar.Gesture.longPress=

function(){

    PPE.Toolbar.ContextMenu

    .show();

};

/* ==========================================================
   PLUGIN API
========================================================== */

PPE.Toolbar.Plugin={

    list:[]

};

PPE.Toolbar.Plugin.register=function(

    plugin

){

    PPE.Toolbar.Plugin.list.push(

        plugin

    );

};

PPE.Toolbar.Plugin.execute=function(

    method,

    data

){

    PPE.Toolbar.Plugin.list.forEach(

        function(plugin){

            if(

                typeof plugin[method]

                ===

                "function"

            ){

                plugin[method](

                    data

                );

            }

        }

    );

};

PPE.Toolbar.Plugin.clear=function(){

    PPE.Toolbar.Plugin.list=[];

};

/* ==========================================================
   RESPONSIVE ENGINE
========================================================== */

PPE.Toolbar.Responsive={

    mobile:768,

    tablet:1024,

    mode:"desktop"

};

PPE.Toolbar.Responsive.update=function(){

    const width=

    window.innerWidth;

    if(width<=PPE.Toolbar.Responsive.mobile){

        PPE.Toolbar.Responsive.mode=

        "mobile";

    }

    else if(

        width<=PPE.Toolbar.Responsive.tablet

    ){

        PPE.Toolbar.Responsive.mode=

        "tablet";

    }

    else{

        PPE.Toolbar.Responsive.mode=

        "desktop";

    }

};

PPE.Toolbar.Responsive.current=function(){

    return PPE.Toolbar.Responsive.mode;

};

window.addEventListener(

    "resize",

    PPE.Toolbar.Responsive.update

);

/* ==========================================================
   FLOATING ACTION BUTTON
========================================================== */

PPE.Toolbar.FAB={

    visible:false,

    element:null

};

PPE.Toolbar.FAB.show=function(){

    PPE.Toolbar.FAB.visible=true;

    if(

        PPE.Toolbar.FAB.element

    ){

        PPE.Toolbar.FAB.element

        .style.display="flex";

    }

};

PPE.Toolbar.FAB.hide=function(){

    PPE.Toolbar.FAB.visible=false;

    if(

        PPE.Toolbar.FAB.element

    ){

        PPE.Toolbar.FAB.element

        .style.display="none";

    }

};

PPE.Toolbar.FAB.toggle=function(){

    if(

        PPE.Toolbar.FAB.visible

    ){

        PPE.Toolbar.FAB.hide();

    }

    else{

        PPE.Toolbar.FAB.show();

    }

};

/* ==========================================================
   STATE RECOVERY
========================================================== */

PPE.Toolbar.Recovery={

    snapshot:null

};

PPE.Toolbar.Recovery.save=function(){

    PPE.Toolbar.Recovery.snapshot={

        visible:

        PPE.Toolbar.state.visible,

        enabled:

        PPE.Toolbar.state.enabled,

        mode:

        PPE.Toolbar.Mode.get(),

        layout:

        PPE.Toolbar.Layout.current()

    };

};

PPE.Toolbar.Recovery.restore=function(){

    const data=

    PPE.Toolbar.Recovery.snapshot;

    if(!data){

        return;

    }

    if(data.visible){

        PPE.Toolbar.show();

    }

    else{

        PPE.Toolbar.hide();

    }

    PPE.Toolbar.Mode.set(

        data.mode

    );

    PPE.Toolbar.Layout.apply(

        data.layout

    );

};

/* ==========================================================
   PERFORMANCE ENGINE
========================================================== */

PPE.Toolbar.Performance={

    enabled:true,

    renderTime:0,

    clickCount:0,

    lastAction:null

};

PPE.Toolbar.Performance.begin=function(){

    PPE.Toolbar.Performance.renderTime=

    performance.now();

};

PPE.Toolbar.Performance.end=function(){

    PPE.Toolbar.Performance.renderTime=

    performance.now()

    -

    PPE.Toolbar.Performance.renderTime;

};

PPE.Toolbar.Performance.action=function(name){

    PPE.Toolbar.Performance.clickCount++;

    PPE.Toolbar.Performance.lastAction=name;

};

PPE.Toolbar.Performance.info=function(){

    return{

        renderTime:

        PPE.Toolbar.Performance.renderTime,

        clickCount:

        PPE.Toolbar.Performance.clickCount,

        lastAction:

        PPE.Toolbar.Performance.lastAction

    };

};

/* ==========================================================
   ACCESSIBILITY ENGINE
========================================================== */

PPE.Toolbar.Accessibility={

    enabled:true,

    largeButton:false,

    highContrast:false

};

PPE.Toolbar.Accessibility.enable=function(){

    PPE.Toolbar.Accessibility.enabled=true;

};

PPE.Toolbar.Accessibility.disable=function(){

    PPE.Toolbar.Accessibility.enabled=false;

};

PPE.Toolbar.Accessibility.setLargeButton=

function(value){

    PPE.Toolbar.Accessibility.largeButton=

    value;

};

PPE.Toolbar.Accessibility.setHighContrast=

function(value){

    PPE.Toolbar.Accessibility.highContrast=

    value;

};

/* ==========================================================
   SELF TEST
========================================================== */

PPE.Toolbar.selfTest=function(){

    return{

    initialized:
    PPE.Toolbar.state.initialized,

    ready:
    PPE.Toolbar.state.ready,

    visible:
    PPE.Toolbar.state.visible,

    enabled:
    PPE.Toolbar.state.enabled,

    mode:
    PPE.Toolbar.Mode.get(),

    layout:
    PPE.Toolbar.Layout.current(),

    responsive:
    PPE.Toolbar.Responsive.current(),

    performance:
    PPE.Toolbar.Performance.info()

};

};
/* ==========================================================
   DIAGNOSTIC
========================================================== */

PPE.Toolbar.diagnostic=function(){

    console.group(

        "PPE Toolbar"

    );

    console.table(

        PPE.Toolbar.selfTest()

    );

    console.table({

        accessibility:

        PPE.Toolbar.Accessibility.enabled,

        responsive:

        PPE.Toolbar.Responsive.current(),

        fabVisible:

        PPE.Toolbar.FAB.visible,

        notification:

        PPE.Toolbar.Notification.enabled

    });

    console.groupEnd();

};

/* ==========================================================
   HEALTH CHECK
========================================================== */

PPE.Toolbar.health=function(){

    return{

        renderer:
        typeof PPE.Renderer!=="undefined",

        teleprompter:
        typeof PPE.Teleprompter!=="undefined",

        progress:
        typeof PPE.Progress!=="undefined",

        bridge:
        typeof PPE.Bridge!=="undefined",

        initialized:
        PPE.Toolbar.state.initialized,

        ready:
        PPE.Toolbar.state.ready

    };

};

/* ==========================================================
   RUNTIME INFORMATION
========================================================== */

PPE.Toolbar.runtime=function(){

    return{

        package:"PPE-006",

        file:"toolbar.js",

        version:PPE.version || "1.0.0",

        initialized:
        PPE.Toolbar.state.initialized,

        ready:
        PPE.Toolbar.state.ready,

        visible:
        PPE.Toolbar.state.visible,

        enabled:
        PPE.Toolbar.state.enabled,

        fullscreen:
        PPE.Toolbar.state.fullscreen,

        locked:
        PPE.Toolbar.state.locked

    };

};

/* ==========================================================
   COMPATIBILITY
========================================================== */

PPE.Toolbar.compatibility=function(){

    return{

        customEvent:

        typeof CustomEvent!=="undefined",

        fullscreen:

        !!document.fullscreenEnabled,

        touch:

        "ontouchstart" in window,

        resizeObserver:

        typeof ResizeObserver!=="undefined"

    };

};

/* ==========================================================
   REGISTER ENGINE
========================================================== */

PPE.Engine.Toolbar=

PPE.Toolbar;

/* ==========================================================
   AUTO BOOT
========================================================== */

PPE.Toolbar.boot=function(){

    if(!PPE.Initialize){
        PPE.Initialize={};
    }

    if(!PPE.Toolbar.state.initialized){

        PPE.Toolbar.initialize("toolbar");

    }

    PPE.Initialize.toolbar=true;

    PPE.Toolbar.state.ready=true;

    PPE.Toolbar.Event.emit(

        "PPE_TOOLBAR_READY",

        PPE.Toolbar.runtime()

    );

    return true;

};

/* ==========================================================
   CERTIFICATION MARKER

   Package : PPE-006

   File : toolbar.js

   Status :

   IMPLEMENTATION COMPLETE

========================================================== */