/*
==========================================================
POLYGLOT PRESENTATION ENGINE

Package : PPE-005

File : progress.js

Version : 1.0.0-alpha.1

==========================================================
*/

"use strict";

/* ==========================================================
   PROGRESS ENGINE
========================================================== */

PPE.Progress={};

/* ==========================================================
   STATE
========================================================== */

PPE.Progress.state={

    initialized:false,

ready:false,

    xp:0,

    level:1,

    streak:0,

    completedLesson:0,

    completedSentence:0,

    completedParagraph:0,

    totalLesson:0,

    totalSentence:0,

    totalParagraph:0

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.Progress.initialize=function(){

    PPE.Progress.state.initialized=true;

    PPE.Progress.state.ready=true;

    if(!PPE.Initialize){

        PPE.Initialize={};

    }

    PPE.Initialize.progress=true;

    return true;

};

/* ==========================================================
   REGISTER
========================================================== */

PPE.Engine.Progress=

PPE.Progress;

/* ==========================================================
   XP ENGINE
========================================================== */

PPE.Progress.addXP=function(value){

    PPE.Progress.state.xp+=value;

};

PPE.Progress.removeXP=function(value){

    PPE.Progress.state.xp-=value;

    if(

        PPE.Progress.state.xp<0

    ){

        PPE.Progress.state.xp=0;

    }

};

PPE.Progress.getXP=function(){

    return PPE.Progress.state.xp;

};

/* ==========================================================
   LEVEL
========================================================== */

PPE.Progress.getLevel=function(){

    return PPE.Progress.state.level;

};

PPE.Progress.setLevel=function(level){

    PPE.Progress.state.level=level;

};

/* ==========================================================
   LESSON PROGRESS
========================================================== */

PPE.Progress.finishLesson=function(){

    PPE.Progress.state.completedLesson++;

};

PPE.Progress.finishParagraph=function(){

    PPE.Progress.state.completedParagraph++;

};

PPE.Progress.finishSentence=function(){

    PPE.Progress.state.completedSentence++;

};

/* ==========================================================
   PERCENT
========================================================== */

PPE.Progress.percent=function(){

    if(

        PPE.Progress.state.totalSentence===0

    ){

        return 0;

    }

    return(

        PPE.Progress.state.completedSentence

        /

        PPE.Progress.state.totalSentence

    )*100;

};

/* ==========================================================
   STREAK ENGINE
========================================================== */

PPE.Progress.Streak={

    current:0,

    longest:0,

    lastStudy:null

};

PPE.Progress.Streak.update=function(){

    PPE.Progress.Streak.current++;

    if(

        PPE.Progress.Streak.current>

        PPE.Progress.Streak.longest

    ){

        PPE.Progress.Streak.longest=

        PPE.Progress.Streak.current;

    }

    PPE.Progress.Streak.lastStudy=

    Date.now();

};

PPE.Progress.Streak.reset=function(){

    PPE.Progress.Streak.current=0;

};

PPE.Progress.Streak.value=function(){

    return PPE.Progress.Streak.current;

};

/* ==========================================================
   ACHIEVEMENT ENGINE
========================================================== */

PPE.Progress.Achievement={

    list:[]

};

PPE.Progress.Achievement.unlock=

function(id){

    if(

        !PPE.Progress.Achievement.list

        .includes(id)

    ){

        PPE.Progress.Achievement.list

        .push(id);

    }

};

PPE.Progress.Achievement.locked=

function(id){

    return !

    PPE.Progress.Achievement.list

    .includes(id);

};

PPE.Progress.Achievement.all=

function(){

    return PPE.Progress.Achievement.list;

};

/* ==========================================================
   LEVEL ENGINE
========================================================== */

PPE.Progress.Level={

    baseXP:100

};

PPE.Progress.Level.calculate=function(){

    return Math.floor(

        PPE.Progress.state.xp

        /

        PPE.Progress.Level.baseXP

    )+1;

};

PPE.Progress.Level.refresh=function(){

    PPE.Progress.state.level=

    PPE.Progress.Level.calculate();

};

PPE.Progress.Level.nextXP=function(){

    return

    PPE.Progress.state.level

    *

    PPE.Progress.Level.baseXP;

};

/* ==========================================================
   DAILY MISSION ENGINE
========================================================== */

PPE.Progress.Mission={

    list:[],

    completed:[]

};

PPE.Progress.Mission.add=function(

    id,

    title,

    xp

){

    PPE.Progress.Mission.list.push({

        id:id,

        title:title,

        xp:xp

    });

};

PPE.Progress.Mission.finish=function(id){

    if(

        PPE.Progress.Mission.completed

        .includes(id)

    ){

        return;

    }

    PPE.Progress.Mission.completed.push(id);

};

PPE.Progress.Mission.clear=function(){

    PPE.Progress.Mission.completed=[];

};

/* ==========================================================
   XP REWARD ENGINE
========================================================== */

PPE.Progress.Reward={};

PPE.Progress.Reward.lesson=function(){

    PPE.Progress.addXP(50);

};

PPE.Progress.Reward.paragraph=function(){

    PPE.Progress.addXP(10);

};

PPE.Progress.Reward.sentence=function(){

    PPE.Progress.addXP(2);

};

PPE.Progress.Reward.bonus=function(value){

    PPE.Progress.addXP(

        value

    );

    PPE.Progress.Level.refresh();

};

/* ==========================================================
   STATISTICS ENGINE
========================================================== */

PPE.Progress.Statistics={

    readingTime:0,

    lessonTime:0,

    totalXP:0,

    totalScore:0

};

PPE.Progress.Statistics.addReadingTime=

function(second){

    PPE.Progress.Statistics.readingTime+=

    second;

};

PPE.Progress.Statistics.addLessonTime=

function(second){

    PPE.Progress.Statistics.lessonTime+=

    second;

};

PPE.Progress.Statistics.averageScore=

function(){

    return PPE.Progress.Statistics.totalScore;

};

PPE.Progress.Statistics.snapshot=

function(){

    return{

        xp:

        PPE.Progress.getXP(),

        level:

        PPE.Progress.getLevel(),

        streak:

        PPE.Progress.Streak.value(),

        progress:

        PPE.Progress.percent()

    };

};

/* ==========================================================
   DAILY GOAL ENGINE
========================================================== */

PPE.Progress.Goal={

    lesson:5,

    sentence:100,

    xp:500

};

PPE.Progress.Goal.completed=function(){

    return{

        lesson:

        PPE.Progress.state.completedLesson

        >=

        PPE.Progress.Goal.lesson,

        sentence:

        PPE.Progress.state.completedSentence

        >=

        PPE.Progress.Goal.sentence,

        xp:

        PPE.Progress.state.xp

        >=

        PPE.Progress.Goal.xp

    };

};

PPE.Progress.Goal.reset=function(){

    PPE.Progress.state.completedLesson=0;

    PPE.Progress.state.completedSentence=0;

};

/* ==========================================================
   WEEKLY STATISTICS
========================================================== */

PPE.Progress.Weekly={

    day:[

        0,0,0,0,0,0,0

    ]

};

PPE.Progress.Weekly.add=function(

    index,

    xp

){

    if(

        index>=0

        &&

        index<7

    ){

        PPE.Progress.Weekly.day[index]+=

        xp;

    }

};

PPE.Progress.Weekly.total=function(){

    return PPE.Progress.Weekly.day

    .reduce(function(a,b){

        return a+b;

    },0);

};

PPE.Progress.Weekly.clear=function(){

    PPE.Progress.Weekly.day=[

        0,0,0,0,0,0,0

    ];

};

/* ==========================================================
   LEVEL UP EVENT
========================================================== */

PPE.Progress.Event={};

PPE.Progress.Event.levelUp=function(){

    document.dispatchEvent(

        new CustomEvent(

            "PPE_LEVEL_UP",

            {

                detail:{

                    level:

                    PPE.Progress.getLevel()

                }

            }

        )

    );

};

PPE.Progress.checkLevel=function(){

    const oldLevel=

    PPE.Progress.state.level;

    PPE.Progress.Level.refresh();

    if(

        PPE.Progress.state.level>

        oldLevel

    ){

        PPE.Progress.Event.levelUp();

    }

};

/* ==========================================================
   BADGE ENGINE
========================================================== */

PPE.Progress.Badge={

    list:[]

};

PPE.Progress.Badge.unlock=function(

    id,

    title

){

    if(

        PPE.Progress.Badge.has(id)

    ){

        return;

    }

    PPE.Progress.Badge.list.push({

        id:id,

        title:title,

        unlockedAt:

        Date.now()

    });

};

PPE.Progress.Badge.has=function(id){

    return PPE.Progress.Badge.list

    .some(function(item){

        return item.id===id;

    });

};

PPE.Progress.Badge.all=function(){

    return PPE.Progress.Badge.list;

};

/* ==========================================================
   XP MULTIPLIER
========================================================== */

PPE.Progress.Multiplier={

    value:1,

    combo:0

};

PPE.Progress.Multiplier.reset=function(){

    PPE.Progress.Multiplier.value=1;

    PPE.Progress.Multiplier.combo=0;

};

PPE.Progress.Multiplier.hit=function(){

    PPE.Progress.Multiplier.combo++;

    PPE.Progress.Multiplier.value=

    1+

    (

        PPE.Progress.Multiplier.combo

        *

        0.1

    );

};

PPE.Progress.Multiplier.apply=function(

    xp

){

    return Math.round(

        xp*

        PPE.Progress.Multiplier.value

    );

};

/* ==========================================================
   SKILL PROGRESS
========================================================== */

PPE.Progress.Skill={

    reading:0,

    speaking:0,

    listening:0,

    vocabulary:0,

    grammar:0

};

PPE.Progress.Skill.add=function(

    skill,

    value

){

    if(

        PPE.Progress.Skill

        .hasOwnProperty(skill)

    ){

        PPE.Progress.Skill[skill]+=

        value;

    }

};

PPE.Progress.Skill.get=function(skill){

    return PPE.Progress.Skill[skill]||0;

};

PPE.Progress.Skill.snapshot=function(){

    return{

        reading:

        PPE.Progress.Skill.reading,

        speaking:

        PPE.Progress.Skill.speaking,

        listening:

        PPE.Progress.Skill.listening,

        vocabulary:

        PPE.Progress.Skill.vocabulary,

        grammar:

        PPE.Progress.Skill.grammar

    };

};

/* ==========================================================
   LEADERBOARD PROFILE
========================================================== */

PPE.Progress.Profile={

    username:"",

    avatar:"",

    country:"",

    rank:0

};

PPE.Progress.Profile.update=function(data){

    Object.assign(

        PPE.Progress.Profile,

        data

    );

};

PPE.Progress.Profile.snapshot=function(){

    return{

        username:

        PPE.Progress.Profile.username,

        avatar:

        PPE.Progress.Profile.avatar,

        country:

        PPE.Progress.Profile.country,

        rank:

        PPE.Progress.Profile.rank

    };

};

/* ==========================================================
   PROGRESS SYNC
========================================================== */

PPE.Progress.Sync={

    enabled:true,

    lastSync:0

};

PPE.Progress.Sync.mark=function(){

    PPE.Progress.Sync.lastSync=

    Date.now();

};

PPE.Progress.Sync.snapshot=function(){

    return{

        xp:

        PPE.Progress.getXP(),

        level:

        PPE.Progress.getLevel(),

        streak:

        PPE.Progress.Streak.value(),

        skills:

        PPE.Progress.Skill.snapshot(),

        lastSync:

        PPE.Progress.Sync.lastSync

    };

};

PPE.Progress.Sync.restore=function(data){

    if(!data){

        return;

    }

    PPE.Progress.state.xp=

    data.xp||0;

    PPE.Progress.state.level=

    data.level||1;

};

/* ==========================================================
   LEARNING ANALYTICS
========================================================== */

PPE.Progress.Analytics={

    session:0,

    totalStudyTime:0,

    averageAccuracy:0,

    averagePronunciation:0

};

PPE.Progress.Analytics.addStudyTime=

function(second){

    PPE.Progress.Analytics.totalStudyTime+=

    second;

};

PPE.Progress.Analytics.updateAccuracy=

function(score){

    PPE.Progress.Analytics.averageAccuracy=

    score;

};

PPE.Progress.Analytics.updatePronunciation=

function(score){

    PPE.Progress.Analytics.averagePronunciation=

    score;

};

PPE.Progress.Analytics.report=

function(){

    return{

        studyTime:

        PPE.Progress.Analytics.totalStudyTime,

        accuracy:

        PPE.Progress.Analytics.averageAccuracy,

        pronunciation:

        PPE.Progress.Analytics.averagePronunciation

    };

};

/* ==========================================================
   SEASON PASS ENGINE
========================================================== */

PPE.Progress.Season={

    id:1,

    xp:0,

    tier:1,

    premium:false

};

PPE.Progress.Season.addXP=function(

    value

){

    PPE.Progress.Season.xp+=value;

    PPE.Progress.Season.tier=

    Math.floor(

        PPE.Progress.Season.xp/

        500

    )+1;

};

PPE.Progress.Season.enablePremium=

function(){

    PPE.Progress.Season.premium=true;

};

PPE.Progress.Season.snapshot=

function(){

    return{

        id:

        PPE.Progress.Season.id,

        tier:

        PPE.Progress.Season.tier,

        xp:

        PPE.Progress.Season.xp,

        premium:

        PPE.Progress.Season.premium

    };

};

/* ==========================================================
   CHALLENGE ENGINE
========================================================== */

PPE.Progress.Challenge={

    active:[],

    completed:[]

};

PPE.Progress.Challenge.add=function(

    challenge

){

    PPE.Progress.Challenge.active

    .push(challenge);

};

PPE.Progress.Challenge.finish=function(

    id

){

    PPE.Progress.Challenge.completed

    .push(id);

};

PPE.Progress.Challenge.clear=function(){

    PPE.Progress.Challenge.active=[];

    PPE.Progress.Challenge.completed=[];

};

PPE.Progress.Challenge.snapshot=

function(){

    return{

        active:

        PPE.Progress.Challenge.active,

        completed:

        PPE.Progress.Challenge.completed

    };

};

/* ==========================================================
   EVENT BUS
========================================================== */

PPE.Progress.Event.emit=function(

    name,

    detail

){

    document.dispatchEvent(

        new CustomEvent(

            name,

            {

                detail:detail

            }

        )

    );

};

PPE.Progress.Event.on=function(

    name,

    callback

){

    document.addEventListener(

        name,

        callback

    );

};

PPE.Progress.Event.off=function(

    name,

    callback

){

    document.removeEventListener(

        name,

        callback

    );

};

/* ==========================================================
   XP EVENT
========================================================== */

PPE.Progress.notifyXP=function(){

    PPE.Progress.Event.emit(

        "PPE_XP_CHANGED",

        {

            xp:

            PPE.Progress.getXP(),

            level:

            PPE.Progress.getLevel()

        }

    );

};

/* ==========================================================
   MILESTONE ENGINE
========================================================== */

PPE.Progress.Milestone={

    list:[]

};

PPE.Progress.Milestone.add=function(

    id,

    target,

    reward

){

    PPE.Progress.Milestone.list.push({

        id:id,

        target:target,

        reward:reward,

        completed:false

    });

};

PPE.Progress.Milestone.complete=function(id){

    PPE.Progress.Milestone.list.forEach(

        function(item){

            if(item.id===id){

                item.completed=true;

            }

        }

    );

};

PPE.Progress.Milestone.all=function(){

    return PPE.Progress.Milestone.list;

};

/* ==========================================================
   PROFILE SUMMARY
========================================================== */

PPE.Progress.Profile.summary=

function(){

    return{

        xp:

        PPE.Progress.getXP(),

        level:

        PPE.Progress.getLevel(),

        streak:

        PPE.Progress.Streak.value(),

        badge:

        PPE.Progress.Badge.list.length,

        achievement:

        PPE.Progress.Achievement.list.length,

        completedLesson:

        PPE.Progress.state.completedLesson

    };

};

PPE.Progress.Profile.reset=

function(){

    PPE.Progress.Profile.update({

        username:"",

        avatar:"",

        country:"",

        rank:0

    });

};

/* ==========================================================
   EXPORT / IMPORT
========================================================== */

PPE.Progress.export=function(){

    return{

        state:

        PPE.Progress.state,

        streak:

        PPE.Progress.Streak,

        badge:

        PPE.Progress.Badge.list,

        skill:

        PPE.Progress.Skill.snapshot(),

        analytics:

        PPE.Progress.Analytics.report()

    };

};

PPE.Progress.import=function(data){

    if(!data){

        return;

    }

    PPE.Progress.state=

    data.state||

    PPE.Progress.state;

};

/* ==========================================================
   PERFORMANCE ENGINE
========================================================== */

PPE.Progress.Performance={

    startTime:0,

    endTime:0,

    duration:0

};

PPE.Progress.Performance.begin=function(){

    PPE.Progress.Performance.startTime=

    performance.now();

};

PPE.Progress.Performance.end=function(){

    PPE.Progress.Performance.endTime=

    performance.now();

    PPE.Progress.Performance.duration=

    PPE.Progress.Performance.endTime

    -

    PPE.Progress.Performance.startTime;

};

PPE.Progress.Performance.info=function(){

    return{

        duration:

        PPE.Progress.Performance.duration

    };

};

/* ==========================================================
   CACHE
========================================================== */

PPE.Progress.Cache={};

PPE.Progress.Cache.snapshot=null;

/* ==========================================================
   RECOVERY ENGINE
========================================================== */

PPE.Progress.Recovery={};

PPE.Progress.Recovery.save=function(){

    PPE.Progress.Cache.snapshot=

    PPE.Progress.export();

};

PPE.Progress.Recovery.restore=function(){

    if(

        PPE.Progress.Cache.snapshot

    ){

        PPE.Progress.import(

            PPE.Progress.Cache.snapshot

        );

    }

};

PPE.Progress.Recovery.clear=function(){

    PPE.Progress.Cache.snapshot=null;

};

/* ==========================================================
   PLUGIN API
========================================================== */

PPE.Progress.Plugin={

    list:[]

};

PPE.Progress.Plugin.register=function(plugin){

    PPE.Progress.Plugin.list.push(

        plugin

    );

};

PPE.Progress.Plugin.execute=function(

    method,

    data

){

    PPE.Progress.Plugin.list.forEach(

        function(plugin){

            if(

                typeof plugin[method]

                ===

                "function"

            ){

                plugin[method](data);

            }

        }

    );

};

PPE.Progress.Plugin.clear=function(){

    PPE.Progress.Plugin.list=[];

};

/* ==========================================================
   SELF TEST
========================================================== */

PPE.Progress.selfTest=function(){

    return{

        initialized:
        PPE.Progress.state.initialized,

        ready:
        PPE.Progress.state.ready,

        xp:
        PPE.Progress.getXP(),

        level:
        PPE.Progress.getLevel(),

        streak:
        PPE.Progress.Streak.value(),

        progress:
        PPE.Progress.percent(),

        badge:
        PPE.Progress.Badge.list.length,

        achievement:
        PPE.Progress.Achievement.list.length

    };

};

/* ==========================================================
   HEALTH CHECK
========================================================== */

PPE.Progress.health=function(){

    return{

        initialized:
        PPE.Progress.state.initialized,

        ready:
        PPE.Progress.state.ready,

        renderer:
        typeof PPE.Renderer!=="undefined",

        teleprompter:
        typeof PPE.Teleprompter!=="undefined",

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

PPE.Progress.diagnostic=function(){

    console.group(

        "PPE Progress"

    );

    console.table(

        PPE.Progress.selfTest()

    );

    console.table(

        PPE.Progress.health()

    );

    console.groupEnd();

};

/* ==========================================================
   RUNTIME
========================================================== */

PPE.Progress.runtime=function(){

    return{

        package:"PPE-005",

        file:"progress.js",

        version:PPE.version || "1.0.0",

        initialized:
        PPE.Progress.state.initialized,

        ready:
        PPE.Progress.state.ready,

        xp:
        PPE.Progress.getXP(),

        level:
        PPE.Progress.getLevel(),

        streak:
        PPE.Progress.Streak.value(),

        progress:
        PPE.Progress.percent()

    };

};

/* ==========================================================
   REGISTER ENGINE
========================================================== */

PPE.Engine.Progress=

PPE.Progress;

/* ==========================================================
   AUTO BOOT
========================================================== */

PPE.Progress.boot=function(){

    if(!PPE.Initialize){

        PPE.Initialize={};

    }

    if(!PPE.Progress.state.initialized){

        PPE.Progress.initialize();

    }

    PPE.Initialize.progress=true;

    PPE.Progress.state.ready=true;

    PPE.Progress.Event.emit(

        "PPE_PROGRESS_READY",

        PPE.Progress.runtime()

    );

    return true;

};

/* ==========================================================
   CERTIFICATION MARKER

   Package : PPE-005

   File : progress.js

   Status :

   IMPLEMENTATION COMPLETE

========================================================== */