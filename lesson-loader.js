/*
==========================================================
POLYGLOT PRESENTATION ENGINE

Package : PPE-013

File : lesson-loader.js

Version : 1.0.0-alpha.1

==========================================================
*/

"use strict";

/* ==========================================================
   LESSON LOADER ENGINE
========================================================== */

PPE.Lesson={};

/* ==========================================================
   STATE
========================================================== */

PPE.Lesson.state={

initialized:false,

ready:false,

loading:false,

currentTopic:null,

currentLesson:null,

currentParagraph:0,

currentSentence:0,

totalParagraph:0,

totalSentence:0

};

/* ==========================================================
   CACHE
========================================================== */

PPE.Lesson.cache = {

    topics: [],

    lessons: [],

    paragraphs: [],

    currentData: null,

    lastTopic: null

};

/* ==========================================================
   RUNTIME
========================================================== */

PPE.Lesson.runtime={

package:"PPE-013",

version:"1.0.0-alpha.1"

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.Lesson.initialize=function(){

PPE.Lesson.state.initialized=true;

PPE.Lesson.state.ready=true;

if(!PPE.Initialize){

PPE.Initialize={};

}

PPE.Initialize.lesson=true;

return true;

};

/* ==========================================================
   REGISTER ENGINE
========================================================== */

PPE.Engine.Lesson=

PPE.Lesson;

/* ==========================================================
   AUTO BOOT
========================================================== */

PPE.Lesson.boot=function(){

if(

!PPE.Lesson.state.initialized

){

PPE.Lesson.initialize();

}

PPE.Lesson.state.ready=true;

return true;

};

