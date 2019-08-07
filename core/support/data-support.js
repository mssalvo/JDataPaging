/*!
 * DataElementSupport
 * @author salvatore mariniello - salvo.mariniello@gmail.com 
 * https://github.com/mssalvo/DataElement/tree/master/core/support
 * */

(function () {
    if(typeof window.console === 'undefined' || typeof window.console.log === 'undefined') {
        window.console = { log: function() {}};
    }
    window.jQuery || console.log('DataElementSupport Info :: jQuery not istance! > check include jquery.js')  
})();

function DataElementSupport() {}
DataElementSupport.prototype.home = undefined;
DataElementSupport.prototype.data = {};
DataElementSupport.prototype.ajax_ = {};
DataElementSupport.prototype.current = 'index';
DataElementSupport.prototype.htmlTemplate = {};
DataElementSupport.prototype._ = jQuery;
DataElementSupport.expControll = new RegExp(/:\ *(\w+)\s*\@(:\1@|)/);
DataElementSupport.expEvent = new RegExp(/^([a-z \ *]|:\1:)+/);
DataElementSupport.expAction = new RegExp(/@\ *(\w+)\s*\/?(@.*\1.|)/);
DataElementSupport.prototype.fn = {};
DataElementSupport.prototype.trim = function (a) {
    return a.replace(/^\s+|\s+$/gm, '');
};
DataElementSupport.event = function (o, e, f, b) {
    if (o.attachEvent) {
        o.attachEvent("on" + e, f)
    } else if (o.addEventListener) {
        o.addEventListener(e, f, b)
    } else {
        o["on" + e] = f
    }
    return this
};
DataElementSupport.bindPro = function (f, o) {

    if (f.bind === Function.prototype.bind && Function.prototype.bind)
        return Function.prototype.bind.apply(f, Array.prototype.slice.call(arguments, 1));

    var n = Array.prototype.slice.call(arguments, 2);

    return function () {
        return f.apply(o, n.concat(Array.prototype.slice.call(arguments)))
    }
};
DataElementSupport.bind = function (o, e, f, a, arg) {
    var n = (new String(e)).split(" ");
    for (var r = 0; r < n.length; r++) {
        this.event(o, n[r], this.bindPro(f, a, arg), true)
    }
    return this
};
DataElementSupport.prototype.isforEachIn = function (o, ctx, ic) {
    var elementsForEach_ = [], this_ = this;

    Array.prototype.forEach.call(o.querySelectorAll('[for-foreach]'), function (el, i) {
        elementsForEach_[el.getAttribute('for-foreach')] = {attr: el.getAttribute('for-foreach'), exp: [], obj: el};
        el.removeAttribute('for-foreach');
        this_.isforEachIn(el)
    })
    var fork_ = elementsForEach_;
    for (var x_ in fork_) {
        for (var t_ in ctx[ic][fork_[x_]['attr']]) {
            var clone_ = this_._(fork_[x_]['obj']).clone().get(0);
            var aryExp_ = this_.array(clone_.getElementsByTagName('*'));

            if (!aryExp_.length) {
                fork_[x_]['exp'] = [clone_];
            } else {
                fork_[x_]['exp'] = aryExp_;
            }
            for (var y_ in fork_[x_]['exp']) {
                var elemExp = fork_[x_]['exp'][y_];
                if (this_.isAttributeForProp(elemExp.attributes)) {
                    (function (a, b, ct, c) {
                        this_.updateObjectIn(a, b, ct, c);
                    })(fork_[x_]['exp'][y_], fork_[x_]['attr'], ctx[ic], t_)
                }
            }

            this_._(fork_[x_]['obj']).parent().append(clone_);
            this_.initHtmlEvent(clone_);
        }
        this_._(fork_[x_]['obj']).remove();
    }

    return this_;
};
DataElementSupport.prototype.removeProperty = function (ob, reg) {
    if (ob && ob.attributes) {
        var u = [];
        for (var j = 0; j < ob.attributes.length; j++) {
            (function (i, a) {
                if (a.attributes[i] && reg.test(a.attributes[i].name)) {
                    u.push(a.attributes[i].name);

                }
            })(j, ob)

        }
        for (var y = 0; y < u.length; y++) {
            (function (i, a) {
                a.removeAttribute(u[i]);
            })(y, ob)
        }

    }

    return this;
};
DataElementSupport.prototype.propert = function (prop) {
    var p = prop.split(".");
    if (p.length) {
        return {key: p[0], val: p[1]}
    } else {
        return {key: p[0], val: p[0]}
    }
};
DataElementSupport.prototype.settingTag = function (m, e, o) {
    switch (m) {
        case 'html':
            this._(e).html(o)
            break;
        case 'after':
            this._(e).after(/^<(\w+)\s*\/?>(?:.* <\/\1>|)/.test(o ? o : document.createTextNode(o)))
            break;
        case 'before':
            this._(e).before(/^<(\w+)\s*\/?>(?:.* <\/\1>|)/.test(o) ? o : document.createTextNode(o))
            break;
        case 'append':
            this._(e).append(o)
            break;
        case 'text':
            this._(e).text(o)
            break;
        default :
            if (this._(e).attr(m))
                this._(e).attr(m, this._(e).attr(m) + o)
            else
                this._(e).attr(m, o)

    }
    return this;
};
DataElementSupport.prototype.settingTagOption = function (m, e, o) {

    switch (m) {
        case 'html':
            this._(e).html(o)
            break;
        case 'append':
            this._(e).html(o)
            break;
        case 'text':
            this._(e).text(o)
            break;
        default :
            if (this._(e).attr(m))
                this._(e).attr(m, this._(e).attr(m) + o)
            else
                this._(e).attr(m, o)

    }

    return this;
};
DataElementSupport.prototype.settingTagOption = function (m, e, o) {

    switch (m) {
        case 'html':
            this._(e).html(o)
            break;
        case 'append':
            this._(e).html(o)
            break;
        case 'text':
            this._(e).text(o)
            break;
        default :
            if (this._(e).attr(m))
                this._(e).attr(m, this._(e).attr(m) + o)
            else
                this._(e).attr(m, o)
    }

    return this;
};
DataElementSupport.prototype.isAttributeForProp = function (attrs) {
    for (var a in attrs) {
        if (attrs[a] && /(for-property|for-property\-.*)+$/.test(attrs[a].name)) {
            return 1;
        }
    }
    return 0;
};
DataElementSupport.prototype.getHtmlTemplate = function (k) {
    return this.htmlTemplate[k];
};
DataElementSupport.prototype.setHtmlTemplate = function (k, v) {
    this.htmlTemplate[k] = v;
};
DataElementSupport.prototype.searchHtlmTemplate = function (o) {
    var this_ = this;
    Array.prototype.forEach.call((o || document).querySelectorAll('[jms-template]'), function (el, i) {
        this_.setHtmlTemplate(el.getAttribute('jms-template'), el.innerHTML)
        this_._(el).hide();
    })
    return this_;
};
DataElementSupport.prototype.updateObjectIn = function (elemExp, elementForEach, ctx, t) {
    if (elemExp) {
        for (var att = 0; att < elemExp.attributes.length; att++) {
            (function (att, elemExp, t) {
                if (elemExp.attributes[att] && /(for-property|for-property\-.*)+$/.test(elemExp.attributes[att].name)) { //isExp
                    var matchAttr = elemExp.attributes[att].name.split('for-property-')
                    var exps = elemExp.attributes[att].value.split(',');

                    if (exps) {
                        for (var e in exps) {
                            if (elemExp['nodeType'] == 1) {
                                var propert = exps[e].split('.')[0];
                                switch (propert) {

                                    case elementForEach:
                                        if (elemExp['nodeName'] == 'INPUT') {
                                            if (matchAttr[1]) {
                                                this._(elemExp).attr(matchAttr[1], this.getObjVal(exps, e, ctx, elementForEach, t))
                                            } else {
                                                elemExp['value'] = this.getObjVal(exps, e, ctx, elementForEach, t);
                                            }
                                        } else if (elemExp['nodeName'] == 'OPTION') {
                                            if (matchAttr[1]) {
                                                this.settingTagOption(matchAttr[1], elemExp, this.getObjVal(exps, e, ctx, elementForEach, t));

                                            } else {
                                                this._(elemExp).html(this.getObjVal(exps, e, ctx, elementForEach, t))
                                            }
                                        } else {
                                            if (matchAttr[1]) {

                                                this.settingTag(matchAttr[1], elemExp, this.getObjVal(exps, e, ctx, elementForEach, t));

                                            } else {

                                                this._(elemExp).append(this.getObjVal(exps, e, ctx, elementForEach, t))
                                            }
                                        }
                                        break;

                                    default:
                                        if (exps[e].split('.').length < 2) {
                                            if (elemExp['nodeName'] == 'INPUT') {
                                                if (matchAttr[1] && matchAttr[1] == "value") {
                                                    elemExp[matchAttr[1]] = ctx[exps[e].split('.')[0]]
                                                } else if (matchAttr[1]) {
                                                    this._(elemExp).attr(matchAttr[1], ctx[exps[e].split('.')[0]]);
                                                } else {
                                                    elemExp['value'] = ctx[exps[e].split('.')[0]];
                                                }
                                            } else if (elemExp['nodeName'] == 'OPTION') {
                                                if (matchAttr[1]) {

                                                    this.settingTagOption(matchAttr[1], elemExp, ctx[exps[e].split('.')[0]]);

                                                } else {
                                                    this._(elemExp).html(ctx[exps[e].split('.')[0]])
                                                }
                                            } else {
                                                if (matchAttr[1]) {

                                                    this.settingTag(matchAttr[1], elemExp, ctx[exps[e].split('.')[0]]);

                                                } else {
                                                    this._(elemExp).append(ctx[exps[e].split('.')[0]])
                                                }
                                            }
                                        } else if (exps[e].split('.').length > 1) {

                                            if (elemExp['nodeName'] == 'INPUT') {

                                                if (matchAttr[1]) {
                                                    this._(elemExp).attr(matchAttr[1], ctx[exps[e].split('.')[0]][exps[e].split('.')[1]]);

                                                } else {
                                                    elemExp['value'] = ctx[exps[e].split('.')[0]][exps[e].split('.')[1]];
                                                }
                                            } else if (elemExp['nodeName'] == 'OPTION') {
                                                if (matchAttr[1]) {

                                                    this.settingTagOption(matchAttr[1], elemExp, ctx[exps[e].split('.')[0]][exps[e].split('.')[1]]);


                                                } else {
                                                    this._(elemExp).html(ctx[exps[e].split('.')[0]][exps[e].split('.')[1]])
                                                }
                                            } else {

                                                if (matchAttr[1]) {

                                                    this.settingTag(matchAttr[1], elemExp, ctx[exps[e].split('.')[0]][exps[e].split('.')[1]]);

                                                } else {
                                                    this._(elemExp).append(ctx[exps[e].split('.')[0]][exps[e].split('.')[1]])
                                                }
                                            }

                                        }

                                }
                            }
                        }
                    }
                }

            })(att, elemExp, t)
        }

        this.removeProperty(elemExp, new RegExp(/(for-property|for-property\-.*)+$/));
    }
    return this;
};
DataElementSupport.prototype.updateObject = function (elemExp, elementForEach, t) {
    var this_ = this;
    if (elemExp) {
        for (var att = 0; att < elemExp.attributes.length; att++) {
            (function (att, elemExp, t) {
                if (elemExp.attributes[att] && /(for-property|for-property\-.*)+$/.test(elemExp.attributes[att].name)) { //isExp
                    var matchAttr = elemExp.attributes[att].name.split('for-property-')
                    var exps = elemExp.attributes[att].value.split(',');

                    if (exps) {
                        for (var e in exps) {
                            if (elemExp['nodeType'] == 1) {
                                var propert = exps[e].split('.')[0];
                                switch (propert) {

                                    case elementForEach:
                                        if (elemExp['nodeName'] == 'INPUT') {
                                            if (matchAttr[1]) {
                                                this_._(elemExp).attr(matchAttr[1], this_.getObjVal(exps, e, this_.data, elementForEach, t))
                                            } else {
                                                elemExp['value'] = this_.getObjVal(exps, e, this_.data, elementForEach, t);
                                            }
                                        } else if (elemExp['nodeName'] == 'OPTION') {
                                            if (matchAttr[1]) {
                                                this_.settingTagOption(matchAttr[1], elemExp, this_.getObjVal(exps, e, this_.data, elementForEach, t));

                                            } else {
                                                this_._(elemExp).html(this_.getObjVal(exps, e, this_.data, elementForEach, t))
                                            }
                                        } else {
                                            if (matchAttr[1]) {

                                                this_.settingTag(matchAttr[1], elemExp, this_.getObjVal(exps, e, this_.data, elementForEach, t));

                                            } else {

                                                this_._(elemExp).append(this_.getObjVal(exps, e, this_.data, elementForEach, t))
                                            }
                                        }
                                        break;

                                    default:
                                        if (exps[e].split('.').length < 2) {
                                            if (elemExp['nodeName'] == 'INPUT') {
                                                if (matchAttr[1] && matchAttr[1] == "value") {
                                                    elemExp[matchAttr[1]] = this_.data[exps[e].split('.')[0]]
                                                } else if (matchAttr[1]) {
                                                    this_._(elemExp).attr(matchAttr[1], this_.data[exps[e].split('.')[0]]);
                                                } else {
                                                    elemExp['value'] = this_.data[exps[e].split('.')[0]];
                                                }
                                            } else if (elemExp['nodeName'] == 'OPTION') {
                                                if (matchAttr[1]) {

                                                    this_.settingTagOption(matchAttr[1], elemExp, this_.data[exps[e].split('.')[0]]);

                                                } else {
                                                    this_._(elemExp).html(this_.data[exps[e].split('.')[0]])
                                                }
                                            } else {
                                                if (matchAttr[1]) {

                                                    this_.settingTag(matchAttr[1], elemExp, this_.data[exps[e].split('.')[0]]);

                                                } else {
                                                    this_._(elemExp).append(this_.data[exps[e].split('.')[0]])
                                                }
                                            }
                                        } else if (exps[e].split('.').length > 1) {

                                            if (elemExp['nodeName'] == 'INPUT') {

                                                if (matchAttr[1]) {
                                                    this_._(elemExp).attr(matchAttr[1], this_.data[exps[e].split('.')[0]][exps[e].split('.')[1]]);

                                                } else {
                                                    elemExp['value'] = this_.data[exps[e].split('.')[0]][exps[e].split('.')[1]];
                                                }
                                            } else if (elemExp['nodeName'] == 'OPTION') {
                                                if (matchAttr[1]) {

                                                    this_.settingTagOption(matchAttr[1], elemExp, this_.data[exps[e].split('.')[0]][exps[e].split('.')[1]]);


                                                } else {
                                                    this_._(elemExp).html(this_.data[exps[e].split('.')[0]][exps[e].split('.')[1]])
                                                }
                                            } else {

                                                if (matchAttr[1]) {

                                                    this_.settingTag(matchAttr[1], elemExp, this_.data[exps[e].split('.')[0]][exps[e].split('.')[1]]);

                                                } else if (!this_.isUndefined(this_.data[exps[e].split('.')[0]])) {
                                                    this_._(elemExp).append(this_.data[exps[e].split('.')[0]][exps[e].split('.')[1]])
                                                }
                                            }

                                        }

                                }
                            }
                        }
                    }
                }

            })(att, elemExp, t)
        }

        this.removeProperty(elemExp, new RegExp(/(for-property|for-property\-.*)+$/));
    }
};
DataElementSupport.prototype.getObjVal = function (exps, e, a, b, n) {
    var this_ = this;
    if (exps[e].split('.').length < 2) {
        if (exps[e] == this_.current)
            return n;
        return a[b][n]
    } else {
        if (exps[e].split('.')[1] == this_.current)
            return n;
        return a[b][n][exps[e].split('.')[1]]
    }
};
DataElementSupport.prototype.isUndefined = function (t) {
    return null == t ? !0 : t ? "undefined" == typeof t : !0
};
DataElementSupport.prototype.isArrayNative = function (a) {
    return !!a && (typeof a == "object" || typeof a == "function") && "length" in a && !("setInterval" in a) && (Object.prototype.toString.call(a) === "[object Array]" || "callee" in a || "item" in a);
};
DataElementSupport.prototype.array = function (b) {
    if (!this.isArrayNative(b))
        return [b];
    if (b.item) {
        var a = b.length, c = new Array(a);
        while (a--)
            c[a] = b[a];
        return c;
    }
    return Array.prototype.slice.call(b);
};
DataElementSupport.searchHtmlEvent = function (o) {
    var jmsEvent = [];
    Array.prototype.forEach.call(o.querySelectorAll("[jms-event]"), function (el, i) {
        jmsEvent[el.getAttribute("jms-event") + "-" + i] = el;
    })
    return jmsEvent;
};
DataElementSupport.prototype.isforEach = function (o) {
    var elementsForEach = [], this_ = this;

    Array.prototype.forEach.call(o.querySelectorAll('[jms-foreach]'), function (el, i) {
        elementsForEach[el.getAttribute('jms-foreach')] = {attr: el.getAttribute('jms-foreach'), exp: [], obj: el};
        el.removeAttribute('jms-foreach');
        this_.isforEach(el)
    })
    var fork = elementsForEach;
    for (var x in fork) {

        for (var t in this_.data[fork[x]['attr']]) {
            var clone = this_._(fork[x]['obj']).clone().get(0);
            var aryExp = this_.array(clone.getElementsByTagName('*'));

            if (!aryExp.length) {
                fork[x]['exp'] = [clone];
            } else {
                fork[x]['exp'] = aryExp;
            }
            for (var y in fork[x]['exp']) {
                var elemExp = fork[x]['exp'][y];
                if (this_.isAttributeForProp(elemExp.attributes)) {
                    (function (a, b, c) {
                        this_.updateObject(a, b, c);
                    })(fork[x]['exp'][y], fork[x]['attr'], t)
                }
            }

            this_._(fork[x]['obj']).parent().append(clone);
            this_.initHtmlEvent(clone);
            this_.isforEachIn(clone, this_.data[fork[x]['attr']], t)
            this_.removeProperty(clone, new RegExp(/(for-property|for-property\-.*)+$/));
        }
        this_._(fork[x]['obj']).remove();
    }

    return this_;
};

DataElementSupport.prototype.createView = function (templateName, data, objView) {
    var this__ = this;
    this__.searchHtlmTemplate(document).data = data;
    var exl = this__._(this__.getHtmlTemplate(templateName)).get();
    this__._(objView).html(exl);
    this__.isforEach(objView);
    this__.initHtmlEvent(objView);
    return this;
};

DataElementSupport.prototype.initHtmlEvent = function (o) {
    var this_ = this, __proto = this_;
    var jmsEvent = DataElementSupport.searchHtmlEvent(o);
    // jms-event="click blur:M@home";
    // jms-event="click blur:V@home";
    // jms-event="click blur:C@home";
    // jms-event="click blur:MVC@home";
    for (var k in jmsEvent) {
        var par = k.split("-")[0],
                evt = this_.trim(DataElementSupport.expEvent.exec(par)[0]),
                ctr = DataElementSupport.expControll.exec(par)[1],
                action = DataElementSupport.expAction.exec(par)[1],
                types = ctr.split(" ").join("")/*.toLowerCase()*/,
                action = action.split(" ").join(""),
                obj = jmsEvent[k],
                nEvent = evt.split(" ");
        obj.removeAttribute('jms-event')
        for (var s in nEvent) {
            (function (t, act, arg) {
                DataElementSupport.bind(obj, nEvent[s], __proto[t][(function (a) {
                    return  a
                })(act)], obj, arg);
            })(types, action, this_.home)
        }

    }
};
DataElementSupport.prototype.ajaxCallServer = function (btn) {
    var this__ = this;
    this__._.ajax({
        type: this__.home.ajaxSetting.type || "get",
        url: this__.home.ajaxSetting.url,
        data: this__.home.parameter,
        dataType: this__.home.ajaxSetting.dataType || "json"
    })
            .done(function (data,textStatus, xhr) {
                this__.data = data;
                if (btn && btn === "start")
                    this__.home.start(data);
                else
                    this__.home.startServer(data, btn)
            })
            .fail(function (xhr, textStatus, thrownError) {
                console.log(xhr.status);
                console.log(textStatus);
                console.log(thrownError);
            })
            .always(function (data_xhr, textStatus, xhr_errorThrown) {
                console.log("[request ajax: "+this__.home.ajaxSetting.url+"] method: complete ",textStatus);
            });
    return this;
};
DataElementSupport.istance = function () {
    return new DataElementSupport();
}
