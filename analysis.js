/*
==========================================================
POLYGLOT PRESENTATION ENGINE

Package : PPE-012

File : analysis.js

Version : 1.0.0-alpha.1

==========================================================
*/

"use strict";

/* ==========================================================
   ANALYSIS ENGINE
========================================================== */

PPE.Analysis={};

/* ==========================================================
   STATE
========================================================== */

PPE.Analysis.state={

    initialized:false,

    ready:false,

    rendering:false,

    currentTopic:null,

    data:null,

    responses:[],
    
    html:""

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.Analysis.initialize=function(){

    PPE.Analysis.state.initialized=true;

    PPE.Analysis.state.ready=true;

    if(!PPE.Initialize){
        PPE.Initialize={};
    }

    PPE.Initialize.analysis=true;

    return true;

};

/* ==========================================================
   CLEAR
========================================================== */

PPE.Analysis.clear=function(){

    PPE.Analysis.state.data=null;

    PPE.Analysis.state.responses=[];

};

/* ==========================================================
   LOAD
========================================================== */

PPE.Analysis.load=function(data){

    PPE.Analysis.state.data=data;

    PPE.Analysis.state.responses=

    data.responses || [];

};

/* ==========================================================
   VALIDATE
========================================================== */

PPE.Analysis.validate=function(data){

    if(!data){

        return false;

    }

    if(

        !Array.isArray(

            data.responses

        )

    ){

        return false;

    }

    return true;

};

/* ==========================================================
   RENDER
========================================================== */

PPE.Analysis.render=function(){

    if(

        !PPE.Analysis.validate(

            PPE.Analysis.state.data

        )

    ){

        return false;

    }
    
    PPE.Analysis.state.html="";
    
    PPE.Analysis.state.responses.forEach(

function(item){

PPE.Analysis.state.html+=
"<div>";

PPE.Analysis.state.html+=

item.question;

PPE.Analysis.state.html+=

"</div>";

PPE.Analysis.state.html+=

"<div>";

PPE.Analysis.state.html+=

item.improved_native;

PPE.Analysis.state.html+=

"</div>";

PPE.Analysis.state.html+=

"<div>";

PPE.Analysis.state.html+=

item.natural_target_language;

PPE.Analysis.state.html+=

"</div>";

});

PPE.Renderer.renderHTML(

    PPE.Analysis.state.html

);

    /*
        Rendering akan
        diimplementasikan
        pada tahap berikutnya.
    */

    return true;

};

/* ==========================================================
   RESET
========================================================== */

PPE.Analysis.reset=function(){

    PPE.Analysis.clear();

    PPE.Analysis.state.currentTopic=null;

};

/* ==========================================================
   RUNTIME
========================================================== */

PPE.Analysis.runtime=function(){

    return{

        package:"PPE-012",

        file:"analysis.js",

        version:

        PPE.version ||

        "1.0.0",

        initialized:

        PPE.Analysis.state.initialized,

        ready:

        PPE.Analysis.state.ready

    };

};

/* ==========================================================
   HEALTH
========================================================== */

PPE.Analysis.health=function(){

    return{

        initialized:

        PPE.Analysis.state.initialized,

        ready:

        PPE.Analysis.state.ready,

        rendering:

        PPE.Analysis.state.rendering,

        responseCount:

        PPE.Analysis.state.responses.length

    };

};

/* ==========================================================
   REPORT
========================================================== */

PPE.Analysis.report=function(){

    return{

        runtime:

        PPE.Analysis.runtime(),

        health:

        PPE.Analysis.health()

    };

};

/* ==========================================================
   SELF TEST
========================================================== */

PPE.Analysis.selfTest=function(){

    return{

        initialized:

        PPE.Analysis.state.initialized,

        ready:

        PPE.Analysis.state.ready,

        responses:

        PPE.Analysis.state.responses.length

    };

};

/* ==========================================================
   REGISTER ENGINE
========================================================== */

PPE.Engine.Analysis=

PPE.Analysis;

/* ==========================================================
   AUTO BOOT
========================================================== */

PPE.Analysis.boot=function(){

    if(!PPE.Initialize){

        PPE.Initialize={};

    }

    if(

        !PPE.Analysis.state.initialized

    ){

        PPE.Analysis.initialize();

    }

    PPE.Initialize.analysis=true;

    PPE.Analysis.state.ready=true;

    return true;

};

/* ==========================================================
   CERTIFICATION MARKER

   Package : PPE-012

   File : analysis.js

   Status :

   BLUEPRINT COMPLETE

========================================================== */