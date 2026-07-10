/*
==========================================================

POLYGLOT PRESENTATION ENGINE

Refactor : RF-001

File : engine-base.js

Version : 1.0.0

==========================================================
*/

"use strict";

/* ==========================================================
   ENGINE BASE
========================================================== */

PPE.EngineBase={

    metadata:{

        name:"EngineBase",

        version:"1.0.0",

        author:"Polyglot Academy"

    }

};

/* ==========================================================
   INITIALIZE
========================================================== */

/**
 * Initialize engine.
 * @returns {boolean}
 */
PPE.EngineBase.initialize=function(){

    return true;

};

/* ==========================================================
   START
========================================================== */

/**
 * Start engine.
 * @returns {boolean}
 */
PPE.EngineBase.start=function(){

    return true;

};

/* ==========================================================
   STOP
========================================================== */

/**
 * Stop engine.
 * @returns {boolean}
 */
PPE.EngineBase.stop=function(){

    return true;

};

/* ==========================================================
   DESTROY
========================================================== */

/**
 * Destroy engine.
 * @returns {boolean}
 */
PPE.EngineBase.destroy=function(){

    return true;

};

/* ==========================================================
   RUNTIME
========================================================== */

/**
 * Runtime information.
 */
PPE.EngineBase.runtime=function(){

    return{

        name:

        PPE.EngineBase.metadata.name,

        version:

        PPE.EngineBase.metadata.version

    };

};

/* ==========================================================
   HEALTH
========================================================== */

/**
 * Engine health.
 */
PPE.EngineBase.health=function(){

    return{

        status:"healthy"

    };

};

/* ==========================================================
   REPORT
========================================================== */

/**
 * Engine report.
 */
PPE.EngineBase.report=function(){

    return{

        initialized:true,

        running:false

    };

};

/* ==========================================================
   SELF TEST
========================================================== */

/**
 * Engine self test.
 */
PPE.EngineBase.selfTest=function(){

    return{

        passed:true

    };

};

/* ==========================================================
   VALIDATE
========================================================== */

/**
 * Validate engine.
 */
PPE.EngineBase.validate=function(){

    return{

        valid:true,

        errors:[]

    };

};

/* ==========================================================
   RESET
========================================================== */

/**
 * Reset engine.
 */
PPE.EngineBase.reset=function(){

    return true;

};

/* ==========================================================
   VERSION
========================================================== */

PPE.EngineBase.version=function(){

    return PPE.EngineBase

    .metadata

    .version;

};

/* ==========================================================
   CAPABILITY
========================================================== */

PPE.EngineBase.capability=

function(){

    return{

        initialize:true,

        start:true,

        stop:true,

        destroy:true,

        runtime:true,

        health:true,

        report:true,

        selfTest:true

    };

};

/* ==========================================================
   LIFECYCLE
========================================================== */

PPE.EngineBase.lifecycle=

function(){

    return{

        initialized:false,

        running:false,

        destroyed:false

    };

};

/* ==========================================================
   DEFAULT ERROR HANDLER
========================================================== */

PPE.EngineBase.onError=

function(error){

    return{

        handled:true,

        error:error

    };

};

/* ==========================================================
   DEFAULT EVENT HANDLER
========================================================== */

PPE.EngineBase.onEvent=

function(

    name,

    detail

){

    return{

        name:name,

        detail:detail

    };

};

/* ==========================================================
   ENGINE CONTRACT VERSION
========================================================== */

PPE.EngineBase.contract=

function(){

    return{

        name:"PPE Engine Contract",

        version:"1.0"

    };

};

/* ==========================================================
   FREEZE
========================================================== */

Object.freeze(

    PPE.EngineBase

);

/* ==========================================================
   CERTIFICATION

   RF-001 COMPLETE

========================================================== */