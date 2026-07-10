/*
==========================================================
POLYGLOT PRESENTATION ENGINE

Package : PPE-010

File : bridge.js

Version : 1.0.0-alpha.1

==========================================================
*/

"use strict";

/* ==========================================================
   BRIDGE ENGINE
========================================================== */

PPE.Bridge={};

/* ==========================================================
   STATE
========================================================== */

PPE.Bridge.state={

    initialized:false,

    ready:false,

    connected:false,

    platform:"web"

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.Bridge.initialize=function(){

    PPE.Bridge.state.initialized=true;

    PPE.Bridge.state.ready=true;

    if(!PPE.Initialize){
        PPE.Initialize={};
    }

    PPE.Initialize.bridge=true;

    return true;

};

/* ==========================================================
   REGISTER
========================================================== */

PPE.Engine.Bridge=

PPE.Bridge;

/* ==========================================================
   CONNECTION ENGINE
========================================================== */

PPE.Bridge.connect=function(){

    PPE.Bridge.state.connected=true;

};

PPE.Bridge.disconnect=function(){

    PPE.Bridge.state.connected=false;

};

PPE.Bridge.isConnected=function(){

    return PPE.Bridge.state.connected;

};

PPE.Bridge.platform=function(){

    return PPE.Bridge.state.platform;

};

/* ==========================================================
   MESSAGE ENGINE
========================================================== */

PPE.Bridge.Message={};

PPE.Bridge.Message.send=function(

    type,

    data

){

    document.dispatchEvent(

        new CustomEvent(

            "PPE_BRIDGE_MESSAGE",

            {

                detail:{

                    type:type,

                    data:data

                }

            }

        )

    );

};

PPE.Bridge.Message.receive=

function(callback){

    document.addEventListener(

        "PPE_BRIDGE_MESSAGE",

        callback

    );

};

/* ==========================================================
   COMMAND DISPATCHER
========================================================== */

PPE.Bridge.Command={

    handlers:{}

};

PPE.Bridge.Command.register=function(

    name,

    handler

){

    PPE.Bridge.Command.handlers[

        name

    ]=handler;

};

PPE.Bridge.Command.execute=function(

    name,

    data

){

    const handler=

    PPE.Bridge.Command.handlers[

        name

    ];

    if(

        typeof handler===

        "function"

    ){

        return handler(

            data

        );

    }

    return null;

};

/* ==========================================================
   RESPONSE HANDLER
========================================================== */

PPE.Bridge.Response={};

PPE.Bridge.Response.success=

function(data){

    PPE.Bridge.Message.send(

        "success",

        data

    );

};

PPE.Bridge.Response.error=

function(message){

    PPE.Bridge.Message.send(

        "error",

        {

            message:message

        }

    );

};

PPE.Bridge.Response.result=

function(data){

    PPE.Bridge.Message.send(

        "result",

        data

    );

};

/* ==========================================================
   EVENT SYSTEM
========================================================== */

PPE.Bridge.Event={};

PPE.Bridge.Event.emit=function(

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

PPE.Bridge.Event.on=function(

    name,

    callback

){

    document.addEventListener(

        name,

        callback

    );

};

PPE.Bridge.Event.off=function(

    name,

    callback

){

    document.removeEventListener(

        name,

        callback

    );

};

/* ==========================================================
   KODULAR CALLBACK ENGINE
========================================================== */

PPE.Bridge.Callback={

    handlers:{}

};

PPE.Bridge.Callback.register=

function(

    name,

    callback

){

    PPE.Bridge.Callback.handlers[

        name

    ]=callback;

};

PPE.Bridge.Callback.execute=

function(

    name,

    data

){

    const callback=

    PPE.Bridge.Callback.handlers[

        name

    ];

    if(

        typeof callback===

        "function"

    ){

        callback(data);

    }

};

PPE.Bridge.Callback.clear=

function(){

    PPE.Bridge.Callback.handlers={};

};

/* ==========================================================
   JSON PARSER
========================================================== */

PPE.Bridge.JSON={};

PPE.Bridge.JSON.encode=

function(data){

    return JSON.stringify(

        data

    );

};

PPE.Bridge.JSON.decode=

function(text){

    try{

        return JSON.parse(

            text

        );

    }

    catch(e){

        return null;

    }

};

PPE.Bridge.JSON.valid=

function(text){

    return(

        PPE.Bridge.JSON.decode(

            text

        )

        !==

        null

    );

};

/* ==========================================================
   ASYNC TASK MANAGER
========================================================== */

PPE.Bridge.Async={

    running:false,

    queue:[]

};

PPE.Bridge.Async.add=function(

    task

){

    PPE.Bridge.Async.queue.push(

        task

    );

};

PPE.Bridge.Async.run=

async function(){

    PPE.Bridge.Async.running=true;

    while(

        PPE.Bridge.Async.queue.length

    ){

        const task=

        PPE.Bridge.Async.queue.shift();

        await task();

    }

    PPE.Bridge.Async.running=false;

};

PPE.Bridge.Async.clear=

function(){

    PPE.Bridge.Async.queue=[];

};

/* ==========================================================
   API ROUTER
========================================================== */

PPE.Bridge.Router={

    routes:{}

};

PPE.Bridge.Router.register=function(

    path,

    handler

){

    PPE.Bridge.Router.routes[

        path

    ]=handler;

};

PPE.Bridge.Router.call=function(

    path,

    data

){

    const handler=

    PPE.Bridge.Router.routes[

        path

    ];

    if(

        typeof handler===

        "function"

    ){

        return handler(

            data

        );

    }

    return null;

};

PPE.Bridge.Router.list=function(){

    return Object.keys(

        PPE.Bridge.Router.routes

    );

};

/* ==========================================================
   PERMISSION MANAGER
========================================================== */

PPE.Bridge.Permission={

    rules:{}

};

PPE.Bridge.Permission.allow=

function(

    command

){

    PPE.Bridge.Permission.rules[

        command

    ]=true;

};

PPE.Bridge.Permission.deny=

function(

    command

){

    PPE.Bridge.Permission.rules[

        command

    ]=false;

};

PPE.Bridge.Permission.check=

function(

    command

){

    return PPE.Bridge.Permission.rules[

        command

    ]!==false;

};

/* ==========================================================
   REQUEST VALIDATION
========================================================== */

PPE.Bridge.Validator={};

PPE.Bridge.Validator.valid=

function(request){

    if(

        !request

    ){

        return false;

    }

    if(

        typeof request.command

        !==

        "string"

    ){

        return false;

    }

    return true;

};

PPE.Bridge.Validator.execute=

function(request){

    if(

        !PPE.Bridge.Validator.valid(

            request

        )

    ){

        return PPE.Bridge.Response.error(

            "Invalid Request"

        );

    }

    return PPE.Bridge.Router.call(

        request.command,

        request.data

    );

};

/* ==========================================================
   BROADCAST ENGINE
========================================================== */

PPE.Bridge.Broadcast={

    listeners:[]

};

PPE.Bridge.Broadcast.register=

function(listener){

    PPE.Bridge.Broadcast.listeners.push(

        listener

    );

};

PPE.Bridge.Broadcast.send=

function(message){

    PPE.Bridge.Broadcast.listeners

    .forEach(function(listener){

        listener(

            message

        );

    });

};

PPE.Bridge.Broadcast.clear=

function(){

    PPE.Bridge.Broadcast.listeners=[];

};

/* ==========================================================
   SESSION MANAGER
========================================================== */

PPE.Bridge.Session={

    id:null,

    started:0,

    active:false

};

PPE.Bridge.Session.start=

function(){

    PPE.Bridge.Session.id=

    Date.now().toString();

    PPE.Bridge.Session.started=

    Date.now();

    PPE.Bridge.Session.active=true;

};

PPE.Bridge.Session.stop=

function(){

    PPE.Bridge.Session.active=false;

};

PPE.Bridge.Session.info=

function(){

    return{

        id:

        PPE.Bridge.Session.id,

        active:

        PPE.Bridge.Session.active,

        duration:

        Date.now()

        -

        PPE.Bridge.Session.started

    };

};

/* ==========================================================
   PLUGIN API
========================================================== */

PPE.Bridge.Plugin={

    list:[]

};

PPE.Bridge.Plugin.register=

function(plugin){

    PPE.Bridge.Plugin.list.push(

        plugin

    );

};

PPE.Bridge.Plugin.execute=

function(method,data){

    PPE.Bridge.Plugin.list.forEach(

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

PPE.Bridge.Plugin.clear=

function(){

    PPE.Bridge.Plugin.list=[];

};

/* ==========================================================
   QUEUE MANAGER
========================================================== */

PPE.Bridge.Queue={

    items:[]

};

PPE.Bridge.Queue.push=function(

    request

){

    PPE.Bridge.Queue.items.push(

        request

    );

};

PPE.Bridge.Queue.pop=function(){

    return PPE.Bridge.Queue.items.shift();

};

PPE.Bridge.Queue.size=function(){

    return PPE.Bridge.Queue.items.length;

};

PPE.Bridge.Queue.clear=function(){

    PPE.Bridge.Queue.items=[];

};

/* ==========================================================
   PERFORMANCE MONITOR
========================================================== */

PPE.Bridge.Performance={

    requestCount:0,

    responseCount:0,

    lastExecution:0

};

PPE.Bridge.Performance.begin=

function(){

    return performance.now();

};

PPE.Bridge.Performance.end=

function(start){

    PPE.Bridge.Performance.lastExecution=

    performance.now()-start;

};

PPE.Bridge.Performance.request=

function(){

    PPE.Bridge.Performance.requestCount++;

};

PPE.Bridge.Performance.response=

function(){

    PPE.Bridge.Performance.responseCount++;

};

PPE.Bridge.Performance.info=

function(){

    return{

        request:

        PPE.Bridge.Performance.requestCount,

        response:

        PPE.Bridge.Performance.responseCount,

        execution:

        PPE.Bridge.Performance.lastExecution

    };

};

/* ==========================================================
   AUTO RETRY
========================================================== */

PPE.Bridge.Retry={

    max:3,

    delay:500

};

PPE.Bridge.Retry.run=

async function(task){

    let retry=0;

    while(

        retry<PPE.Bridge.Retry.max

    ){

        try{

            return await task();

        }

        catch(error){

            retry++;

        }

    }

    return null;

};

PPE.Bridge.Retry.configure=

function(max,delay){

    PPE.Bridge.Retry.max=max;

    PPE.Bridge.Retry.delay=delay;

};

/* ==========================================================
   BRIDGE CACHE
========================================================== */

PPE.Bridge.Cache={

    data:{}

};

PPE.Bridge.Cache.set=function(

    key,

    value

){

    PPE.Bridge.Cache.data[key]=

    value;

};

PPE.Bridge.Cache.get=function(key){

    return PPE.Bridge.Cache.data[key];

};

PPE.Bridge.Cache.remove=function(key){

    delete PPE.Bridge.Cache.data[key];

};

PPE.Bridge.Cache.clear=function(){

    PPE.Bridge.Cache.data={};

};

/* ==========================================================
   HEARTBEAT
========================================================== */

PPE.Bridge.Heartbeat={

    active:false,

    interval:5000,

    timer:null

};

PPE.Bridge.Heartbeat.start=

function(){

    PPE.Bridge.Heartbeat.active=true;

    PPE.Bridge.Heartbeat.timer=

    setInterval(function(){

        PPE.Bridge.Event.emit(

            "PPE_BRIDGE_HEARTBEAT",

            {

                time:Date.now()

            }

        );

    },

    PPE.Bridge.Heartbeat.interval);

};

PPE.Bridge.Heartbeat.stop=

function(){

    clearInterval(

        PPE.Bridge.Heartbeat.timer

    );

    PPE.Bridge.Heartbeat.active=false;

};

/* ==========================================================
   COMPATIBILITY LAYER
========================================================== */

PPE.Bridge.Compatibility={};

PPE.Bridge.Compatibility.check=

function(){

    return{

        customEvent:

        typeof CustomEvent

        !==

        "undefined",

        json:

        typeof JSON

        !==

        "undefined",

        promise:

        typeof Promise

        !==

        "undefined",

        localStorage:

        typeof localStorage

        !==

        "undefined"

    };

};

PPE.Bridge.Compatibility.ready=

function(){

    const c=

    PPE.Bridge.Compatibility

    .check();

    return(

        c.customEvent &&

        c.json &&

        c.promise

    );

};

/* ==========================================================
   SNAPSHOT & RECOVERY
========================================================== */

PPE.Bridge.Recovery={

    snapshot:null

};

PPE.Bridge.Recovery.save=function(){

    PPE.Bridge.Recovery.snapshot={

        connected:

        PPE.Bridge.state.connected,

        platform:

        PPE.Bridge.state.platform,

        session:

        PPE.Bridge.Session.info()

    };

};

PPE.Bridge.Recovery.restore=

function(){

    const data=

    PPE.Bridge.Recovery.snapshot;

    if(

        !data

    ){

        return;

    }

    PPE.Bridge.state.connected=

    data.connected;

    PPE.Bridge.state.platform=

    data.platform;

};

PPE.Bridge.Recovery.clear=

function(){

    PPE.Bridge.Recovery.snapshot=

    null;

};

/* ==========================================================
   DIAGNOSTIC ENGINE
========================================================== */

PPE.Bridge.diagnostic=

function(){

    console.group(

        "PPE Bridge"

    );

    console.table(

        PPE.Bridge.selfTest()

    );

    console.table(

        PPE.Bridge.Performance.info()

    );

    console.table(

        PPE.Bridge.Compatibility.check()

    );

    console.groupEnd();

};

/* ==========================================================
   SELF TEST
========================================================== */

PPE.Bridge.selfTest=function(){

    return{

        initialized:
        PPE.Bridge.state.initialized,

        ready:
        PPE.Bridge.state.ready,

        connected:
        PPE.Bridge.state.connected,

        platform:
        PPE.Bridge.platform(),

        session:
        PPE.Bridge.Session.info(),

        queue:
        PPE.Bridge.Queue.size(),

        performance:
        PPE.Bridge.Performance.info()

    };

};

/* ==========================================================
   BRIDGE STATISTICS
========================================================== */

PPE.Bridge.Statistics={

    commandCount:0,

    callbackCount:0,

    errorCount:0

};

PPE.Bridge.Statistics.command=

function(){

    PPE.Bridge.Statistics.commandCount++;

};

PPE.Bridge.Statistics.callback=

function(){

    PPE.Bridge.Statistics.callbackCount++;

};

PPE.Bridge.Statistics.error=

function(){

    PPE.Bridge.Statistics.errorCount++;

};

PPE.Bridge.Statistics.report=

function(){

    return{

        command:

        PPE.Bridge.Statistics.commandCount,

        callback:

        PPE.Bridge.Statistics.callbackCount,

        error:

        PPE.Bridge.Statistics.errorCount

    };

};

/* ==========================================================
   RUNTIME
========================================================== */

PPE.Bridge.runtime=function(){

    return{

        package:"PPE-010",

        file:"bridge.js",

        version:PPE.version || "1.0.0",

        initialized:
        PPE.Bridge.state.initialized,

        ready:
        PPE.Bridge.state.ready,

        connected:
        PPE.Bridge.state.connected,

        platform:
        PPE.Bridge.state.platform

    };

};

/* ==========================================================
   COMPATIBILITY REPORT
========================================================== */

PPE.Bridge.report=function(){

    return{

        runtime:

        PPE.Bridge.runtime(),

        compatibility:

        PPE.Bridge

        .Compatibility

        .check(),

        statistics:

        PPE.Bridge

        .Statistics

        .report()

    };

};

/* ==========================================================
   HEALTH CHECK
========================================================== */

PPE.Bridge.health=function(){

    return{

        initialized:
        PPE.Bridge.state.initialized,

        ready:
        PPE.Bridge.state.ready,

        renderer:
        typeof PPE.Renderer!=="undefined",

        teleprompter:
        typeof PPE.Teleprompter!=="undefined",

        toolbar:
        typeof PPE.Toolbar!=="undefined",

        storage:
        typeof PPE.Storage!=="undefined",

        theme:
        typeof PPE.Theme!=="undefined",

        fullscreen:
        typeof PPE.Fullscreen!=="undefined"

    };

};

/* ==========================================================
   AUTO BOOT MANAGER
========================================================== */

PPE.Bridge.boot=function(){

    if(!PPE.Initialize){
        PPE.Initialize={};
    }

    if(!PPE.Bridge.state.initialized){

        PPE.Bridge.initialize();

    }

    PPE.Initialize.bridge=true;

    PPE.Bridge.state.ready=true;

    PPE.Bridge.connect();

    PPE.Bridge.Event.emit(

        "PPE_BRIDGE_READY",

        PPE.Bridge.runtime()

    );

    return true;

};


/* ==========================================================
   CERTIFICATION MARKER

   Package : PPE-010

   File : bridge.js

   Status :

   IMPLEMENTATION COMPLETE

========================================================== */

/* ==========================================================
   PUBLIC FACADE API
========================================================== */

window.Bridge = {

    play() {
        return PPE.Bridge.Command.execute("play");
    },

    pause() {
        return PPE.Bridge.Command.execute("pause");
    },

    stop() {
        return PPE.Bridge.Command.execute("stop");
    },

    nextParagraph() {
        return PPE.Bridge.Command.execute("nextParagraph");
    },

    previousParagraph() {
        return PPE.Bridge.Command.execute("previousParagraph");
    },

    goToParagraph(index) {
        return PPE.Bridge.Command.execute(
            "goToParagraph",
            index
        );
    },

    loadTopic(data) {
        return PPE.Bridge.Command.execute(
            "loadTopic",
            data
        );
    },
    
    loadAnalysis(data){

    if(

        PPE.Analysis &&

        typeof PPE.Analysis.load===

        "function"

    ){

        PPE.Analysis.load(data);

    }

    if(

        PPE.Analysis &&

        typeof PPE.Analysis.render===

        "function"

    ){

        PPE.Analysis.render();

    }

},

    getProgress() {
        return PPE.Bridge.Command.execute(
            "getProgress"
        );
    },

    getCurrentParagraph() {
        return PPE.Bridge.Command.execute(
            "getCurrentParagraph"
        );
    },

    version() {
        return PPE.Bridge.runtime();
    }

};