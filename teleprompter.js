/*
==========================================================
POLYGLOT PRESENTATION ENGINE

Package : PPE-004

File : teleprompter.js

Version : 1.0.0-alpha.1

==========================================================
*/

"use strict";

/* ==========================================================
   TELEPROMPTER ENGINE
========================================================== */

PPE.Teleprompter={};

/* ==========================================================
   INTERNAL STATE
========================================================== */

PPE.Teleprompter.state={

    initialized:false,
    
    ready:false,

    playing:false,

    paused:false,

    speed:1.0,

    autoScroll:true,

    currentParagraph:0,

    currentSentence:0,

    centerOffset:0

};

/* ==========================================================
   DOM
========================================================== */

PPE.Teleprompter.element={

    container:null,

    focusLine:null

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.Teleprompter.initialize=function(

    containerId

){

    PPE.Teleprompter.element.container=

    document.getElementById(

        containerId

    );

    PPE.Teleprompter.state.initialized=true;

    PPE.Teleprompter.state.ready=true;

    if(!PPE.Initialize){

        PPE.Initialize={};

    }

    PPE.Initialize.teleprompter=true;

    return true;

};

/* ==========================================================
   ENGINE INFO
========================================================== */

PPE.Engine.Teleprompter=

PPE.Teleprompter;

/* ==========================================================
   PLAYBACK CONTROL
========================================================== */

PPE.Teleprompter.play=function(){

    PPE.Teleprompter.state.playing=true;

    PPE.Teleprompter.state.paused=false;

};

PPE.Teleprompter.pause=function(){

    PPE.Teleprompter.state.paused=true;

};

PPE.Teleprompter.stop=function(){

    PPE.Teleprompter.state.playing=false;

    PPE.Teleprompter.state.paused=false;

};

PPE.Teleprompter.toggle=function(){

    if(

        PPE.Teleprompter.state.playing

    ){

        PPE.Teleprompter.pause();

    }

    else{

        PPE.Teleprompter.play();

    }

};

/* ==========================================================
   STATUS
========================================================== */

PPE.Teleprompter.isPlaying=function(){

    return PPE.Teleprompter.state.playing;

};

PPE.Teleprompter.isPaused=function(){

    return PPE.Teleprompter.state.paused;

};

/* ==========================================================
   SPEED CONTROL
========================================================== */

PPE.Teleprompter.setSpeed=function(

    value

){

    PPE.Teleprompter.state.speed=

    value;

};

PPE.Teleprompter.getSpeed=function(){

    return PPE.Teleprompter.state.speed;

};

PPE.Teleprompter.speedUp=function(){

    PPE.Teleprompter.state.speed+=0.1;

};

PPE.Teleprompter.speedDown=function(){

    if(

        PPE.Teleprompter.state.speed>

        0.2

    ){

        PPE.Teleprompter.state.speed-=0.1;

    }

};

/* ==========================================================
   AUTO SCROLL
========================================================== */

PPE.Teleprompter.enableAutoScroll=

function(){

    PPE.Teleprompter.state.autoScroll=true;

};

PPE.Teleprompter.disableAutoScroll=

function(){

    PPE.Teleprompter.state.autoScroll=false;

};

/* ==========================================================
   FOCUS LINE
========================================================== */

PPE.Teleprompter.Focus={};

PPE.Teleprompter.Focus.show=function(){

    if(

        PPE.Teleprompter.element.focusLine

    ){

        PPE.Teleprompter.element.focusLine

        .style.display="block";

    }

};

PPE.Teleprompter.Focus.hide=function(){

    if(

        PPE.Teleprompter.element.focusLine

    ){

        PPE.Teleprompter.element.focusLine

        .style.display="none";

    }

};

PPE.Teleprompter.Focus.move=function(offset){

    PPE.Teleprompter.state.centerOffset=

    offset;

    if(

        PPE.Teleprompter.element.focusLine

    ){

        PPE.Teleprompter.element.focusLine

        .style.top=

        offset+"px";

    }

};

/* ==========================================================
   SCROLL ENGINE
========================================================== */

PPE.Teleprompter.scrollTo=function(

    element

){

    if(

        !element||

        !PPE.Teleprompter.state.autoScroll

    ){

        return;

    }

    element.scrollIntoView({

        behavior:"smooth",

        block:"center"

    });

};

PPE.Teleprompter.scrollSentence=function(){

    const current=

    PPE.Renderer.currentElement();

    PPE.Teleprompter.scrollTo(

        current

    );

};

/* ==========================================================
   SENTENCE TRACKER
========================================================== */

PPE.Teleprompter.track=function(

    paragraph,

    sentence

){

    PPE.Teleprompter.state.currentParagraph=

    paragraph;

    PPE.Teleprompter.state.currentSentence=

    sentence;

    PPE.Renderer.moveTo(

        paragraph,

        sentence

    );

    PPE.Teleprompter.scrollSentence();

};

/* ==========================================================
   CURRENT POSITION
========================================================== */

PPE.Teleprompter.position=function(){

    return{

        paragraph:

        PPE.Teleprompter.state

        .currentParagraph,

        sentence:

        PPE.Teleprompter.state

        .currentSentence

    };

};

/* ==========================================================
   SHADOWING ENGINE
========================================================== */

PPE.Teleprompter.Shadowing={

    enabled:false,

    repeat:3,

    current:0

};

PPE.Teleprompter.enableShadowing=function(){

    PPE.Teleprompter.Shadowing.enabled=true;

};

PPE.Teleprompter.disableShadowing=function(){

    PPE.Teleprompter.Shadowing.enabled=false;

};

PPE.Teleprompter.isShadowing=function(){

    return PPE.Teleprompter.Shadowing.enabled;

};

PPE.Teleprompter.nextRepeat=function(){

    PPE.Teleprompter.Shadowing.current++;

};

PPE.Teleprompter.resetRepeat=function(){

    PPE.Teleprompter.Shadowing.current=0;

};

/* ==========================================================
   ADAPTIVE SPEED
========================================================== */

PPE.Teleprompter.Adaptive={

    enabled:false,

    minimum:0.6,

    maximum:2.0

};

PPE.Teleprompter.enableAdaptive=function(){

    PPE.Teleprompter.Adaptive.enabled=true;

};

PPE.Teleprompter.disableAdaptive=function(){

    PPE.Teleprompter.Adaptive.enabled=false;

};

PPE.Teleprompter.updateSpeed=function(score){

    if(

        !PPE.Teleprompter.Adaptive.enabled

    ){

        return;

    }

    let speed=

    PPE.Teleprompter.getSpeed();

    if(score>90){

        speed+=0.1;

    }

    else if(score<60){

        speed-=0.1;

    }

    speed=Math.max(

        PPE.Teleprompter.Adaptive.minimum,

        speed

    );

    speed=Math.min(

        PPE.Teleprompter.Adaptive.maximum,

        speed

    );

    PPE.Teleprompter.setSpeed(speed);

};

/* ==========================================================
   AUDIO SYNCHRONIZATION
========================================================== */

PPE.Teleprompter.Audio={

    player:null,

    playing:false

};

PPE.Teleprompter.Audio.attach=function(player){

    PPE.Teleprompter.Audio.player=

    player;

};

PPE.Teleprompter.Audio.play=function(){

    if(

        PPE.Teleprompter.Audio.player

    ){

        PPE.Teleprompter.Audio.player.play();

        PPE.Teleprompter.Audio.playing=true;

    }

};

PPE.Teleprompter.Audio.pause=function(){

    if(

        PPE.Teleprompter.Audio.player

    ){

        PPE.Teleprompter.Audio.player.pause();

        PPE.Teleprompter.Audio.playing=false;

    }

};

PPE.Teleprompter.Audio.stop=function(){

    if(

        PPE.Teleprompter.Audio.player

    ){

        PPE.Teleprompter.Audio.player.pause();

        PPE.Teleprompter.Audio.player.currentTime=0;

        PPE.Teleprompter.Audio.playing=false;

    }

};

/* ==========================================================
   READING TIMELINE
========================================================== */

PPE.Teleprompter.Timeline={

    list:[]

};

PPE.Teleprompter.Timeline.clear=function(){

    PPE.Teleprompter.Timeline.list=[];

};

PPE.Teleprompter.Timeline.add=function(

    paragraph,

    sentence,

    status

){

    PPE.Teleprompter.Timeline.list.push({

        paragraph:paragraph,

        sentence:sentence,

        status:status

    });

};

PPE.Teleprompter.Timeline.update=function(

    paragraph,

    sentence,

    status

){

    PPE.Teleprompter.Timeline.list

    .forEach(function(item){

        if(

            item.paragraph===paragraph

            &&

            item.sentence===sentence

        ){

            item.status=status;

        }

    });

};

/* ==========================================================
   READING ANALYTICS
========================================================== */

PPE.Teleprompter.Analytics={

    startTime:0,

    endTime:0,

    totalSentence:0,

    completed:0

};

PPE.Teleprompter.Analytics.start=function(){

    PPE.Teleprompter.Analytics.startTime=

    Date.now();

};

PPE.Teleprompter.Analytics.finish=function(){

    PPE.Teleprompter.Analytics.endTime=

    Date.now();

};

PPE.Teleprompter.Analytics.progress=function(){

    if(

        PPE.Teleprompter.Analytics.totalSentence===0

    ){

        return 0;

    }

    return(

        PPE.Teleprompter.Analytics.completed

        /

        PPE.Teleprompter.Analytics.totalSentence

    )*100;

};

PPE.Teleprompter.Analytics.duration=function(){

    return

    PPE.Teleprompter.Analytics.endTime

    -

    PPE.Teleprompter.Analytics.startTime;

};

/* ==========================================================
   BOOKMARK ENGINE
========================================================== */

PPE.Teleprompter.Bookmark={

    paragraph:0,

    sentence:0

};

PPE.Teleprompter.saveBookmark=function(){

    PPE.Teleprompter.Bookmark.paragraph=

    PPE.Teleprompter.state.currentParagraph;

    PPE.Teleprompter.Bookmark.sentence=

    PPE.Teleprompter.state.currentSentence;

};

PPE.Teleprompter.restoreBookmark=function(){

    PPE.Teleprompter.track(

        PPE.Teleprompter.Bookmark.paragraph,

        PPE.Teleprompter.Bookmark.sentence

    );

};

PPE.Teleprompter.clearBookmark=function(){

    PPE.Teleprompter.Bookmark.paragraph=0;

    PPE.Teleprompter.Bookmark.sentence=0;

};

/* ==========================================================
   AI READING COACH
========================================================== */

PPE.Teleprompter.Coach={

    enabled:true,

    score:0,

    feedback:"",

    lastResult:null

};

PPE.Teleprompter.Coach.evaluate=function(result){

    PPE.Teleprompter.Coach.lastResult=result;

    PPE.Teleprompter.Coach.score=result.score||0;

    PPE.Teleprompter.Coach.feedback=result.feedback||"";

};

PPE.Teleprompter.Coach.reset=function(){

    PPE.Teleprompter.Coach.score=0;

    PPE.Teleprompter.Coach.feedback="";

    PPE.Teleprompter.Coach.lastResult=null;

};

PPE.Teleprompter.Coach.result=function(){

    return PPE.Teleprompter.Coach.lastResult;

};

/* ==========================================================
   PRONUNCIATION SESSION
========================================================== */

PPE.Teleprompter.Pronunciation={

    listening:false,

    transcript:"",

    confidence:0

};

PPE.Teleprompter.Pronunciation.start=function(){

    PPE.Teleprompter.Pronunciation.listening=true;

};

PPE.Teleprompter.Pronunciation.stop=function(){

    PPE.Teleprompter.Pronunciation.listening=false;

};

PPE.Teleprompter.Pronunciation.update=function(

    transcript,

    confidence

){

    PPE.Teleprompter.Pronunciation.transcript=

    transcript;

    PPE.Teleprompter.Pronunciation.confidence=

    confidence;

};

PPE.Teleprompter.Pronunciation.clear=function(){

    PPE.Teleprompter.Pronunciation.transcript="";

    PPE.Teleprompter.Pronunciation.confidence=0;

};

/* ==========================================================
   TRANSLATION OVERLAY
========================================================== */

PPE.Teleprompter.Translation={

    visible:false,

    language:"id",

    text:""

};

PPE.Teleprompter.showTranslation=function(text){

    PPE.Teleprompter.Translation.visible=true;

    PPE.Teleprompter.Translation.text=text;

};

PPE.Teleprompter.hideTranslation=function(){

    PPE.Teleprompter.Translation.visible=false;

};

PPE.Teleprompter.toggleTranslation=function(){

    PPE.Teleprompter.Translation.visible=

    !PPE.Teleprompter.Translation.visible;

};

PPE.Teleprompter.translationVisible=function(){

    return PPE.Teleprompter.Translation.visible;

};

/* ==========================================================
   READING SESSION
========================================================== */

PPE.Teleprompter.Session={

    active:false,

    startTime:0,

    endTime:0

};

PPE.Teleprompter.Session.start=function(){

    PPE.Teleprompter.Session.active=true;

    PPE.Teleprompter.Session.startTime=

    Date.now();

};

PPE.Teleprompter.Session.stop=function(){

    PPE.Teleprompter.Session.active=false;

    PPE.Teleprompter.Session.endTime=

    Date.now();

};

PPE.Teleprompter.Session.duration=function(){

    if(

        PPE.Teleprompter.Session.active

    ){

        return Date.now()

        -

        PPE.Teleprompter.Session.startTime;

    }

    return PPE.Teleprompter.Session.endTime

    -

    PPE.Teleprompter.Session.startTime;

};

/* ==========================================================
   EVENT ENGINE
========================================================== */

PPE.Teleprompter.Event={};

PPE.Teleprompter.Event.emit=function(

    event,

    detail

){

    document.dispatchEvent(

        new CustomEvent(

            event,

            {

                detail:detail

            }

        )

    );

};

PPE.Teleprompter.Event.on=function(

    event,

    callback

){

    document.addEventListener(

        event,

        callback

    );

};

PPE.Teleprompter.Event.off=function(

    event,

    callback

){

    document.removeEventListener(

        event,

        callback

    );

};

/* ==========================================================
   READING STATISTICS
========================================================== */

PPE.Teleprompter.Statistics={

    completedSentence:0,

    completedParagraph:0,

    totalSentence:0,

    totalParagraph:0

};

PPE.Teleprompter.Statistics.reset=function(){

    PPE.Teleprompter.Statistics.completedSentence=0;

    PPE.Teleprompter.Statistics.completedParagraph=0;

};

PPE.Teleprompter.Statistics.percent=function(){

    if(

        PPE.Teleprompter.Statistics.totalSentence===0

    ){

        return 0;

    }

    return (

        PPE.Teleprompter.Statistics.completedSentence

        /

        PPE.Teleprompter.Statistics.totalSentence

    )*100;

};

PPE.Teleprompter.Statistics.finishSentence=function(){

    PPE.Teleprompter.Statistics.completedSentence++;

};

/* ==========================================================
   SMART AUTO SCROLL
========================================================== */

PPE.Teleprompter.AutoScroll={

    enabled:true,

    margin:120,

    smooth:true

};

PPE.Teleprompter.AutoScroll.scroll=function(

    element

){

    if(

        !PPE.Teleprompter.AutoScroll.enabled

    ){

        return;

    }

    if(!element){

        return;

    }

    element.scrollIntoView({

        behavior:

        PPE.Teleprompter.AutoScroll.smooth

        ?

        "smooth"

        :

        "auto",

        block:"center"

    });

};

PPE.Teleprompter.AutoScroll.enable=function(){

    PPE.Teleprompter.AutoScroll.enabled=true;

};

PPE.Teleprompter.AutoScroll.disable=function(){

    PPE.Teleprompter.AutoScroll.enabled=false;

};

/* ==========================================================
   COUNTDOWN ENGINE
========================================================== */

PPE.Teleprompter.Countdown={

    value:3,

    running:false

};

PPE.Teleprompter.Countdown.start=

async function(){

    PPE.Teleprompter.Countdown.running=true;

    while(

        PPE.Teleprompter.Countdown.value>0

    ){

        PPE.Teleprompter.Event.emit(

            "PPE_COUNTDOWN",

            {

                value:

                PPE.Teleprompter.Countdown.value

            }

        );

        await PPE.Util.Async.sleep(

            1000

        );

        PPE.Teleprompter.Countdown.value--;

    }

    PPE.Teleprompter.Countdown.running=false;

};

PPE.Teleprompter.Countdown.reset=function(){

    PPE.Teleprompter.Countdown.value=3;

};

/* ==========================================================
   AI COACH SESSION
========================================================== */

PPE.Teleprompter.Coach.startLesson=

function(){

    PPE.Teleprompter.Session.start();

    PPE.Teleprompter.Analytics.start();

};

PPE.Teleprompter.Coach.finishLesson=

function(){

    PPE.Teleprompter.Session.stop();

    PPE.Teleprompter.Analytics.finish();

};

PPE.Teleprompter.Coach.nextSentence=

function(){

    PPE.Teleprompter.Statistics

    .finishSentence();

    PPE.Teleprompter.Event.emit(

        "PPE_NEXT_SENTENCE",

        PPE.Teleprompter.position()

    );

};

PPE.Teleprompter.Coach.feedback=function(){

    return{

        score:

        PPE.Teleprompter.Coach.score,

        feedback:

        PPE.Teleprompter.Coach.feedback

    };

};

/* ==========================================================
   LEARNING MODE
========================================================== */

PPE.Teleprompter.Mode={

    current:"read",

    available:[

        "read",

        "listen",

        "shadowing",

        "speaking",

        "exam",

        "fluency"

    ]

};

PPE.Teleprompter.Mode.set=function(mode){

    if(

        PPE.Teleprompter.Mode.available

        .includes(mode)

    ){

        PPE.Teleprompter.Mode.current=mode;

    }

};

PPE.Teleprompter.Mode.get=function(){

    return PPE.Teleprompter.Mode.current;

};

PPE.Teleprompter.Mode.is=function(mode){

    return PPE.Teleprompter.Mode.current===mode;

};

/* ==========================================================
   VOICE COMMAND
========================================================== */

PPE.Teleprompter.Command={};

PPE.Teleprompter.Command.execute=function(command){

    switch(command){

        case "play":

            PPE.Teleprompter.play();

            break;

        case "pause":

            PPE.Teleprompter.pause();

            break;

        case "stop":

            PPE.Teleprompter.stop();

            break;

        case "next":

            PPE.Teleprompter.Coach

            .nextSentence();

            break;

        case "previous":

            PPE.Renderer

            .previousSentence();

            break;

    }

};

PPE.Teleprompter.Command.list=function(){

    return[

        "play",

        "pause",

        "stop",

        "next",

        "previous"

    ];

};

/* ==========================================================
   LESSON STATE
========================================================== */

PPE.Teleprompter.Lesson={

    started:false,

    completed:false,

    score:0

};

PPE.Teleprompter.Lesson.start=function(){

    PPE.Teleprompter.Lesson.started=true;

    PPE.Teleprompter.Lesson.completed=false;

};

PPE.Teleprompter.Lesson.finish=function(score){

    PPE.Teleprompter.Lesson.completed=true;

    PPE.Teleprompter.Lesson.score=score||0;

};

PPE.Teleprompter.Lesson.reset=function(){

    PPE.Teleprompter.Lesson.started=false;

    PPE.Teleprompter.Lesson.completed=false;

    PPE.Teleprompter.Lesson.score=0;

};

/* ==========================================================
   SESSION RECOVERY
========================================================== */

PPE.Teleprompter.Recovery={};

PPE.Teleprompter.Recovery.save=function(){

    return{

        paragraph:

        PPE.Teleprompter.state.currentParagraph,

        sentence:

        PPE.Teleprompter.state.currentSentence,

        speed:

        PPE.Teleprompter.state.speed,

        mode:

        PPE.Teleprompter.Mode.get()

    };

};

PPE.Teleprompter.Recovery.restore=function(state){

    if(!state){

        return;

    }

    PPE.Teleprompter.setSpeed(

        state.speed

    );

    PPE.Teleprompter.Mode.set(

        state.mode

    );

    PPE.Teleprompter.track(

        state.paragraph,

        state.sentence

    );

};

/* ==========================================================
   PERFORMANCE
========================================================== */

PPE.Teleprompter.Performance={

    fps:0,

    update:0

};

PPE.Teleprompter.Performance.begin=function(){

    PPE.Teleprompter.Performance.update=

    performance.now();

};

PPE.Teleprompter.Performance.end=function(){

    const delta=

    performance.now()

    -

    PPE.Teleprompter.Performance.update;

    if(delta>0){

        PPE.Teleprompter.Performance.fps=

        Math.round(

            1000/delta

        );

    }

};

PPE.Teleprompter.Performance.info=function(){

    return{

        fps:

        PPE.Teleprompter.Performance.fps

    };

};

/* ==========================================================
   PLUGIN API
========================================================== */

PPE.Teleprompter.Plugin={

    list:[]

};

PPE.Teleprompter.Plugin.register=

function(plugin){

    PPE.Teleprompter.Plugin.list

    .push(plugin);

};

PPE.Teleprompter.Plugin.run=

function(method,data){

    PPE.Teleprompter.Plugin.list

    .forEach(function(plugin){

        if(

            typeof plugin[method]

            ===

            "function"

        ){

            plugin[method](data);

        }

    });

};

PPE.Teleprompter.Plugin.clear=

function(){

    PPE.Teleprompter.Plugin.list=[];

};

/* ==========================================================
   SELF TEST
========================================================== */

PPE.Teleprompter.selfTest=function(){

    return{

        initialized:
        PPE.Teleprompter.state.initialized,

        ready:
        PPE.Teleprompter.state.ready,

        playing:
        PPE.Teleprompter.state.playing,

        paused:
        PPE.Teleprompter.state.paused,

        autoScroll:
        PPE.Teleprompter.state.autoScroll,

        speed:
        PPE.Teleprompter.state.speed,

        mode:
        PPE.Teleprompter.Mode.get(),

        shadowing:
        PPE.Teleprompter.isShadowing(),

        paragraph:
        PPE.Teleprompter.state.currentParagraph,

        sentence:
        PPE.Teleprompter.state.currentSentence

    };

};

/* ==========================================================
   HEALTH CHECK
========================================================== */

PPE.Teleprompter.health=function(){

    return{

        initialized:
        PPE.Teleprompter.state.initialized,

        ready:
        PPE.Teleprompter.state.ready,

        renderer:
        typeof PPE.Renderer!=="undefined",

        toolbar:
        typeof PPE.Toolbar!=="undefined",

        bridge:
        typeof PPE.Bridge!=="undefined",

        util:
        typeof PPE.Util!=="undefined"

    };

};

/* ==========================================================
   DIAGNOSTIC
========================================================== */

PPE.Teleprompter.diagnostic=function(){

    console.group(

        "PPE Teleprompter"

    );

    console.table(

        PPE.Teleprompter.selfTest()

    );

    console.table(

        PPE.Teleprompter.health()

    );

    console.groupEnd();

};

/* ==========================================================
   RUNTIME INFORMATION
========================================================== */

PPE.Teleprompter.runtime=function(){

    return{

        package:"PPE-004",

        file:"teleprompter.js",

        version:PPE.version || "1.0.0",

        initialized:
        PPE.Teleprompter.state.initialized,

        ready:
        PPE.Teleprompter.state.ready,

        playing:
        PPE.Teleprompter.state.playing,

        paused:
        PPE.Teleprompter.state.paused,

        speed:
        PPE.Teleprompter.state.speed,

        autoScroll:
        PPE.Teleprompter.state.autoScroll,

        currentParagraph:
        PPE.Teleprompter.state.currentParagraph,

        currentSentence:
        PPE.Teleprompter.state.currentSentence

    };

};

/* ==========================================================
   REGISTER ENGINE
========================================================== */

PPE.Engine.Teleprompter=

PPE.Teleprompter;

/* ==========================================================
   AUTO BOOT
========================================================== */

PPE.Teleprompter.boot=function(){

    if(!PPE.Initialize){

        PPE.Initialize={};

    }

    if(!PPE.Teleprompter.state.initialized){

        PPE.Teleprompter.initialize(

            "ppeContent"

        );

    }

    PPE.Initialize.teleprompter=true;

    PPE.Teleprompter.state.ready=true;

    PPE.Teleprompter.Event.emit(

        "PPE_TELEPROMPTER_READY",

        PPE.Teleprompter.runtime()

    );

    return true;

};

/* ==========================================================
   CERTIFICATION MARKER

   Package : PPE-004

   File : teleprompter.js

   Status :

   IMPLEMENTATION COMPLETE

========================================================== */