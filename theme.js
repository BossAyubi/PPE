/*
==========================================================
POLYGLOT PRESENTATION ENGINE

Package : PPE-008

File : theme.js

Version : 1.0.0-alpha.1

==========================================================
*/

"use strict";

/* ==========================================================
   THEME ENGINE
========================================================== */

PPE.Theme={};

/* ==========================================================
   STATE
========================================================== */

PPE.Theme.state={

    initialized:false,
    
    ready:false,

    current:"dark",

    accent:"#8A2BE2",

    animation:true,

    auto:false

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.Theme.initialize=function(){

    PPE.Theme.state.initialized=true;

    PPE.Theme.state.ready=true;

    if(!PPE.Initialize){

        PPE.Initialize={};

    }

    PPE.Initialize.theme=true;

    PPE.Theme.Responsive.update();

    PPE.Theme.CSS.apply();

    return true;

};
/* ==========================================================
   REGISTER
========================================================== */

PPE.Engine.Theme=

PPE.Theme;

/* ==========================================================
   THEME MODE
========================================================== */

PPE.Theme.Mode={

    list:[

        "dark",

        "light",

        "auto"

    ]

};

PPE.Theme.set=function(mode){

    if(

        PPE.Theme.Mode.list

        .includes(mode)

    ){

        PPE.Theme.state.current=

        mode;

    }

};

PPE.Theme.get=function(){

    return PPE.Theme.state.current;

};

PPE.Theme.is=function(mode){

    return PPE.Theme.state.current===mode;

};

/* ==========================================================
   ACCENT COLOR
========================================================== */

PPE.Theme.Accent={

    color:"#8A2BE2"

};

PPE.Theme.Accent.set=function(

    color

){

    PPE.Theme.Accent.color=

    color;

};

PPE.Theme.Accent.get=function(){

    return PPE.Theme.Accent.color;

};

PPE.Theme.Accent.reset=function(){

    PPE.Theme.Accent.color=

    "#8A2BE2";

};

/* ==========================================================
   DYNAMIC ACCENT ENGINE
========================================================== */

PPE.Theme.Dynamic={

    enabled:true,

    palette:[

        "#8A2BE2",

        "#00E5FF",

        "#00FF99",

        "#FF4081",

        "#FFD600"

    ],

    index:0

};

PPE.Theme.Dynamic.next=function(){

    PPE.Theme.Dynamic.index=

    (

        PPE.Theme.Dynamic.index+1

    )

    %

    PPE.Theme.Dynamic.palette.length;

    PPE.Theme.Accent.set(

        PPE.Theme.Dynamic.palette[

            PPE.Theme.Dynamic.index

        ]

    );

};

PPE.Theme.Dynamic.reset=function(){

    PPE.Theme.Dynamic.index=0;

    PPE.Theme.Accent.reset();

};

/* ==========================================================
   NEON GLOW ENGINE
========================================================== */

PPE.Theme.Glow={

    enabled:true,

    intensity:1

};

PPE.Theme.Glow.enable=function(){

    PPE.Theme.Glow.enabled=true;

};

PPE.Theme.Glow.disable=function(){

    PPE.Theme.Glow.enabled=false;

};

PPE.Theme.Glow.setIntensity=

function(value){

    PPE.Theme.Glow.intensity=

    value;

};

PPE.Theme.Glow.current=function(){

    return{

        enabled:

        PPE.Theme.Glow.enabled,

        intensity:

        PPE.Theme.Glow.intensity

    };

};

/* ==========================================================
   THEME ANIMATION
========================================================== */

PPE.Theme.Animation={

    enabled:true,

    duration:300

};

PPE.Theme.Animation.enable=

function(){

    PPE.Theme.Animation.enabled=true;

};

PPE.Theme.Animation.disable=

function(){

    PPE.Theme.Animation.enabled=false;

};

PPE.Theme.Animation.setDuration=

function(value){

    PPE.Theme.Animation.duration=

    value;

};

PPE.Theme.Animation.info=function(){

    return{

        enabled:

        PPE.Theme.Animation.enabled,

        duration:

        PPE.Theme.Animation.duration

    };

};

/* ==========================================================
   AUTO THEME DETECTION
========================================================== */

PPE.Theme.Auto={

    enabled:false

};

PPE.Theme.Auto.enable=function(){

    PPE.Theme.Auto.enabled=true;

};

PPE.Theme.Auto.disable=function(){

    PPE.Theme.Auto.enabled=false;

};

PPE.Theme.Auto.detect=function(){

    if(

        !window.matchMedia

    ){

        return "dark";

    }

    return window.matchMedia(

        "(prefers-color-scheme: dark)"

    ).matches

    ?

    "dark"

    :

    "light";

};

PPE.Theme.Auto.apply=function(){

    if(

        PPE.Theme.Auto.enabled

    ){

        PPE.Theme.set(

            PPE.Theme.Auto.detect()

        );

    }

};

/* ==========================================================
   THEME PERSISTENCE
========================================================== */

PPE.Theme.Storage={

    key:"PPE_THEME"

};

PPE.Theme.Storage.save=function(){

    localStorage.setItem(

        PPE.Theme.Storage.key,

        JSON.stringify({

            theme:

            PPE.Theme.get(),

            accent:

            PPE.Theme.Accent.get()

        })

    );

};

PPE.Theme.Storage.load=function(){

    const value=

    localStorage.getItem(

        PPE.Theme.Storage.key

    );

    if(!value){

        return;

    }

    const data=

    JSON.parse(value);

    PPE.Theme.set(

        data.theme

    );

    PPE.Theme.Accent.set(

        data.accent

    );

};

/* ==========================================================
   THEME SYNCHRONIZATION
========================================================== */

PPE.Theme.Sync={

    targets:[]

};

PPE.Theme.Sync.register=function(

    callback

){

    PPE.Theme.Sync.targets.push(

        callback

    );

};

PPE.Theme.Sync.apply=function(){

    PPE.Theme.Sync.targets

    .forEach(function(callback){

        callback({

            theme:

            PPE.Theme.get(),

            accent:

            PPE.Theme.Accent.get()

        });

    });

};

PPE.Theme.Sync.clear=function(){

    PPE.Theme.Sync.targets=[];

};

/* ==========================================================
   CSS VARIABLE ENGINE
========================================================== */

PPE.Theme.CSS={

    root:document.documentElement

};

PPE.Theme.CSS.set=function(

    name,

    value

){

    PPE.Theme.CSS.root

    .style

    .setProperty(

        name,

        value

    );

};

PPE.Theme.CSS.get=function(name){

    return getComputedStyle(

        PPE.Theme.CSS.root

    )

    .getPropertyValue(

        name

    );

};

PPE.Theme.CSS.apply=function(){

    PPE.Theme.CSS.set(

        "--ppe-accent",

        PPE.Theme.Accent.get()

    );

};

/* ==========================================================
   THEME PRESET ENGINE
========================================================== */

PPE.Theme.Preset={

    futuristic:{

        accent:"#8A2BE2"

    },

    cyber:{

        accent:"#00E5FF"

    },

    emerald:{

        accent:"#00FF99"

    },

    sunset:{

        accent:"#FF7043"

    }

};

PPE.Theme.Preset.apply=function(

    name

){

    const preset=

    PPE.Theme.Preset[name];

    if(!preset){

        return;

    }

    PPE.Theme.Accent.set(

        preset.accent

    );

    PPE.Theme.CSS.apply();

};

/* ==========================================================
   LIVE PREVIEW
========================================================== */

PPE.Theme.Preview={

    active:false

};

PPE.Theme.Preview.start=function(){

    PPE.Theme.Preview.active=true;

};

PPE.Theme.Preview.stop=function(){

    PPE.Theme.Preview.active=false;

};

PPE.Theme.Preview.apply=function(

    theme,

    accent

){

    PPE.Theme.set(

        theme

    );

    PPE.Theme.Accent.set(

        accent

    );

    PPE.Theme.CSS.apply();

};

/* ==========================================================
   GRADIENT BACKGROUND
========================================================== */

PPE.Theme.Gradient={

    enabled:true,

    start:"#0F172A",

    end:"#1E293B"

};

PPE.Theme.Gradient.set=function(

    start,

    end

){

    PPE.Theme.Gradient.start=

    start;

    PPE.Theme.Gradient.end=

    end;

};

PPE.Theme.Gradient.apply=function(){

    PPE.Theme.CSS.set(

        "--ppe-gradient-start",

        PPE.Theme.Gradient.start

    );

    PPE.Theme.CSS.set(

        "--ppe-gradient-end",

        PPE.Theme.Gradient.end

    );

};

PPE.Theme.Gradient.reset=function(){

    PPE.Theme.Gradient.set(

        "#0F172A",

        "#1E293B"

    );

};

/* ==========================================================
   GLASSMORPHISM ENGINE
========================================================== */

PPE.Theme.Glass={

    enabled:true,

    blur:20,

    opacity:0.15

};

PPE.Theme.Glass.enable=function(){

    PPE.Theme.Glass.enabled=true;

};

PPE.Theme.Glass.disable=function(){

    PPE.Theme.Glass.enabled=false;

};

PPE.Theme.Glass.apply=function(){

    PPE.Theme.CSS.set(

        "--ppe-glass-blur",

        PPE.Theme.Glass.blur+"px"

    );

    PPE.Theme.CSS.set(

        "--ppe-glass-opacity",

        PPE.Theme.Glass.opacity

    );

};

/* ==========================================================
   PARTICLE BACKGROUND
========================================================== */

PPE.Theme.Particle={

    enabled:false,

    density:40,

    speed:1

};

PPE.Theme.Particle.enable=function(){

    PPE.Theme.Particle.enabled=true;

};

PPE.Theme.Particle.disable=function(){

    PPE.Theme.Particle.enabled=false;

};

PPE.Theme.Particle.configure=

function(

    density,

    speed

){

    PPE.Theme.Particle.density=

    density;

    PPE.Theme.Particle.speed=

    speed;

};

PPE.Theme.Particle.info=function(){

    return{

        enabled:

        PPE.Theme.Particle.enabled,

        density:

        PPE.Theme.Particle.density,

        speed:

        PPE.Theme.Particle.speed

    };

};

/* ==========================================================
   ANIMATED BACKGROUND
========================================================== */

PPE.Theme.Background={

    enabled:true,

    animation:"aurora",

    speed:1

};

PPE.Theme.Background.set=function(

    animation

){

    PPE.Theme.Background.animation=

    animation;

};

PPE.Theme.Background.speedUp=

function(){

    PPE.Theme.Background.speed++;

};

PPE.Theme.Background.speedDown=

function(){

    if(

        PPE.Theme.Background.speed>1

    ){

        PPE.Theme.Background.speed--;

    }

};

PPE.Theme.Background.info=function(){

    return{

        animation:

        PPE.Theme.Background.animation,

        speed:

        PPE.Theme.Background.speed

    };

};

/* ==========================================================
   ICON THEME ENGINE
========================================================== */

PPE.Theme.Icon={

    style:"outline"

};

PPE.Theme.Icon.set=function(

    style

){

    PPE.Theme.Icon.style=

    style;

};

PPE.Theme.Icon.get=function(){

    return PPE.Theme.Icon.style;

};

PPE.Theme.Icon.reset=function(){

    PPE.Theme.Icon.style=

    "outline";

};

/* ==========================================================
   RESPONSIVE THEME
========================================================== */

PPE.Theme.Responsive={

    mobile:768,

    tablet:1024,

    mode:"desktop"

};

PPE.Theme.Responsive.update=

function(){

    const width=

    window.innerWidth;

    if(

        width<=

        PPE.Theme.Responsive.mobile

    ){

        PPE.Theme.Responsive.mode=

        "mobile";

    }

    else if(

        width<=

        PPE.Theme.Responsive.tablet

    ){

        PPE.Theme.Responsive.mode=

        "tablet";

    }

    else{

        PPE.Theme.Responsive.mode=

        "desktop";

    }

};

PPE.Theme.Responsive.current=

function(){

    return PPE.Theme.Responsive.mode;

};

window.addEventListener(

    "resize",

    PPE.Theme.Responsive.update

);

/* ==========================================================
   THEME EVENT BUS
========================================================== */

PPE.Theme.Event={};

PPE.Theme.Event.emit=function(

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

PPE.Theme.Event.on=function(

    name,

    callback

){

    document.addEventListener(

        name,

        callback

    );

};

PPE.Theme.Event.off=function(

    name,

    callback

){

    document.removeEventListener(

        name,

        callback

    );

};

/* ==========================================================
   THEME PLUGIN API
========================================================== */

PPE.Theme.Plugin={

    list:[]

};

PPE.Theme.Plugin.register=function(

    plugin

){

    PPE.Theme.Plugin.list.push(

        plugin

    );

};

PPE.Theme.Plugin.execute=function(

    method,

    data

){

    PPE.Theme.Plugin.list.forEach(

        function(plugin){

            if(

                typeof plugin[method]

                ===

                "function"

            ){

                plugin[method](

                    data

                );

            }

        }

    );

};

PPE.Theme.Plugin.clear=function(){

    PPE.Theme.Plugin.list=[];

};

/* ==========================================================
   PERFORMANCE MONITOR
========================================================== */

PPE.Theme.Performance={

    renderTime:0,

    switchCount:0,

    lastTheme:null

};

PPE.Theme.Performance.begin=

function(){

    PPE.Theme.Performance.renderTime=

    performance.now();

};

PPE.Theme.Performance.end=

function(){

    PPE.Theme.Performance.renderTime=

    performance.now()

    -

    PPE.Theme.Performance.renderTime;

};

PPE.Theme.Performance.changed=

function(theme){

    PPE.Theme.Performance.switchCount++;

    PPE.Theme.Performance.lastTheme=

    theme;

};

PPE.Theme.Performance.info=

function(){

    return{

        renderTime:

        PPE.Theme.Performance.renderTime,

        switchCount:

        PPE.Theme.Performance.switchCount,

        lastTheme:

        PPE.Theme.Performance.lastTheme

    };

};

/* ==========================================================
   SNAPSHOT & RECOVERY
========================================================== */

PPE.Theme.Recovery={

    snapshot:null

};

PPE.Theme.Recovery.save=function(){

    PPE.Theme.Recovery.snapshot={

        theme:

        PPE.Theme.get(),

        accent:

        PPE.Theme.Accent.get(),

        glow:

        PPE.Theme.Glow.current()

    };

};

PPE.Theme.Recovery.restore=function(){

    const data=

    PPE.Theme.Recovery.snapshot;

    if(!data){

        return;

    }

    PPE.Theme.set(

        data.theme

    );

    PPE.Theme.Accent.set(

        data.accent

    );

};

/* ==========================================================
   ACCESSIBILITY ENGINE
========================================================== */

PPE.Theme.Accessibility={

    highContrast:false,

    reduceMotion:false,

    largeText:false

};

PPE.Theme.Accessibility.enableContrast=

function(){

    PPE.Theme.Accessibility.highContrast=

    true;

};

PPE.Theme.Accessibility.disableContrast=

function(){

    PPE.Theme.Accessibility.highContrast=

    false;

};

PPE.Theme.Accessibility.setReduceMotion=

function(value){

    PPE.Theme.Accessibility.reduceMotion=

    value;

};

PPE.Theme.Accessibility.setLargeText=

function(value){

    PPE.Theme.Accessibility.largeText=

    value;

};

/* ==========================================================
   COMPATIBILITY LAYER
========================================================== */

PPE.Theme.Compatibility={};

PPE.Theme.Compatibility.check=

function(){

    return{

        cssVariable:

        !!window.CSS,

        localStorage:

        typeof localStorage

        !==

        "undefined",

        matchMedia:

        typeof window.matchMedia

        ===

        "function",

        animation:

        typeof requestAnimationFrame

        ===

        "function"

    };

};

PPE.Theme.Compatibility.ready=

function(){

    return PPE.Theme

    .Compatibility

    .check()

    .cssVariable;

};

/* ==========================================================
   THEME CACHE
========================================================== */

PPE.Theme.Cache={

    data:null,

    timestamp:0

};

PPE.Theme.Cache.save=function(){

    PPE.Theme.Cache.data={

        theme:

        PPE.Theme.get(),

        accent:

        PPE.Theme.Accent.get()

    };

    PPE.Theme.Cache.timestamp=

    Date.now();

};

PPE.Theme.Cache.restore=function(){

    return PPE.Theme.Cache.data;

};

PPE.Theme.Cache.clear=function(){

    PPE.Theme.Cache.data=null;

    PPE.Theme.Cache.timestamp=0;

};

/* ==========================================================
   SELF TEST
========================================================== */

PPE.Theme.selfTest=function(){

    return{

        initialized:
        PPE.Theme.state.initialized,

        ready:
        PPE.Theme.state.ready,

        theme:
        PPE.Theme.get(),

        accent:
        PPE.Theme.Accent.get(),

        responsive:
        PPE.Theme.Responsive.current(),

        animation:
        PPE.Theme.Animation.info(),

        performance:
        PPE.Theme.Performance.info()

    };

};

/* ==========================================================
   HEALTH CHECK
========================================================== */

PPE.Theme.health=function(){

    return{

        initialized:
        PPE.Theme.state.initialized,

        ready:
        PPE.Theme.state.ready,

        renderer:
        typeof PPE.Renderer!=="undefined",

        toolbar:
        typeof PPE.Toolbar!=="undefined",

        bridge:
        typeof PPE.Bridge!=="undefined",

        storage:
        typeof PPE.Storage!=="undefined",

        progress:
        typeof PPE.Progress!=="undefined"

    };

};

/* ==========================================================
   DIAGNOSTIC
========================================================== */

PPE.Theme.diagnostic=function(){

    console.group(

        "PPE Theme"

    );

    console.table(
    PPE.Theme.selfTest()
);

console.table(
    PPE.Theme.health()
);

console.table(
    PPE.Theme.Compatibility.check()
);

    console.groupEnd();

};

/* ==========================================================
   RUNTIME
========================================================== */

PPE.Theme.runtime=function(){

    return{

        package:"PPE-008",

        file:"theme.js",

        version:PPE.version || "1.0.0",

        initialized:
        PPE.Theme.state.initialized,

        ready:
        PPE.Theme.state.ready,

        theme:
        PPE.Theme.get(),

        accent:
        PPE.Theme.Accent.get()

    };

};

/* ==========================================================
   COMPATIBILITY REPORT
========================================================== */

PPE.Theme.report=function(){

    return{

        runtime:

        PPE.Theme.runtime(),

        compatibility:

        PPE.Theme

        .Compatibility

        .check(),

        cache:

        PPE.Theme.Cache.timestamp

    };

};

/* ==========================================================
   REGISTER ENGINE
========================================================== */

PPE.Engine.Theme=

PPE.Theme;

/* ==========================================================
   AUTO BOOT
========================================================== */

PPE.Theme.boot=function(){

    if(!PPE.Initialize){

        PPE.Initialize={};

    }

    if(!PPE.Theme.state.initialized){

        PPE.Theme.initialize();

    }

    PPE.Initialize.theme=true;

    PPE.Theme.state.ready=true;

    PPE.Theme.Event.emit(

        "PPE_THEME_READY",

        PPE.Theme.runtime()

    );

    return true;

};

/* ==========================================================
   CERTIFICATION MARKER

   Package : PPE-008

   File : theme.js

   Status :

   IMPLEMENTATION COMPLETE

========================================================== */
