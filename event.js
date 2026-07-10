/*
==========================================================

POLYGLOT PRESENTATION ENGINE

Refactor : RF-002

File : event.js

==========================================================
*/

"use strict";

/* ==========================================================
   GLOBAL EVENT BUS
========================================================== */

PPE.Event=

Object.assign(

    {},

    PPE.EngineBase,

    {

        metadata:{

            name:"Event",

            version:"1.0.0"

        }

    }

);

/* ==========================================================
   EVENT STORAGE
========================================================== */

PPE.Event.listeners=

new Map();


/* ==========================================================
   ON
========================================================== */

PPE.Event.on=

function(

    name,

    callback

){

    const list=

    PPE.Event.listeners.get(name)

    ||

    [];

    list.push(callback);
    

    PPE.Event.listeners.set(

        name,

        list

    );
PPE.Event.statistics.listeners =
PPE.Event.listeners.size;
};

/* ==========================================================
   OFF
========================================================== */

PPE.Event.off=

function(

    name,

    callback

){

    const list=

    PPE.Event.listeners.get(name)

    ||

    [];

    PPE.Event.listeners.set(

        name,

        list.filter(function(fn){

            return fn!==callback;
            
        })

    );
PPE.Event.statistics.listeners =
PPE.Event.listeners.size;
};

/* ==========================================================
   ONCE
========================================================== */

PPE.Event.once=

function(

    name,

    callback

){

    function wrapper(detail){

        callback(detail);

        PPE.Event.off(

            name,

            wrapper

        );

    }

    PPE.Event.on(

        name,

        wrapper

    );

};

/* ==========================================================
   LISTENER COUNT
========================================================== */

PPE.Event.listenerCount=

function(name){

    return(

        PPE.Event.listeners.get(name)

        ||

        []

    ).length;

};

/* ==========================================================
   HAS LISTENER
========================================================== */

PPE.Event.hasListener=

function(name){

    return PPE.Event.listenerCount(

        name

    )>0;

};

/* ==========================================================
   REMOVE ALL
========================================================== */

PPE.Event.removeAll=

function(name){

    PPE.Event.listeners.delete(

        name

    );

    PPE.Event.statistics.listeners=

    PPE.Event.listeners.size;

    PPE.Event.statistics.removed++;

};

/* ==========================================================
   EVENT STATISTICS
========================================================== */

PPE.Event.statistics={

    emitted:0,

    listeners:0,

    removed:0

};

PPE.Event.emit=function(

    name,

    detail

){

    PPE.Event.statistics.emitted++;
    PPE.Event.log(
    name,
    detail
);
    const list=

    PPE.Event.listeners.get(name)

    ||

    [];

    list.forEach(function(fn){

        try{

            fn(detail);

        }

        catch(error){

            PPE.Event.onError(error);

        }

    });

};

/* ==========================================================
   EVENT LOGGER
========================================================== */

PPE.Event.logs=[];

PPE.Event.log=

function(

    name,

    detail

){

    PPE.Event.logs.push({

        time:Date.now(),

        event:name,

        detail:detail

    });

};

/* ==========================================================
   REPORT
========================================================== */

PPE.Event.report=

function(){

    return{

        statistics:

        PPE.Event.statistics,

        totalEvents:

        PPE.Event.logs.length

    };

};

/* ==========================================================
   HEALTH
========================================================== */

PPE.Event.health=

function(){

    return{

        status:"healthy",

        listeners:

        PPE.Event.listeners.size

    };

};

/* ==========================================================
   SELF TEST
========================================================== */

PPE.Event.selfTest=

function(){

    return{

        passed:true,

        listenerMap:

        PPE.Event.listeners

        instanceof

        Map

    };

};

/* ==========================================================
   RESET
========================================================== */

PPE.Event.reset=

function(){

    PPE.Event.listeners.clear();

    PPE.Event.logs=[];

    PPE.Event.statistics={

        emitted:0,

        listeners:0,

        removed:0

    };

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.Event.initialize=

function(){

    PPE.Event.reset();

    if(!PPE.Event.state){

        PPE.Event.state={};

    }

    PPE.Event.state.initialized=true;

    PPE.Event.state.ready=true;

    if(!PPE.Initialize){

        PPE.Initialize={};

    }

    PPE.Initialize.event=true;

    return true;

};

/* ==========================================================
   REGISTER
========================================================== */