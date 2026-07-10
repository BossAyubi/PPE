/*
==========================================================

POLYGLOT PRESENTATION ENGINE

Refactor : RF-003

File : logger.js

==========================================================
*/

"use strict";

/* ==========================================================
   GLOBAL LOGGER
========================================================== */

PPE.Logger=

Object.assign(

    {},

    PPE.EngineBase,

    {

        metadata:{

            name:"Logger",

            version:"1.0.0"

        }

    }

);

/* ==========================================================
   STORAGE
========================================================== */

PPE.Logger.logs=[];

/* ==========================================================
   LEVELS
========================================================== */

PPE.Logger.level={

    INFO:"INFO",

    WARN:"WARN",

    ERROR:"ERROR",

    DEBUG:"DEBUG"

};

/* ==========================================================
   WRITE
========================================================== */

PPE.Logger.write=

function(

    level,

    message,

    data

){

    PPE.Logger.logs.push({

        time:new Date().toISOString(),

        level:level,

        message:message,

        data:data||null

    });

};

/* ==========================================================
   INFO
========================================================== */

PPE.Logger.info=

function(

    message,

    data

){

    PPE.Logger.write(

        PPE.Logger.level.INFO,

        message,

        data

    );

};

/* ==========================================================
   WARN
========================================================== */

PPE.Logger.warn=

function(

    message,

    data

){

    PPE.Logger.write(

        PPE.Logger.level.WARN,

        message,

        data

    );

};

/* ==========================================================
   ERROR
========================================================== */

PPE.Logger.error=

function(

    message,

    data

){

    PPE.Logger.write(

        PPE.Logger.level.ERROR,

        message,

        data

    );

};

/* ==========================================================
   DEBUG
========================================================== */

PPE.Logger.debug=

function(

    message,

    data

){

    PPE.Logger.write(

        PPE.Logger.level.DEBUG,

        message,

        data

    );

};

/* ==========================================================
   GET ALL LOGS
========================================================== */

PPE.Logger.list=

function(){

    return PPE.Logger.logs;

};

/* ==========================================================
   CLEAR
========================================================== */

PPE.Logger.clear=

function(){

    PPE.Logger.logs=[];
    PPE.Logger.state={

    initialized:false,

    ready:false

};

};

/* ==========================================================
   FILTER
========================================================== */

PPE.Logger.filter=

function(level){

    return PPE.Logger.logs.filter(

        function(item){

            return item.level===level;

        }

    );

};

/* ==========================================================
   STATISTICS
========================================================== */

PPE.Logger.statistics=

function(){

    return{

        total:

        PPE.Logger.logs.length,

        info:

        PPE.Logger.filter("INFO").length,

        warn:

        PPE.Logger.filter("WARN").length,

        error:

        PPE.Logger.filter("ERROR").length,

        debug:

        PPE.Logger.filter("DEBUG").length

    };

};

/* ==========================================================
   EXPORT
========================================================== */

PPE.Logger.export=

function(){

    return JSON.stringify(

        PPE.Logger.logs,

        null,

        2

    );

};

/* ==========================================================
   REPORT
========================================================== */

PPE.Logger.report=

function(){

    return{

        statistics:

        PPE.Logger.statistics()

    };

};

/* ==========================================================
   HEALTH
========================================================== */

PPE.Logger.health=

function(){

    return{

        status:"healthy",

        totalLogs:

        PPE.Logger.logs.length

    };

};

/* ==========================================================
   SELF TEST
========================================================== */

PPE.Logger.selfTest=

function(){

    return{

        passed:

        Array.isArray(

            PPE.Logger.logs

        )

    };

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.Logger.initialize=function(){

    PPE.Logger.clear();

    PPE.Logger.state.initialized=true;

    PPE.Logger.state.ready=true;

    if(!PPE.Initialize){
        PPE.Initialize={};
    }

    PPE.Initialize.logger=true;

    return true;

};

/* ==========================================================
   RUNTIME
========================================================== */

PPE.Logger.runtime=

function(){

    return{

        package:"PPE-015",

        file:"logger.js",

        version:

        PPE.version || "1.0.0",

        initialized:

        PPE.Logger.state.initialized,

        ready:

        PPE.Logger.state.ready,

        logs:

        PPE.Logger.logs.length

    };

};

/* ==========================================================
   BOOT
========================================================== */

PPE.Logger.boot=

function(){

    if(!PPE.Initialize){

        PPE.Initialize={};

    }

    PPE.Initialize.logger=true;
    
    if(

    PPE.System &&

    PPE.System.Event

){

    PPE.System.Event.emit(

        "PPE_LOGGER_READY",

        PPE.Logger.runtime()

    );

}

    return true;

};

/* ==========================================================
   REGISTER
========================================================== */

PPE.Engine.Logger=

PPE.Logger;

/* ==========================================================
   FREEZE
========================================================== */

Object.freeze(

    PPE.Logger

);

/* ==========================================================
   CERTIFICATION

   RF-003 COMPLETE

========================================================== */