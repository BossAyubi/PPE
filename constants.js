/*
==========================================================
POLYGLOT PRESENTATION ENGINE

Package : PPE-000

File    : constants.js

Version : 1.0.0-alpha.1

==========================================================
*/

"use strict";

(function(global){

    if(global.PPE){

        console.warn("[PPE] Core already initialized.");

        return;

    }

    const PPE = {};

    /* ======================================================
       CORE INFORMATION
    ====================================================== */

    PPE.appName="Polyglot Presentation Engine";

    PPE.shortName="PPE";

    PPE.version="1.0.0-alpha.1";

    PPE.codename="Genesis";

    PPE.author="Polyglot Academy";

    PPE.website="";

    PPE.build=1;

    PPE.debug=false;

    PPE.initialized=false;

    /* ======================================================
       CORE STATUS
    ====================================================== */

    PPE.ready=false;

    PPE.booted=false;

    PPE.certified=false;

    /* ======================================================
       EMPTY NAMESPACES
    ====================================================== */

    PPE.Config={};

    PPE.Constants={};

    PPE.System={};

    PPE.Util={};

    PPE.Logger={};

    PPE.Event={};

    PPE.Performance={};

    PPE.Dependency={};

    PPE.Engine={};

    PPE.Renderer={};

    PPE.Integration={};

    PPE.Recovery={};

    PPE.Teleprompter={};

    PPE.Toolbar={};

    PPE.Fullscreen={};

    PPE.Theme={};

    PPE.Progress={};

    PPE.Storage={};

    PPE.Bridge={};

    PPE.AI={};

    PPE.Analysis={};

    PPE.Certification={};

    PPE.Modules={};

    PPE.Element={};

    PPE.Runtime={};

    PPE.Validation={};

    PPE.Initialize={};

    PPE.Build={};

    PPE.Feature={};

    PPE.Version={};

    PPE.Error={};

    PPE.Mode={};

    PPE.Path={};

    PPE.Session={};

    PPE.State={};

    PPE.Cache={};

    PPE.Flag={};

    PPE.Timer={};

    PPE.File={};

    PPE.FileName={};

    PPE.Cloud={};

    PPE.Firebase={};

    PPE.API={};

    PPE.Network={};

    PPE.Audio={};

    PPE.Video={};

    PPE.Creator={};

    PPE.Shadowing={};

    PPE.Subtitle={};

    PPE.VoiceComparison={};

    PPE.UI={};

    PPE.Font={};

    PPE.Animation={};

    PPE.Language={};

    PPE.Screen={};

    PPE.Reading={};

    PPE.Priority={};

    PPE.LogLevel={};

    PPE.Status={};

    PPE.StorageKey={};

    PPE.Reserved={};

    PPE.License={};

    PPE.Export={};

    PPE.Import={};

    PPE.Development={};

    PPE.Compatibility={};

    PPE.Limit={};

    /* ======================================================
       GLOBAL REGISTER
    ====================================================== */

    global.PPE=PPE;

    console.log(

        "[PPE] Core created",

        PPE.version

    );

})(window);