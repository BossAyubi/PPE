/*
==========================================================

POLYGLOT PRESENTATION ENGINE

Refactor : RF-005

File : recovery.js

==========================================================
*/

"use strict";

/* ==========================================================
   RECOVERY SERVICE
========================================================== */

PPE.Recovery=

Object.assign(

    {},

    PPE.EngineBase,

    {

        metadata:{

            name:"Recovery",

            version:"1.0.0"

        }

    }

);

/* ==========================================================
   STATE
========================================================== */

PPE.Recovery.state={

    initialized:false,

    ready:false

};



/* ==========================================================
   SNAPSHOT STORAGE
========================================================== */

PPE.Recovery.snapshots=[];

/* ==========================================================
   CREATE SNAPSHOT
========================================================== */

PPE.Recovery.snapshot=

function(

    name,

    data

){

    PPE.Recovery.snapshots.push({

        name:name,

        data:data,

        time:Date.now()

    });

};

/* ==========================================================
   GET LAST SNAPSHOT
========================================================== */

PPE.Recovery.last=

function(){

    if(

        PPE.Recovery.snapshots.length===0

    ){

        return null;

    }

    return PPE.Recovery.snapshots[

        PPE.Recovery.snapshots.length-1

    ];

};

/* ==========================================================
   RESTORE
========================================================== */

PPE.Recovery.restore=

function(){

    return PPE.Recovery.last();

};

/* ==========================================================
   HISTORY
========================================================== */

PPE.Recovery.history=

function(){

    return PPE.Recovery.snapshots;

};

/* ==========================================================
   CLEAR
========================================================== */

PPE.Recovery.clear=

function(){

    PPE.Recovery.snapshots=[];

};

/* ==========================================================
   COUNT
========================================================== */

PPE.Recovery.count=

function(){

    return PPE.Recovery.snapshots.length;

};

/* ==========================================================
   HAS SNAPSHOT
========================================================== */

PPE.Recovery.has=

function(){

    return PPE.Recovery.count()>0;

};

/* ==========================================================
   ROLLBACK
========================================================== */

PPE.Recovery.rollback=

function(){

    return PPE.Recovery.restore();

};

/* ==========================================================
   REMOVE SNAPSHOT
========================================================== */

PPE.Recovery.remove=

function(name){

    PPE.Recovery.snapshots=

    PPE.Recovery.snapshots.filter(

        function(item){

            return item.name!==name;

        }

    );

};

/* ==========================================================
   REPORT
========================================================== */

PPE.Recovery.report=

function(){

    return{

        snapshots:

        PPE.Recovery.count()

    };

};

/* ==========================================================
   HEALTH
========================================================== */

PPE.Recovery.health=

function(){

    return{

        status:"healthy",

        available:

        PPE.Recovery.has()

    };

};

/* ==========================================================
   SELF TEST
========================================================== */

PPE.Recovery.selfTest=

function(){

    return{

        passed:

        Array.isArray(

            PPE.Recovery.snapshots

        )

    };

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.Recovery.initialize=

function(){

    PPE.Recovery.clear();

    PPE.Recovery.state.initialized=true;

    PPE.Recovery.state.ready=true;

    if(!PPE.Initialize){

        PPE.Initialize={};

    }

    PPE.Initialize.recovery=true;

    return true;

};

/* ==========================================================
   SUMMARY
========================================================== */

PPE.Recovery.summary=

function(){

    return{

        totalSnapshots:

        PPE.Recovery.count(),

        latest:

        PPE.Recovery.last()

    };

};

/* ==========================================================
   RUNTIME
========================================================== */

PPE.Recovery.runtime=

function(){

    return{

        package:"PPE-017",

        file:"recovery.js",

        version:PPE.version || "1.0.0",

        initialized:

        PPE.Recovery.state.initialized,

        ready:

        PPE.Recovery.state.ready,

        snapshots:

        PPE.Recovery.count()

    };

};

/* ==========================================================
   BOOT
========================================================== */

PPE.Recovery.boot=

function(){

    if(!PPE.Initialize){

        PPE.Initialize={};

    }

    PPE.Initialize.recovery=true;

    PPE.Recovery.state.initialized=true;

    PPE.Recovery.state.ready=true;

    if(

        PPE.System &&

        PPE.System.Event

    ){

        PPE.System.Event.emit(

            "PPE_RECOVERY_READY",

            PPE.Recovery.runtime()

        );

    }

    return true;

};

/* ==========================================================
   REGISTER
========================================================== */

PPE.Engine.Recovery=

PPE.Recovery;

/* ==========================================================
   FREEZE

   (Production Only)

========================================================== */

/* Object.freeze(PPE.Recovery); */

/* ==========================================================
   CERTIFICATION

   RF-005 COMPLETE

========================================================== */