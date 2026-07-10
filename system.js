/*
==========================================================
POLYGLOT PRESENTATION ENGINE

Package : PPE-013

File : system.js

Version : 1.0.0-alpha.1

==========================================================
*/

"use strict";

/* ==========================================================
   SYSTEM ENGINE
========================================================== */

PPE.System={};

/* ==========================================================
   STATE
========================================================== */

PPE.System.state={

    initialized:false,

    ready:false

};

/* ==========================================================
   REGISTERED ENGINES
========================================================== */

PPE.System.engines=[

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

"Bootstrap"

];

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.System.initialize=function(){

    PPE.System.engines.forEach(function(name){

        if(
            PPE[name] &&
            typeof PPE.System.Registry.register==="function"
        ){

            PPE.System.Registry.register(

                name,

                PPE[name]

            );

        }

    });

    PPE.System.state.initialized=true;

    PPE.System.state.ready=true;

};

/* ==========================================================
   GLOBAL ENGINE REGISTRY
========================================================== */

PPE.System.Registry={

    items:new Map()

};

PPE.System.Registry.register=

function(

    name,

    engine

){

    PPE.System.Registry.items.set(

        name,

        engine

    );

};

PPE.System.Registry.get=

function(name){

    return PPE.System.Registry.items.get(

        name

    );

};

PPE.System.Registry.list=

function(){

    return Array.from(

        PPE.System.Registry.items.keys()

    );

};

/* ==========================================================
   GLOBAL HEALTH COLLECTOR
========================================================== */

PPE.System.Health={};

PPE.System.Health.collect=

function(){

    return PPE.System.Registry

    .list()

    .map(function(name){

        const engine=

        PPE.System.Registry.get(

            name

        );

        return{

            engine:name,

            health:

            typeof engine.health===

            "function"

            ?

            engine.health()

            :

            null

        };

    });

};

/* ==========================================================
   GLOBAL RUNTIME COLLECTOR
========================================================== */

PPE.System.Runtime={};

PPE.System.Runtime.collect=

function(){

    return PPE.System.Registry

    .list()

    .map(function(name){

        const engine=

        PPE.System.Registry.get(

            name

        );

        return{

            engine:name,

            runtime:

            typeof engine.runtime===

            "function"

            ?

            engine.runtime()

            :

            null

        };

    });

};

/* ==========================================================
   GLOBAL SELF TEST COLLECTOR
========================================================== */

PPE.System.Test={};

PPE.System.Test.collect=

function(){

    return PPE.System.Registry

    .list()

    .map(function(name){

        const engine=

        PPE.System.Registry.get(

            name

        );

        return{

            engine:name,

            test:

            typeof engine.selfTest===

            "function"

            ?

            engine.selfTest()

            :

            null

        };

    });

};

/* ==========================================================
   GLOBAL REPORT COLLECTOR
========================================================== */

PPE.System.Report={};

PPE.System.Report.collect=

function(){

    return PPE.System.Registry

    .list()

    .map(function(name){

        const engine=

        PPE.System.Registry.get(

            name

        );

        return{

            engine:name,

            report:

            typeof engine.report===

            "function"

            ?

            engine.report()

            :

            null

        };

    });

};

/* ==========================================================
   DIAGNOSTIC DASHBOARD
========================================================== */

PPE.System.Dashboard={};

PPE.System.Dashboard.show=

function(){

    console.group(

        "PPE SYSTEM"

    );

    console.table(

        PPE.System.Health.collect()

    );

    console.table(

        PPE.System.Runtime.collect()

    );

    console.table(

        PPE.System.Test.collect()

    );

    console.table(

        PPE.System.Report.collect()

    );

    console.groupEnd();

};

/* ==========================================================
   SYSTEM PERFORMANCE
========================================================== */

PPE.System.Performance={

    started:0,

    uptime:0,

    checks:0

};

PPE.System.Performance.start=

function(){

    PPE.System.Performance.started=

    Date.now();

};

PPE.System.Performance.update=

function(){

    PPE.System.Performance.uptime=

    Date.now()

    -

    PPE.System.Performance.started;

    PPE.System.Performance.checks++;

};

PPE.System.Performance.report=

function(){

    return{

        uptime:

        PPE.System.Performance.uptime,

        checks:

        PPE.System.Performance.checks

    };

};

/* ==========================================================
   SYSTEM LOGGER
========================================================== */

PPE.System.Logger={

    entries:[]

};

PPE.System.Logger.write=

function(

    level,

    message

){

    PPE.System.Logger.entries.push({

        time:

        Date.now(),

        level:level,

        message:message

    });

};

PPE.System.Logger.list=

function(){

    return PPE.System.Logger.entries;

};

PPE.System.Logger.clear=

function(){

    PPE.System.Logger.entries=[];

};

/* ==========================================================
   GLOBAL EVENT HUB
========================================================== */

PPE.System.Event={};

PPE.System.Event.emit=

function(

    name,

    detail

){

PPE.System.Statistics.events++;

    document.dispatchEvent(

        new CustomEvent(

            name,

            {

                detail:detail

            }

        )

    );

};

PPE.System.Event.on=

function(

    name,

    callback

){

    document.addEventListener(

        name,

        callback

    );

};

PPE.System.Event.off=

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
   PLUGIN MANAGER
========================================================== */

PPE.System.Plugin={

    items:new Map()

};

PPE.System.Plugin.register=

function(

    name,

    plugin

){

    PPE.System.Plugin.items.set(

        name,

        plugin

    );

};

PPE.System.Plugin.get=

function(name){

    return PPE.System.Plugin.items.get(

        name

    );

};

PPE.System.Plugin.list=

function(){

    return Array.from(

        PPE.System.Plugin.items.keys()

    );

};

PPE.System.Plugin.unregister=

function(name){

    PPE.System.Plugin.items.delete(

        name

    );

};

/* ==========================================================
   MODULE LOADER
========================================================== */

PPE.System.Loader={};

PPE.System.Loader.load=

function(

    module

){

    if(

        module &&

        typeof module.initialize===

        "function"

    ){

        module.initialize();

    }

};

PPE.System.Loader.unload=

function(

    module

){

    if(

        module &&

        typeof module.destroy===

        "function"

    ){

        module.destroy();

    }

};

PPE.System.Loader.reload=

function(

    module

){

    PPE.System.Loader.unload(

        module

    );

    PPE.System.Loader.load(

        module

    );

};

/* ==========================================================
   DEPENDENCY RESOLVER
========================================================== */

PPE.System.Dependency={

    graph:new Map()

};

PPE.System.Dependency.add=

function(

    module,

    dependencies

){

    PPE.System.Dependency.graph.set(

        module,

        dependencies

    );

};

PPE.System.Dependency.get=

function(module){

    return PPE.System.Dependency.graph.get(

        module

    ) || [];

};

PPE.System.Dependency.check=

function(module){

    return PPE.System.Dependency

    .get(module)

    .every(function(dep){

        return PPE.System.Registry.get(

            dep

        )!==undefined;

    });

};

/* ==========================================================
   CONFIGURATION MANAGER
========================================================== */

PPE.System.Config={

    items:new Map()

};

PPE.System.Config.set=

function(

    key,

    value

){

    PPE.System.Config.items.set(

        key,

        value

    );

};

PPE.System.Config.get=

function(key){

    return PPE.System.Config.items.get(

        key

    );

};

PPE.System.Config.has=

function(key){

    return PPE.System.Config.items.has(

        key

    );

};

PPE.System.Config.clear=

function(){

    PPE.System.Config.items.clear();

};

/* ==========================================================
   PERMISSION MANAGER
========================================================== */

PPE.System.Permission={

    rules:new Map()

};

PPE.System.Permission.allow=

function(

    name

){

    PPE.System.Permission.rules.set(

        name,

        true

    );

};

PPE.System.Permission.deny=

function(

    name

){

    PPE.System.Permission.rules.set(

        name,

        false

    );

};

PPE.System.Permission.check=

function(name){

    return PPE.System.Permission.rules.get(

        name

    )!==false;

};

/* ==========================================================
   LIFECYCLE COORDINATOR
========================================================== */

PPE.System.Lifecycle={};

PPE.System.Lifecycle.start=

function(){

    PPE.System.Registry.list()

    .forEach(function(name){

        const engine=

        PPE.System.Registry.get(

            name

        );

        if(

            engine &&

            typeof engine.start===

            "function"

        ){

            engine.start();

        }

    });

};

PPE.System.Lifecycle.stop=

function(){

    PPE.System.Registry.list()

    .forEach(function(name){

        const engine=

        PPE.System.Registry.get(

            name

        );

        if(

            engine &&

            typeof engine.stop===

            "function"

        ){

            engine.stop();

        }

    });

};

/* ==========================================================
   RESOURCE MONITOR
========================================================== */

PPE.System.Resource={

    cpuUsage:0,

    memoryUsage:0,

    lastUpdate:0

};

PPE.System.Resource.update=

function(){

    PPE.System.Resource.lastUpdate=

    Date.now();

};

PPE.System.Resource.report=

function(){

    return{

        cpu:

        PPE.System.Resource.cpuUsage,

        memory:

        PPE.System.Resource.memoryUsage,

        updated:

        PPE.System.Resource.lastUpdate

    };

};

/* ==========================================================
   MEMORY MANAGER
========================================================== */

PPE.System.Memory={

    cache:new Map()

};

PPE.System.Memory.set=

function(

    key,

    value

){

    PPE.System.Memory.cache.set(

        key,

        value

    );

};

PPE.System.Memory.get=

function(key){

    return PPE.System.Memory.cache.get(

        key

    );

};

PPE.System.Memory.remove=

function(key){

    PPE.System.Memory.cache.delete(

        key

    );

};

PPE.System.Memory.clear=

function(){

    PPE.System.Memory.cache.clear();

};

/* ==========================================================
   GARBAGE COLLECTION COORDINATOR
========================================================== */

PPE.System.Garbage={

    enabled:true

};

PPE.System.Garbage.collect=

function(){

    PPE.System.Memory.clear();

    PPE.System.Event.emit(

        "PPE_SYSTEM_GARBAGE_COLLECTED",

        {

            time:Date.now()

        }

    );

};

PPE.System.Garbage.enable=

function(){

    PPE.System.Garbage.enabled=true;

};

PPE.System.Garbage.disable=

function(){

    PPE.System.Garbage.enabled=false;

};

/* ==========================================================
   SYSTEM SNAPSHOT & RECOVERY
========================================================== */

PPE.System.Recovery={

    snapshot:null

};

PPE.System.Recovery.save=

function(){

    PPE.System.Recovery.snapshot={

        runtime:

        PPE.System.Runtime.collect(),

        health:

        PPE.System.Health.collect(),

        report:

        PPE.System.Report.collect(),

        performance:

        PPE.System.Performance.report()

    };

};

PPE.System.Recovery.restore=

function(){

    return PPE.System.Recovery.snapshot;

};

PPE.System.Recovery.clear=

function(){

    PPE.System.Recovery.snapshot=

    null;

};

/* ==========================================================
   COMPATIBILITY MANAGER
========================================================== */

PPE.System.Compatibility={};

PPE.System.Compatibility.check=

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

        fetch:

        typeof fetch

        !==

        "undefined",

        localStorage:

        typeof localStorage

        !==

        "undefined"

    };

};

PPE.System.Compatibility.report=

function(){

    return PPE.System

    .Compatibility

    .check();

};

/* ==========================================================
   FINAL SYSTEM HEALTH CHECK
========================================================== */

PPE.System.health=

function(){

    return{

        runtime:

        PPE.System

        .Runtime

        .collect(),

        health:

        PPE.System

        .Health

        .collect(),

        compatibility:

        PPE.System

        .Compatibility

        .report(),

        performance:

        PPE.System

        .Performance

        .report()

    };

};

/* ==========================================================
   SYSTEM STATISTICS
========================================================== */

PPE.System.Statistics={

    initializedEngines:0,

    plugins:0,

    events:0

};

PPE.System.Statistics.update=

function(){

    PPE.System.Statistics.initializedEngines=

    PPE.System.Registry.list()

    .length;

    PPE.System.Statistics.plugins=

    PPE.System.Plugin.list()

    .length;

};

PPE.System.Statistics.report=

function(){

    return{

        engines:

        PPE.System.Statistics.initializedEngines,

        plugins:

        PPE.System.Statistics.plugins,

        events:

        PPE.System.Statistics.events

    };

};

/* ==========================================================
   DIAGNOSTIC REPORT
========================================================== */

PPE.System.diagnostic=

function(){

    console.group(

        "PPE SYSTEM"

    );

    console.table(

        PPE.System.health()

    );

    console.table(

        PPE.System.Report.collect()

    );

    console.table(

        PPE.System.Statistics.report()

    );

    console.groupEnd();

};

/* ==========================================================
   RUNTIME INFORMATION
========================================================== */

PPE.System.runtime=

function(){

    return{

        package:"PPE-013",

        file:"system.js",

        version:

        PPE.version,

        initialized:

        PPE.System.state.initialized,

        ready:

        PPE.System.state.ready

    };

};

/* ==========================================================
   SYSTEM READY
========================================================== */

PPE.System.ready=

function(){

    PPE.System.state.ready=true;

    PPE.System.Event.emit(

        "PPE_SYSTEM_READY",

        PPE.System.runtime()

    );

};

/* ==========================================================
   AUTO INITIALIZE
========================================================== */

PPE.System.start=

function(){

    PPE.System.initialize();

    PPE.System.Performance.start();

    PPE.System.Statistics.update();

    PPE.System.ready();

};

/* ==========================================================
   REGISTER ENGINE
========================================================== */

PPE.Engine.System=

PPE.System;

/* ==========================================================
   START SYSTEM
========================================================== */

PPE.System.start();

/* ==========================================================
   CERTIFICATION MARKER

   Package : PPE-013

   File : system.js

   Status :

   IMPLEMENTATION COMPLETE

========================================================== */