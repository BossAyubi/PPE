/*
==========================================================
POLYGLOT PRESENTATION ENGINE (PPE)

File        : config.js
Module      : Core Configuration
Package     : PPE-001
Version     : 1.0.0-alpha.1

Copyright (c) Polyglot Academy

==========================================================
*/

"use strict";

/* ==========================================================
   PPE GLOBAL OBJECT
========================================================== */

if(typeof PPE==="undefined"){

    throw new Error(

        "PPE Core belum dimuat. Pastikan constants.js dimuat sebelum config.js."

    );

}

PPE.appName="Polyglot Presentation Engine";

PPE.shortName="PPE";

PPE.version="1.0.0-alpha.1";

PPE.codename="Genesis";

PPE.author="Polyglot Academy";

PPE.website="";

PPE.build=1;

PPE.debug=false;

PPE.initialized=false;

/* ==========================================================
   APPLICATION MODE
========================================================== */

PPE.Mode = {

    READING : "reading",

    SHADOWING : "shadowing",

    SPEAKING : "speaking",

    CREATOR : "creator",

    VIDEO : "video",

    STORY : "story",

    ARTICLE : "article",

    AI : "ai"

};

PPE.currentMode = PPE.Mode.READING;

/* ==========================================================
   MEMBERSHIP
========================================================== */

PPE.Membership = {

    FREE : "free",

    PREMIUM : "premium",

    ADMIN : "admin"

};

PPE.currentMembership = PPE.Membership.FREE;

/* ==========================================================
   DEFAULT THEME
========================================================== */

PPE.Theme = {

    CYBER : "cyber",

    DARK : "dark",

    AMOLED : "amoled",

    LIGHT : "light"

};

PPE.currentTheme = PPE.Theme.CYBER;

/* ==========================================================
   SCREEN
========================================================== */

PPE.Screen = {

    width : 0,

    height : 0,

    orientation : "portrait"

};

/* ==========================================================
   READING STATE
========================================================== */

PPE.Reading = {

    topicId : 0,

    paragraph : 0,

    sentence : 0,

    progress : 0,

    duration : 0,

    speed : 1.0,

    playing : false,

    paused : false

};

/* ==========================================================
   AUDIO CONFIGURATION
========================================================== */

PPE.Audio = {

    enabled : true,

    backgroundMusic : true,

    narration : true,

    soundEffect : true,

    volume : 100,

    backgroundVolume : 40,

    narrationVolume : 100,

    effectVolume : 80,

    autoPlay : false,

    autoPause : true

};

/* ==========================================================
   TELEPROMPTER CONFIGURATION
========================================================== */

PPE.Teleprompter = {

    enabled : true,

    autoScroll : false,

    scrollSpeed : 1.0,

    minSpeed : 0.5,

    maxSpeed : 5.0,

    smoothScroll : true,

    centerLine : true,

    paragraphHighlight : true,

    sentenceHighlight : false,

    autoHideToolbar : false,

    manualScrollDetection : true,

    rememberLastPosition : true,

    animation : true

};

/* ==========================================================
   TOOLBAR CONFIGURATION
========================================================== */

PPE.Toolbar = {

    visible : true,

    floating : false,

    playButton : true,

    pauseButton : true,

    previousButton : true,

    nextButton : true,

    fullscreenButton : true,

    themeButton : true,

    fontButton : true,

    speedButton : true,

    bookmarkButton : true,

    creatorButton : false,

    aiButton : true

};

/* ==========================================================
   PROGRESS CONFIGURATION
========================================================== */

PPE.Progress = {

    enabled : true,

    animated : true,

    showPercentage : true,

    showReadingTime : true,

    showParagraph : true,

    showSentence : true

};

/* ==========================================================
   FONT CONFIGURATION
========================================================== */

PPE.Font = {

    family : "Arial",

    size : 30,

    minSize : 18,

    maxSize : 60,

    lineHeight : 1.8,

    letterSpacing : 0,

    wordSpacing : 0,

    bold : false,

    italic : false,

    uppercase : false,

    align : "left",

    justify : false

};

/* ==========================================================
   ANIMATION CONFIGURATION
========================================================== */

PPE.Animation = {

    enabled : true,

    fade : true,

    slide : true,

    zoom : false,

    duration : 300,

    easing : "ease",

    smoothScrolling : true,

    glowEffect : true,

    rippleEffect : false

};

/* ==========================================================
   STORAGE CONFIGURATION
========================================================== */

PPE.Storage = {

    enabled : true,

    autoSave : true,

    saveInterval : 30,

    rememberTopic : true,

    rememberParagraph : true,

    rememberSpeed : true,

    rememberTheme : true,

    rememberFontSize : true,

    rememberMembership : true,

    rememberLanguage : true

};

/* ==========================================================
   AI CONFIGURATION
========================================================== */

PPE.AI = {

    enabled : true,

    grammar : true,

    pronunciation : true,

    vocabulary : true,

    fluency : true,

    naturalness : true,

    suggestion : true,

    feedback : true,

    autoAnalysis : false,

    provider : "Groq"

};

/* ==========================================================
   BRIDGE CONFIGURATION
========================================================== */

PPE.Bridge = {

    enabled : true,

    connected : false,

    ready : false,

    version : "1.0.0",

    receiveTopic : true,

    receiveArticle : true,

    receiveStory : true,

    receiveVideo : true,

    receiveMembership : true,

    receiveTheme : true,

    receiveSpeed : true,

    sendProgress : true,

    sendBookmark : true,

    sendReadingTime : true

};

/* ==========================================================
   LANGUAGE CONFIGURATION
========================================================== */

PPE.Language = {

    app : "en",

    source : "id",

    target : "en",

    autoDetect : false,

    translateInterface : false,

    translateArticle : false,

    translateSubtitle : false,

    speechRecognition : "en-US",

    speechSynthesis : "en-US"

};

/* ==========================================================
   VIDEO CONFIGURATION
========================================================== */

PPE.Video = {

    enabled : true,

    autoPlay : false,

    autoPause : true,

    showSubtitle : true,

    subtitleLanguage : "en",

    playbackSpeed : 1.0,

    rememberPosition : true,

    pictureInPicture : false,

    fullScreen : true,

    controls : true

};

/* ==========================================================
   CREATOR MODE
========================================================== */

PPE.Creator = {

    enabled : false,

    recording : false,

    microphone : true,

    camera : true,

    exportVideo : true,

    exportSubtitle : true,

    exportAudio : true,

    watermark : false,

    autoCaption : true,

    template : "default"

};

/* ==========================================================
   SHADOWING CONFIGURATION
========================================================== */

PPE.Shadowing = {

    enabled : true,

    repeatCount : 5,

    pauseBetweenSentence : 10000,

    autoRepeat : true,

    highlightSentence : true,

    playNativeFirst : true,

    playUserVoice : true,

    compareVoice : true,

    showWaveform : true

};

/* ==========================================================
   SUBTITLE CONFIGURATION
========================================================== */

PPE.Subtitle = {

    enabled : true,

    fontSize : 28,

    color : "#FFFFFF",

    background : "transparent",

    outline : true,

    shadow : false,

    align : "center",

    animation : true

};

/* ==========================================================
   VOICE COMPARISON
========================================================== */

PPE.VoiceComparison = {

    enabled : true,

    waveform : true,

    score : true,

    pronunciation : true,

    intonation : true,

    fluency : true,

    confidence : true,

    timeline : true

};

/* ==========================================================
   USER INTERFACE CONFIGURATION
========================================================== */

PPE.UI = {

    splashScreen : true,

    loadingAnimation : true,

    loadingMessage : "Loading...",

    showHeader : true,

    showToolbar : true,

    showStatusBar : true,

    showProgressBar : true,

    showClock : true,

    showTopicTitle : true,

    showParagraphNumber : true,

    showReadingTimer : true,

    showConnectionStatus : false,

    immersiveMode : false

};

/* ==========================================================
   NETWORK CONFIGURATION
========================================================== */

PPE.Network = {

    online : true,

    timeout : 30000,

    retry : 3,

    retryDelay : 2000,

    cache : true,

    preload : true,

    preloadNextTopic : true,

    compressRequest : true,

    compressResponse : true

};

/* ==========================================================
   CACHE CONFIGURATION
========================================================== */

PPE.Cache = {

    enabled : true,

    topic : true,

    article : true,

    image : true,

    audio : true,

    video : true,

    ai : false,

    maxSize : 100,

    clearOnLogout : true

};

/* ==========================================================
   SECURITY CONFIGURATION
========================================================== */

PPE.Security = {

    sanitizeHTML : true,

    allowInlineHTML : false,

    allowScriptInjection : false,

    allowExternalScript : false,

    encryptBookmark : false,

    encryptStorage : false,

    verifyBridge : true,

    safeMode : true

};

/* ==========================================================
   DEBUG CONFIGURATION
========================================================== */

PPE.Debug = {

    enableConsole : false,

    showFPS : false,

    showPerformance : false,

    showMemory : false,

    showEventLog : false,

    verbose : false

};

/* ==========================================================
   PERFORMANCE CONFIGURATION
========================================================== */

PPE.Performance = {

    useRequestAnimationFrame : true,

    lazyRender : true,

    lazyImage : true,

    recycleParagraph : false,

    virtualScroll : false,

    maxRenderParagraph : 500,

    targetFPS : 60

};

/* ==========================================================
   SYSTEM CONSTANTS
========================================================== */

PPE.Constants = {

    MAX_TOPIC : 9999,

    MAX_PARAGRAPH : 1000,

    MAX_SENTENCE : 10000,

    MAX_BOOKMARK : 1000,

    MAX_HISTORY : 500,

    MAX_FONT_SIZE : 60,

    MIN_FONT_SIZE : 18,

    DEFAULT_FONT_SIZE : 30,

    DEFAULT_SPEED : 1.0,

    DEFAULT_VOLUME : 100,

    DEFAULT_THEME : "cyber",

    DEFAULT_LANGUAGE : "en",

    DEFAULT_MODE : "reading"

};

/* ==========================================================
   EVENT NAMES
========================================================== */

PPE.Event = {

    INITIALIZE : "initialize",

    READY : "ready",

    LOAD_TOPIC : "loadTopic",

    RENDER_COMPLETE : "renderComplete",

    PLAY : "play",

    PAUSE : "pause",

    STOP : "stop",

    NEXT_PARAGRAPH : "nextParagraph",

    PREVIOUS_PARAGRAPH : "previousParagraph",

    CHANGE_SPEED : "changeSpeed",

    CHANGE_THEME : "changeTheme",

    CHANGE_FONT : "changeFont",

    ENTER_FULLSCREEN : "enterFullscreen",

    EXIT_FULLSCREEN : "exitFullscreen",

    BOOKMARK : "bookmark",

    AUTO_SCROLL_START : "autoScrollStart",

    AUTO_SCROLL_STOP : "autoScrollStop"

};

/* ==========================================================
   ERROR CODES
========================================================== */

PPE.Error = {

    NONE : 0,

    UNKNOWN : 1,

    INVALID_TOPIC : 100,

    INVALID_PARAGRAPH : 101,

    INVALID_JSON : 102,

    FILE_NOT_FOUND : 103,

    NETWORK_ERROR : 104,

    AI_ERROR : 105,

    MEMBERSHIP_REQUIRED : 106,

    STORAGE_ERROR : 107,

    RENDER_ERROR : 108,

    BRIDGE_ERROR : 109

};

/* ==========================================================
   LOG LEVEL
========================================================== */

PPE.LogLevel = {

    NONE : 0,

    ERROR : 1,

    WARNING : 2,

    INFO : 3,

    DEBUG : 4

};

PPE.logLevel = PPE.LogLevel.ERROR;

/* ==========================================================
   VERSION INFORMATION
========================================================== */

PPE.Version = {

    major : 1,

    minor : 0,

    patch : 0,

    stage : "alpha",

    build : 1,

    api : 1

};

/* ==========================================================
   FEATURE FLAGS
========================================================== */

PPE.Feature = {

    Teleprompter : true,

    Toolbar : true,

    Progress : true,

    ParagraphHighlight : true,

    Bookmark : true,

    Fullscreen : true,

    Theme : true,

    Renderer : true,

    Bridge : true,

    AI : true,

    Membership : true,

    Translation : true,

    Shadowing : true,

    VoiceComparison : true,

    Pronunciation : true,

    Creator : true,

    StoryMode : true,

    ArticleMode : true,

    VideoMode : true,

    Subtitle : true,

    Audio : true

};

/* ==========================================================
   FILE CONFIGURATION
========================================================== */

PPE.File = {

    topicExtension : ".json",

    articleExtension : ".json",

    subtitleExtension : ".vtt",

    audioExtension : ".mp3",

    imageExtension : ".png",

    videoExtension : ".mp4"

};

/* ==========================================================
   CLOUD CONFIGURATION
========================================================== */

PPE.Cloud = {

    provider : "Cloudinary",

    enabled : true,

    preload : true,

    cache : true,

    timeout : 30000,

    retry : 3

};

/* ==========================================================
   FIREBASE CONFIGURATION
========================================================== */

PPE.Firebase = {

    enabled : true,

    realtime : true,

    analytics : false,

    authentication : false,

    storage : false,

    firestore : false

};

/* ==========================================================
   API CONFIGURATION
========================================================== */

PPE.API = {

    provider : "Groq",

    enabled : true,

    timeout : 60000,

    retry : 3,

    maxToken : 8192,

    temperature : 0.7

};

/* ==========================================================
   DEVELOPMENT INFORMATION
========================================================== */

PPE.Development = {

    project : "Polyglot Academy",

    engine : "Polyglot Presentation Engine",

    architecture : "Modular",

    framework : "Vanilla JavaScript",

    platform : "Kodular",

    status : "Production Development"

};

/* ==========================================================
   PATH CONFIGURATION
========================================================== */

PPE.Path = {

    root : "",

    assets : "assets/",

    css : "css/",

    js : "js/",

    image : "assets/image/",

    icon : "assets/icon/",

    audio : "assets/audio/",

    video : "assets/video/",

    topic : "assets/topic/",

    subtitle : "assets/subtitle/",

    temp : "temp/"

};

/* ==========================================================
   PERFORMANCE LIMIT
========================================================== */

PPE.Limit = {

    maxTopic : 9999,

    maxParagraph : 5000,

    maxSentence : 50000,

    maxBookmark : 1000,

    maxUndo : 100,

    maxRedo : 100,

    maxHistory : 1000,

    maxRecent : 50

};

/* ==========================================================
   SESSION CONFIGURATION
========================================================== */

PPE.Session = {

    active : false,

    login : false,

    startTime : 0,

    endTime : 0,

    readingTime : 0,

    currentTopic : 0,

    currentParagraph : 0,

    currentSentence : 0,

    currentLanguage : "en"

};

/* ==========================================================
   RUNTIME STATE
========================================================== */

PPE.Runtime = {

    initialized : false,

    rendering : false,

    scrolling : false,

    fullscreen : false,

    loading : false,

    bridgeReady : false,

    aiReady : false,

    cloudReady : false,

    firebaseReady : false,

    storageReady : false

};

/* ==========================================================
   UPDATE CONFIGURATION
========================================================== */

PPE.Update = {

    autoCheck : false,

    autoDownload : false,

    currentVersion : "1.0.0-alpha.1",

    latestVersion : "",

    build : 1

};

/* ==========================================================
   COMPATIBILITY
========================================================== */

PPE.Compatibility = {

    minimumAndroid : 7,

    recommendedAndroid : 10,

    webView : true,

    javascript : true,

    localStorage : true,

    fullscreen : true,

    speechRecognition : true,

    speechSynthesis : true

};

/* ==========================================================
   DEFAULT STORAGE KEY
========================================================== */

PPE.StorageKey = {

    Theme : "PPE_THEME",

    FontSize : "PPE_FONT_SIZE",

    ReadingSpeed : "PPE_READING_SPEED",

    CurrentTopic : "PPE_CURRENT_TOPIC",

    CurrentParagraph : "PPE_CURRENT_PARAGRAPH",

    CurrentSentence : "PPE_CURRENT_SENTENCE",

    Bookmark : "PPE_BOOKMARK",

    Membership : "PPE_MEMBERSHIP",

    Language : "PPE_LANGUAGE",

    CreatorMode : "PPE_CREATOR_MODE",

    LastOpen : "PPE_LAST_OPEN",

    Session : "PPE_SESSION"

};

/* ==========================================================
   DEFAULT TIMER
========================================================== */

PPE.Timer = {

    Animation : 16,

    Progress : 100,

    AutoSave : 30000,

    Session : 1000,

    Bridge : 500,

    AI : 1000,

    Subtitle : 30,

    Shadowing : 100,

    Loading : 300,

    Transition : 250

};

/* ==========================================================
   FILE NAME
========================================================== */

PPE.FileName = {

    Config : "config.js",

    Utility : "util.js",

    Core : "ppe.js",

    Renderer : "renderer.js",

    Toolbar : "toolbar.js",

    Progress : "progress.js",

    Teleprompter : "teleprompter.js",

    Paragraph : "paragraph.js",

    Fullscreen : "fullscreen.js",

    Membership : "membership.js",

    Theme : "theme.js",

    Storage : "storage.js",

    Bridge : "bridge.js",

    AI : "ai.js"

};

/* ==========================================================
   SYSTEM STATUS
========================================================== */

PPE.Status = {

    BOOT : "boot",

    INITIALIZING : "initializing",

    READY : "ready",

    LOADING : "loading",

    PLAYING : "playing",

    PAUSED : "paused",

    STOPPED : "stopped",

    ERROR : "error"

};

PPE.currentStatus = PPE.Status.BOOT;

/* ==========================================================
   RESERVED VALUE
========================================================== */

PPE.Reserved = {

    None : null,

    Empty : "",

    Unknown : "unknown",

    Unlimited : -1

};

/* ==========================================================
   CONFIGURATION FREEZE FLAG
========================================================== */

PPE.Config = {

    loaded : false,

    validated : false,

    frozen : false

};

/* ==========================================================
   INITIALIZATION CONFIGURATION
========================================================== */

PPE.Initialize = {

    config : false,

    utility : false,

    storage : false,

    renderer : false,

    toolbar : false,

    progress : false,

    teleprompter : false,

    paragraph : false,

    fullscreen : false,

    membership : false,

    theme : false,

    bridge : false,

    ai : false,
    
    analysis:false,

    application : false

};

/* ==========================================================
   MODULE INFORMATION
========================================================== */

PPE.Module = {

    Config : "PPE-001",

    Utility : "PPE-002",

    Renderer : "PPE-003",

    Teleprompter : "PPE-004",

    Toolbar : "PPE-005",

    Theme : "PPE-006",

    Membership : "PPE-007",

    Storage : "PPE-008",

    Bridge : "PPE-009",

    AI : "PPE-010",
    
    Analysis:"PPE-012"

};

/* ==========================================================
   PRIORITY CONFIGURATION
========================================================== */

PPE.Priority = {

    CRITICAL : 1,

    HIGH : 2,

    NORMAL : 3,

    LOW : 4,

    BACKGROUND : 5

};

/* ==========================================================
   ENGINE REGISTRY
========================================================== */

PPE.Engine = {

    Renderer : null,

    Teleprompter : null,

    Toolbar : null,

    Progress : null,

    Theme : null,

    Membership : null,

    Storage : null,

    Bridge : null,

    AI : null,
    
    Analysis:null

};

/* ==========================================================
   DOM ELEMENT REGISTRY
========================================================== */

PPE.Element = {

    App : null,

    Header : null,

    Workspace : null,

    Content : null,

    Toolbar : null,

    Status : null,

    Progress : null,

    Overlay : null

};

/* ==========================================================
   END OF CONFIGURATION (PART 10)
========================================================== */

/* ==========================================================
   VALIDATION CONFIGURATION
========================================================== */

PPE.Validation = {

    strictMode : true,

    validateTopic : true,

    validateParagraph : true,

    validateSentence : true,

    validateBridge : true,

    validateStorage : true,

    validateMembership : true,

    validateTheme : true,

    validateRenderer : true,

    validateTeleprompter : true,

    validateAI : true

};

/* ==========================================================
   EXPORT CONFIGURATION
========================================================== */

PPE.Export = {

    json : true,

    text : true,

    html : true,

    markdown : true,

    pdf : false,

    video : false,

    subtitle : true

};

/* ==========================================================
   IMPORT CONFIGURATION
========================================================== */

PPE.Import = {

    json : true,

    text : true,

    article : true,

    story : true,

    subtitle : true,

    video : true

};

/* ==========================================================
   LICENSE INFORMATION
========================================================== */

PPE.License = {

    product : "Polyglot Presentation Engine",

    edition : "Community",

    owner : "Polyglot Academy",

    copyright : "© Polyglot Academy",

    version : PPE.version

};

/* ==========================================================
   BUILD INFORMATION
========================================================== */

PPE.Build = {

    package : "PPE-001",

    release : "Alpha",

    releaseNumber : 1,

    buildDate : "",

    checksum : "",

    stable : false

};

/* ==========================================================
   INTERNAL FLAGS
========================================================== */

PPE.Flag = {

    firstRun : true,

    firstTopic : true,

    firstRender : true,

    firstPlay : true,

    firstBridge : true,

    firstAI : true,

    initialized : false

};

/* ==========================================================
   CONFIGURATION VALIDATION
========================================================== */

PPE.Config.validate = function(){

    if(!PPE.appName){

        throw new Error("PPE : appName is required.");

    }

    if(!PPE.version){

        throw new Error("PPE : version is required.");

    }

    if(!PPE.Mode){

        throw new Error("PPE : Mode configuration missing.");

    }

    if(!PPE.Theme){

        throw new Error("PPE : Theme configuration missing.");

    }

    if(!PPE.Teleprompter){

        throw new Error("PPE : Teleprompter configuration missing.");

    }

    PPE.Config.validated = true;

    return true;

};

/* ==========================================================
   CONFIGURATION FREEZE
========================================================== */

PPE.Config.freeze = function(){

    Object.freeze(PPE.Mode);

    Object.freeze(PPE.Theme);

    Object.freeze(PPE.Teleprompter);

    Object.freeze(PPE.Toolbar);

    Object.freeze(PPE.Progress);

    Object.freeze(PPE.Font);

    Object.freeze(PPE.Animation);

    Object.freeze(PPE.StorageKey);

    Object.freeze(PPE.Event);

    Object.freeze(PPE.Constants);

    Object.freeze(PPE.Error);

    Object.freeze(PPE.Priority);

    Object.freeze(PPE.FileName);

    PPE.Config.frozen = true;

};

/* ==========================================================
   CONFIGURATION INITIALIZATION
========================================================== */

PPE.Config.initialize = function(){

    PPE.Config.validate();

    PPE.Config.freeze();

    PPE.Initialize.config = true;

    PPE.initialized = true;

    console.log(

        "[PPE] Config initialized",

        PPE.version

    );

};

/* ==========================================================
   CONFIGURATION INFORMATION
========================================================== */

PPE.Config.info = function(){

    return {

        package : "PPE-001",

        file : "config.js",

        version : PPE.version,

        stage : PPE.Version.stage,

        build : PPE.Version.build,

        initialized : PPE.initialized,

        frozen : PPE.Config.frozen

    };

};

/* ==========================================================
   AUTO INITIALIZE
========================================================== */

PPE.Config.initialize();

/* ==========================================================
   END OF FILE

   Package  : PPE-001
   File     : config.js

   Status   : CERTIFIED
   Stage    : ALPHA 1

========================================================== */