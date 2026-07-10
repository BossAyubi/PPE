/*
==========================================================
POLYGLOT PRESENTATION ENGINE

Package : PPE-003
File    : renderer.js
Version : 1.0.0-alpha.1
==========================================================
*/

"use strict";

/* ==========================================================
   RENDERER ENGINE
========================================================== */

PPE.Renderer={};

/* ==========================================================
   INTERNAL STATE
========================================================== */

PPE.Renderer.state={

    initialized:false,

    ready:false,

    rendering:false,

    currentTopic:null,

    currentParagraph:0,

    currentSentence:0,

    renderedParagraphs:0,

    renderedSentences:0,

    totalParagraphs:0,

    totalSentences:0

};

/* ==========================================================
   DOM REFERENCES
========================================================== */

PPE.Renderer.element={

    container:null,

    content:null,

    status:null

};

/* ==========================================================
   INITIALIZE
========================================================== */

PPE.Renderer.initialize=function(containerId){

    PPE.Renderer.element.container=
        document.getElementById(containerId);

    PPE.Renderer.element.content=
        PPE.Renderer.element.container;

    PPE.Renderer.element.status=
        document.getElementById("status");

    PPE.Renderer.element.topicTitle=
        document.getElementById("topicTitle");

    PPE.Renderer.element.progress=
        document.getElementById("progressFill");

    PPE.Renderer.state.initialized=true;

    PPE.Renderer.state.ready=true;

    if(!PPE.Initialize){
        PPE.Initialize={};
    }

    PPE.Initialize.renderer=true;

    return true;

};

/* ==========================================================
   CLEAR
========================================================== */

PPE.Renderer.clear=function(){

    if(

        !PPE.Renderer.element.content

    ){

        return;

    }

    PPE.Renderer.element.content.innerHTML="";

    PPE.Renderer.state.renderedParagraphs=0;

    PPE.Renderer.state.renderedSentences=0;

};

/* ==========================================================
   LOAD TOPIC
========================================================== */

PPE.Renderer.load=function(topic){

    PPE.Renderer.state.currentTopic=topic;

    PPE.Renderer.state.totalParagraphs=

        topic.paragraphs.length;

};

/* ==========================================================
   READY
========================================================== */

PPE.Engine.Renderer=PPE.Renderer;

/* ==========================================================
   RENDER TOPIC
========================================================== */

PPE.Renderer.renderTopic=function(topic){

    if(!topic){

        return;

    }

    PPE.Renderer.clear();

    PPE.Renderer.load(topic);

    PPE.Renderer.state.rendering=true;

    topic.paragraphs.forEach(

        function(

            paragraph,

            index

        ){

            PPE.Renderer.renderParagraph(

                paragraph,

                index

            );

        }

    );

    PPE.Renderer.state.rendering=false;

};

/* ==========================================================
   RENDER PARAGRAPH
========================================================== */

PPE.Renderer.renderParagraph=function(

    paragraph,

    index

){

    const element=

    PPE.Renderer.createParagraph(

        paragraph,

        index

    );

    PPE.Renderer.element.content

    .appendChild(

        element

    );

    PPE.Renderer.state.renderedParagraphs++;

};

/* ==========================================================
   PARAGRAPH FACTORY
========================================================== */

PPE.Renderer.createParagraph=function(

    paragraph,

    index

){

    const div=

    document.createElement(

        "div"

    );

    div.className=

    "ppe-paragraph";

    div.dataset.index=index;

    div.innerHTML=paragraph.text;

    return div;

};

/* ==========================================================
   RENDER COUNTER
========================================================== */

PPE.Renderer.count=function(){

    return{

        paragraphs:

        PPE.Renderer.state

        .renderedParagraphs,

        total:

        PPE.Renderer.state

        .totalParagraphs

    };

};

/* ==========================================================
   END PART 02
========================================================== */

/* ==========================================================
   SENTENCE RENDERER
========================================================== */

PPE.Renderer.renderSentence=function(

    sentence,

    paragraphIndex,

    sentenceIndex

){

    const span=

    document.createElement(

        "span"

    );

    span.className=

    "ppe-sentence";

    span.dataset.paragraph=

    paragraphIndex;

    span.dataset.sentence=

    sentenceIndex;

    span.textContent=

    sentence;

    return span;

};

/* ==========================================================
   PARAGRAPH BUILDER
========================================================== */

PPE.Renderer.buildParagraph=function(

    paragraph,

    paragraphIndex

){

    const wrapper=

    document.createElement(

        "div"

    );

    wrapper.className=

    "ppe-paragraph";

    wrapper.dataset.index=

    paragraphIndex;

    if(

        Array.isArray(

            paragraph.sentences

        )

    ){

        paragraph.sentences.forEach(

            function(

                sentence,

                sentenceIndex

            ){

                wrapper.appendChild(

                    PPE.Renderer.renderSentence(

                        sentence,

                        paragraphIndex,

                        sentenceIndex

                    )

                );

                wrapper.appendChild(

                    document.createTextNode(" ")

                );

                PPE.Renderer.state

                .renderedSentences++;

            }

        );

    }

    return wrapper;

};

/* ==========================================================
   VIRTUAL RENDER
========================================================== */

PPE.Renderer.virtualRender=function(

    topic

){

    const fragment=

    document.createDocumentFragment();

    topic.paragraphs.forEach(

        function(

            paragraph,

            index

        ){

            fragment.appendChild(

                PPE.Renderer.buildParagraph(

                    paragraph,

                    index

                )

            );

        }

    );

    PPE.Renderer.element.content

    .appendChild(fragment);

};

/* ==========================================================
   END PART 03
========================================================== */

/* ==========================================================
   PARAGRAPH FOCUS ENGINE
========================================================== */

PPE.Renderer.focusParagraph=function(index){

    const paragraphs=

    document.querySelectorAll(

        ".ppe-paragraph"

    );

    paragraphs.forEach(function(item){

        item.classList.remove(

            "ppe-focus"

        );

    });

    const current=

    paragraphs[index];

    if(!current){

        return;

    }

    current.classList.add(

        "ppe-focus"

    );

    PPE.Renderer.state.currentParagraph=

    index;

};

/* ==========================================================
   SENTENCE HIGHLIGHT
========================================================== */

PPE.Renderer.highlightSentence=function(

    paragraphIndex,

    sentenceIndex

){

    document

    .querySelectorAll(

        ".ppe-sentence"

    )

    .forEach(function(item){

        item.classList.remove(

            "ppe-active"

        );

    });

    const selector=

    '.ppe-sentence[data-paragraph="'

    +paragraphIndex+

    '"][data-sentence="'

    +sentenceIndex+

    '"]';

    const sentence=

    document.querySelector(

        selector

    );

    if(!sentence){

        return;

    }

    sentence.classList.add(

        "ppe-active"

    );

    PPE.Renderer.state.currentSentence=

    sentenceIndex;

};

/* ==========================================================
   SCROLL TO PARAGRAPH
========================================================== */

PPE.Renderer.scrollToParagraph=function(index){

    const paragraph=

    document.querySelector(

        '.ppe-paragraph[data-index="'

        +index+

        '"]'

    );

    if(!paragraph){

        return;

    }

    paragraph.scrollIntoView({

        behavior:"smooth",

        block:"center"

    });

};

/* ==========================================================
   END PART 04
========================================================== */

/* ==========================================================
   RENDER QUEUE
========================================================== */

PPE.Renderer.Queue={

    list:[],

    busy:false

};

PPE.Renderer.Queue.add=function(task){

    PPE.Renderer.Queue.list.push(task);

};

PPE.Renderer.Queue.next=async function(){

    if(

        PPE.Renderer.Queue.busy

    ){

        return;

    }

    PPE.Renderer.Queue.busy=true;

    while(

        PPE.Renderer.Queue.list.length>0

    ){

        const task=

        PPE.Renderer.Queue.list.shift();

        await task();

    }

    PPE.Renderer.Queue.busy=false;

};

/* ==========================================================
   RENDER STATUS
========================================================== */

PPE.Renderer.isRendering=function(){

    return PPE.Renderer.state.rendering;

};

PPE.Renderer.startRender=function(){

    PPE.Renderer.state.rendering=true;

};

PPE.Renderer.finishRender=function(){

    PPE.Renderer.state.rendering=false;

};

/* ==========================================================
   RENDER EVENT
========================================================== */

PPE.Renderer.dispatch=function(

    eventName,

    detail

){

    document.dispatchEvent(

        new CustomEvent(

            eventName,

            {

                detail:detail

            }

        )

    );

};

/* ==========================================================
   REFRESH
========================================================== */

PPE.Renderer.refresh=function(){

    const topic=

    PPE.Renderer.state.currentTopic;

    if(!topic){

        return;

    }

    PPE.Renderer.renderTopic(topic);

};

/* ==========================================================
   END PART 05
========================================================== */

/* ==========================================================
   INCREMENTAL RENDER ENGINE
========================================================== */

PPE.Renderer.updateParagraph=function(

    index,

    paragraph

){

    const current=

    document.querySelector(

        '.ppe-paragraph[data-index="'+

        index+

        '"]'

    );

    if(!current){

        return;

    }

    const replacement=

    PPE.Renderer.buildParagraph(

        paragraph,

        index

    );

    current.replaceWith(

        replacement

    );

};

PPE.Renderer.appendParagraph=function(

    paragraph,

    index

){

    const element=

    PPE.Renderer.buildParagraph(

        paragraph,

        index

    );

    PPE.Renderer.element.content

    .appendChild(

        element

    );

};

PPE.Renderer.removeParagraph=function(index){

    const current=

    document.querySelector(

        '.ppe-paragraph[data-index="'+

        index+

        '"]'

    );

    if(current){

        current.remove();

    }

};

/* ==========================================================
   LAZY RENDER
========================================================== */

PPE.Renderer.lazyRender=function(

    topic,

    start,

    count

){

    const end=

    Math.min(

        start+count,

        topic.paragraphs.length

    );

    for(

        let i=start;

        i<end;

        i++

    ){

        PPE.Renderer.renderParagraph(

            topic.paragraphs[i],

            i

        );

    }

};

/* ==========================================================
   END PART 06
========================================================== */

/* ==========================================================
   VIRTUAL DOM CACHE
========================================================== */

PPE.Renderer.Cache={

    paragraph:new Map(),

    sentence:new Map(),

    topic:null

};

PPE.Renderer.Cache.clear=function(){

    PPE.Renderer.Cache.paragraph.clear();

    PPE.Renderer.Cache.sentence.clear();

    PPE.Renderer.Cache.topic=null;

};

PPE.Renderer.Cache.setParagraph=function(

    index,

    element

){

    PPE.Renderer.Cache.paragraph.set(

        index,

        element

    );

};

PPE.Renderer.Cache.getParagraph=function(index){

    return PPE.Renderer.Cache.paragraph.get(

        index

    );

};

/* ==========================================================
   RENDER SYNCHRONIZATION
========================================================== */

PPE.Renderer.Sync={

    busy:false,

    queue:[]

};

PPE.Renderer.Sync.lock=function(){

    PPE.Renderer.Sync.busy=true;

};

PPE.Renderer.Sync.unlock=function(){

    PPE.Renderer.Sync.busy=false;

};

PPE.Renderer.Sync.isLocked=function(){

    return PPE.Renderer.Sync.busy;

};

/* ==========================================================
   FRAME RENDER
========================================================== */

PPE.Renderer.frame=function(callback){

    requestAnimationFrame(

        callback

    );

};

/* ==========================================================
   RENDER BATCH
========================================================== */

PPE.Renderer.batch=function(tasks){

    PPE.Renderer.frame(function(){

        tasks.forEach(function(task){

            task();

        });

    });

};

/* ==========================================================
   END PART 07
========================================================== */

/* ==========================================================
   BOOKMARK ENGINE
========================================================== */

PPE.Renderer.Bookmark={

    paragraph:0,

    sentence:0,

    scrollTop:0

};

PPE.Renderer.saveBookmark=function(){

    PPE.Renderer.Bookmark.paragraph=

    PPE.Renderer.state.currentParagraph;

    PPE.Renderer.Bookmark.sentence=

    PPE.Renderer.state.currentSentence;

    PPE.Renderer.Bookmark.scrollTop=

    PPE.Renderer.element.content.scrollTop;

};

PPE.Renderer.restoreBookmark=function(){

    PPE.Renderer.moveTo(

        PPE.Renderer.Bookmark.paragraph,

        PPE.Renderer.Bookmark.sentence

    );

    PPE.Renderer.element.content.scrollTop=

    PPE.Renderer.Bookmark.scrollTop;

};

/* ==========================================================
   EVENT BUS
========================================================== */

PPE.Renderer.Event={};

PPE.Renderer.Event.emit=function(

    name,

    data

){

    document.dispatchEvent(

        new CustomEvent(

            name,

            {

                detail:data

            }

        )

    );

};

PPE.Renderer.Event.on=function(

    name,

    callback

){

    document.addEventListener(

        name,

        callback

    );

};

PPE.Renderer.Event.off=function(

    name,

    callback

){

    document.removeEventListener(

        name,

        callback

    );

};

/* ==========================================================
   STATE HELPER
========================================================== */

PPE.Renderer.getState=function(){

    return PPE.Renderer.state;

};

PPE.Renderer.isReady=function(){

    return(

        PPE.Renderer.state.initialized===true

        &&

        PPE.Renderer.state.ready===true

    );

};

/* ==========================================================
   END PART 08
========================================================== */

/* ==========================================================
   VIEWPORT ENGINE
========================================================== */

PPE.Renderer.Viewport={};

PPE.Renderer.Viewport.visibleParagraphs=

function(){

    const result=[];

    const paragraphs=

    document.querySelectorAll(

        ".ppe-paragraph"

    );

    paragraphs.forEach(function(item){

        const rect=

        item.getBoundingClientRect();

        if(

            rect.bottom>0

            &&

            rect.top<window.innerHeight

        ){

            result.push(item);

        }

    });

    return result;

};

PPE.Renderer.Viewport.current=function(){

    const list=

    PPE.Renderer.Viewport

    .visibleParagraphs();

    if(list.length===0){

        return null;

    }

    return list[0];

};

/* ==========================================================
   ACTIVE PARAGRAPH
========================================================== */

PPE.Renderer.activeParagraph=function(){

    const element=

    PPE.Renderer.Viewport.current();

    if(!element){

        return -1;

    }

    return Number(

        element.dataset.index

    );

};

/* ==========================================================
   VIEWPORT UPDATE
========================================================== */

PPE.Renderer.updateViewport=function(){

    const index=

    PPE.Renderer.activeParagraph();

    if(index<0){

        return;

    }

    PPE.Renderer.state.currentParagraph=

    index;

    PPE.Renderer.Event.emit(

        "PPE_PARAGRAPH_VISIBLE",

        {

            paragraph:index

        }

    );

};

/* ==========================================================
   AUTO VIEWPORT WATCHER
========================================================== */

window.addEventListener(

    "scroll",

    function(){

        PPE.Renderer.updateViewport();

    }

);

/* ==========================================================
   END PART 09
========================================================== */

/* ==========================================================
   READING PROGRESS ENGINE
========================================================== */

PPE.Renderer.Progress={};

PPE.Renderer.Progress.calculate=function(){

    if(

        PPE.Renderer.state.totalParagraphs===0

    ){

        return 0;

    }

    return (

        PPE.Renderer.state.currentParagraph

        /

        PPE.Renderer.state.totalParagraphs

    )*100;

};

PPE.Renderer.Progress.update=function(){

    PPE.Renderer.state.progress=

    PPE.Renderer.Progress.calculate();

    PPE.Renderer.Event.emit(

        "PPE_PROGRESS",

        {

            value:

            PPE.Renderer.state.progress

        }

    );

};

/* ==========================================================
   CURRENT SENTENCE
========================================================== */

PPE.Renderer.currentSentence=function(){

    return PPE.Renderer.state.currentSentence;

};

PPE.Renderer.currentParagraph=function(){

    return PPE.Renderer.state.currentParagraph;

};

/* ==========================================================
   PARAGRAPH NAVIGATION
========================================================== */

PPE.Renderer.nextParagraph=function(){

    const next=

    PPE.Renderer.state.currentParagraph+1;

    if(

        next>=

        PPE.Renderer.state.totalParagraphs

    ){

        return;

    }

    PPE.Renderer.moveTo(

        next,

        0

    );

};

PPE.Renderer.previousParagraph=function(){

    const previous=

    PPE.Renderer.state.currentParagraph-1;

    if(previous<0){

        return;

    }

    PPE.Renderer.moveTo(

        previous,

        0

    );

};

/* ==========================================================
   SENTENCE NAVIGATION
========================================================== */

PPE.Renderer.nextSentence=function(){

    PPE.Renderer.state.currentSentence++;

};

PPE.Renderer.previousSentence=function(){

    if(

        PPE.Renderer.state.currentSentence>0

    ){

        PPE.Renderer.state.currentSentence--;

    }

};

/* ==========================================================
   MOVE ENGINE
========================================================== */

PPE.Renderer.moveTo=function(

    paragraph,

    sentence

){

    PPE.Renderer.focusParagraph(

        paragraph

    );

    PPE.Renderer.highlightSentence(

        paragraph,

        sentence

    );

    PPE.Renderer.scrollToParagraph(

        paragraph

    );

    PPE.Renderer.state.currentParagraph=

    paragraph;

    PPE.Renderer.state.currentSentence=

    sentence;

    PPE.Renderer.Progress.update();

    PPE.Renderer.Event.emit(

        "PPE_MOVE",

        {

            paragraph:paragraph,

            sentence:sentence

        }

    );

};

/* ==========================================================
   RENDER METRICS
========================================================== */

PPE.Renderer.Metrics={

    renderCount:0,

    renderTime:0,

    paragraphRendered:0,

    sentenceRendered:0

};

PPE.Renderer.beginMeasure=function(){

    PPE.Renderer.Metrics.start=

    performance.now();

};

PPE.Renderer.endMeasure=function(){

    PPE.Renderer.Metrics.renderTime=

    performance.now()

    -

    PPE.Renderer.Metrics.start;

    PPE.Renderer.Metrics.renderCount++;

};

/* ==========================================================
   RENDER STATISTICS
========================================================== */

PPE.Renderer.statistics=function(){

    return{

        renderCount:

        PPE.Renderer.Metrics.renderCount,

        renderTime:

        PPE.Renderer.Metrics.renderTime,

        paragraph:

        PPE.Renderer.state.renderedParagraphs,

        sentence:

        PPE.Renderer.state.renderedSentences

    };

};

/* ==========================================================
   PARAGRAPH CACHE
========================================================== */

PPE.Renderer.ParagraphCache=

new Map();

PPE.Renderer.cacheParagraph=function(

    index,

    element

){

    PPE.Renderer.ParagraphCache

    .set(

        index,

        element

    );

};

PPE.Renderer.cachedParagraph=function(index){

    return PPE.Renderer

    .ParagraphCache

    .get(index);

};

PPE.Renderer.clearCache=function(){

    PPE.Renderer.ParagraphCache

    .clear();

};

/* ==========================================================
   RENDER VALIDATION
========================================================== */

PPE.Renderer.validate=function(topic){

    if(!topic){

        return false;

    }

    if(

        !Array.isArray(

            topic.paragraphs

        )

    ){

        return false;

    }

    return true;

};

/* ==========================================================
   SAFE RENDER
========================================================== */

PPE.Renderer.safeRender=function(topic){

    if(

        !PPE.Renderer.validate(topic)

    ){

        return;

    }

    PPE.Renderer.renderTopic(topic);

};

/* ==========================================================
   END PART 15
========================================================== */

/* ==========================================================
   RENDER LOCK
========================================================== */

PPE.Renderer.Lock={

    active:false

};

PPE.Renderer.lock=function(){

    PPE.Renderer.Lock.active=true;

};

PPE.Renderer.unlock=function(){

    PPE.Renderer.Lock.active=false;

};

PPE.Renderer.isLocked=function(){

    return PPE.Renderer.Lock.active;

};

/* ==========================================================
   SAFE EXECUTION
========================================================== */

PPE.Renderer.execute=function(callback){

    if(

        PPE.Renderer.isLocked()

    ){

        return;

    }

    PPE.Renderer.lock();

    try{

        callback();

    }

    finally{

        PPE.Renderer.unlock();

    }

};

/* ==========================================================
   VISIBILITY ENGINE
========================================================== */

PPE.Renderer.Visibility={};

PPE.Renderer.Visibility.show=function(index){

    const paragraph=

    PPE.Renderer.cachedParagraph(index);

    if(paragraph){

        paragraph.style.display="";

    }

};

PPE.Renderer.Visibility.hide=function(index){

    const paragraph=

    PPE.Renderer.cachedParagraph(index);

    if(paragraph){

        paragraph.style.display="none";

    }

};

PPE.Renderer.Visibility.toggle=function(

    index,

    visible

){

    if(visible){

        PPE.Renderer.Visibility.show(index);

    }

    else{

        PPE.Renderer.Visibility.hide(index);

    }

};

/* ==========================================================
   RENDER RESET
========================================================== */

PPE.Renderer.reset=function(){

    PPE.Renderer.state.currentParagraph=0;

    PPE.Renderer.state.currentSentence=0;

    PPE.Renderer.state.renderedParagraphs=0;

    PPE.Renderer.state.renderedSentences=0;

    PPE.Renderer.state.progress=0;

    PPE.Renderer.clear();

    PPE.Renderer.clearCache();

};

/* ==========================================================
   ENGINE INFORMATION
========================================================== */

PPE.Renderer.info=function(){

    return{

        package:"PPE-003",

        file:"renderer.js",

        version:PPE.version || "1.0.0",

        initialized:
        PPE.Renderer.state.initialized,

        ready:
        PPE.Renderer.state.ready,

        rendering:
        PPE.Renderer.state.rendering,

        paragraph:
        PPE.Renderer.state.currentParagraph,

        sentence:
        PPE.Renderer.state.currentSentence

    };

};

/* ==========================================================
   END PART 18
========================================================== */

/* ==========================================================
   PARAGRAPH LOOKUP
========================================================== */

PPE.Renderer.getParagraph=function(index){

    return PPE.Renderer

    .cachedParagraph(index);

};

PPE.Renderer.hasParagraph=function(index){

    return PPE.Renderer

    .ParagraphCache

    .has(index);

};

/* ==========================================================
   SENTENCE LOOKUP
========================================================== */

PPE.Renderer.getSentence=function(

    paragraph,

    sentence

){

    return document.querySelector(

        '.ppe-sentence[data-paragraph="'+

        paragraph+

        '"][data-sentence="'+

        sentence+

        '"]'

    );

};

PPE.Renderer.hasSentence=function(

    paragraph,

    sentence

){

    return PPE.Renderer.getSentence(

        paragraph,

        sentence

    )!==null;

};

/* ==========================================================
   CURRENT ELEMENT
========================================================== */

PPE.Renderer.currentElement=function(){

    return PPE.Renderer.getSentence(

        PPE.Renderer.state.currentParagraph,

        PPE.Renderer.state.currentSentence

    );

};

/* ==========================================================
   END PART 19
========================================================== */

/* ==========================================================
   HIGHLIGHT ENGINE
========================================================== */

PPE.Renderer.Highlight={};

PPE.Renderer.Highlight.clear=function(){

    document

    .querySelectorAll(

        ".ppe-active"

    )

    .forEach(function(item){

        item.classList.remove(

            "ppe-active"

        );

    });

};

PPE.Renderer.Highlight.apply=function(

    element

){

    if(!element){

        return;

    }

    PPE.Renderer.Highlight.clear();

    element.classList.add(

        "ppe-active"

    );

};

PPE.Renderer.Highlight.current=function(){

    PPE.Renderer.Highlight.apply(

        PPE.Renderer.currentElement()

    );

};

/* ==========================================================
   END PART 20
========================================================== */

/* ==========================================================
   REFRESH ENGINE
========================================================== */

PPE.Renderer.reload=function(){

    const topic=

    PPE.Renderer.state.currentTopic;

    if(!topic){

        return;

    }

    PPE.Renderer.reset();

    PPE.Renderer.renderTopic(

        topic

    );

};

PPE.Renderer.invalidate=function(){

    PPE.Renderer.clearCache();

};

PPE.Renderer.dispose=function(){

    PPE.Renderer.reset();

    PPE.Renderer.state.initialized=false;

    PPE.Renderer.state.ready=false;

    PPE.Renderer.state.rendering=false;

};

/* ==========================================================
   END PART 21
========================================================== */

/* ==========================================================
   SENTENCE NAVIGATOR
========================================================== */

PPE.Renderer.Navigator={};

PPE.Renderer.Navigator.first=function(){

    PPE.Renderer.moveTo(

        0,

        0

    );

};

PPE.Renderer.Navigator.last=function(){

    const paragraph=

    PPE.Renderer.state.totalParagraphs-1;

    PPE.Renderer.moveTo(

        paragraph,

        0

    );

};

PPE.Renderer.Navigator.goto=function(

    paragraph,

    sentence

){

    PPE.Renderer.moveTo(

        paragraph,

        sentence||0

    );

};

/* ==========================================================
   RENDER CHECK
========================================================== */

PPE.Renderer.exists=function(){

    return PPE.Renderer.element

    .content!==null;

};

PPE.Renderer.empty=function(){

    return PPE.Renderer.element

    .content

    .children

    .length===0;

};

/* ==========================================================
   END PART 22
========================================================== */

/* ==========================================================
   DOM INDEX
========================================================== */

PPE.Renderer.Index={

    paragraphs:[],

    sentences:[]

};

PPE.Renderer.Index.build=function(){

    PPE.Renderer.Index.paragraphs=

    Array.from(

        document.querySelectorAll(

            ".ppe-paragraph"

        )

    );

    PPE.Renderer.Index.sentences=

    Array.from(

        document.querySelectorAll(

            ".ppe-sentence"

        )

    );

};

PPE.Renderer.Index.clear=function(){

    PPE.Renderer.Index.paragraphs=[];

    PPE.Renderer.Index.sentences=[];

};

/* ==========================================================
   END PART 23
========================================================== */

/* ==========================================================
   DEBUG ENGINE
========================================================== */

PPE.Renderer.Debug={};

PPE.Renderer.Debug.dump=function(){

    console.table({

        paragraph:

        PPE.Renderer.state.currentParagraph,

        sentence:

        PPE.Renderer.state.currentSentence,

        renderedParagraph:

        PPE.Renderer.state.renderedParagraphs,

        renderedSentence:

        PPE.Renderer.state.renderedSentences,

        progress:

        PPE.Renderer.state.progress

    });

};

PPE.Renderer.Debug.state=function(){

    console.log(

        PPE.Renderer.state

    );

};

/* ==========================================================
   END PART 24
========================================================== */

/* ==========================================================
   RENDER TRANSACTION ENGINE
========================================================== */

PPE.Renderer.Transaction={

    active:false,

    queue:[]

};

PPE.Renderer.Transaction.begin=function(){

    PPE.Renderer.Transaction.active=true;

    PPE.Renderer.Transaction.queue=[];

};

PPE.Renderer.Transaction.add=function(action){

    PPE.Renderer.Transaction.queue.push(

        action

    );

};

PPE.Renderer.Transaction.commit=function(){

    PPE.Renderer.Transaction.queue

    .forEach(function(action){

        action();

    });

    PPE.Renderer.Transaction.queue=[];

    PPE.Renderer.Transaction.active=false;

};

PPE.Renderer.Transaction.rollback=function(){

    PPE.Renderer.Transaction.queue=[];

    PPE.Renderer.Transaction.active=false;

};

/* ==========================================================
   RENDER RECOVERY
========================================================== */

PPE.Renderer.Recovery={};

PPE.Renderer.Recovery.snapshot=function(){

    return{

        paragraph:

        PPE.Renderer.state.currentParagraph,

        sentence:

        PPE.Renderer.state.currentSentence,

        progress:

        PPE.Renderer.state.progress

    };

};

PPE.Renderer.Recovery.restore=function(snapshot){

    if(!snapshot){

        return;

    }

    PPE.Renderer.moveTo(

        snapshot.paragraph,

        snapshot.sentence

    );

};

PPE.Renderer.Recovery.reset=function(){

    PPE.Renderer.reset();

};

/* ==========================================================
   PLUGIN API
========================================================== */

PPE.Renderer.Plugin={

    list:[]

};

PPE.Renderer.Plugin.register=function(plugin){

    PPE.Renderer.Plugin.list.push(

        plugin

    );

};

PPE.Renderer.Plugin.execute=function(name,data){

    PPE.Renderer.Plugin.list

    .forEach(function(plugin){

        if(

            typeof plugin[name]

            ===

            "function"

        ){

            plugin[name](data);

        }

    });

};

PPE.Renderer.Plugin.clear=function(){

    PPE.Renderer.Plugin.list=[];

};

/* ==========================================================
   PERFORMANCE OPTIMIZER
========================================================== */

PPE.Renderer.Performance={

    enabled:true,

    frameCount:0,

    lastFrame:0,

    fps:0

};

PPE.Renderer.Performance.begin=function(){

    PPE.Renderer.Performance.lastFrame=

    performance.now();

};

PPE.Renderer.Performance.end=function(){

    const now=

    performance.now();

    const delta=

    now-

    PPE.Renderer.Performance.lastFrame;

    PPE.Renderer.Performance.frameCount++;

    if(delta>0){

        PPE.Renderer.Performance.fps=

        Math.round(

            1000/delta

        );

    }

};

PPE.Renderer.Performance.info=function(){

    return{

        fps:

        PPE.Renderer.Performance.fps,

        render:

        PPE.Renderer.Metrics.renderTime,

        frame:

        PPE.Renderer.Performance.frameCount

    };

};

/* ==========================================================
   MEMORY CLEANUP
========================================================== */

PPE.Renderer.gc=function(){

    PPE.Renderer.clearCache();

    PPE.Renderer.Index.clear();

};

/* ==========================================================
   END PART 28
========================================================== */

/* ==========================================================
   SELF TEST
========================================================== */

PPE.Renderer.selfTest=function(){

    return{

        initialized:

        PPE.Renderer.state.initialized,

        rendering:

        PPE.Renderer.state.rendering,

        cache:

        PPE.Renderer.ParagraphCache.size,

        currentParagraph:

        PPE.Renderer.state.currentParagraph,

        currentSentence:

        PPE.Renderer.state.currentSentence,

        progress:

        PPE.Renderer.state.progress,

        metrics:

        PPE.Renderer.statistics(),

        performance:

        PPE.Renderer.Performance.info()

    };

};

/* ==========================================================
   DIAGNOSTIC
========================================================== */

PPE.Renderer.diagnostic=function(){

    console.group(

        "PPE Renderer"

    );

    console.log(

        PPE.Renderer.selfTest()

    );

    console.groupEnd();

};

/* ==========================================================
   END PART 29
========================================================== */

/* ==========================================================
   COMPATIBILITY CHECK
========================================================== */

PPE.Renderer.compatibility=function(){

    return{

        promise:

        typeof Promise!=="undefined",

        observer:

        typeof IntersectionObserver!=="undefined",

        animationFrame:

        typeof requestAnimationFrame!=="undefined",

        customEvent:

        typeof CustomEvent!=="undefined"

    };

};

/* ==========================================================
   RUNTIME INFORMATION
========================================================== */

PPE.Renderer.runtime=function(){

    return{

        package:"PPE-003",

        file:"renderer.js",

        version:PPE.version || "1.0.0",

        build:
        PPE.Build.releaseNumber,

        initialized:
        PPE.Renderer.state.initialized,

        ready:
        PPE.Renderer.state.ready,

        rendering:
        PPE.Renderer.state.rendering,

        currentTopic:
        PPE.Renderer.state.currentTopic,

        currentParagraph:
        PPE.Renderer.state.currentParagraph,

        currentSentence:
        PPE.Renderer.state.currentSentence,

        renderedParagraphs:
        PPE.Renderer.state.renderedParagraphs,

        renderedSentences:
        PPE.Renderer.state.renderedSentences

    };

};

/* ==========================================================
   REGISTER ENGINE
========================================================== */

PPE.Engine.Renderer=

PPE.Renderer;

/* ==========================================================
   HTML RENDER
========================================================== */

PPE.Renderer.renderHTML=function(html){

    if(

        !PPE.Renderer.element.content

    ){

        return false;

    }

    PPE.Renderer.clear();

    PPE.Renderer.element.content.innerHTML=

    html;

    return true;

};

/* ==========================================================
   AUTO START
========================================================== */

PPE.Renderer.boot=function(){

    if(!PPE.Initialize){
        PPE.Initialize={};
    }

    if(!PPE.Renderer.state.initialized){

        PPE.Renderer.initialize("ppeContent");

    }

    PPE.Initialize.renderer=true;

    PPE.Renderer.state.ready=true;

    if(
        PPE.Renderer.Event &&
        typeof PPE.Renderer.Event.emit==="function"
    ){

        PPE.Renderer.Event.emit(

            "PPE_RENDERER_READY",

            PPE.Renderer.runtime()

        );

    }

    return true;

};

/* ==========================================================
   CERTIFICATION MARKER

   Package : PPE-003
   File    : renderer.js

   Status  :
   IMPLEMENTATION COMPLETE

========================================================== */