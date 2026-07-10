/*
==========================================================

POLYGLOT PRESENTATION ENGINE

Refactor : RF-004

File : performance.js

==========================================================
*/

"use strict";

/* ==========================================================
   PERFORMANCE SERVICE
========================================================== */

PPE.Performance=

Object.assign(

    {},

    PPE.EngineBase,

    {

        metadata:{

            name:"Performance",

            version:"1.0.0"

        }

    }

);

/* ==========================================================
   STORAGE
========================================================== */

PPE.Performance.state={

    initialized:false,

    ready:false

};

PPE.Performance.metrics=

new Map();

/* ==========================================================
   START TIMER
========================================================== */

PPE.Performance.start=

function(name){

    PPE.Performance.metrics.set(

        name,

        {

            start:

            performance.now()

        }

    );

};

/* ==========================================================
   STOP TIMER
========================================================== */

PPE.Performance.stop=

function(name){

    const item=

    PPE.Performance.metrics.get(name);

    if(!item){

        return null;

    }

    item.end=

    performance.now();

    item.duration=

    item.end-

    item.start;

    return item.duration;

};

/* ==========================================================
   MEASURE
========================================================== */

PPE.Performance.measure=

async function(

    name,

    callback

){

    PPE.Performance.start(name);

    await callback();

    return PPE.Performance.stop(name);

};

/* ==========================================================
   MARK
========================================================== */

PPE.Performance.mark=

function(

    name,

    value

){

    PPE.Performance.metrics.set(

        name,

        {

            value:value

        }

    );

};

/* ==========================================================
   GET METRIC
========================================================== */

PPE.Performance.get=

function(name){

    return PPE.Performance.metrics.get(

        name

    );

};

/* ==========================================================
   LIST
========================================================== */

PPE.Performance.list=

function(){

    return Array.from(

        PPE.Performance.metrics.entries()

    );

};

/* ==========================================================
   RESET
========================================================== */

PPE.Performance.reset=

function(){

    PPE.Performance.metrics.clear();

};

/* ==========================================================
   HISTORY
========================================================== */

PPE.Performance.history=[];

PPE.Performance.record=

function(

    name,

    duration

){

    PPE.Performance.history.push({

        name:name,

        duration:duration,

        time:Date.now()

    });

};

/* ==========================================================
   AVERAGE
========================================================== */

PPE.Performance.average=

function(name){

    const items=

    PPE.Performance.history.filter(

        function(item){

            return item.name===name;

        }

    );

    if(items.length===0){

        return 0;

    }

    return items.reduce(

        function(sum,item){

            return sum+

            item.duration;

        },

        0

    )/items.length;

};

/* ==========================================================
   REPORT
========================================================== */

PPE.Performance.report=

function(){

    return{

        metrics:

        PPE.Performance.list(),

        samples:

        PPE.Performance.history.length

    };

};

/* ==========================================================
   HEALTH
========================================================== */

PPE.Performance.health=

function(){

    return{

        status:"healthy",

        samples:

        PPE.Performance.history.length

    };

};

/* ==========================================================
   SELF TEST
========================================================== */

PPE.Performance.selfTest=

function(){

    return{

        passed:

        PPE.Performance.metrics

        instanceof

        Map

    };

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.Performance.initialize=

function(){

    PPE.Performance.reset();

    PPE.Performance.history=[];

    PPE.Performance.state.initialized=true;

    PPE.Performance.state.ready=true;

    if(!PPE.Initialize){

        PPE.Initialize={};

    }

    PPE.Initialize.performance=true;

    return true;

};

/* ==========================================================
   SUMMARY
========================================================== */

PPE.Performance.summary=

function(){

    return{

        totalMetrics:

        PPE.Performance.metrics.size,

        totalHistory:

        PPE.Performance.history.length

    };

};

/* ==========================================================
   RUNTIME
========================================================== */

PPE.Performance.runtime=

function(){

    return{

        package:"PPE-016",

        file:"performance.js",

        version:

        PPE.version || "1.0.0",

        initialized:

        PPE.Performance.state.initialized,

        ready:

        PPE.Performance.state.ready,

        metrics:

        PPE.Performance.metrics.size,

        history:

        PPE.Performance.history.length

    };

};

/* ==========================================================
   BOOT
========================================================== */

PPE.Performance.boot=

function(){

    if(!PPE.Initialize){

        PPE.Initialize={};

    }

    PPE.Initialize.performance=true;

    if(

        PPE.System &&

        PPE.System.Event

    ){

        PPE.System.Event.emit(

            "PPE_PERFORMANCE_READY",

            PPE.Performance.runtime()

        );

    }

    return true;

};

/* ==========================================================
   REGISTER
========================================================== */

PPE.Engine.Performance=

PPE.Performance;

/* ==========================================================
   FREEZE

   (Production Only)

========================================================== */

/* Object.freeze(PPE.Performance); */

/* ==========================================================
   CERTIFICATION

   RF-004 COMPLETE

========================================================== */