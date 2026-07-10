/*
==========================================================
POLYGLOT PRESENTATION ENGINE

Package : PPE-011

File : ai.js

Version : 1.0.0-alpha.1

==========================================================
*/

"use strict";

/* ==========================================================
   AI ENGINE
========================================================== */

PPE.AI={};

/* ==========================================================
   STATE
========================================================== */

PPE.AI.state={

    initialized:false,

    provider:"groq",

    ready:false,

    model:null

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.AI.initialize=function(){

    PPE.AI.state.initialized=true;

    PPE.AI.state.ready=true;

    if(!PPE.Initialize){
        PPE.Initialize={};
    }

    PPE.Initialize.ai=true;

};


/* ==========================================================
   PROVIDER ENGINE
========================================================== */

PPE.AI.Provider={

    current:"groq",

    available:[

        "groq",

        "openai",

        "local"

    ]

};

PPE.AI.Provider.set=function(

    provider

){

    if(

        PPE.AI.Provider.available

        .includes(provider)

    ){

        PPE.AI.Provider.current=

        provider;

    }

};

PPE.AI.Provider.get=function(){

    return PPE.AI.Provider.current;

};

PPE.AI.Provider.is=function(

    provider

){

    return PPE.AI.Provider.current===provider;

};

/* ==========================================================
   MODEL ENGINE
========================================================== */

PPE.AI.Model={

    current:null

};

PPE.AI.Model.set=function(

    model

){

    PPE.AI.Model.current=model;

};

PPE.AI.Model.get=function(){

    return PPE.AI.Model.current;

};

PPE.AI.Model.clear=function(){

    PPE.AI.Model.current=null;

};

/* ==========================================================
   PROMPT BUILDER
========================================================== */

PPE.AI.Prompt={

    system:"",

    user:"",

    history:[]

};

PPE.AI.Prompt.systemMessage=

function(text){

    PPE.AI.Prompt.system=text;

};

PPE.AI.Prompt.userMessage=

function(text){

    PPE.AI.Prompt.user=text;

};

PPE.AI.Prompt.build=

function(){

    return{

        system:

        PPE.AI.Prompt.system,

        user:

        PPE.AI.Prompt.user,

        history:

        PPE.AI.Prompt.history

    };

};

/* ==========================================================
   CONVERSATION MANAGER
========================================================== */

PPE.AI.Conversation={

    messages:[]

};

PPE.AI.Conversation.add=

function(

    role,

    content

){

    PPE.AI.Conversation.messages.push({

        role:role,

        content:content

    });

};

PPE.AI.Conversation.clear=

function(){

    PPE.AI.Conversation.messages=[];

};

PPE.AI.Conversation.list=

function(){

    return PPE.AI.Conversation.messages;

};

/* ==========================================================
   TRANSLATION ENGINE
========================================================== */

PPE.AI.Translate={

    source:"id",

    target:"en"

};

PPE.AI.Translate.configure=

function(

    source,

    target

){

    PPE.AI.Translate.source=

    source;

    PPE.AI.Translate.target=

    target;

};

PPE.AI.Translate.request=

function(text){

    return{

        task:"translate",

        source:

        PPE.AI.Translate.source,

        target:

        PPE.AI.Translate.target,

        text:text

    };

};

/* ==========================================================
   GRAMMAR ENGINE
========================================================== */

PPE.AI.Grammar={

    enabled:true,

    language:"en"

};

PPE.AI.Grammar.configure=

function(language){

    PPE.AI.Grammar.language=

    language;

};

PPE.AI.Grammar.request=

function(text){

    return{

        task:"grammar",

        language:

        PPE.AI.Grammar.language,

        text:text

    };

};

PPE.AI.Grammar.enable=

function(){

    PPE.AI.Grammar.enabled=true;

};

PPE.AI.Grammar.disable=

function(){

    PPE.AI.Grammar.enabled=false;

};

/* ==========================================================
   ANSWER ANALYSIS
========================================================== */

PPE.AI.Analysis={

    level:"standard"

};

PPE.AI.Analysis.setLevel=

function(level){

    PPE.AI.Analysis.level=

    level;

};

PPE.AI.Analysis.request=

function(answer){

    return{

        task:"analysis",

        level:

        PPE.AI.Analysis.level,

        answer:answer

    };

};

PPE.AI.Analysis.reset=

function(){

    PPE.AI.Analysis.level=

    "standard";

};

/* ==========================================================
   FEEDBACK ENGINE
========================================================== */

PPE.AI.Feedback={

    style:"coach"

};

PPE.AI.Feedback.setStyle=

function(style){

    PPE.AI.Feedback.style=

    style;

};

PPE.AI.Feedback.request=

function(data){

    return{

        task:"feedback",

        style:

        PPE.AI.Feedback.style,

        data:data

    };

};

PPE.AI.Feedback.reset=

function(){

    PPE.AI.Feedback.style=

    "coach";

};

/* ==========================================================
   PROVIDER ADAPTER
========================================================== */

PPE.AI.Adapter={

    providers:{}

};

PPE.AI.Adapter.register=

function(

    name,

    adapter

){

    PPE.AI.Adapter.providers[

        name

    ]=adapter;

};

PPE.AI.Adapter.current=

function(){

    return PPE.AI.Adapter.providers[

        PPE.AI.Provider.get()

    ];

};

PPE.AI.Adapter.available=

function(){

    return Object.keys(

        PPE.AI.Adapter.providers

    );

};

/* ==========================================================
   REQUEST DISPATCHER
========================================================== */

PPE.AI.Dispatcher={};

PPE.AI.Dispatcher.send=

async function(request){

    const adapter=

    PPE.AI.Adapter.current();

    if(

        !adapter ||

        typeof adapter.send

        !==

        "function"

    ){

        throw new Error(

            "AI Provider Not Available"

        );

    }

    return await adapter.send(

        request

    );

};

/* ==========================================================
   RESPONSE PARSER
========================================================== */

PPE.AI.Parser={};

PPE.AI.Parser.parse=

function(response){

    return{

        success:

        !!response,

        content:

        response?.content ||

        "",

        usage:

        response?.usage ||

        null,

        raw:

        response

    };

};

PPE.AI.Parser.error=

function(error){

    return{

        success:false,

        message:

        error.message ||

        "Unknown Error"

    };

};

/* ==========================================================
   AI CACHE ENGINE
========================================================== */

PPE.AI.Cache={

    data:{},

    enabled:true

};

PPE.AI.Cache.set=function(

    key,

    value

){

    PPE.AI.Cache.data[key]=

    value;

};

PPE.AI.Cache.get=function(key){

    return PPE.AI.Cache.data[key];

};

PPE.AI.Cache.has=function(key){

    return Object.prototype

    .hasOwnProperty.call(

        PPE.AI.Cache.data,

        key

    );

};

PPE.AI.Cache.clear=function(){

    PPE.AI.Cache.data={};

};

/* ==========================================================
   TOKEN USAGE MONITOR
========================================================== */

PPE.AI.Token={

    prompt:0,

    completion:0,

    total:0

};

PPE.AI.Token.update=

function(usage){

    if(!usage){

        return;

    }

    PPE.AI.Token.prompt+=

    usage.promptTokens||0;

    PPE.AI.Token.completion+=

    usage.completionTokens||0;

    PPE.AI.Token.total=

    PPE.AI.Token.prompt+

    PPE.AI.Token.completion;

};

PPE.AI.Token.report=

function(){

    return{

        prompt:

        PPE.AI.Token.prompt,

        completion:

        PPE.AI.Token.completion,

        total:

        PPE.AI.Token.total

    };

};

/* ==========================================================
   CONVERSATION MEMORY
========================================================== */

PPE.AI.Memory={

    enabled:true,

    limit:20,

    items:[]

};

PPE.AI.Memory.add=function(

    role,

    content

){

    PPE.AI.Memory.items.push({

        role:role,

        content:content

    });

    while(

        PPE.AI.Memory.items.length>

        PPE.AI.Memory.limit

    ){

        PPE.AI.Memory.items.shift();

    }

};

PPE.AI.Memory.clear=

function(){

    PPE.AI.Memory.items=[];

};

PPE.AI.Memory.list=

function(){

    return PPE.AI.Memory.items;

};

/* ==========================================================
   PROMPT TEMPLATE ENGINE
========================================================== */

PPE.AI.Template={

    templates:{}

};

PPE.AI.Template.register=

function(

    name,

    template

){

    PPE.AI.Template.templates[

        name

    ]=template;

};

PPE.AI.Template.get=

function(name){

    return PPE.AI.Template.templates[

        name

    ];

};

PPE.AI.Template.render=

function(

    name,

    data

){

    let text=

    PPE.AI.Template.get(

        name

    ) || "";

    Object.keys(data).forEach(

        function(key){

            text=text.replaceAll(

                "{{"+key+"}}",

                data[key]

            );

        }

    );

    return text;

};

/* ==========================================================
   REQUEST QUEUE
========================================================== */

PPE.AI.Queue={

    items:[],

    running:false

};

PPE.AI.Queue.add=function(

    request

){

    PPE.AI.Queue.items.push(

        request

    );

};

PPE.AI.Queue.next=function(){

    return PPE.AI.Queue.items.shift();

};

PPE.AI.Queue.size=function(){

    return PPE.AI.Queue.items.length;

};

PPE.AI.Queue.clear=function(){

    PPE.AI.Queue.items=[];

};

/* ==========================================================
   RETRY & TIMEOUT
========================================================== */

PPE.AI.Request={

    retry:3,

    timeout:30000

};

PPE.AI.Request.configure=

function(

    retry,

    timeout

){

    PPE.AI.Request.retry=

    retry;

    PPE.AI.Request.timeout=

    timeout;

};

PPE.AI.Request.info=

function(){

    return{

        retry:

        PPE.AI.Request.retry,

        timeout:

        PPE.AI.Request.timeout

    };

};

PPE.AI.Request.reset=

function(){

    PPE.AI.Request.retry=3;

    PPE.AI.Request.timeout=30000;

};

/* ==========================================================
   AI EVENT BUS
========================================================== */

PPE.AI.Event={};

PPE.AI.Event.emit=function(

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

PPE.AI.Event.on=function(

    name,

    callback

){

    document.addEventListener(

        name,

        callback

    );

};

PPE.AI.Event.off=function(

    name,

    callback

){

    document.removeEventListener(

        name,

        callback

    );

};

/* ==========================================================
   AI PLUGIN API
========================================================== */

PPE.AI.Plugin={

    list:[]

};

PPE.AI.Plugin.register=

function(plugin){

    PPE.AI.Plugin.list.push(

        plugin

    );

};

PPE.AI.Plugin.execute=

function(method,data){

    PPE.AI.Plugin.list.forEach(

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

PPE.AI.Plugin.clear=

function(){

    PPE.AI.Plugin.list=[];

};

/* ==========================================================
   PERFORMANCE MONITOR
========================================================== */

PPE.AI.Performance={

    requestCount:0,

    successCount:0,

    errorCount:0,

    responseTime:0

};

PPE.AI.Performance.begin=

function(){

    return performance.now();

};

PPE.AI.Performance.end=

function(start){

    PPE.AI.Performance.responseTime=

    performance.now()-start;

};

PPE.AI.Performance.request=

function(){

    PPE.AI.Performance.requestCount++;

};

PPE.AI.Performance.success=

function(){

    PPE.AI.Performance.successCount++;

};

PPE.AI.Performance.error=

function(){

    PPE.AI.Performance.errorCount++;

};

PPE.AI.Performance.info=

function(){

    return{

        request:

        PPE.AI.Performance.requestCount,

        success:

        PPE.AI.Performance.successCount,

        error:

        PPE.AI.Performance.errorCount,

        responseTime:

        PPE.AI.Performance.responseTime

    };

};

/* ==========================================================
   SNAPSHOT & RECOVERY
========================================================== */

PPE.AI.Recovery={

    snapshot:null

};

PPE.AI.Recovery.save=function(){

    PPE.AI.Recovery.snapshot={

        provider:

        PPE.AI.Provider.get(),

        model:

        PPE.AI.Model.get(),

        memory:

JSON.parse(

JSON.stringify(

PPE.AI.Memory.list()

)),

        token:

        PPE.AI.Token.report()

    };

};

PPE.AI.Recovery.restore=

function(){

    const data=

    PPE.AI.Recovery.snapshot;

    if(!data){

        return;

    }

    PPE.AI.Provider.set(

        data.provider

    );

    PPE.AI.Model.set(

        data.model

    );

};

PPE.AI.Recovery.clear=

function(){

    PPE.AI.Recovery.snapshot=

    null;

};

/* ==========================================================
   DIAGNOSTIC ENGINE
========================================================== */

PPE.AI.diagnostic=

function(){

    console.group(

        "PPE AI"

    );

    console.table(

        PPE.AI.selfTest()

    );

    console.table(

        PPE.AI.Performance.info()

    );

    console.table(

        PPE.AI.Token.report()

    );

    console.groupEnd();

};

/* ==========================================================
   SELF TEST
========================================================== */

PPE.AI.selfTest=

function(){

    return{

        initialized:

        PPE.AI.state.initialized,

        provider:

        PPE.AI.Provider.get(),

        model:

        PPE.AI.Model.get(),

        cache:

        Object.keys(

            PPE.AI.Cache.data

        ).length,

        memory:

        PPE.AI.Memory.list().length,

        performance:

        PPE.AI.Performance.info()

    };

};

/* ==========================================================
   AI STATISTICS
========================================================== */

PPE.AI.Statistics={

    translation:0,

    grammar:0,

    analysis:0,

    feedback:0

};

PPE.AI.Statistics.count=

function(task){

    if(

        PPE.AI.Statistics[task]

        !==

        undefined

    ){

        PPE.AI.Statistics[task]++;

    }

};

PPE.AI.Statistics.report=

function(){

    return{

        translation:

        PPE.AI.Statistics.translation,

        grammar:

        PPE.AI.Statistics.grammar,

        analysis:

        PPE.AI.Statistics.analysis,

        feedback:

        PPE.AI.Statistics.feedback

    };

};

/* ==========================================================
   RUNTIME
========================================================== */

PPE.AI.runtime=function(){

    return{

        package:"PPE-011",

        file:"ai.js",

        version:

PPE.version ||

"1.0.0",

        initialized:

        PPE.AI.state.initialized,

        provider:

        PPE.AI.Provider.get()

    };

};

/* ==========================================================
   COMPATIBILITY REPORT
========================================================== */

PPE.AI.report=function(){

    return{

        runtime:

        PPE.AI.runtime(),

        provider:

        PPE.AI.Provider.get(),

        model:

        PPE.AI.Model.get(),

        statistics:

        PPE.AI.Statistics.report()

    };

};

/* ==========================================================
   HEALTH CHECK
========================================================== */

PPE.AI.health=function(){

    return{

        provider:

        PPE.AI.Provider.get()

        !==

        null,

        model:

        PPE.AI.Model.get()

        !==

        null,

        dispatcher:

        typeof PPE.AI.Dispatcher

        !==

        "undefined",

        parser:

        typeof PPE.AI.Parser

        !==

        "undefined"

    };

};

/* ==========================================================
   AUTO BOOT
========================================================== */

PPE.AI.boot=function(){

    if(!PPE.Initialize){
    PPE.Initialize={};
}

PPE.Initialize.ai=true;

    PPE.AI.Event.emit(

        "PPE_AI_READY",

        PPE.AI.runtime()

    );

};

/* ==========================================================
   REGISTER ENGINE
========================================================== */

PPE.Engine.AI=

PPE.AI;


/* ==========================================================
   CERTIFICATION MARKER

   Package : PPE-011

   File : ai.js

   Status :

   IMPLEMENTATION COMPLETE

========================================================== */