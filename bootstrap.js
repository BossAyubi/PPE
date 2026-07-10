/*
==========================================================
POLYGLOT PRESENTATION ENGINE

Package : PPE-012

File : bootstrap.js

Version : 1.0.0-alpha.1

==========================================================
*/

"use strict";

/* ==========================================================
   BOOTSTRAP ENGINE
========================================================== */

PPE.Bootstrap={};

/* ==========================================================
   STATE
========================================================== */

PPE.Bootstrap.state={

    initialized:false,

    loading:false,

    completed:false

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.Bootstrap.initialize=function(){

    PPE.Bootstrap.state.loading=true;

    PPE.Bootstrap.state.initialized=false;

    PPE.Bootstrap.state.completed=false;

    PPE.Bootstrap.load();

    return true;

};

/* ==========================================================
   LOAD ENGINES
========================================================== */

PPE.Bootstrap.load=

function(){

    if(
    PPE.Config &&
    typeof PPE.Config.initialize==="function"
){
    PPE.Config.initialize();
}

if(
    PPE.Util &&
    typeof PPE.Util.initialize==="function"
){
    PPE.Util.initialize();
}

if(
    PPE.Renderer &&
    typeof PPE.Renderer.initialize==="function"
){
    PPE.Renderer.initialize();
}

if(
    PPE.Teleprompter &&
    typeof PPE.Teleprompter.initialize==="function"
){
    PPE.Teleprompter.initialize();
}

if(
    PPE.Progress &&
    typeof PPE.Progress.initialize==="function"
){
    PPE.Progress.initialize();
}

if(
    PPE.Toolbar &&
    typeof PPE.Toolbar.initialize==="function"
){
    PPE.Toolbar.initialize();
}

if(
    PPE.Fullscreen &&
    typeof PPE.Fullscreen.initialize==="function"
){
    PPE.Fullscreen.initialize();
}

if(
    PPE.Theme &&
    typeof PPE.Theme.initialize==="function"
){
    PPE.Theme.initialize();
}

if(
    PPE.Storage &&
    typeof PPE.Storage.initialize==="function"
){
    PPE.Storage.initialize();
}

if(
    PPE.Bridge &&
    typeof PPE.Bridge.initialize==="function"
){
    PPE.Bridge.initialize();
}

if(
    PPE.AI &&
    typeof PPE.AI.initialize==="function"
){
    PPE.AI.initialize();
}
if(
    PPE.Analysis &&
    typeof PPE.Analysis.initialize==="function"
){
    PPE.Analysis.initialize();
}

PPE.Bootstrap.finish();

};

/* ==========================================================
   ENGINE REGISTRY
========================================================== */

PPE.Bootstrap.Registry={

    engines:[]

};

PPE.Bootstrap.Registry.register=

function(

    engine

){

    PPE.Bootstrap.Registry.engines.push(

        engine

    );

};

PPE.Bootstrap.Registry.list=

function(){

    return PPE.Bootstrap.Registry.engines;

};

PPE.Bootstrap.Registry.clear=

function(){

    PPE.Bootstrap.Registry.engines=[];

};

/* ==========================================================
   STARTUP PIPELINE
========================================================== */

PPE.Bootstrap.Pipeline={};

PPE.Bootstrap.Pipeline.run=

function(){

    PPE.Bootstrap.Registry.list()

    .forEach(function(engine){

        if(

            typeof engine.initialize

            ===

            "function"

        ){

            engine.initialize();

        }

    });

    PPE.Bootstrap.finish();

};

/* ==========================================================
   BOOT PROGRESS
========================================================== */

PPE.Bootstrap.Progress={

    total:0,

    current:0

};

PPE.Bootstrap.Progress.begin=

function(total){

    PPE.Bootstrap.Progress.total=

    total;

    PPE.Bootstrap.Progress.current=0;

};

PPE.Bootstrap.Progress.step=

function(){

    PPE.Bootstrap.Progress.current++;

};

PPE.Bootstrap.Progress.report=

function(){

    return{

        current:

        PPE.Bootstrap.Progress.current,

        total:

        PPE.Bootstrap.Progress.total

    };

};

/* ==========================================================
   DEPENDENCY CHECKER
========================================================== */

PPE.Bootstrap.Dependency={

    required:[

        "Config",

        "Util",

        "Renderer",

        "Teleprompter",

        "Progress",

        "Toolbar",

        "Fullscreen",

        "Theme",

        "Storage",

        "Bridge",

        "AI",
        
        "Analysis"

    ]

};

PPE.Bootstrap.Dependency.check=

function(){

    return PPE.Bootstrap

    .Dependency

    .required

    .every(function(name){

        return typeof PPE[name]

        !==

        "undefined";

    });

};

PPE.Bootstrap.Dependency.report=

function(){

    return PPE.Bootstrap

    .Dependency

    .required

    .map(function(name){

        return{

            engine:name,

            ready:

            typeof PPE[name]

            !==

            "undefined"

        };

    });

};

/* ==========================================================
   HEALTH MONITOR
========================================================== */

PPE.Bootstrap.Health={

    status:"unknown"

};

PPE.Bootstrap.Health.check=

function(){

    PPE.Bootstrap.Health.status=

    PPE.Bootstrap

    .Dependency

    .check()

    ?

    "healthy"

    :

    "failed";

};

PPE.Bootstrap.Health.info=

function(){

    return{

        status:

        PPE.Bootstrap.Health.status,

        loading:

        PPE.Bootstrap.state.loading,

        initialized:

        PPE.Bootstrap.state.initialized

    };

};

/* ==========================================================
   EVENT BUS
========================================================== */

PPE.Bootstrap.Event={};

PPE.Bootstrap.Event.emit=

function(

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

PPE.Bootstrap.Event.on=

function(

    name,

    callback

){

    document.addEventListener(

        name,

        callback

    );

};

PPE.Bootstrap.Event.off=

function(

    name,

    callback

){

    document.removeEventListener(

        name,

        callback

    );

};

/* ==========================================================
   ENGINE LIFECYCLE
========================================================== */

PPE.Bootstrap.Lifecycle={};

PPE.Bootstrap.Lifecycle.start=

function(engine){

    if(

        engine &&

        typeof engine.start===

        "function"

    ){

        engine.start();

    }

};

PPE.Bootstrap.Lifecycle.stop=

function(engine){

    if(

        engine &&

        typeof engine.stop===

        "function"

    ){

        engine.stop();

    }

};

PPE.Bootstrap.Lifecycle.destroy=

function(engine){

    if(

        engine &&

        typeof engine.destroy===

        "function"

    ){

        engine.destroy();

    }

};

/* ==========================================================
   LOGGER
========================================================== */

PPE.Bootstrap.Logger={

    logs:[]

};

PPE.Bootstrap.Logger.write=

function(

    level,

    message

){

    PPE.Bootstrap.Logger.logs.push({

        time:

        Date.now(),

        level:level,

        message:message

    });

};

PPE.Bootstrap.Logger.list=

function(){

    return PPE.Bootstrap.Logger.logs;

};

PPE.Bootstrap.Logger.clear=

function(){

    PPE.Bootstrap.Logger.logs=[];

};

/* ==========================================================
   AUTO RECOVERY
========================================================== */

PPE.Bootstrap.Recovery={

    retry:3

};

PPE.Bootstrap.Recovery.run=

function(

    engine

){

    let count=0;

    while(

        count<

        PPE.Bootstrap.Recovery.retry

    ){

        try{

            engine.initialize();

            return true;

        }

        catch(error){

            count++;

        }

    }

    return false;

};

PPE.Bootstrap.Recovery.configure=

function(retry){

    PPE.Bootstrap.Recovery.retry=

    retry;

};

/* ==========================================================
   SELF TEST
========================================================== */

PPE.Bootstrap.selfTest=

function(){

    return{

        dependency:

        PPE.Bootstrap

        .Dependency

        .check(),

        health:

        PPE.Bootstrap

        .Health

        .info(),

        registry:

        PPE.Bootstrap

        .Registry

        .list()

        .length,

        progress:

        PPE.Bootstrap

        .Progress

        .report()

    };

};

/* ==========================================================
   BOOTSTRAP STATISTICS
========================================================== */

PPE.Bootstrap.Statistics={

    bootCount:0,

    successCount:0,

    failedCount:0

};

PPE.Bootstrap.Statistics.boot=

function(){

    PPE.Bootstrap

    .Statistics

    .bootCount++;

};

PPE.Bootstrap.Statistics.success=

function(){

    PPE.Bootstrap

    .Statistics

    .successCount++;

};

PPE.Bootstrap.Statistics.failed=

function(){

    PPE.Bootstrap

    .Statistics

    .failedCount++;

};

PPE.Bootstrap.Statistics.report=

function(){

    return{

        boot:

        PPE.Bootstrap

        .Statistics

        .bootCount,

        success:

        PPE.Bootstrap

        .Statistics

        .successCount,

        failed:

        PPE.Bootstrap

        .Statistics

        .failedCount

    };

};

/* ==========================================================
   RUNTIME REPORT
========================================================== */

PPE.Bootstrap.runtime=function(){

    return{

        package:"PPE-012",

        file:"bootstrap.js",

        version:PPE.version || "1.0.0",

        initialized:
        PPE.Bootstrap.state.initialized,

        loading:
        PPE.Bootstrap.state.loading,

        completed:
        PPE.Bootstrap.state.completed

    };

};

PPE.Bootstrap.report=

function(){

    return{

        runtime:

        PPE.Bootstrap.runtime(),

        statistics:

        PPE.Bootstrap

        .Statistics

        .report(),

        health:

        PPE.Bootstrap

        .Health

        .info()

    };

};

/* ==========================================================
   GLOBAL ENGINE REGISTRY
========================================================== */

PPE.Bootstrap.Engine={

    registry:new Map()

};

PPE.Bootstrap.Engine.register=

function(

    name,

    engine

){

    PPE.Bootstrap.Engine.registry.set(

        name,

        engine

    );

};

PPE.Bootstrap.Engine.get=

function(name){

    return PPE.Bootstrap.Engine.registry.get(

        name

    );

};

PPE.Bootstrap.Engine.list=

function(){

    return Array.from(

        PPE.Bootstrap.Engine.registry.keys()

    );

};

/* ==========================================================
   DEPENDENCY GRAPH
========================================================== */

PPE.Bootstrap.Graph={

    nodes:{}

};

PPE.Bootstrap.Graph.add=

function(

    engine,

    dependency

){

    if(

        !PPE.Bootstrap.Graph.nodes[

            engine

        ]

    ){

        PPE.Bootstrap.Graph.nodes[

            engine

        ]=[];

    }

    PPE.Bootstrap.Graph.nodes[

        engine

    ].push(

        dependency

    );

};

PPE.Bootstrap.Graph.get=

function(engine){

    return PPE.Bootstrap.Graph.nodes[

        engine

    ] || [];

};

PPE.Bootstrap.Graph.report=

function(){

    return PPE.Bootstrap.Graph.nodes;

};

/* ==========================================================
   SYSTEM EVENT INTEGRATION
========================================================== */

PPE.Bootstrap.System={};

PPE.Bootstrap.System.ready=

function(){

    PPE.Bootstrap.Event.emit(

        "PPE_SYSTEM_READY",

        PPE.Bootstrap.runtime()

    );

};

PPE.Bootstrap.System.failed=

function(error){

    PPE.Bootstrap.Event.emit(

        "PPE_SYSTEM_FAILED",

        {

            error:error

        }

    );

};

PPE.Bootstrap.System.loading=

function(progress){

    PPE.Bootstrap.Event.emit(

        "PPE_SYSTEM_LOADING",

        progress

    );

};

/* ==========================================================
   DIAGNOSTIC COLLECTOR
========================================================== */

PPE.Bootstrap.Diagnostic={

    reports:[]

};

PPE.Bootstrap.Diagnostic.add=

function(

    name,

    report

){

    PPE.Bootstrap.Diagnostic.reports.push({

        engine:name,

        report:report

    });

};

PPE.Bootstrap.Diagnostic.clear=

function(){

    PPE.Bootstrap.Diagnostic.reports=[];

};

PPE.Bootstrap.Diagnostic.list=

function(){

    return PPE.Bootstrap.Diagnostic.reports;

};

/* ==========================================================
   GLOBAL SELF TEST
========================================================== */

PPE.Bootstrap.GlobalTest={};

PPE.Bootstrap.GlobalTest.run=

function(){

    return PPE.Bootstrap

    .Engine

    .list()

    .map(function(name){

        const engine=

        PPE.Bootstrap.Engine.get(

            name

        );

        return{

            engine:name,

            result:

            typeof engine.selfTest

            ===

            "function"

            ?

            engine.selfTest()

            :

            null

        };

    });

};

/* ==========================================================
   PERFORMANCE DASHBOARD
========================================================== */

PPE.Bootstrap.Performance={

    bootTime:0,

    engineCount:0

};

PPE.Bootstrap.Performance.begin=

function(){

    PPE.Bootstrap.Performance.bootTime=

    performance.now();

};

PPE.Bootstrap.Performance.end=

function(){

    PPE.Bootstrap.Performance.bootTime=

    performance.now()

    -

    PPE.Bootstrap.Performance.bootTime;

    PPE.Bootstrap.Performance.engineCount=

    PPE.Bootstrap.Engine.list()

    .length;

};

PPE.Bootstrap.Performance.report=

function(){

    return{

        bootTime:

        PPE.Bootstrap.Performance.bootTime,

        engineCount:

        PPE.Bootstrap.Performance.engineCount

    };

};

/* ==========================================================
   SNAPSHOT & RECOVERY
========================================================== */

PPE.Bootstrap.Recovery.snapshot = null;

PPE.Bootstrap.Recovery.save=

function(){

    PPE.Bootstrap.Recovery.snapshot={

        runtime:

        PPE.Bootstrap.runtime(),

        progress:

        PPE.Bootstrap.Progress.report(),

        statistics:

        PPE.Bootstrap.Statistics.report()

    };

};

PPE.Bootstrap.Recovery.restore=

function(){

    return PPE.Bootstrap

    .Recovery

    .snapshot;

};

PPE.Bootstrap.Recovery.clear=

function(){

    PPE.Bootstrap.Recovery.snapshot=

    null;

};

/* ==========================================================
   COMPATIBILITY REPORT
========================================================== */

PPE.Bootstrap.Compatibility={};

PPE.Bootstrap.Compatibility.check=

function(){

    return{

        promise:

        typeof Promise

        !==

        "undefined",

        customEvent:

        typeof CustomEvent

        !==

        "undefined",

        localStorage:

        typeof localStorage

        !==

        "undefined",

        performance:

        typeof performance

        !==

        "undefined"

    };

};

PPE.Bootstrap.Compatibility.report=

function(){

    return PPE.Bootstrap

    .Compatibility

    .check();

};

/* ==========================================================
   FINAL HEALTH CHECK
========================================================== */

PPE.Bootstrap.health=

function(){

    return{

        dependency:

        PPE.Bootstrap

        .Dependency

        .check(),

        compatibility:

        PPE.Bootstrap

        .Compatibility

        .check(),

        performance:

        PPE.Bootstrap

        .Performance

        .report(),

        statistics:

        PPE.Bootstrap

        .Statistics

        .report()

    };

};

/* ==========================================================
   STATISTICS SUMMARY
========================================================== */

PPE.Bootstrap.summary=

function(){

    return{

        engines:

        PPE.Bootstrap.Engine

        .list()

        .length,

        statistics:

        PPE.Bootstrap

        .Statistics

        .report(),

        performance:

        PPE.Bootstrap

        .Performance

        .report()

    };

};

/* ==========================================================
   DIAGNOSTIC REPORT
========================================================== */

PPE.Bootstrap.diagnostic=

function(){

    console.group(

        "PPE Bootstrap"

    );

    console.table(

        PPE.Bootstrap.summary()

    );

    console.table(

        PPE.Bootstrap.health()

    );

    console.table(

        PPE.Bootstrap

        .Compatibility

        .report()

    );

    console.groupEnd();

};

/* ==========================================================
   RUNTIME INFORMATION
========================================================== */

PPE.Bootstrap.info=

function(){

    return{

        runtime:

        PPE.Bootstrap.runtime(),

        report:

        PPE.Bootstrap.report(),

        diagnostic:

        PPE.Bootstrap.summary()

    };

};

/* ==========================================================
   SYSTEM READY
========================================================== */

PPE.Bootstrap.ready=

function(){

    PPE.Bootstrap

    .state

    .completed=true;

    PPE.Bootstrap.Event.emit(

        "PPE_BOOTSTRAP_READY",

        PPE.Bootstrap.runtime()

    );

};

/* ==========================================================
   AUTO BOOT
========================================================== */

PPE.Bootstrap.start=

function(){

    PPE.Bootstrap

    .Performance

    .begin();

    PPE.Bootstrap

    .initialize();

    PPE.Bootstrap

    .Performance

    .end();

    PPE.Bootstrap.ready();

};



/* ==========================================================
   FINISH
========================================================== */

PPE.Bootstrap.finish = function(){

    PPE.Bootstrap.state.loading = false;

    PPE.Bootstrap.state.initialized = true;

    PPE.Bootstrap.state.completed = true;

    return true;

};

/* ==========================================================
   REGISTER ENGINE
========================================================== */

PPE.Engine.Bootstrap=

PPE.Bootstrap;

/* ==========================================================
   START SYSTEM
========================================================== */

PPE.Bootstrap.start();

/* ==========================================================
   CERTIFICATION MARKER

   Package : PPE-012

   File : bootstrap.js

   Status :

   IMPLEMENTATION COMPLETE

========================================================== */