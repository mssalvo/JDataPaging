/*! 
 * 
 * @author salvatore mariniello - salvo.mariniello@gmail.com
 * https://github.com/mssalvo/DataElement/tree/master/dist/util-support
 * @example istance 
 * AioRequest.istance('incorso')
 *       .set("url", '/DataElements/incorso.json')
 *       .set("type", 'get')
 *       .set("data", {limit: "10", page: "1", totalrows: "18"})
 *       .onSuccess(function () {})
 *       .onError(function () {})
 *       .onComplete(function () {}).start()
 *
 *   var xhr= AioRequest.istances.incorso.start()
 **/
if(typeof(YUI)!=="undefined" && typeof(AUI)==="undefined"){
YUI.add("aui-io-request",function(e,t){var n=e.Lang,r=n.isBoolean,i=n.isFunction,s=n.isString,o=e.namespace("config.io"),u=function(e){return function(){return o[e]}},a="active",f="arguments",l="autoLoad",c="cache",h="cfg",p="complete",d="content-type",v="context",m="data",g="dataType",y="",b="end",w="failure",E="form",S="get",x="headers",T="IORequest",N="json",C="method",k="responseData",L="start",A="success",O="sync",M="timeout",_="transaction",D="uri",P="xdr",H="xml",B="Parser error: IO dataType is not correctly parsing",j={all:"*/*",html:"text/html",json:"application/json, text/javascript",text:"text/plain",xml:"application/xml, text/xml"},F=e.Component.create({NAME:T,ATTRS:{autoLoad:{value:!0,validator:r},cache:{value:!0,validator:r},dataType:{setter:function(e){return(e||y).toLowerCase()},value:null,validator:s},responseData:{setter:function(e){return this._setResponseData(e)},value:null},uri:{setter:function(e){return this._parseURL(e)},value:null,validator:s},active:{value:!1,validator:r},cfg:{getter:function(){var t=this;return{arguments:t.get(f),context:t.get(v),data:t.getFormattedData(),form:t.get(E),headers:t.get(x),method:t.get(C),on:{complete:e.bind(t.fire,t,p),end:e.bind(t._end,t),failure:e.bind(t.fire,t,w),start:e.bind(t.fire,t,L),success:e.bind(t._success,t)},sync:t.get(O),timeout:t.get(M),xdr:t.get(P)}},readOnly:!0},transaction:{value:null},arguments:{valueFn:u(f)},context:{valueFn:u(v)},data:{valueFn:u(m)},form:{valueFn:u(E)},headers:{getter:function(t){var n=[],r=this,i=r.get(g);return i&&n.push(j[i]),n.push(j.all),e.merge(t,{Accept:n.join(", ")})},valueFn:u(x)},method:{valueFn:u(C)},selector:{value:null},sync:{valueFn:u(O)},timeout:{valueFn:u(M)},xdr:{valueFn:u(P)}},EXTENDS:e.Plugin.Base,prototype:{init:function(e){var t=this;F.superclass.init.apply(this,arguments),t._autoStart()},destructor:function(){var e=this;e.stop(),e.set(_,null)},getFormattedData:function(){var e=this,t=e.get(m),n=o.dataFormatter;return i(n)&&(t=n.call(e,t)),t},start:function(){var t=this;t.destructor(),t.set(a,!0);var n=t._yuiIOObj;n||(n=new e.IO,t._yuiIOObj=n);var r=n.send(t.get(D),t.get(h));t.set(_,r)},stop:function(){var e=this,t=e.get(_);t&&t.abort()},_autoStart:function(){var e=this;e.get(l)&&e.start()},_parseURL:function(e){var t=this,n=t.get(c),r=t.get(C);if(n===!1&&r==S){var s=+(new Date),u=e.replace(/(\?|&)_=.*?(&|$)/,"$1_="+s+"$2");e=u+(u==e?(e.match(/\?/)?"&":"?")+"_="+s:"")}var a=o.uriFormatter;return i(a)&&(e=a.apply(t,[e])),e},_end:function(e,t){var n=this;n.set(a,!1),n.set(_,null),n.fire(b,e,t)},_success:function(e,t,n){var r=this;r.set(k,t),r.fire(A,e,t,n)},_setResponseData:function(t){var n=null,r=this;if(t){var i=r.get(g),s=t.getResponseHeader(d)||"";if(i==H||!i&&s.indexOf(H)>=0){n=t.responseXML;if(n.documentElement.tagName=="parsererror")throw B}else n=t.responseText;n===y&&(n=null);if(i==N)try{n=e.JSON.parse(n)}catch(o){}else{var u=r.get("selector");if(n&&u){var a;n.documentElement?a=e.one(n):a=e.Node.create(n),n=a.all(u)}}}return n}}});e.IORequest=F,e.io.request=function(t,n){return new e.IORequest(e.merge(n,{uri:t}))}},"2.0.0",{requires:["io-base","json","plugin","querystring-stringify","aui-component"]});
var ___Y=YUI().use("aui-io-request");
}
if(typeof(AUI)!=="undefined"){
var ___A=AUI().use("aui-io-request");
}
if(typeof (AUI)!=="undefined" || typeof (YUI)!=="undefined"){
function AioRequest() {
    var th_ = this;
    th_._new().init();
}
AioRequest.istances = {};
AioRequest.prototype = {
    opt: {
        url: undefined,
        data: undefined,
        async: undefined,
        method: "get",
        dataType: "json",
        autoLoad: false,
        cache:'false'

    },
    _new: function () {
        if(typeof (AUI)==="undefined" && typeof (YUI)!=="undefined")
        this.A =YUI().use('aui-io-request');
        if(typeof (AUI)!=="undefined")
        this.A = AUI().use('aui-io-request');
        this.request = undefined;
        this.requestXHR = undefined;
        this.success = undefined;
        this.error = undefined;
        this.complete = undefined;
        this.end = undefined;
        this.fnStart = undefined;
        this.afterStart = undefined;
        return this;
    },
    init: function () {
        var th_ = this;
        th_.request = th_.A.io.request;
        return th_;
    },
    /*
     * @example 
     * 
     * AioRequest.istance('myName').set('url', 'some url')
     * .set('dataType', 'xml')
     * .set('method', 'GET')
     * .set('cache', false)
     * .start();
     * 
     * @param {string} key
     * @param {string} value
     * @returns {AioRequest}
     */
    set: function (key, value) {
        this.opt[key]= value;
        return this;
    },
    start: function (b) {
        this.setting(b);
        if(typeof (b)!=="undefined" && !b)
        this.requestXHR.start();
       if(typeof (b)==="undefined")
        this.requestXHR.start();
        return this.requestXHR;
    },
    stop: function () {
        this.requestXHR.stop();
        return this;
    },
    onStart: function (fn) {
        var t_ = this;
        t_.fnStart = fn;
        return t_;
    },
    onSuccess: function (fn) {
        var t_ = this;
        t_.success=fn;
        return t_;
    },
    onComplete: function (fn) {
        var t_ = this;
        t_.complete = fn;
        return t_;
    },
    onError: function (fn) {
        var t_ = this;
        t_.error = fn;
        return t_;
    },
    onEnd: function (fn) {
        var t_ = this;
        t_.end = fn;
        return t_;
    },
    onAfterStart: function (fn) {
        var t_ = this;
        t_.afterStart = fn;
        return t_;
    },
    xhrSet: function (key, value) {
        this.requestXHR.set(key, value);
        return this;
    },
    setting: function (b) {
        var this__ = this;
        this__.opt.autoLoad=typeof (b)!=="undefined"?b:false;
        this.requestXHR = this.request(this__.opt.url, {
            autoLoad: this__.opt.autoLoad,
            method: this__.opt.method,
            dataType: this__.opt.dataType,
            data: this__.opt.data,
            cache: this__.opt.cache,
            on: {
                start: function () {
                    if (typeof (this__.fnStart) === "function")
                        this__.fnStart()
                  console.log("start terminated request ajax method: start");   
                },
                success: function () {
                    if (typeof (this__.success) === "function")   
                    this__.success(this.get('responseData'))
                 console.log("success terminated request ajax method: success");
                },
                complete: function () {
                    if (typeof (this__.complete) === "function")
                        this__.complete(this.get('responseData'))
                    console.log("complete terminated request ajax method: complete");
                },
                failure: function () {
                    if (typeof (this__.error) === "function")
                        this__.error(this.get('responseData'),this__.opt.url)
                    console.log("failure terminated request ajax method: failure");
                },
                end: function () {
                    if (typeof (this__.end) === "function")
                        this__.end()
                    console.log("end terminated request ajax method: end");
                }
            },
            after: {
                start: function () {
                    if (typeof (this__.afterStart) === "function")
                        this__.afterStart()
                 console.log("afterstart terminated request ajax method: afterstart");    
                }
            }
        })

        return this;
    }

}
AioRequest.istance = function (a) {
    if (typeof (AioRequest.istances[a]) === "undefined")
        AioRequest.istances[a] = new AioRequest();
    return AioRequest.istances[a];
}
};
