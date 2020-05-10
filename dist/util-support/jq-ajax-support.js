/*!
 * jQAjaxSupport
 * @author salvatore mariniello - salvo.mariniello@gmail.com
 * https://github.com/mssalvo/JDataPaging/tree/master/dist/util-support
 * MIT License
 * Copyright (c) 2019 Salvatore Mariniello 
 * https://github.com/mssalvo/JDataPaging/blob/master/LICENSE
 * @example 
 *   jQAjaxSupport.get('incorso')
 *       .set("url", '/DataElements/incorso.json')
 *       .set("type", 'get')
 *       .set("data", {limit: "10", page: "1", totalrows: "18"})
 *       .onSuccess(function () {})
 *       .onError(function () {})
 *       .onComplete(function () {})
 *
 *  var xhr= jQAjaxSupport.istances.incorso.start()
 **/
if(typeof (jQuery)!=="undefined"){
function jQAjaxSupport() {
    var th_ = this;
    th_._new().init();
}
jQAjaxSupport.istances = {};
jQAjaxSupport.prototype = {
    opt: {
        url: undefined,
        data: undefined,
        async: undefined,
        type: "get",
        dataType: "json",
        statusCode: undefined,
        timeout: undefined,
        xhrFields: undefined,
        beforeSend: undefined,
        cache: undefined,
        contentType: undefined,
        context: undefined,
        crossDomain: undefined,
        dataFilter: undefined,
        processData: undefined,
        scriptCharset: undefined,
        isflush: undefined
    },
    _new: function () {
        this._jq = jQuery;
        this.request = undefined;
        this.requestXHR = undefined;
        this.success = undefined;
        this.error = undefined;
        this.complete = undefined;
        this.urlController = undefined;
        this.action = undefined;
        this.successlts=[];
        this.messages = {success:"Operation performed successfully",error:"Failed operation"};
        return this;
    },
    init: function () {
        var th_ = this;
        th_.request = th_._jq.ajax;
        return th_;

    },
    /*
     * @example 
     * 
     * jQAjaxSupport.get('myName').set('uri', 'some url')
     * .set('dataType', 'xml')
     * .set('method', 'GET')
     * .set('cache', false)
     * .start();
     * 
     * @param {string} key
     * @param {string} value
     * @returns {jQAjaxSupport}
     */
    set: function (key, value) {
        this.opt[key] = value;
        return this;
    },
    start: function () {
        this.setting();
        return this.requestXHR;
    },
    stop: function () {
        this.requestXHR.abort();
        return this;
    },
    onSuccess: function (fn) {
        this.success = fn;
        return this;
    },
    onComplete: function (fn) {
        this.complete = fn;
        return this;
    },
    onError: function (fn) {
        this.error = fn;
        return this;
    },
    onEnd: function (fn) { 
        this.complete = fn;
        return this;
    },
    onAfterStart: function (fn) {
        
        this.setBeforeSend(fn);
        return this;
    },
    clearSucc: function (fn) {
        this.successlts=[];
         return this;
     },
     addSuccess: function (fn) {
         var t_ = this;
         t_.successlts.push(fn);
         return t_;
     }, 
     setMessage: function (key, value) {
         this.messages[key] = value;
         return this;
     },
    setUrlController: function (value) {
         this.urlController= value;
         return this;
     },
    setAction: function (value) {
         this.action= value;
         return this;
     },  
    /*
     * Type: String
     * @returns {httpRequest}
     */
    setUrl: function (url) {
        this.opt.url = url;
        return this;
    },
    /*
     * Type: Boolean
     */
    setAsync: function (a) {
        this.opt.async = a;
        return this;
    },
    /* type (default: 'GET')
     * Type: String   
     * @returns {httpRequest}
     */
    setType: function (a) {
        this.opt.type = a;
        return this;
    },
    /*
     * dataType (default: Intelligent Guess (xml, json, jsonp, script, or html))
     * Type: String
     * @returns {httpRequest}
     */
    setDataType: function (a) {
        this.opt.dataType = a;
        return this;
    },
    /* 
     * Type: PlainObject or String or Array
     * @param {type} a
     * @returns {httpRequest}
     */
    setData: function (a) {
        this.opt.data = a;
        return this;
    },
    /* 
     * Type: Number
     * @returns {httpRequest}
     */
    setTimeout: function (a) {
        this.opt.timeout = a;
        return this;
    },
    /* 
     * Type: PlainObject
     *   statusCode: {
     *  404: function() {
     *    alert( "page not found" );
     *  }
     * }
     * @returns {httpRequest}
     */
    setStatusCode: function (a) {
        this.opt.statusCode = a;
        return this;
    },
    /* 
     * Type: PlainObject
     * @example 
     *  xhrFields: {
     *     withCredentials: true
     *  }
     * @returns {httpRequest}
     */
    setXhrFields: function (a) {
        this.opt.xhrFields = a;
        return this;
    },
    /*
     * Type: Function( jqXHR jqXHR, PlainObject settings )
     * @param {type} a
     * @returns {httpRequest}
     */

    setBeforeSend: function (fn) {
        this.opt.beforeSend = fn;
        return this;
    },
    /*
     * cache (default: true, false for dataType 'script' and 'jsonp')
     *  Type: Boolean
     * @param {type} a
     * @returns {httpRequest}
     */
    setCache: function (a) {
        this.opt.cache = a;
        return this;
    },
    /* contentType (default: 'application/x-www-form-urlencoded; charset=UTF-8')
     * Type: Boolean or String 
     * @returns {httpRequest}
     */
    setContentType: function (a) {
        this.opt.contentType = a;
        return this;
    },
    /*
     * Type: PlainObject
     * context: document.body    
     * .success(function() {
     * $( this ).addClass( "done" ); }
     * @returns {httpRequest}
     */
    setContext: function (a) {
        this.opt.context = a;
        return this;
    },
    /* 
     * Type: Boolean 
     * @returns {httpRequest}
     */
    setCrossDomain: function (a) {
        this.opt.crossDomain = a;
        return this;
    },
    /*  
     * Type: Function( String data, String type ) => Anything 
     * @returns {httpRequest}
     */
    setDataFilter: function (a) {
        this.opt.dataFilter = a;
        return this;
    },
    /*        
     * processData (default: true)
     * Type: Boolean
     * @returns {httpRequest}   
     */
    setProcessData: function (a) {
        this.opt.processData = a;
        return this;
    },
    /* 
     * Type: String 
     * @returns {httpRequest}
     */
    setScriptCharset: function (a) {
        this.opt.scriptCharset = a;
        return this;
    },
    initSuccess:function(data){
        var ts__=this;
        for(var i in ts__.successlts)
        if(typeof ts__.successlts[i]==="function")
          ts__.successlts[i].apply(ts__,[data]);  
        return this;  
        },
    setting: function () {
        var this__ = this;
        var options = {};
        this.flush = false;
        if (typeof (this.opt.url) !== "undefined")
            this.opt.url = [this.opt.url, (this.opt.dataType === "jsonp") ? this.opt.url.indexOf("callback=") ? "" : this.opt.url.indexOf("?") ? "&callback=?" : "?callback=?" : ""].join("");
        if (typeof (this__.urlController) !== "undefined" && typeof (this__.urlController) !== "object")
             this.opt.url=this__.urlController;
        if (typeof (this__.action) !== "undefined" && typeof (this__.action) !== "object")
        this.opt.url+=this__.action;
        for (var i in this.opt) {
            if (typeof (this.opt[i]) !== "undefined") {
                options[i] = this.opt[i];
            }
        }
        this.requestXHR = this.request(options);
        this.requestXHR.done(function (data) {
            if (typeof (this__.success) === "function")
                this__.success.apply(this__,[data])
        })
        this.requestXHR.fail(function (jqXHR, textStatus, errorThrown) {
            if (typeof (this__.error) === "function")
                this__.error(jqXHR, textStatus, errorThrown)
        })
        this.requestXHR.always(function (jqXHR, textStatus, errorThrown) {
            if (typeof (this__.complete) === "function")
                this__.complete(jqXHR, textStatus, errorThrown)
        });
        return this;
    }

}
jQAjaxSupport.get = function (a) {
    if (typeof (jQAjaxSupport.istances[a]) === "undefined")
        jQAjaxSupport.istances[a] = new jQAjaxSupport();
    return jQAjaxSupport.istances[a].clearSucc();
}
};
