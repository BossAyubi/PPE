/*
==========================================================
POLYGLOT PRESENTATION ENGINE

Package : PPE-002

File : util.js

Version : 1.0.0-alpha.1

==========================================================
*/

"use strict";

/* ==========================================================
   PPE UTIL LIBRARY
========================================================== */

PPE.Util = {};

/* ==========================================================
   APPLICATION INFORMATION
========================================================== */

PPE.Util.info = function(){

    return{

        package:"PPE-002",

        file:"util.js",

        version:PPE.version || "1.0.0",

        build:PPE.Build.releaseNumber,

        initialized:true

    };

};

/* ==========================================================
   TYPE CHECK
========================================================== */

PPE.Util.isString=function(value){

    return typeof value==="string";

};

PPE.Util.isNumber=function(value){

    return typeof value==="number";

};

PPE.Util.isBoolean=function(value){

    return typeof value==="boolean";

};

PPE.Util.isFunction=function(value){

    return typeof value==="function";

};

PPE.Util.isArray=function(value){

    return Array.isArray(value);

};

PPE.Util.isObject=function(value){

    return value!==null
        &&
        typeof value==="object"
        &&
        !Array.isArray(value);

};

PPE.Util.isUndefined=function(value){

    return value===undefined;

};

PPE.Util.isNull=function(value){

    return value===null;

};

PPE.Util.isEmpty=function(value){

    if(value===null) return true;

    if(value===undefined) return true;

    if(value==="") return true;

    if(Array.isArray(value)&&value.length===0) return true;

    return false;

};

/* ==========================================================
   DEFAULT VALUE
========================================================== */

PPE.Util.value=function(value,defaultValue){

    if(PPE.Util.isEmpty(value)){

        return defaultValue;

    }

    return value;

};

/* ==========================================================
   CLAMP
========================================================== */

PPE.Util.clamp=function(value,min,max){

    return Math.min(

        Math.max(value,min),

        max

    );

};

/* ==========================================================
   RANDOM
========================================================== */

PPE.Util.random=function(min,max){

    return Math.floor(

        Math.random()

        *

        (max-min+1)

    )+min;

};

/* ==========================================================
   UUID
========================================================== */

PPE.Util.uuid=function(){

    return

    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"

    .replace(

    /[xy]/g,

    function(c){

        const r=Math.random()*16|0;

        const v=c==="x"

        ?

        r

        :

        (r&0x3|0x8);

        return v.toString(16);

    });

};

/* ==========================================================
   DEEP CLONE
========================================================== */

PPE.Util.clone=function(object){

    return JSON.parse(

        JSON.stringify(object)

    );

};

/* ==========================================================
   MERGE OBJECT
========================================================== */

PPE.Util.merge=function(target,source){

    Object.keys(source).forEach(function(key){

        target[key]=source[key];

    });

    return target;

};

/* ==========================================================
   JSON HELPER
========================================================== */

PPE.Util.toJSON=function(object){

    return JSON.stringify(

        object

    );

};

PPE.Util.fromJSON=function(text){

    try{

        return JSON.parse(text);

    }

    catch(e){

        return null;

    }

};

/* ==========================================================
   HTML ESCAPE
========================================================== */

PPE.Util.escapeHTML=function(text){

    if(PPE.Util.isEmpty(text)){

        return "";

    }

    return text

    .replace(/&/g,"&amp;")

    .replace(/</g,"&lt;")

    .replace(/>/g,"&gt;")

    .replace(/"/g,"&quot;")

    .replace(/'/g,"&#39;");

};

/* ==========================================================
   STRIP HTML
========================================================== */

PPE.Util.stripHTML=function(html){

    const div=document.createElement(

        "div"

    );

    div.innerHTML=html;

    return div.textContent||

    div.innerText||

    "";

};

/* ==========================================================
   SANITIZE HTML
========================================================== */

PPE.Util.sanitizeHTML=function(html){

    return PPE.Util.escapeHTML(

        PPE.Util.stripHTML(html)

    );

};

/* ==========================================================
   BASE64
========================================================== */

PPE.Util.encodeBase64=function(text){

    return btoa(

        unescape(

            encodeURIComponent(text)

        )

    );

};

PPE.Util.decodeBase64=function(text){

    return decodeURIComponent(

        escape(

            atob(text)

        )

    );

};

/* ==========================================================
   STRING HELPER
========================================================== */

PPE.Util.capitalize=function(text){

    if(PPE.Util.isEmpty(text)){

        return "";

    }

    return text.charAt(0).toUpperCase()

    +

    text.slice(1);

};

PPE.Util.capitalizeWords=function(text){

    if(PPE.Util.isEmpty(text)){

        return "";

    }

    return text.replace(

        /\b\w/g,

        function(char){

            return char.toUpperCase();

        }

    );

};

PPE.Util.trim=function(text){

    return String(text).trim();

};

PPE.Util.repeat=function(text,count){

    return String(text).repeat(count);

};

/* ==========================================================
   NUMBER HELPER
========================================================== */

PPE.Util.formatNumber=function(number){

    return Number(number)

    .toLocaleString();

};

PPE.Util.round=function(number,decimal){

    const factor=Math.pow(

        10,

        decimal

    );

    return Math.round(

        number*factor

    )/factor;

};

PPE.Util.percent=function(value,total){

    if(total===0){

        return 0;

    }

    return (value/total)*100;

};

/* ==========================================================
   TIME HELPER
========================================================== */

PPE.Util.now=function(){

    return Date.now();

};

PPE.Util.timestamp=function(){

    return Math.floor(

        Date.now()/1000

    );

};

PPE.Util.delay=function(ms){

    return new Promise(

        function(resolve){

            setTimeout(

                resolve,

                ms

            );

        }

    );

};

PPE.Util.formatTime=function(seconds){

    seconds=Math.floor(seconds);

    const minute=Math.floor(

        seconds/60

    );

    const second=seconds%60;

    return String(minute)

    .padStart(2,"0")

    +

    ":"

    +

    String(second)

    .padStart(2,"0");

};

/* ==========================================================
   ARRAY HELPER
========================================================== */

PPE.Util.first=function(array){

    if(!Array.isArray(array)){

        return null;

    }

    return array[0];

};

PPE.Util.last=function(array){

    if(!Array.isArray(array)){

        return null;

    }

    return array[array.length-1];

};

PPE.Util.unique=function(array){

    return [...new Set(array)];

};

PPE.Util.shuffle=function(array){

    const clone=[...array];

    for(

        let i=clone.length-1;

        i>0;

        i--

    ){

        const j=Math.floor(

            Math.random()*(i+1)

        );

        [

            clone[i],

            clone[j]

        ]

        =

        [

            clone[j],

            clone[i]

        ];

    }

    return clone;

};

PPE.Util.removeDuplicate=function(array){

    return [...new Set(array)];

};

/* ==========================================================
   OBJECT HELPER
========================================================== */

PPE.Util.keys=function(object){

    return Object.keys(object);

};

PPE.Util.values=function(object){

    return Object.values(object);

};

PPE.Util.entries=function(object){

    return Object.entries(object);

};

PPE.Util.has=function(object,key){

    return Object.prototype.hasOwnProperty.call(

        object,

        key

    );

};

/* ==========================================================
   ID GENERATOR
========================================================== */

PPE.Util.id=function(prefix){

    prefix=prefix||"ppe";

    return prefix

    +

    "_"

    +

    Date.now()

    +

    "_"

    +

    PPE.Util.random(

        1000,

        9999

    );

};

/* ==========================================================
   BOOLEAN HELPER
========================================================== */

PPE.Util.toBoolean=function(value){

    return Boolean(value);

};

/* ==========================================================
   DOM HELPER
========================================================== */

PPE.Util.element=function(id){

    return document.getElementById(id);

};

PPE.Util.query=function(selector){

    return document.querySelector(selector);

};

PPE.Util.queryAll=function(selector){

    return document.querySelectorAll(selector);

};

PPE.Util.create=function(tag){

    return document.createElement(tag);

};

PPE.Util.remove=function(element){

    if(element&&element.parentNode){

        element.parentNode.removeChild(element);

    }

};

/* ==========================================================
   CLASS HELPER
========================================================== */

PPE.Util.addClass=function(element,className){

    if(element){

        element.classList.add(className);

    }

};

PPE.Util.removeClass=function(element,className){

    if(element){

        element.classList.remove(className);

    }

};

PPE.Util.toggleClass=function(element,className){

    if(element){

        element.classList.toggle(className);

    }

};

PPE.Util.hasClass=function(element,className){

    if(!element){

        return false;

    }

    return element.classList.contains(className);

};

/* ==========================================================
   ATTRIBUTE HELPER
========================================================== */

PPE.Util.attr=function(element,name,value){

    if(!element){

        return null;

    }

    if(arguments.length===2){

        return element.getAttribute(name);

    }

    element.setAttribute(name,value);

    return value;

};

/* ==========================================================
   CONTENT HELPER
========================================================== */

PPE.Util.text=function(element,value){

    if(!element){

        return;

    }

    if(value===undefined){

        return element.textContent;

    }

    element.textContent=value;

};

PPE.Util.html=function(element,value){

    if(!element){

        return;

    }

    if(value===undefined){

        return element.innerHTML;

    }

    element.innerHTML=value;

};

/* ==========================================================
   VISIBILITY HELPER
========================================================== */

PPE.Util.show=function(element){

    if(element){

        element.style.display="";

    }

};

PPE.Util.hide=function(element){

    if(element){

        element.style.display="none";

    }

};

PPE.Util.visible=function(element,visible){

    if(visible){

        PPE.Util.show(element);

    }else{

        PPE.Util.hide(element);

    }

};

/* ==========================================================
   EVENT HELPER
========================================================== */

PPE.Util.on=function(element,event,callback){

    if(!element){

        return;

    }

    element.addEventListener(

        event,

        callback

    );

};

PPE.Util.off=function(element,event,callback){

    if(!element){

        return;

    }

    element.removeEventListener(

        event,

        callback

    );

};

PPE.Util.once=function(element,event,callback){

    if(!element){

        return;

    }

    element.addEventListener(

        event,

        callback,

        {

            once:true

        }

    );

};

PPE.Util.trigger=function(element,eventName){

    if(!element){

        return;

    }

    element.dispatchEvent(

        new Event(eventName)

    );

};

/* ==========================================================
   SCROLL HELPER
========================================================== */

PPE.Util.scrollTop=function(element){

    if(element){

        element.scrollTop=0;

    }

};

PPE.Util.scrollBottom=function(element){

    if(element){

        element.scrollTop=

        element.scrollHeight;

    }

};

PPE.Util.scrollTo=function(

    element,

    position

){

    if(!element){

        return;

    }

    element.scrollTo({

        top:position,

        behavior:"smooth"

    });

};

PPE.Util.scrollCenter=function(element,target){

    if(

        !element||

        !target

    ){

        return;

    }

    const offset=

    target.offsetTop-

    (

        element.clientHeight/2

    )+

    (

        target.clientHeight/2

    );

    element.scrollTo({

        top:offset,

        behavior:"smooth"

    });

};

/* ==========================================================
   POSITION HELPER
========================================================== */

PPE.Util.position=function(element){

    if(!element){

        return null;

    }

    return element.getBoundingClientRect();

};

/* ==========================================================
   STYLE HELPER
========================================================== */

PPE.Util.css=function(element,property,value){

    if(!element){

        return null;

    }

    if(value===undefined){

        return getComputedStyle(element)

        .getPropertyValue(property);

    }

    element.style[property]=value;

};

PPE.Util.width=function(element){

    if(!element){

        return 0;

    }

    return element.offsetWidth;

};

PPE.Util.height=function(element){

    if(!element){

        return 0;

    }

    return element.offsetHeight;

};

PPE.Util.rect=function(element){

    if(!element){

        return null;

    }

    return element.getBoundingClientRect();

};

/* ==========================================================
   VISIBILITY CHECK
========================================================== */

PPE.Util.isVisible=function(element){

    if(!element){

        return false;

    }

    return !!(

        element.offsetWidth ||

        element.offsetHeight ||

        element.getClientRects().length

    );

};

/* ==========================================================
   WINDOW HELPER
========================================================== */

PPE.Util.windowWidth=function(){

    return window.innerWidth;

};

PPE.Util.windowHeight=function(){

    return window.innerHeight;

};

PPE.Util.orientation=function(){

    return

    window.innerWidth>

    window.innerHeight

    ?

    "landscape"

    :

    "portrait";

};

/* ==========================================================
   DEVICE HELPER
========================================================== */

PPE.Util.isMobile=function(){

    return /Android|iPhone|iPad|iPod/i

    .test(

        navigator.userAgent

    );

};

PPE.Util.isLandscape=function(){

    return PPE.Util.orientation()

    ===

    "landscape";

};

PPE.Util.isPortrait=function(){

    return PPE.Util.orientation()

    ===

    "portrait";

};

/* ==========================================================
   STORAGE HELPER
========================================================== */

PPE.Util.storage={};

PPE.Util.storage.set=function(key,value){

    try{

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

        return true;

    }

    catch(error){

        return false;

    }

};

PPE.Util.storage.get=function(key,defaultValue){

    try{

        const value=localStorage.getItem(key);

        if(value===null){

            return defaultValue;

        }

        return JSON.parse(value);

    }

    catch(error){

        return defaultValue;

    }

};

PPE.Util.storage.remove=function(key){

    localStorage.removeItem(key);

};

PPE.Util.storage.clear=function(){

    localStorage.clear();

};

/* ==========================================================
   SESSION STORAGE
========================================================== */

PPE.Util.session={};

PPE.Util.session.set=function(key,value){

    sessionStorage.setItem(

        key,

        JSON.stringify(value)

    );

};

PPE.Util.session.get=function(key,defaultValue){

    const value=sessionStorage.getItem(key);

    if(value===null){

        return defaultValue;

    }

    return JSON.parse(value);

};

PPE.Util.session.remove=function(key){

    sessionStorage.removeItem(key);

};

PPE.Util.session.clear=function(){

    sessionStorage.clear();

};

/* ==========================================================
   COOKIE HELPER
========================================================== */

PPE.Util.cookie={};

PPE.Util.cookie.set=function(name,value,days){

    const date=new Date();

    date.setTime(

        date.getTime()

        +

        (

            days

            *

            86400000

        )

    );

    document.cookie=

    name+

    "="+

    encodeURIComponent(value)+

    ";expires="+

    date.toUTCString()+

    ";path=/";

};

PPE.Util.cookie.get=function(name){

    const key=name+"=";

    const data=document.cookie.split(";");

    for(let i=0;i<data.length;i++){

        let item=data[i].trim();

        if(item.indexOf(key)===0){

            return decodeURIComponent(

                item.substring(

                    key.length

                )

            );

        }

    }

    return null;

};

/* ==========================================================
   DATE HELPER
========================================================== */

PPE.Util.Date={};

PPE.Util.Date.now=function(){

    return new Date();

};

PPE.Util.Date.today=function(){

    return new Date()

    .toISOString()

    .split("T")[0];

};

PPE.Util.Date.time=function(){

    return Date.now();

};

PPE.Util.Date.format=function(date){

    if(!(date instanceof Date)){

        date=new Date(date);

    }

    return date.toLocaleString();

};

/* ==========================================================
   PERFORMANCE HELPER
========================================================== */

PPE.Util.Performance={};

PPE.Util.Performance.start=function(){

    return performance.now();

};

PPE.Util.Performance.stop=function(start){

    return performance.now()-start;

};

/* ==========================================================
   LOGGER
========================================================== */

PPE.Util.Log={};

PPE.Util.Log.info=function(){

    if(PPE.Debug.enableConsole){

        console.info.apply(

            console,

            arguments

        );

    }

};

PPE.Util.Log.warn=function(){

    if(PPE.Debug.enableConsole){

        console.warn.apply(

            console,

            arguments

        );

    }

};

PPE.Util.Log.error=function(){

    console.error.apply(

        console,

        arguments

    );

};

/* ==========================================================
   PROMISE HELPER
========================================================== */

PPE.Util.Promise={};

PPE.Util.Promise.wait=function(ms){

    return new Promise(

        function(resolve){

            setTimeout(

                resolve,

                ms

            );

        }

    );

};

PPE.Util.Promise.series=async function(tasks){

    const result=[];

    for(const task of tasks){

        result.push(

            await task()

        );

    }

    return result;

};

/* ==========================================================
   VALIDATION HELPER
========================================================== */

PPE.Util.Validation={};

PPE.Util.Validation.email=function(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    .test(email);

};

PPE.Util.Validation.url=function(url){

    try{

        new URL(url);

        return true;

    }

    catch(error){

        return false;

    }

};

PPE.Util.Validation.number=function(value){

    return !isNaN(value);

};

PPE.Util.Validation.integer=function(value){

    return Number.isInteger(value);

};

PPE.Util.Validation.empty=function(value){

    return PPE.Util.isEmpty(value);

};

/* ==========================================================
   COLOR HELPER
========================================================== */

PPE.Util.Color={};

PPE.Util.Color.random=function(){

    return "#"

    +

    Math.floor(

        Math.random()*16777215

    )

    .toString(16)

    .padStart(6,"0");

};

PPE.Util.Color.rgb=function(r,g,b){

    return "rgb("+

    r+","+

    g+","+

    b+")";

};

PPE.Util.Color.rgba=function(r,g,b,a){

    return "rgba("+

    r+","+

    g+","+

    b+","+

    a+")";

};

/* ==========================================================
   CLIPBOARD HELPER
========================================================== */

PPE.Util.Clipboard={};

PPE.Util.Clipboard.copy=async function(text){

    if(

        navigator.clipboard

    ){

        await navigator.clipboard.writeText(text);

        return true;

    }

    return false;

};

/* ==========================================================
   DOWNLOAD HELPER
========================================================== */

PPE.Util.Download={};

PPE.Util.Download.text=function(

    filename,

    content

){

    const blob=new Blob(

        [content],

        {

            type:"text/plain"

        }

    );

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download=filename;

    a.click();

    URL.revokeObjectURL(url);

};

/* ==========================================================
   ANIMATION HELPER
========================================================== */

PPE.Util.Animation={};

PPE.Util.Animation.fadeIn=function(

    element,

    duration

){

    if(!element){

        return;

    }

    duration=duration||300;

    element.style.opacity=0;

    element.style.display="";

    element.style.transition=

    "opacity "+duration+"ms";

    requestAnimationFrame(function(){

        element.style.opacity=1;

    });

};

PPE.Util.Animation.fadeOut=function(

    element,

    duration

){

    if(!element){

        return;

    }

    duration=duration||300;

    element.style.opacity=1;

    element.style.transition=

    "opacity "+duration+"ms";

    requestAnimationFrame(function(){

        element.style.opacity=0;

    });

    setTimeout(function(){

        element.style.display="none";

    },duration);

};

PPE.Util.Animation.show=function(

    element

){

    PPE.Util.Animation.fadeIn(

        element,

        250

    );

};

PPE.Util.Animation.hide=function(

    element

){

    PPE.Util.Animation.fadeOut(

        element,

        250

    );

};

/* ==========================================================
   REQUEST ANIMATION FRAME
========================================================== */

PPE.Util.Animation.frame=function(

    callback

){

    return requestAnimationFrame(

        callback

    );

};

PPE.Util.Animation.cancel=function(id){

    cancelAnimationFrame(id);

};

/* ==========================================================
   EASING
========================================================== */

PPE.Util.Animation.easeInOut=function(t){

    return

    t<0.5

    ?

    2*t*t

    :

    -1+

    (4-2*t)

    *t;

};

PPE.Util.Animation.linear=function(t){

    return t;

};

/* ==========================================================
   OPACITY
========================================================== */

PPE.Util.Animation.opacity=function(

    element,

    value

){

    if(!element){

        return;

    }

    element.style.opacity=value;

};

/* ==========================================================
   FULLSCREEN HELPER
========================================================== */

PPE.Util.Fullscreen={};

PPE.Util.Fullscreen.enter=async function(element){

    element=element||document.documentElement;

    if(element.requestFullscreen){

        await element.requestFullscreen();

    }

};

PPE.Util.Fullscreen.exit=async function(){

    if(document.fullscreenElement){

        await document.exitFullscreen();

    }

};

PPE.Util.Fullscreen.toggle=async function(element){

    if(document.fullscreenElement){

        await PPE.Util.Fullscreen.exit();

    }else{

        await PPE.Util.Fullscreen.enter(element);

    }

};

PPE.Util.Fullscreen.active=function(){

    return document.fullscreenElement!==null;

};

/* ==========================================================
   SCREEN HELPER
========================================================== */

PPE.Util.Screen={};

PPE.Util.Screen.width=function(){

    return window.innerWidth;

};

PPE.Util.Screen.height=function(){

    return window.innerHeight;

};

PPE.Util.Screen.center=function(){

    return{

        x:window.innerWidth/2,

        y:window.innerHeight/2

    };

};

/* ==========================================================
   RESIZE HELPER
========================================================== */

PPE.Util.Resize={};

PPE.Util.Resize.observe=function(

    element,

    callback

){

    if(

        !window.ResizeObserver||

        !element

    ){

        return null;

    }

    const observer=

    new ResizeObserver(callback);

    observer.observe(element);

    return observer;

};

/* ==========================================================
   SCROLL POSITION
========================================================== */

PPE.Util.Scroll={};

PPE.Util.Scroll.position=function(element){

    if(!element){

        return 0;

    }

    return element.scrollTop;

};

PPE.Util.Scroll.percent=function(element){

    if(!element){

        return 0;

    }

    const max=

    element.scrollHeight-

    element.clientHeight;

    if(max<=0){

        return 0;

    }

    return (element.scrollTop/max)*100;

};

/* ==========================================================
   MATH HELPER
========================================================== */

PPE.Util.Math={};

PPE.Util.Math.clamp=function(value,min,max){

    return Math.min(

        Math.max(value,min),

        max

    );

};

PPE.Util.Math.lerp=function(start,end,t){

    return start+

    (end-start)*t;

};

PPE.Util.Math.map=function(

    value,

    inMin,

    inMax,

    outMin,

    outMax

){

    return (

        (value-inMin)

        *

        (outMax-outMin)

        /

        (inMax-inMin)

    )+outMin;

};

PPE.Util.Math.randomFloat=function(min,max){

    return Math.random()

    *

    (max-min)

    +

    min;

};

/* ==========================================================
   FORMATTER
========================================================== */

PPE.Util.Format={};

PPE.Util.Format.fileSize=function(bytes){

    if(bytes<1024){

        return bytes+" B";

    }

    if(bytes<1048576){

        return (bytes/1024)

        .toFixed(2)

        +" KB";

    }

    if(bytes<1073741824){

        return (bytes/1048576)

        .toFixed(2)

        +" MB";

    }

    return (bytes/1073741824)

    .toFixed(2)

    +" GB";

};

PPE.Util.Format.percent=function(value){

    return value

    .toFixed(1)

    +"%";

};

/* ==========================================================
   URL HELPER
========================================================== */

PPE.Util.URL={};

PPE.Util.URL.parameter=function(name){

    const params=

    new URLSearchParams(

        window.location.search

    );

    return params.get(name);

};

PPE.Util.URL.current=function(){

    return window.location.href;

};

PPE.Util.URL.origin=function(){

    return window.location.origin;

};

/* ==========================================================
   QUERY STRING
========================================================== */

PPE.Util.Query={};

PPE.Util.Query.build=function(object){

    return new URLSearchParams(

        object

    ).toString();

};

/* ==========================================================
   FILE HELPER
========================================================== */

PPE.Util.File={};

PPE.Util.File.extension=function(filename){

    if(PPE.Util.isEmpty(filename)){

        return "";

    }

    const index=filename.lastIndexOf(".");

    if(index===-1){

        return "";

    }

    return filename.substring(index+1).toLowerCase();

};

PPE.Util.File.name=function(filename){

    if(PPE.Util.isEmpty(filename)){

        return "";

    }

    const index=filename.lastIndexOf(".");

    if(index===-1){

        return filename;

    }

    return filename.substring(0,index);

};

PPE.Util.File.isImage=function(filename){

    const ext=PPE.Util.File.extension(filename);

    return [

        "png",

        "jpg",

        "jpeg",

        "gif",

        "webp",

        "svg"

    ].includes(ext);

};

PPE.Util.File.isAudio=function(filename){

    const ext=PPE.Util.File.extension(filename);

    return [

        "mp3",

        "wav",

        "ogg",

        "aac",

        "m4a"

    ].includes(ext);

};

PPE.Util.File.isVideo=function(filename){

    const ext=PPE.Util.File.extension(filename);

    return [

        "mp4",

        "webm",

        "mov",

        "mkv"

    ].includes(ext);

};

PPE.Util.File.isJSON=function(filename){

    return PPE.Util.File.extension(filename)

    ===

    "json";

};

/* ==========================================================
   CONVERTER
========================================================== */

PPE.Util.Convert={};

PPE.Util.Convert.toInt=function(value){

    return parseInt(value,10);

};

PPE.Util.Convert.toFloat=function(value){

    return parseFloat(value);

};

PPE.Util.Convert.toString=function(value){

    return String(value);

};

PPE.Util.Convert.toNumber=function(value){

    return Number(value);

};

PPE.Util.Convert.toArray=function(value){

    if(Array.isArray(value)){

        return value;

    }

    return [value];

};

/* ==========================================================
   BOOLEAN CONVERTER
========================================================== */

PPE.Util.Convert.toBoolean=function(value){

    return Boolean(value);

};

/* ==========================================================
   TEXT HELPER
========================================================== */

PPE.Util.Text={};

PPE.Util.Text.contains=function(text,keyword){

    if(PPE.Util.isEmpty(text)){

        return false;

    }

    return String(text)

    .includes(keyword);

};

PPE.Util.Text.startsWith=function(text,prefix){

    return String(text)

    .startsWith(prefix);

};

PPE.Util.Text.endsWith=function(text,suffix){

    return String(text)

    .endsWith(suffix);

};

PPE.Util.Text.replaceAll=function(

    text,

    search,

    replace

){

    return String(text)

    .split(search)

    .join(replace);

};

PPE.Util.Text.reverse=function(text){

    return String(text)

    .split("")

    .reverse()

    .join("");

};

PPE.Util.Text.wordCount=function(text){

    if(PPE.Util.isEmpty(text)){

        return 0;

    }

    return String(text)

    .trim()

    .split(/\s+/)

    .length;

};

/* ==========================================================
   ARRAY SEARCH
========================================================== */

PPE.Util.Array={};

PPE.Util.Array.findById=function(

    array,

    id

){

    return array.find(function(item){

        return item.id===id;

    });

};

PPE.Util.Array.removeById=function(

    array,

    id

){

    return array.filter(function(item){

        return item.id!==id;

    });

};

PPE.Util.Array.sortAscending=function(array){

    return [...array]

    .sort(function(a,b){

        return a-b;

    });

};

PPE.Util.Array.sortDescending=function(array){

    return [...array]

    .sort(function(a,b){

        return b-a;

    });

};

/* ==========================================================
   RANGE HELPER
========================================================== */

PPE.Util.Range=function(

    start,

    end

){

    const list=[];

    for(

        let i=start;

        i<=end;

        i++

    ){

        list.push(i);

    }

    return list;

};

/* ==========================================================
   FUNCTION HELPER
========================================================== */

PPE.Util.Function={};

PPE.Util.Function.debounce=function(

    callback,

    delay

){

    let timer;

    return function(){

        const context=this;

        const args=arguments;

        clearTimeout(timer);

        timer=setTimeout(function(){

            callback.apply(

                context,

                args

            );

        },delay);

    };

};

PPE.Util.Function.throttle=function(

    callback,

    delay

){

    let waiting=false;

    return function(){

        if(waiting){

            return;

        }

        waiting=true;

        callback.apply(

            this,

            arguments

        );

        setTimeout(function(){

            waiting=false;

        },delay);

    };

};

/* ==========================================================
   OBJECT HELPER
========================================================== */

PPE.Util.Object={};

PPE.Util.Object.isEmpty=function(object){

    return Object.keys(object)

    .length===0;

};

PPE.Util.Object.clone=function(object){

    return JSON.parse(

        JSON.stringify(object)

    );

};

PPE.Util.Object.freeze=function(object){

    return Object.freeze(object);

};

/* ==========================================================
   COMPARE HELPER
========================================================== */

PPE.Util.Compare={};

PPE.Util.Compare.equal=function(a,b){

    return JSON.stringify(a)

    ===

    JSON.stringify(b);

};

PPE.Util.Compare.notEqual=function(a,b){

    return !PPE.Util.Compare.equal(a,b);

};

/* ==========================================================
   MEMORY HELPER
========================================================== */

PPE.Util.Memory={};

PPE.Util.Memory.used=function(){

    if(

        performance&&

        performance.memory

    ){

        return performance.memory.usedJSHeapSize;

    }

    return 0;

};

PPE.Util.Memory.total=function(){

    if(

        performance&&

        performance.memory

    ){

        return performance.memory.totalJSHeapSize;

    }

    return 0;

};

/* ==========================================================
   ASYNC HELPER
========================================================== */

PPE.Util.Async={};

PPE.Util.Async.sleep=function(ms){

    return new Promise(function(resolve){

        setTimeout(resolve,ms);

    });

};

PPE.Util.Async.parallel=async function(tasks){

    return await Promise.all(tasks);

};

PPE.Util.Async.sequence=async function(tasks){

    const result=[];

    for(const task of tasks){

        result.push(

            await task()

        );

    }

    return result;

};

/* ==========================================================
   RETRY HELPER
========================================================== */

PPE.Util.Async.retry=async function(

    callback,

    retry

){

    retry=retry||3;

    let error=null;

    for(

        let i=0;

        i<retry;

        i++

    ){

        try{

            return await callback();

        }

        catch(e){

            error=e;

        }

    }

    throw error;

};

/* ==========================================================
   PERFORMANCE TIMER
========================================================== */

PPE.Util.Timer={};

PPE.Util.Timer.start=function(){

    return performance.now();

};

PPE.Util.Timer.stop=function(start){

    return performance.now()-start;

};

/* ==========================================================
   BENCHMARK
========================================================== */

PPE.Util.Timer.measure=async function(

    callback

){

    const start=

    performance.now();

    await callback();

    return performance.now()-start;

};

/* ==========================================================
   HASH HELPER
========================================================== */

PPE.Util.Hash={};

PPE.Util.Hash.simple=function(text){

    let hash=0;

    if(

        text.length===0

    ){

        return hash;

    }

    for(

        let i=0;

        i<text.length;

        i++

    ){

        const chr=text.charCodeAt(i);

        hash=((hash<<5)-hash)+chr;

        hash|=0;

    }

    return hash;

};

/* ==========================================================
   END PART 17
========================================================== */

/* ==========================================================
   NETWORK HELPER
========================================================== */

PPE.Util.Network={};

PPE.Util.Network.online=function(){

    return navigator.onLine;

};

PPE.Util.Network.fetchJSON=async function(url){

    const response=

    await fetch(url);

    if(

        !response.ok

    ){

        throw new Error(

            "Network Error"

        );

    }

    return await response.json();

};

PPE.Util.Network.fetchText=async function(url){

    const response=

    await fetch(url);

    if(

        !response.ok

    ){

        throw new Error(

            "Network Error"

        );

    }

    return await response.text();

};

/* ==========================================================
   RETRY FETCH
========================================================== */

PPE.Util.Network.retryFetch=

async function(

    url,

    retry

){

    retry=retry||3;

    let error;

    for(

        let i=0;

        i<retry;

        i++

    ){

        try{

            return await PPE.Util.Network

            .fetchJSON(url);

        }

        catch(e){

            error=e;

        }

    }

    throw error;

};

/* ==========================================================
   CONNECTION TYPE
========================================================== */

PPE.Util.Network.connection=function(){

    if(

        navigator.connection

    ){

        return{

            type:

            navigator.connection.effectiveType,

            downlink:

            navigator.connection.downlink,

            rtt:

            navigator.connection.rtt

        };

    }

    return null;

};

/* ==========================================================
   DEVICE INFORMATION
========================================================== */

PPE.Util.Device={};

PPE.Util.Device.userAgent=function(){

    return navigator.userAgent;

};

PPE.Util.Device.language=function(){

    return navigator.language;

};

PPE.Util.Device.platform=function(){

    return navigator.platform;

};

PPE.Util.Device.cookie=function(){

    return navigator.cookieEnabled;

};

PPE.Util.Device.hardware=function(){

    return{

        cpu:

        navigator.hardwareConcurrency||0,

        memory:

        navigator.deviceMemory||0

    };

};

/* ==========================================================
   END PART 18
========================================================== */

/* ==========================================================
   BROWSER HELPER
========================================================== */

PPE.Util.Browser={};

PPE.Util.Browser.name=function(){

    const ua=navigator.userAgent;

    if(ua.indexOf("Chrome")>-1){

        return "Chrome";

    }

    if(ua.indexOf("Firefox")>-1){

        return "Firefox";

    }

    if(ua.indexOf("Safari")>-1){

        return "Safari";

    }

    if(ua.indexOf("Edge")>-1){

        return "Edge";

    }

    return "Unknown";

};

PPE.Util.Browser.version=function(){

    return navigator.appVersion;

};

PPE.Util.Browser.cookies=function(){

    return navigator.cookieEnabled;

};

/* ==========================================================
   VIEWPORT HELPER
========================================================== */

PPE.Util.Viewport={};

PPE.Util.Viewport.width=function(){

    return Math.max(

        document.documentElement.clientWidth,

        window.innerWidth||0

    );

};

PPE.Util.Viewport.height=function(){

    return Math.max(

        document.documentElement.clientHeight,

        window.innerHeight||0

    );

};

PPE.Util.Viewport.center=function(){

    return{

        x:PPE.Util.Viewport.width()/2,

        y:PPE.Util.Viewport.height()/2

    };

};

/* ==========================================================
   RANDOM HELPER
========================================================== */

PPE.Util.Random={};

PPE.Util.Random.integer=function(min,max){

    return Math.floor(

        Math.random()*

        (max-min+1)

    )+min;

};

PPE.Util.Random.float=function(min,max){

    return Math.random()

    *(max-min)

    +min;

};

PPE.Util.Random.boolean=function(){

    return Math.random()>=0.5;

};

PPE.Util.Random.pick=function(array){

    return array[

        PPE.Util.Random.integer(

            0,

            array.length-1

        )

    ];

};

/* ==========================================================
   UUID V4
========================================================== */

PPE.Util.Random.uuid=function(){

    return crypto.randomUUID();

};

/* ==========================================================
   QUEUE HELPER
========================================================== */

PPE.Util.Queue={};

PPE.Util.Queue.create=function(){

    return [];

};

PPE.Util.Queue.enqueue=function(queue,item){

    queue.push(item);

    return queue.length;

};

PPE.Util.Queue.dequeue=function(queue){

    if(queue.length===0){

        return null;

    }

    return queue.shift();

};

PPE.Util.Queue.peek=function(queue){

    if(queue.length===0){

        return null;

    }

    return queue[0];

};

PPE.Util.Queue.clear=function(queue){

    queue.length=0;

};

/* ==========================================================
   STACK HELPER
========================================================== */

PPE.Util.Stack={};

PPE.Util.Stack.create=function(){

    return [];

};

PPE.Util.Stack.push=function(stack,item){

    stack.push(item);

};

PPE.Util.Stack.pop=function(stack){

    if(stack.length===0){

        return null;

    }

    return stack.pop();

};

PPE.Util.Stack.peek=function(stack){

    if(stack.length===0){

        return null;

    }

    return stack[stack.length-1];

};

/* ==========================================================
   IDENTITY HELPER
========================================================== */

PPE.Util.Identity={};

PPE.Util.Identity.equals=function(a,b){

    return a===b;

};

PPE.Util.Identity.exists=function(value){

    return value!==null

    &&

    value!==undefined;

};

/* ==========================================================
   NO OPERATION
========================================================== */

PPE.Util.noop=function(){};

/* ==========================================================
   END PART 20
========================================================== */

/* ==========================================================
   COLLECTION HELPER
========================================================== */

PPE.Util.Collection={};

PPE.Util.Collection.each=function(

    collection,

    callback

){

    if(

        !collection||

        !callback

    ){

        return;

    }

    for(

        let i=0;

        i<collection.length;

        i++

    ){

        callback(

            collection[i],

            i

        );

    }

};

PPE.Util.Collection.map=function(

    collection,

    callback

){

    const result=[];

    for(

        let i=0;

        i<collection.length;

        i++

    ){

        result.push(

            callback(

                collection[i],

                i

            )

        );

    }

    return result;

};

PPE.Util.Collection.filter=function(

    collection,

    callback

){

    const result=[];

    for(

        let i=0;

        i<collection.length;

        i++

    ){

        if(

            callback(

                collection[i],

                i

            )

        ){

            result.push(

                collection[i]

            );

        }

    }

    return result;

};

PPE.Util.Collection.find=function(

    collection,

    callback

){

    for(

        let i=0;

        i<collection.length;

        i++

    ){

        if(

            callback(

                collection[i],

                i

            )

        ){

            return collection[i];

        }

    }

    return null;

};

/* ==========================================================
   SORT HELPER
========================================================== */

PPE.Util.Sort={};

PPE.Util.Sort.asc=function(array){

    return [...array]

    .sort(function(a,b){

        return a>b?1:-1;

    });

};

PPE.Util.Sort.desc=function(array){

    return [...array]

    .sort(function(a,b){

        return a<b?1:-1;

    });

};

/* ==========================================================
   SEARCH HELPER
========================================================== */

PPE.Util.Search={};

PPE.Util.Search.binary=function(

    array,

    target

){

    let left=0;

    let right=array.length-1;

    while(left<=right){

        const middle=

        Math.floor(

            (left+right)/2

        );

        if(

            array[middle]===target

        ){

            return middle;

        }

        if(

            array[middle]<target

        ){

            left=middle+1;

        }

        else{

            right=middle-1;

        }

    }

    return -1;

};

/* ==========================================================
   END PART 21
========================================================== */

/* ==========================================================
   STRING FORMATTER
========================================================== */

PPE.Util.Format.padLeft=function(

    value,

    length,

    character

){

    character=character||"0";

    return String(value)

    .padStart(

        length,

        character

    );

};

PPE.Util.Format.padRight=function(

    value,

    length,

    character

){

    character=character||" ";

    return String(value)

    .padEnd(

        length,

        character

    );

};

PPE.Util.Format.upper=function(text){

    return String(text)

    .toUpperCase();

};

PPE.Util.Format.lower=function(text){

    return String(text)

    .toLowerCase();

};

PPE.Util.Format.title=function(text){

    return String(text)

    .replace(

        /\w\S*/g,

        function(word){

            return word.charAt(0)

            .toUpperCase()

            +

            word.substring(1)

            .toLowerCase();

        }

    );

};

/* ==========================================================
   JSON FORMATTER
========================================================== */

PPE.Util.JSON={};

PPE.Util.JSON.pretty=function(object){

    return JSON.stringify(

        object,

        null,

        2

    );

};

PPE.Util.JSON.minify=function(object){

    return JSON.stringify(object);

};

/* ==========================================================
   OBJECT PATH
========================================================== */

PPE.Util.Path={};

PPE.Util.Path.get=function(

    object,

    path

){

    return path

    .split(".")

    .reduce(function(

        current,

        key

    ){

        return current

        ?

        current[key]

        :

        undefined;

    },object);

};

PPE.Util.Path.set=function(

    object,

    path,

    value

){

    const keys=

    path.split(".");

    let current=object;

    while(keys.length>1){

        const key=

        keys.shift();

        if(!current[key]){

            current[key]={};

        }

        current=current[key];

    }

    current[keys[0]]=value;

    return object;

};

/* ==========================================================
   END PART 22
========================================================== */

/* ==========================================================
   TREE HELPER
========================================================== */

PPE.Util.Tree={};

PPE.Util.Tree.walk=function(

    node,

    callback

){

    if(!node){

        return;

    }

    callback(node);

    if(

        Array.isArray(node.children)

    ){

        node.children.forEach(function(child){

            PPE.Util.Tree.walk(

                child,

                callback

            );

        });

    }

};

PPE.Util.Tree.find=function(

    node,

    predicate

){

    if(!node){

        return null;

    }

    if(predicate(node)){

        return node;

    }

    if(

        Array.isArray(node.children)

    ){

        for(

            const child of node.children

        ){

            const result=

            PPE.Util.Tree.find(

                child,

                predicate

            );

            if(result){

                return result;

            }

        }

    }

    return null;

};

/* ==========================================================
   PIPELINE HELPER
========================================================== */

PPE.Util.Pipeline={};

PPE.Util.Pipeline.run=function(

    value,

    functions

){

    let result=value;

    for(

        const fn of functions

    ){

        result=fn(result);

    }

    return result;

};

/* ==========================================================
   RETRY HELPER
========================================================== */

PPE.Util.Retry={};

PPE.Util.Retry.execute=

async function(

    callback,

    retry,

    delay

){

    retry=retry||3;

    delay=delay||0;

    let error;

    for(

        let i=0;

        i<retry;

        i++

    ){

        try{

            return await callback();

        }

        catch(e){

            error=e;

            if(delay>0){

                await PPE.Util.Async.sleep(

                    delay

                );

            }

        }

    }

    throw error;

};

/* ==========================================================
   SAFE EXECUTION
========================================================== */

PPE.Util.safe=function(

    callback,

    fallback

){

    try{

        return callback();

    }

    catch(error){

        return fallback;

    }

};

/* ==========================================================
   END PART 23
========================================================== */

/* ==========================================================
   CACHE HELPER
========================================================== */

PPE.Util.Cache={};

PPE.Util.Cache.store=new Map();

PPE.Util.Cache.set=function(

    key,

    value

){

    PPE.Util.Cache.store.set(

        key,

        value

    );

};

PPE.Util.Cache.get=function(key){

    return PPE.Util.Cache.store.get(

        key

    );

};

PPE.Util.Cache.has=function(key){

    return PPE.Util.Cache.store.has(

        key

    );

};

PPE.Util.Cache.remove=function(key){

    PPE.Util.Cache.store.delete(

        key

    );

};

PPE.Util.Cache.clear=function(){

    PPE.Util.Cache.store.clear();

};

/* ==========================================================
   HISTORY HELPER
========================================================== */

PPE.Util.History={};

PPE.Util.History.list=[];

PPE.Util.History.push=function(item){

    PPE.Util.History.list.push(

        item

    );

};

PPE.Util.History.last=function(){

    if(

        PPE.Util.History.list.length===0

    ){

        return null;

    }

    return PPE.Util.History.list[

        PPE.Util.History.list.length-1

    ];

};

PPE.Util.History.clear=function(){

    PPE.Util.History.list=[];

};

/* ==========================================================
   ENVIRONMENT HELPER
========================================================== */

PPE.Util.Environment={};

PPE.Util.Environment.production=function(){

    return !PPE.debug;

};

PPE.Util.Environment.debug=function(){

    return PPE.debug;

};

PPE.Util.Environment.version=function(){

    return PPE.version;

};

PPE.Util.Environment.package=function(){

    return "PPE-002";

};

/* ==========================================================
   END PART 24
========================================================== */

/* ==========================================================
   INITIALIZATION
========================================================== */

PPE.Util.initialize=function(){

    PPE.Initialize.utility=true;

    PPE.Util.Log.info(

        "[PPE] Utility initialized"

    );

    return true;

};

/* ==========================================================
   SELF TEST
========================================================== */

PPE.Util.selfTest=function(){

    return{

        initialized:

        PPE.Initialize.utility,

        version:

        PPE.version,

        package:

        "PPE-002",

        browser:

        navigator.userAgent,

        online:

        navigator.onLine

    };

};

/* ==========================================================
   COMPATIBILITY CHECK
========================================================== */

PPE.Util.compatibility=function(){

    return{

        promise:

        typeof Promise!=="undefined",

        fetch:

        typeof fetch!=="undefined",

        localStorage:

        typeof localStorage!=="undefined",

        requestAnimationFrame:

        typeof requestAnimationFrame!=="undefined",

        fullscreen:

        typeof document

        .fullscreenEnabled

        !=="undefined"

    };

};

/* ==========================================================
   REGISTER MODULE
========================================================== */

PPE.Engine.Utility=PPE.Util;

/* ==========================================================
   AUTO INITIALIZE
========================================================== */

PPE.Util.initialize();

/* ==========================================================
   END OF FILE

   Package : PPE-002

   File : util.js

   Status : IMPLEMENTATION COMPLETE

========================================================== */

