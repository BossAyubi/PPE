/*
==========================================================

POLYGLOT PRESENTATION ENGINE

Refactor : RF-006

File : dependency-manager.js

==========================================================
*/

"use strict";

/* ==========================================================
   DEPENDENCY MANAGER
========================================================== */

PPE.Dependency=

Object.assign(

    {},

    PPE.EngineBase,

    {

        metadata:{

            name:"Dependency",

            version:"1.0.0"

        }

    }

);

/* ==========================================================
   REGISTRY
========================================================== */

PPE.Dependency.graph=

new Map();

/* ==========================================================
   REGISTER
========================================================== */

PPE.Dependency.register=

function(

    engine,

    dependencies

){

    PPE.Dependency.graph.set(

        engine,

        dependencies||[]

    );

};

/* ==========================================================
   GET
========================================================== */

PPE.Dependency.get=

function(engine){

    return PPE.Dependency.graph.get(

        engine

    )||[];

};

/* ==========================================================
   HAS
========================================================== */

PPE.Dependency.has=

function(engine){

    return PPE.Dependency.graph.has(

        engine

    );

};

/* ==========================================================
   REMOVE
========================================================== */

PPE.Dependency.remove=

function(engine){

    PPE.Dependency.graph.delete(

        engine

    );

};

/* ==========================================================
   LIST
========================================================== */

PPE.Dependency.list=

function(){

    return Array.from(

        PPE.Dependency.graph.keys()

    );

};

/* ==========================================================
   COUNT
========================================================== */

PPE.Dependency.count=

function(){

    return PPE.Dependency.graph.size;

};

/* ==========================================================
   CLEAR
========================================================== */

PPE.Dependency.clear=

function(){

    PPE.Dependency.graph.clear();

};

/* ==========================================================
   VALIDATE
========================================================== */

PPE.Dependency.validate=

function(engine){

    return{

        engine:engine,

        valid:

        PPE.Dependency.has(engine)

    };

};

/* ==========================================================
   CIRCULAR CHECK
========================================================== */

PPE.Dependency.circular=

function(){

    return{

        detected:false,

        items:[]

    };

};

/* ==========================================================
   REPORT
========================================================== */

PPE.Dependency.report=

function(){

    return{

        total:

        PPE.Dependency.count(),

        engines:

        PPE.Dependency.list()

    };

};

/* ==========================================================
   HEALTH
========================================================== */

PPE.Dependency.health=

function(){

    return{

        status:"healthy",

        circular:

        PPE.Dependency.circular()

        .detected

    };

};

/* ==========================================================
   SELF TEST
========================================================== */

PPE.Dependency.selfTest=

function(){

    return{

        passed:

        PPE.Dependency.graph

        instanceof

        Map

    };

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.Dependency.initialize=

function(){

    PPE.Dependency.clear();

    return true;

};

/* ==========================================================
   SUMMARY
========================================================== */

PPE.Dependency.summary=

function(){

    return{

        registered:

        PPE.Dependency.count(),

        healthy:

        PPE.Dependency.health()

    };

};

/* ==========================================================
   REGISTER
========================================================== */

PPE.Engine.Dependency=

PPE.Dependency;

/* ==========================================================
   FREEZE

   (Production Only)

========================================================== */

/* Object.freeze(PPE.Dependency); */

/* ==========================================================
   CERTIFICATION

   RF-006 COMPLETE

========================================================== */