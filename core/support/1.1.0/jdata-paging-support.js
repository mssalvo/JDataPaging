/*!
 * JDataPagingSupport v1.1.0 ©
 * @author salvatore mariniello - salvo.mariniello@gmail.com 
 * https://github.com/mssalvo/JDataPaging/tree/master/dist/support
 * MIT License
 * Copyright (c) 2019 Salvatore Mariniello
 * https://github.com/mssalvo/JDataPaging/blob/master/LICENSE
 * */

(function () {
    if (typeof window.console === 'undefined' || typeof window.console.log === 'undefined') {
        window.console = {log: function () {}};
    }
    window.jQuery || console.log('JDataPagingSupport Info :: jQuery not istance! > check include jquery.js')
})();

function JDataPagingSupport() {
    this.count = 0;
}
JDataPagingSupport.prototype.home = undefined;
JDataPagingSupport.prototype.data = {};
JDataPagingSupport.prototype.ajax_ = {};
JDataPagingSupport.prototype.current = 'index';
JDataPagingSupport.prototype.space = ' ';
JDataPagingSupport.prototype.txtSpace = ' ';
JDataPagingSupport.prototype.divisor = '@@';
JDataPagingSupport.prototype.htmlTemplate = {};
JDataPagingSupport.prototype._ = jQuery;
JDataPagingSupport.expControll = new RegExp(/:\ *(\w+)\s*\@(:\1@|)/);
JDataPagingSupport.expEvent = new RegExp(/^([a-z \ *]|:\1:)+/);
JDataPagingSupport.expAction = new RegExp(/@\ *(\w+)\s*\/?(@.*\1.|)/);
JDataPagingSupport.prototype.fn = {};
JDataPagingSupport.prototype.trim = function (a) {
    return a.replace(/^\s+|\s+$/gm, '');
};
JDataPagingSupport.event = function (o, e, f, b) {
    if (o.attachEvent) {
        o.attachEvent("on" + e, f)
    } else if (o.addEventListener) {
        o.addEventListener(e, f, b)
    } else {
        o["on" + e] = f
    }
    return this
};
JDataPagingSupport.bindPro = function (f, o) {

    if (f.bind === Function.prototype.bind && Function.prototype.bind)
        return Function.prototype.bind.apply(f, Array.prototype.slice.call(arguments, 1));

    var n = Array.prototype.slice.call(arguments, 2);

    return function () {
        return f.apply(o, n.concat(Array.prototype.slice.call(arguments)))
    }
};
JDataPagingSupport.bind = function (o, e, f, a, arg) {
    var n = (new String(e)).split(" ");
    for (var r = 0; r < n.length; r++) {
        this.event(o, n[r], this.bindPro(f, a, arg), true)
    }
    return this
};
JDataPagingSupport.prototype.isforEachIn = function (o, ctx, ic) {
    var elementsForEach_ = [], this_ = this;

    Array.prototype.forEach.call(o.querySelectorAll('[for-foreach]'), function (el, i) {
        elementsForEach_[el.getAttribute('for-foreach')] = {attr: el.getAttribute('for-foreach'), exp: [], obj: el};
        el.removeAttribute('for-foreach');
        this_.isforEachIn(el)
    })

    if (typeof (this_.home.onBeforeRow) === "undefined" || typeof (this_.home.onBeforeRow) !== "function")
        this_.home.onBeforeRow = function (a, b) {
            return true;
        }

    var fork_ = elementsForEach_;

    for (var x_ in fork_) {
        for (var t_ in ctx[ic][fork_[x_]['attr']]) {

            var clone_ = this_._(fork_[x_]['obj']).clone().get(0);
            var aryExp_ = this_.array(clone_.getElementsByTagName('*'));
            if (this_.home.onBeforeRow(clone_, ctx[ic], ic)) {
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
        }
        this_._(fork_[x_]['obj']).remove();
    }

    return this_;
};
JDataPagingSupport.prototype.removeProperty = function (ob, reg) {
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
JDataPagingSupport.prototype.propert = function (prop) {
    var p = prop.split(".");
    if (p.length) {
        return {key: p[0], val: p[1]}
    } else {
        return {key: p[0], val: p[0]}
    }
};
JDataPagingSupport.prototype.settingTag = function (m, e, o) {
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
JDataPagingSupport.prototype.settingTagOption = function (m, e, o) {

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
JDataPagingSupport.prototype.settingTagOption = function (m, e, o) {

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
JDataPagingSupport.prototype.isAttributeForProp = function (attrs) {
    for (var a in attrs) {
        if (attrs[a] && /(for-property|for-property\-.*)+$/.test(attrs[a].name)) {
            return 1;
        }
    }
    return 0;
};
JDataPagingSupport.prototype.isAttributeWrite = function (attrs) {
    for (var a in attrs) {
        if (attrs[a] && /(jms-write|jms-write-.*)+$/.test(attrs[a].name)) {
            return 1;
        }
    }
    return 0;
};
JDataPagingSupport.prototype.getHtmlTemplate = function (k) {
    return this.htmlTemplate[k];
};
JDataPagingSupport.prototype.setHtmlTemplate = function (k, v) {
    this.htmlTemplate[k] = v;
};
JDataPagingSupport.prototype.searchHtlmTemplate = function (o) {
    var this_ = this;
    Array.prototype.forEach.call((o || document).querySelectorAll('[jms-template]'), function (el, i) {
        this_.setHtmlTemplate(el.getAttribute('jms-template'), el.innerHTML)
        this_._(el).hide();
    })
    return this_;
};
JDataPagingSupport.prototype.updateObjectIn = function (elemExp, elementForEach, ctx, t) {
    if (elemExp) {
        for (var att = 0; att < elemExp.attributes.length; att++) {
            (function (att, elemExp, t) {
                if (elemExp.attributes[att] && /(for-property|for-property\-.*)+$/.test(elemExp.attributes[att].name)) {
                    var matchAttr = elemExp.attributes[att].name.split('for-property-')
                    var exps = elemExp.attributes[att].value.split(',');

                    if (exps) {
                        for (var e in exps) {
                            if (elemExp['nodeType'] === 1) {
                                var propert = exps[e].split('.')[0];

                                switch (propert) {

                                    case elementForEach:
                                        if (elemExp['nodeName'] === 'INPUT') {
                                            if (matchAttr[1]) {

                                                this._(elemExp).attr(matchAttr[1], typeof this.getObjVal(exps, e, ctx, elementForEach, t) === "boolean" ? this.getObjVal(exps, e, ctx, elementForEach, t) : this._(elemExp).attr(matchAttr[1]) + this.getObjVal(exps, e, ctx, elementForEach, t))
                                            } else {
                                                elemExp['value'] = this.getObjVal(exps, e, ctx, elementForEach, t);
                                            }
                                        } else if (elemExp['nodeName'] === 'OPTION') {
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
                                            if (elemExp['nodeName'] === 'INPUT') {
                                                if (matchAttr[1] && matchAttr[1] === "value") {
                                                    elemExp[matchAttr[1]] = ctx[exps[e].split('.')[0]]
                                                } else if (matchAttr[1]) {
                                                    this._(elemExp).attr(matchAttr[1], this._(elemExp).attr(matchAttr[1]) + ctx[exps[e].split('.')[0]]);

                                                } else {
                                                    elemExp['value'] = ctx[exps[e].split('.')[0]];
                                                }
                                            } else if (elemExp['nodeName'] === 'OPTION') {
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

                                            if (elemExp['nodeName'] === 'INPUT') {

                                                if (matchAttr[1]) {
                                                    this._(elemExp).attr(matchAttr[1], this._(elemExp).attr(matchAttr[1]) + ctx[exps[e].split('.')[0]][exps[e].split('.')[1]]);

                                                } else {
                                                    elemExp['value'] = ctx[exps[e].split('.')[0]][exps[e].split('.')[1]];
                                                }
                                            } else if (elemExp['nodeName'] === 'OPTION') {
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
JDataPagingSupport.prototype.updateObject = function (elemExp, elementForEach, t, data) {
    var this_ = this;
    if (elemExp) {
        for (var att = 0; att < elemExp.attributes.length; att++) {
            (function (att, elemExp, t, data) {
                if (elemExp.attributes[att] && /(for-property|for-property\-.*)+$/.test(elemExp.attributes[att].name)) {
                    var matchAttr = elemExp.attributes[att].name.split('for-property-')
                    var exps = elemExp.attributes[att].value.split(',');

                    if (exps) {
                        for (var e in exps) {
                            if (elemExp['nodeType'] === 1) {
                                var propert = exps[e].split('.')[0];

                                switch (propert) {

                                    case elementForEach:
                                        if (elemExp['nodeName'] === 'INPUT') {
                                            if (matchAttr[1]) {
                                                this_._(elemExp).attr(matchAttr[1], typeof this_.getObjVal(exps, e, data, elementForEach, t) === "boolean" ? this_.getObjVal(exps, e, data, elementForEach, t) : this_._(elemExp).attr(matchAttr[1]) + this_.getObjVal(exps, e, data, elementForEach, t))
                                            } else {
                                                elemExp['value'] = this_.getObjVal(exps, e, data, elementForEach, t);
                                            }
                                        } else if (elemExp['nodeName'] === 'OPTION') {
                                            if (matchAttr[1]) {
                                                this_.settingTagOption(matchAttr[1], elemExp, this_.getObjVal(exps, e, data, elementForEach, t));

                                            } else {
                                                this_._(elemExp).html(this_.getObjVal(exps, e, data, elementForEach, t))
                                            }
                                        } else {
                                            if (matchAttr[1]) {

                                                this_.settingTag(matchAttr[1], elemExp, this_.getObjVal(exps, e, data, elementForEach, t));

                                            } else {

                                                this_._(elemExp).append(this_.getObjVal(exps, e, data, elementForEach, t))
                                            }
                                        }
                                        break;

                                    default:
                                        if (exps[e].split('.').length < 2) {
                                            if (elemExp['nodeName'] === 'INPUT') {
                                                if (matchAttr[1] && matchAttr[1] === "value") {
                                                    elemExp[matchAttr[1]] = this_.data[exps[e].split('.')[0]]
                                                } else if (matchAttr[1]) {
                                                    this_._(elemExp).attr(matchAttr[1], this_._(elemExp).attr(matchAttr[1]) + data[exps[e].split('.')[0]]);
                                                } else {
                                                    elemExp['value'] = data[exps[e].split('.')[0]];
                                                }
                                            } else if (elemExp['nodeName'] === 'OPTION') {
                                                if (matchAttr[1]) {

                                                    this_.settingTagOption(matchAttr[1], elemExp, data[exps[e].split('.')[0]]);

                                                } else {
                                                    this_._(elemExp).html(data[exps[e].split('.')[0]])
                                                }
                                            } else {
                                                if (matchAttr[1]) {

                                                    this_.settingTag(matchAttr[1], elemExp, data[exps[e].split('.')[0]]);

                                                } else {
                                                    this_._(elemExp).append(data[exps[e].split('.')[0]])
                                                }
                                            }
                                        } else if (exps[e].split('.').length > 1) {

                                            if (elemExp['nodeName'] === 'INPUT') {

                                                if (matchAttr[1]) {
                                                    this_._(elemExp).attr(matchAttr[1], this_._(elemExp).attr(matchAttr[1]) + data[exps[e].split('.')[0]][exps[e].split('.')[1]]);

                                                } else {
                                                    elemExp['value'] = data[exps[e].split('.')[0]][exps[e].split('.')[1]];
                                                }
                                            } else if (elemExp['nodeName'] === 'OPTION') {
                                                if (matchAttr[1]) {

                                                    this_.settingTagOption(matchAttr[1], elemExp, data[exps[e].split('.')[0]][exps[e].split('.')[1]]);


                                                } else {
                                                    this_._(elemExp).html(data[exps[e].split('.')[0]][exps[e].split('.')[1]])
                                                }
                                            } else {

                                                if (matchAttr[1]) {

                                                    this_.settingTag(matchAttr[1], elemExp, data[exps[e].split('.')[0]][exps[e].split('.')[1]]);

                                                } else if (!this_.isUndefined(data[exps[e].split('.')[0]])) {
                                                    this_._(elemExp).append(data[exps[e].split('.')[0]][exps[e].split('.')[1]])
                                                }
                                            }

                                        }

                                }
                            }
                        }
                    }
                }

            })(att, elemExp, t, data)
        }

        this.removeProperty(elemExp, new RegExp(/(for-property|for-property\-.*)+$/));
    }
};

JDataPagingSupport.prototype.getValProp = function (exp, obj, n, isObj) {
    var chars = [];
    var this_ = this;
    var props = exp.split(this_.divisor);
    for (var p in props) {
        var stringProp = props[p], fnp = undefined;
        if (String(stringProp).indexOf('|') !== -1) {
            stringProp = props[p].split('|')[0];
            fnp = props[p].split('|')[1].split(' ').join('');
        }
        if (stringProp === this_.current)
            chars.push(n);
        if (stringProp === this_.space)
            chars.push(this_.txtSpace);
        if (stringProp.indexOf(' ') !== -1 && stringProp.length > 2 && stringProp.indexOf("$") !== -1)
            chars.push(stringProp.split("$").join('.'));
        if (stringProp.split(' ').join('') !== '' && isObj && typeof obj[stringProp] !== "undefined")
            try {
                var j = stringProp.split(' ').join('');
                var val = eval('(' + 'obj' + '.' + j + ')');
                if (typeof val !== "undefined" && typeof fnp !== "undefined")
                    chars.push(typeof this_.fn[fnp] === "function" ? this_.fn[fnp].apply(this, [val]) : val);
                if (typeof val !== "undefined" && typeof fnp === "undefined")
                    chars.push(val);
                if (!isObj && typeof obj !== "undefined")
                    if (typeof fnp !== "undefined")
                        chars.push(typeof this_.fn[fnp] === "function" ? this_.fn[fnp].apply(this, [obj]) : obj);
                if (!isObj && typeof obj !== "undefined" && typeof fnp === "undefined")
                    chars.push(obj);
            } catch (err) {
                console.log(j, err)
            }
    }
    return chars.join('');
};

JDataPagingSupport.prototype.getObjVal = function (exp, e, a, b, n) {
    var this_ = this, u = exp[e].split('.');
    if (u.length < 2) {
        if (String(exp[e]).indexOf(this_.divisor) !== -1)
        {
            return this_.getValProp(exp[e], a[b][n], n, false)
        } else if (exp[e] === this_.current)
            return n;
        else if (exp[e] === this_.space)
            return this_.txtSpace;
        else if (String(exp[e]).indexOf('|') !== -1)
        {
            var fn_ = exp[e].split('|')[1].split(' ').join('');
            return  typeof this_.fn[fn_] === "function" ? this_.fn[fn_].apply(this, [a[b][n], n]) : a[b][n];
        } else
            return a[b][n]
    } else {

        if (String(u[1]).indexOf(this_.divisor) !== -1)
        {
            return this_.getValProp(u[1], a[b][n], n, true)
        }
        if (u[1] === this_.current)
            return n;
        if (u[1] === this_.space)
            return this_.txtSpace;

        var prop = exp[e].split('.').slice(1).join('.'), fnp = undefined;
        if (String(prop).indexOf('|') !== -1)
        {
            fnp = prop.split('|')[1].split(' ').join('');
            prop = prop.split('|')[0].split(' ').join('');
        }

        var propObj = a[b][n];

        if (typeof propObj !== "undefined")
            var val = eval('(' + 'propObj' + '.' + prop + ')');
        if (typeof val !== "undefined" && typeof fnp !== "undefined")
            return  typeof this_.fn[fnp] === "function" ? this_.fn[fnp].apply(this, [val, n]) : val;
        if (typeof val !== "undefined" && typeof fnp === "undefined")
            return val;
        return "";

    }
};

JDataPagingSupport.prototype.valueProperty = function (exps) {
    var this_ = this;
    var chars = [];
    if (typeof exps !== "undefined" && exps !== "") {
        ++this_.count;
        if (String(exps).indexOf(this_.divisor) !== -1) {
            var props = exps.split(this_.divisor);
            for (var p in props) {
                var stringProp = props[p], fnp = undefined;
                if (String(stringProp).indexOf('|') !== -1) {
                    stringProp = props[p].split('|')[0];
                    fnp = props[p].split('|')[1].split(' ').join('');
                }
                if (stringProp === this_.current)
                    chars.push(this_.count);
                else if (stringProp === this_.space)
                    chars.push(this_.txtSpace);
                else if (stringProp.indexOf(' ') !== -1 && stringProp.length > 2)
                    chars.push(stringProp);
                else if (stringProp.split(' ').join('') !== '') {
                    try {
                        var j = stringProp.split(" ").join("");
                        var val = eval('(' + 'this_.data' + '.' + j + ')');
                        if (typeof val !== "undefined" && typeof fnp !== "undefined")
                            chars.push(typeof this_.fn[fnp] === "function" ? this_.fn[fnp].apply(this, [val]) : val);
                        if (typeof val !== "undefined" && typeof fnp === "undefined")
                            chars.push(val);
                    } catch (err) {
                        console.log(j, err)
                    }
                }
            }
            return chars.join('');
        } else {
            try {
                exps = exps.split(" ").join("");
                var stringProp_ = exps, fnp_ = undefined;
                if (String(exps).indexOf('|') !== -1) {
                    stringProp_ = exps.split('|')[0];
                    fnp_ = exps.split('|')[1].split(' ').join('');
                }
                var val_ = eval('(' + 'this_.data' + '.' + stringProp_ + ')');
                if (typeof val_ !== "undefined" && typeof fnp_ !== "undefined")
                    return typeof this_.fn[fnp_] === "function" ? this_.fn[fnp_].apply(this, [val_]) : val_;
                if (typeof val_ !== "undefined")
                    return val_;
            } catch (err) {
                console.log(exps, err)
            }
            return "";
        }
    }
    return "";
};
JDataPagingSupport.prototype.updateProperty = function (elemExp) {
    var this_ = this;
    if (elemExp) {
        for (var att = 0; att < elemExp.attributes.length; att++) {
            (function (elemExp, attribute) {
                if (attribute && /(jms-write|jms-write-.*)+$/.test(attribute.name)) {
                    var matchAttr = attribute.name.split('jms-write-')
                    var exps = attribute.value.split(',');
                    if (exps) {
                        for (var e in exps) {
                            if (elemExp['nodeType'] === 1) {
                                if (elemExp['nodeName'] === 'INPUT') {
                                    if (matchAttr[1]) {
                                        this_._(elemExp).attr(matchAttr[1], this_.valueProperty(exps[e]));
                                    } else {
                                        elemExp['value'] = this_.valueProperty(exps[e]);
                                    }
                                } else if (elemExp['nodeName'] === 'OPTION') {
                                    if (matchAttr[1]) {
                                        this_.settingTagOption(matchAttr[1], elemExp, this_.valueProperty(exps[e]));
                                    } else {
                                        this_._(elemExp).html(this_.valueProperty(exps[e]))
                                    }
                                } else {
                                    if (matchAttr[1]) {
                                        this_.settingTag(matchAttr[1], elemExp, this_.valueProperty(exps[e]));
                                    } else {
                                        this_._(elemExp).append(this_.valueProperty(exps[e]))
                                    }
                                }
                            }
                        }
                    }
                }
            })(elemExp, elemExp.attributes[att])
        }
        this_.removeProperty(elemExp, new RegExp(/(jms-write|jms-write-.*)+$/));
    }
};
JDataPagingSupport.prototype.writeProperty = function (o) {
    var this_ = this;
    var forProperty = [];
    Array.prototype.forEach.call(o.getElementsByTagName('*'), function (el, i) {
        if (this_.isAttributeWrite(el.attributes)) {
            forProperty['jms-write-' + i] = {obj: el};
        }
    })
    var fork = forProperty;
    for (var x in fork) {
        (function (a) {
            this_.updateProperty(a);
        })(fork[x]['obj'])
    }
    return true;
};
JDataPagingSupport.prototype.isUndefined = function (t) {
    return null === t ? !0 : t ? "undefined" === typeof t : !0
};
JDataPagingSupport.prototype.isArrayNative = function (a) {
    return !!a && (typeof a === "object" || typeof a === "function") && "length" in a && !("setInterval" in a) && (Object.prototype.toString.call(a) === "[object Array]" || "callee" in a || "item" in a);
};
JDataPagingSupport.prototype.array = function (b) {
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
JDataPagingSupport.searchHtmlEvent = function (o) {
    var jmsEvent = [];
    Array.prototype.forEach.call(o.querySelectorAll("[jms-event]"), function (el, i) {
        jmsEvent[el.getAttribute("jms-event") + "-" + i] = el;
    })
    return jmsEvent;
};
JDataPagingSupport.prototype.set = function (val, n) {
    var l = val.split('.');
    switch (l.length) {
        case 1:
            return this.data[l[0]]

        case 2:
            return this.data[l[0]][n][l[1]]

        case 3:
            return this.data[l[0]][n][l[1]][l[2]]

        case 4:
            return this.data[l[0]][n][l[1]][l[2]][l[3]]

        case 5:
            return this.data[l[0]][n][l[1]][l[2]][l[3]][l[4]]

        case 6:
            return this.data[l[0]][n][l[1]][l[2]][l[3]][l[4]][l[5]]

        case 7:
            return this.data[l[0]][n][l[1]][l[2]][l[3]][l[4]][l[5]][l[6]]

    }

    return this;
}
JDataPagingSupport.prototype.isforEach = function (o) {
    var elementsForEach = [], this_ = this;
    if (typeof (this_.home) === "undefined")
        this_.home = {onBeforeRow: function (a, b) {
                return true;
            }, onAfterRow: function () {}};
    Array.prototype.forEach.call(o.querySelectorAll('[jms-foreach]'), function (el, i) {
        elementsForEach[el.getAttribute('jms-foreach')] = {attr: el.getAttribute('jms-foreach'), exp: [], obj: el};
        el.removeAttribute('jms-foreach');
        this_.isforEach(el)
    })

    if (typeof (this_.home.onBeforeRow) === "undefined" || typeof (this_.home.onBeforeRow) !== "function")
        this_.home.onBeforeRow = function (a, b) {
            return true;
        }

    var fork = elementsForEach;
    for (var x in fork) {
        var ctx_data = {}, key = x.split('.').pop();
        ctx_data[key] = [];
        if (x.split('.').length > 1) {
            for (var s in this_.data[x.split('.').shift()]) {
                var i = this_.set(x, s);
                ctx_data[key] = ctx_data[key].concat(i);
            }
        } else {
            ctx_data[key] = this_.set(x, 0)
        }
        console.log(ctx_data[key])
        for (var t in ctx_data[key]) {

            var clone = this_._(fork[x]['obj']).clone().get(0);
            var aryExp = this_.array(clone.getElementsByTagName('*'));
            if (this_.home.onBeforeRow(clone, ctx_data[key][t], t)) {
                if (!aryExp.length) {
                    fork[x]['exp'] = [clone];
                } else {
                    fork[x]['exp'] = aryExp;
                }
                for (var y in fork[x]['exp']) {
                    var elemExp = fork[x]['exp'][y];
                    if (this_.isAttributeForProp(elemExp.attributes)) {
                        (function (a, b, c, data) {
                            this_.updateObject(a, b, c, data);
                        })(fork[x]['exp'][y], key, t, ctx_data)
                    }
                }

                this_._(fork[x]['obj']).parent().append(clone);
                this_.writeProperty(clone);
                this_.initHtmlEvent(clone);
                this_.isforEachIn(clone, ctx_data[key], t)

                this_.removeProperty(clone, new RegExp(/(for-property|for-property\-.*)+$/));

                if (typeof (this_.home.onAfterRow) !== "undefined" || typeof (this_.home.onAfterRow) === "function")
                    this_.home.onAfterRow(clone, ctx_data[key][t], t);
            }

        }
        this_._(fork[x]['obj']).remove();
    }

    return this_;
};

JDataPagingSupport.prototype.createView = function (templateName, data, objView) {
    var this__ = this;
    this__.searchHtlmTemplate(document).data = data;
    var exl = this__._(this__.getHtmlTemplate(templateName)).get();
    this__._(objView).html(exl);
    this__.isforEach(objView);
    this__.writeProperty(document);
    this__.initHtmlEvent(objView);
    return this;
};

JDataPagingSupport.prototype.initHtmlEvent = function (o) {
    var this_ = this, __proto = this_;
    var jmsEvent = JDataPagingSupport.searchHtmlEvent(o);
    // jms-event="click blur:M@home";
    // jms-event="click blur:V@home";
    // jms-event="click blur:C@home";
    // jms-event="click blur:MVC@home";
    for (var k in jmsEvent) {
        var par = k.split("-")[0],
                evt = this_.trim(JDataPagingSupport.expEvent.exec(par)[0]),
                ctr = JDataPagingSupport.expControll.exec(par)[1],
                action = JDataPagingSupport.expAction.exec(par)[1],
                types = ctr.split(" ").join("")/*.toLowerCase()*/,
                action = action.split(" ").join(""),
                obj = jmsEvent[k],
                nEvent = evt.split(" ");
        obj.removeAttribute('jms-event')
        for (var s in nEvent) {
            (function (t, act, arg) {
                JDataPagingSupport.bind(obj, nEvent[s], __proto[t][(function (a) {
                    return  a
                })(act)], obj, arg);
            })(types, action, this_.home)
        }

    }
};
JDataPagingSupport.prototype.ajaxCallServer = function (btn) {
    var this__ = this;
    this__._.ajax({
        type: this__.home.ajaxSetting.type || "get",
        url: this__.home.ajaxSetting.url,
        data: this__.home.parameter,
        dataType: this__.home.ajaxSetting.dataType || "json"
    })
            .done(function (data, textStatus, xhr) {
                this__.data = data;
                if (btn && btn === "start")
                    this__.home.start(data);
                if (btn && btn === "dataSet")
                    this__.home.dataSet(data);
                else
                    this__.home.startServer(data, btn)
            })
            .fail(function (xhr, textStatus, thrownError) {
                console.log(xhr.status);
                console.log(textStatus);
                console.log(thrownError);
            })
            .always(function (data_xhr, textStatus, xhr_errorThrown) {
                console.log("[request ajax: " + this__.home.ajaxSetting.url + "] method: complete ", textStatus);
            });
    return this;
};
JDataPagingSupport.istance = function () {
    return new JDataPagingSupport();
}
