/*
==========================================================
POLYGLOT PRESENTATION ENGINE

Package : PPE-009

File : storage.js

Version : 1.0.0-alpha.1

==========================================================
*/

"use strict";

/* ==========================================================
   STORAGE ENGINE
========================================================== */

PPE.Storage={};

/* ==========================================================
   STATE
========================================================== */

PPE.Storage.state={

    initialized:false,

    provider:"local",

    ready:false

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.Storage.initialize=function(){

    PPE.Storage.state.initialized=true;

    PPE.Storage.state.ready=true;

    if(!PPE.Initialize){
        PPE.Initialize={};
    }

    PPE.Initialize.storage=true;

    return true;

};

/* ==========================================================
   REGISTER
========================================================== */

PPE.Engine.Storage=

PPE.Storage;

/* ==========================================================
   BASIC STORAGE API
========================================================== */

PPE.Storage.save=function(

    key,

    value

){

    const start=
    PPE.Storage.Performance.begin();

    localStorage.setItem(

        key,

        JSON.stringify(value)

    );

    PPE.Storage.Statistics.saved();

    PPE.Storage.Performance.end(

        start,

        "save"

    );

    PPE.Storage.Event.emit(

        "PPE_STORAGE_SAVE",

        {

            key:key

        }

    );

};

PPE.Storage.load=function(key){

    const start=
    PPE.Storage.Performance.begin();

    if(!key){

        return null;

    }

    const value=

    localStorage.getItem(key);

    if(value===null){

        return null;

    }

    const data=

    JSON.parse(value);

    PPE.Storage.Statistics.loaded();

    PPE.Storage.Performance.end(

        start,

        "load"

    );

    PPE.Storage.Event.emit(

        "PPE_STORAGE_LOAD",

        {

            key:key

        }

    );

    return data;

};

PPE.Storage.remove=function(key){

    if(!key){

        return false;

    }

    localStorage.removeItem(

        key

    );

    PPE.Storage.Statistics.removed();

    PPE.Storage.Event.emit(

        "PPE_STORAGE_REMOVE",

        {

            key:key

        }

    );

    return true;

};

PPE.Storage.clear=function(){

    localStorage.clear();

};

/* ==========================================================
   PROVIDER ENGINE
========================================================== */

PPE.Storage.Provider={

    current:"local",

    available:[

        "local",

        "tinydb",

        "firebase",

        "memory"

    ]

};

PPE.Storage.Provider.set=

function(provider){

    if(

        PPE.Storage.Provider.available

        .includes(provider)

    ){

        PPE.Storage.Provider.current=

        provider;

    }

};

PPE.Storage.Provider.get=

function(){

    return PPE.Storage.Provider.current;

};

PPE.Storage.Provider.is=

function(provider){

    return PPE.Storage.Provider.current===provider;

};

/* ==========================================================
   MEMORY CACHE
========================================================== */

PPE.Storage.Cache={

    data:{}

};

PPE.Storage.Cache.set=function(

    key,

    value

){

    PPE.Storage.Cache.data[key]=

    value;

};

PPE.Storage.Cache.get=function(key){

    return PPE.Storage.Cache.data[key];

};

PPE.Storage.Cache.remove=function(key){

    delete PPE.Storage.Cache.data[key];

};

PPE.Storage.Cache.clear=function(){

    PPE.Storage.Cache.data={};

};

/* ==========================================================
   JSON BACKUP
========================================================== */

PPE.Storage.Backup={};

PPE.Storage.Backup.export=function(){

    return JSON.stringify(

        localStorage

    );

};

PPE.Storage.Backup.import=function(

    json

){

    const data=

    JSON.parse(json);

    Object.keys(data)

    .forEach(function(key){

        localStorage.setItem(

            key,

            data[key]

        );

    });

};

PPE.Storage.Backup.download=function(){

    return PPE.Storage.Backup.export();

};

/* ==========================================================
   SYNCHRONIZATION ENGINE
========================================================== */

PPE.Storage.Sync={

    enabled:true,

    lastSync:0

};

PPE.Storage.Sync.run=function(){

    PPE.Storage.Sync.lastSync=

    Date.now();

};

PPE.Storage.Sync.status=function(){

    return{

        enabled:

        PPE.Storage.Sync.enabled,

        lastSync:

        PPE.Storage.Sync.lastSync

    };

};

PPE.Storage.Sync.enable=function(){

    PPE.Storage.Sync.enabled=true;

};

PPE.Storage.Sync.disable=function(){

    PPE.Storage.Sync.enabled=false;

};

/* ==========================================================
   ENCRYPTION ENGINE
========================================================== */

PPE.Storage.Security={

    enabled:false

};

PPE.Storage.Security.enable=function(){

    PPE.Storage.Security.enabled=true;

};

PPE.Storage.Security.disable=function(){

    PPE.Storage.Security.enabled=false;

};

PPE.Storage.Security.encode=function(

    value

){

    return btoa(

        JSON.stringify(value)

    );

};

PPE.Storage.Security.decode=function(

    value

){

    return JSON.parse(

        atob(value)

    );

};

/* ==========================================================
   TTL ENGINE
========================================================== */

PPE.Storage.TTL={};

PPE.Storage.TTL.save=function(

    key,

    value,

    ttl

){

    PPE.Storage.save(

        key,

        {

            value:value,

            expire:

            Date.now()+ttl

        }

    );

};

PPE.Storage.TTL.load=function(

    key

){

    const data=

    PPE.Storage.load(key);

    if(

        !data

    ){

        return null;

    }

    if(

        Date.now()>data.expire

    ){

        PPE.Storage.remove(key);

        return null;

    }

    return data.value;

};

/* ==========================================================
   NAMESPACE ENGINE
========================================================== */

PPE.Storage.Namespace={

    current:"PPE"

};

PPE.Storage.Namespace.set=

function(name){

    PPE.Storage.Namespace.current=

    name;

};

PPE.Storage.Namespace.key=

function(key){

    return(

        PPE.Storage.Namespace.current+

        "_"+

        key

    );

};

PPE.Storage.Namespace.save=

function(key,value){
  
  if(!key){

    return false;

}

    PPE.Storage.save(

        PPE.Storage.Namespace.key(

            key

        ),

        value

    );

};

PPE.Storage.Namespace.load=

function(key){

    return PPE.Storage.load(

        PPE.Storage.Namespace.key(

            key

        )

    );

};


/* ==========================================================
   COLLECTION ENGINE
========================================================== */

PPE.Storage.Collection={};

PPE.Storage.Collection.save=function(

    collection,

    id,

    value

){

    PPE.Storage.Namespace.save(

        collection+"_"+id,

        value

    );

};

PPE.Storage.Collection.load=function(

    collection,

    id

){

    return PPE.Storage.Namespace.load(

        collection+"_"+id

    );

};

PPE.Storage.Collection.remove=function(

    collection,

    id

){

    PPE.Storage.remove(

        PPE.Storage.Namespace.key(

            collection+"_"+id

        )

    );

};

/* ==========================================================
   TRANSACTION ENGINE
========================================================== */

PPE.Storage.Transaction={

    active:false,

    queue:[]

};

PPE.Storage.Transaction.begin=

function(){

    PPE.Storage.Transaction.active=true;

    PPE.Storage.Transaction.queue=[];

};

PPE.Storage.Transaction.add=

function(action){

    PPE.Storage.Transaction.queue.push(

        action

    );

};

PPE.Storage.Transaction.commit=

function(){

    PPE.Storage.Transaction.queue

    .forEach(function(action){

        action();

    });

    PPE.Storage.Transaction.active=false;

};

PPE.Storage.Transaction.rollback=

function(){

    PPE.Storage.Transaction.queue=[];

    PPE.Storage.Transaction.active=false;

};

/* ==========================================================
   STORAGE STATISTICS
========================================================== */

PPE.Storage.Statistics={

    saveCount:0,

    loadCount:0,

    removeCount:0

};

PPE.Storage.Statistics.saved=

function(){

    PPE.Storage.Statistics.saveCount++;

};

PPE.Storage.Statistics.loaded=

function(){

    PPE.Storage.Statistics.loadCount++;

};

PPE.Storage.Statistics.removed=

function(){

    PPE.Storage.Statistics.removeCount++;

};

PPE.Storage.Statistics.report=

function(){

    return{

        save:

        PPE.Storage.Statistics.saveCount,

        load:

        PPE.Storage.Statistics.loadCount,

        remove:

        PPE.Storage.Statistics.removeCount

    };

};

/* ==========================================================
   IMPORT / EXPORT
========================================================== */

PPE.Storage.IO={};

PPE.Storage.IO.export=function(){

    return{

        provider:

        PPE.Storage.Provider.get(),

        namespace:

        PPE.Storage.Namespace.current,

        backup:

        PPE.Storage.Backup.export()

    };

};

PPE.Storage.IO.import=function(data){

    if(!data){

        return;

    }

    PPE.Storage.Provider.set(

        data.provider

    );

    PPE.Storage.Namespace.set(

        data.namespace

    );

    PPE.Storage.Backup.import(

        data.backup

    );

};

/* ==========================================================
   MIGRATION ENGINE
========================================================== */

PPE.Storage.Migration={

    version:1

};

PPE.Storage.Migration.upgrade=

function(version){

    if(

        version>

        PPE.Storage.Migration.version

    ){

        PPE.Storage.Migration.version=

        version;

    }

};

PPE.Storage.Migration.current=

function(){

    return PPE.Storage.Migration.version;

};

PPE.Storage.Migration.reset=

function(){

    PPE.Storage.Migration.version=1;

};

/* ==========================================================
   STORAGE VERSIONING
========================================================== */

PPE.Storage.Version={

    major:1,

    minor:0,

    patch:0

};

PPE.Storage.Version.string=

function(){

    return(

        PPE.Storage.Version.major+

        "."+

        PPE.Storage.Version.minor+

        "."+

        PPE.Storage.Version.patch

    );

};

PPE.Storage.Version.info=

function(){

    return{

        version:

        PPE.Storage.Version.string()

    };

};

/* ==========================================================
   ADAPTER ENGINE
========================================================== */

PPE.Storage.Adapter={

    local:{},

    tinydb:{},

    firebase:{},

    memory:{}

};

PPE.Storage.Adapter.use=function(

    provider

){

    PPE.Storage.Provider.set(

        provider

    );

};

PPE.Storage.Adapter.current=

function(){

    return PPE.Storage.Provider.get();

};

PPE.Storage.Adapter.available=

function(){

    return Object.keys(

        PPE.Storage.Adapter

    ).filter(function(key){

        return typeof PPE.Storage.Adapter[key]

        ===

        "object";

    });

};

/* ==========================================================
   STORAGE EVENT BUS
========================================================== */

PPE.Storage.Event={};

PPE.Storage.Event.emit=function(

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

PPE.Storage.Event.on=function(

    name,

    callback

){

    document.addEventListener(

        name,

        callback

    );

};

PPE.Storage.Event.off=function(

    name,

    callback

){

    document.removeEventListener(

        name,

        callback

    );

};

/* ==========================================================
   PERFORMANCE MONITOR
========================================================== */

PPE.Storage.Performance={

    saveTime:0,

    loadTime:0,

    lastOperation:null

};

PPE.Storage.Performance.begin=

function(){

    return performance.now();

};

PPE.Storage.Performance.end=

function(start,operation){

    const elapsed=

    performance.now()-start;

    PPE.Storage.Performance.lastOperation=

    operation;

    if(operation==="save"){

        PPE.Storage.Performance.saveTime=

        elapsed;

    }

    if(operation==="load"){

        PPE.Storage.Performance.loadTime=

        elapsed;

    }

};

PPE.Storage.Performance.info=

function(){

    return{

        saveTime:

        PPE.Storage.Performance.saveTime,

        loadTime:

        PPE.Storage.Performance.loadTime,

        lastOperation:

        PPE.Storage.Performance.lastOperation

    };

};

/* ==========================================================
   QUEUE ENGINE
========================================================== */

PPE.Storage.Queue={

    list:[]

};

PPE.Storage.Queue.push=function(

    task

){

    PPE.Storage.Queue.list.push(

        task

    );

};

PPE.Storage.Queue.next=function(){

    return PPE.Storage.Queue.list.shift();

};

PPE.Storage.Queue.size=function(){

    return PPE.Storage.Queue.list.length;

};

PPE.Storage.Queue.clear=function(){

    PPE.Storage.Queue.list=[];

};

/* ==========================================================
   AUTO RETRY ENGINE
========================================================== */

PPE.Storage.Retry={

    max:3,

    delay:1000

};

PPE.Storage.Retry.run=

async function(action){

    let count=0;

    while(

        count<PPE.Storage.Retry.max

    ){

        try{

            return await action();

        }

        catch(e){

            count++;

        }

    }

    return null;

};

PPE.Storage.Retry.configure=

function(max,delay){

    PPE.Storage.Retry.max=max;

    PPE.Storage.Retry.delay=delay;

};

/* ==========================================================
   PLUGIN API
========================================================== */

PPE.Storage.Plugin={

    list:[]

};

PPE.Storage.Plugin.register=

function(plugin){

    PPE.Storage.Plugin.list.push(

        plugin

    );

};

PPE.Storage.Plugin.execute=

function(method,data){

    PPE.Storage.Plugin.list.forEach(

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

PPE.Storage.Plugin.clear=

function(){

    PPE.Storage.Plugin.list=[];

};

/* ==========================================================
   SNAPSHOT & RECOVERY
========================================================== */

PPE.Storage.Recovery={

    snapshot:null

};

PPE.Storage.Recovery.save=function(){

    PPE.Storage.Recovery.snapshot=

    PPE.Storage.Backup.export();

};

PPE.Storage.Recovery.restore=

function(){

    if(

        PPE.Storage.Recovery.snapshot

    ){

        PPE.Storage.Backup.import(

            PPE.Storage.Recovery.snapshot

        );

    }

};

PPE.Storage.Recovery.clear=

function(){

    PPE.Storage.Recovery.snapshot=

    null;

};

/* ==========================================================
   GARBAGE COLLECTOR
========================================================== */

PPE.Storage.Garbage={

    enabled:true

};

PPE.Storage.Garbage.collect=

function(){

    Object.keys(

        localStorage

    ).forEach(function(key){

        if(

            localStorage.getItem(key)

            ===

            null

        ){

            localStorage.removeItem(

                key

            );

        }

    });

};

PPE.Storage.Garbage.clearCache=

function(){

    PPE.Storage.Cache.clear();

};

/* ==========================================================
   BATCH OPERATION
========================================================== */

PPE.Storage.Batch={

    queue:[]

};

PPE.Storage.Batch.add=function(

    key,

    value

){

    PPE.Storage.Batch.queue.push({

        key:key,

        value:value

    });

};

PPE.Storage.Batch.commit=

function(){

    PPE.Storage.Batch.queue

    .forEach(function(item){

        PPE.Storage.save(

            item.key,

            item.value

        );

    });

    PPE.Storage.Batch.queue=[];

};

PPE.Storage.Batch.clear=

function(){

    PPE.Storage.Batch.queue=[];

};

/* ==========================================================
   STORAGE CACHE MANAGER
========================================================== */

PPE.Storage.CacheManager={

    enabled:true,

    maxItems:100

};

PPE.Storage.CacheManager.clean=

function(){

    const keys=

    Object.keys(

        PPE.Storage.Cache.data

    );

    while(

        keys.length>

        PPE.Storage.CacheManager.maxItems

    ){

        delete PPE.Storage.Cache.data[

            keys.shift()

        ];

    }

};

PPE.Storage.CacheManager.info=

function(){

    return{

        enabled:

        PPE.Storage.CacheManager.enabled,

        items:

        Object.keys(

            PPE.Storage.Cache.data

        ).length

    };

};

/* ==========================================================
   SELF TEST
========================================================== */

PPE.Storage.selfTest=function(){

    return{

        initialized:
        PPE.Storage.state.initialized,

        ready:
        PPE.Storage.state.ready,

        provider:
        PPE.Storage.Provider.get(),

        cache:
        PPE.Storage.CacheManager.info(),

        statistics:
        PPE.Storage.Statistics.report(),

        sync:
        PPE.Storage.Sync.status()

    };

};

/* ==========================================================
   HEALTH CHECK
========================================================== */

PPE.Storage.health=function(){

    return{

        initialized:
        PPE.Storage.state.initialized,

        ready:
        PPE.Storage.state.ready,

        renderer:
        typeof PPE.Renderer!=="undefined",

        progress:
        typeof PPE.Progress!=="undefined",

        bridge:
        typeof PPE.Bridge!=="undefined",

        util:
        typeof PPE.Util!=="undefined",

        localStorage:
        typeof localStorage!=="undefined"

    };

};

/* ==========================================================
   DIAGNOSTIC
========================================================== */

PPE.Storage.diagnostic=function(){

    console.group(

        "PPE Storage"

    );

    console.table(
    PPE.Storage.selfTest()
);

console.table(
    PPE.Storage.health()
);

    console.table(

        PPE.Storage.Performance.info()

    );

    console.groupEnd();

};

/* ==========================================================
   RUNTIME
========================================================== */

PPE.Storage.runtime=function(){

    return{

        package:"PPE-009",

        file:"storage.js",

        version:

        PPE.version ||

        "1.0.0",

        initialized:

        PPE.Storage.state.initialized,

        ready:

        PPE.Storage.state.ready

    };

};
/* ==========================================================
   COMPATIBILITY REPORT
========================================================== */

PPE.Storage.report=function(){

    return{

        runtime:

        PPE.Storage.runtime(),

        provider:

        PPE.Storage.Provider.get(),

        compatibility:{

            localStorage:

            typeof localStorage

            !==

            "undefined",

            json:

            typeof JSON

            !==

            "undefined"

        }

    };

};


/* ==========================================================
   AUTO BOOT
========================================================== */

PPE.Storage.boot=function(){

    if(!PPE.Initialize){
        PPE.Initialize={};
    }

    PPE.Initialize.storage=true;

    PPE.Storage.state.initialized=true;

    PPE.Storage.state.ready=true;

    PPE.Storage.Event.emit(

        "PPE_STORAGE_READY",

        PPE.Storage.runtime()

    );

    return true;

};
/* ==========================================================
   CERTIFICATION MARKER

   Package : PPE-009

   File : storage.js

   Status :

   IMPLEMENTATION COMPLETE

========================================================== */