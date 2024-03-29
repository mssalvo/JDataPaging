/*!
 * JDataPaging ©
 * @version 1.1.1
 * @author salvatore mariniello - salvo.mariniello@gmail.com 
 * https://github.com/mssalvo/JDataPaging 
 * MIT License
 * Copyright (c) 2019 Salvatore Mariniello
 * https://github.com/mssalvo/JDataPaging/blob/master/LICENSE
 **/

function JDataPaging(o) {
    var t_ = this;
    window.console.log("INIT JDataPaging!");
    if (o)
        t_._new().settyng(o);
    else
        window.console.log("JDataPaging Info: >> No object declared : Example [ JDataPaging.paging('myname',{data:object,box:' '}) ] info: https://github.com/mssalvo/JDataPaging");

}
;
JDataPaging.rows = []; /*lista di elementi (Rows)*/
JDataPaging.selectorBox = {};/*elemento che racchiude gli elementi figli (Rows)*/
JDataPaging.selectorRowName = '';
JDataPaging.limit = 4; /* row visualizzate in pagine */
JDataPaging.pagination = {};
JDataPaging.pageCurrent = 0;
JDataPaging.pageMax = 1;
JDataPaging.labelPageCurrent = undefined;
JDataPaging.labelPageTotal = undefined;
JDataPaging.btnNext = undefined;
JDataPaging.btnPrevious = undefined;
JDataPaging.comboPages = undefined;
JDataPaging.pages = ['10', '20', '30', '40', '50'];
JDataPaging.prototype.dataSupport = undefined;
JDataPaging.get = {};
if (typeof window.console === 'undefined' || typeof window.console.log === 'undefined')
    window.console = {log: function () {}};
JDataPaging.prototype.log = function (obj) {};
JDataPaging.prototype.isArray = function (obj) {
    return obj.constructor.toString().indexOf("Array") > -1;
};
JDataPaging.prototype.creaView = function () {
    var this_ = this;
    if (this_.plugin) {
        this_.clear();
        this_.dataSupport.home = this_;
        this_.dataSupport.produceView(this_.jmsTemplate, this_.data, this_.selectorBox);
    } else {
        window.console.log("[JDataPaging] Info error:: dataSupport not istance > check include data-support.js");
    }
    return this_;
};
JDataPaging.prototype.settyng = function (o) {
    this.pages = ['10', '20', '30', '50'];
    this.btnNext = undefined;
    this.btnPrevious = undefined;
    this.disableButton = undefined;
    this.ajaxSetting = {url: '', type: 'get', dataType: 'json'};
    if (o.box)
        this.selectorBox = document.querySelector(o.box) || undefined;
    if (o.row)
        this.selectorRowName = o.row;
    this.rows = [];
    this.rowsWrap = [];
    this.pageCurrent = 0;
    if (o.pages)
        this.pages = o.pages;
    if (o.btnNext)
        this.btnNext = document.querySelectorAll(o.btnNext) || undefined;
    if (o.btnPrevious)
        this.btnPrevious = document.querySelectorAll(o.btnPrevious) || undefined;
    if (o.comboPages)
        this.comboPages = document.querySelectorAll(o.comboPages) || undefined;
    if (o.labelPageCurrent)
        this.labelPageCurrent = document.querySelectorAll(o.labelPageCurrent) || undefined;
    if (o.labelPageTotal)
        this.labelPageTotal = document.querySelectorAll(o.labelPageTotal) || undefined;
    if (o.inputSearch)
        this.inputSearch = document.querySelectorAll(o.inputSearch) || undefined;
    this.limit = Number(this.pages[0]);
    if (o.messageEmpty)
        this.textMessageEmpty = o.messageEmpty;
    if (o.onComplete)
        this.onComplete = o.onComplete;
    if (o.onNextBefore)
        this.onNextBefore = o.onNextBefore;
    if (o.onNextAfter)
        this.onNextAfter = o.onNextAfter;
    if (o.onPreviusBefore)
        this.onPreviusBefore = o.onPreviusBefore;
    if (o.onPreviousAfter)
        this.onPreviousAfter = o.onPreviousAfter;
    if (o.onChangeComboPages)
        this.onChangeComboPages = o.onChangeComboPages;
    if (o.onBeforeRow)
        this.onBeforeRow = o.onBeforeRow;
    if (o.onAfterRow)
        this.onAfterRow = o.onAfterRow;
    if (typeof (o.disableButton) !== "undefined")
        this.disableButton = o.disableButton;
    if (o.backgroundDisable)
        this.backgroundDisable = o.backgroundDisable;
    if (o.backgroundEnabled)
        this.backgroundEnabled = o.backgroundEnabled;
    if (o.jmsTemplate)
        this.jmsTemplate = o.jmsTemplate;
    if (o.plugin)
        this.plugin = o.plugin;
    if (typeof (o.autoStart) !== "undefined")
        this.autoStart = o.autoStart;
    if (o.jmsTemplate)
        this.jmsTemplate = o.jmsTemplate;
    if (o.data)
        this.data = this.isArray(o.data) ? {data: o.data} : o.data;
    if (o.plugin) {
        this.dataSupport = this.plugin.istance();
        this.dataSupport.home = this;
    }
    if (o.plugin && o.url)
        this.ajaxSetting.url = o.url;
    if (o.plugin && o.param && typeof (o.param) === "function")
        o.param.apply(this, [this.parameter]);
    if (o.plugin && o.ajaxSetting && typeof (o.ajaxSetting) === "function")
        o.ajaxSetting.apply(this, [this.ajaxSetting]);
    if (typeof (o.isServer) !== "undefined")
        this.isServer = o.isServer;
    if (typeof (this.ajaxSetting.type) === "undefined")
        this.ajaxSetting.type = "get";
    if (typeof (this.ajaxSetting.dataType) === "undefined")
        this.ajaxSetting.dataType = "json";
    if (typeof (o.url) !== "undefined")
        this.isAjax = true;
    if (this.autoStart && typeof (o.url) !== "undefined")
    {
        this.isAjax = true;
        this.dataSupport.ajaxCallServer('start');
    }
    if (this.autoStart && typeof (o.url) === "undefined")
        return this.start();
    if (!this.autoStart && typeof (o.url) !== "undefined")
        this.dataSupport.ajaxCallServer('dataSet');

    return this;
};
JDataPaging.prototype.dataSet = function (data) {
    var th_ = this;
    if (data)
        th_.data = th_.isArray(data) ? {data: data} : data;
    return th_;
};
JDataPaging.prototype.play = function () {
    var th_ = this;
    if (th_.isAjax)
    {
        th_.dataSupport.ajaxCallServer('start');

    } else {
        return th_.start();
    }

    return th_;
};
JDataPaging.prototype.start = function (data) {
    var th_ = this;
    th_.pageCurrent = 0;
    window.console.log("START JDataPaging!");
    if (data)
        th_.data = th_.isArray(data) ? {data: data} : data;

    if (th_.jmsTemplate)
        return th_.creaView().init().initComboPages().initInputSearch().initButtons().next().writeLabels();
    else
        return th_.init().initComboPages().initInputSearch().initButtons().next().writeLabels();
};

JDataPaging.prototype.getCurrentPage = function () {
    return this.pageCurrent;
};
JDataPaging.prototype.getTotalPage = function () {
    return this.pageMax;
};
JDataPaging.prototype._new = function () {
    this.isServer = false;
    this.isAjax = false;
    this.ajaxSetting = {url: '', type: 'get', dataType: 'json'};
    this.jmsTemplate = undefined;
    this.plugin = {};
    this.data = {};
    this.autoStart = true;
    this.rows = []; /*lista di elementi (Rows)*/
    this.rowsWrap = [];
    this.selectorBox = undefined;
    this.selectorRowName = '';
    this.limit = 10; /* row visualizzate in pagine */
    this.rowsTotal = 0;
    this.pagination = undefined;
    this.pageCurrent = 0;
    this.pageMax = 1;
    this.inputSearch = undefined;
    this.textSearch = undefined;
    this.labelPageCurrent = undefined;
    this.labelPageTotal = undefined;
    this.disableButton = undefined;
    this.backgroundDisable = '#dddddd';
    this.backgroundEnabled = '#ffb600';
    this.btnNext = undefined;
    this.btnPrevious = undefined;
    this.comboPages = undefined;
    this.onComplete = undefined;
    this.onNextBefore = undefined;
    this.onNextAfter = undefined;
    this.onPreviusBefore = undefined;
    this.onPreviousAfter = undefined;
    this.onChangeComboPages = undefined;
    this.textMessageEmpty = '<div class="col text-center paging-empty">No records found</div>';
    this.onBeforeRow = function (a, b, c) {
        return true;
    };
    this.onAfterRow = function (a, b, c) {
        return true;
    };
    this.pages = ['10', '20', '30', '50'];
    this.back = false;
    return this;
};
JDataPaging.prototype.onEmptyMessage = function () {
    var th__ = this;
    if (typeof th__.rowsWrap === "undefined" && typeof th__.selectorBox !== "undefined")
    {
        th__.selectorBox.innerHTML = th__.textMessageEmpty;
        th__.disableButtons();
    } else if (typeof th__.rowsTotal !== "undefined" && th__.rowsTotal < 1 && typeof th__.selectorBox !== "undefined")
    {
        th__.selectorBox.innerHTML = th__.textMessageEmpty;
        th__.disableButtons();
    } else {
        th__.enableButtons();
    }
    return th__;
};
JDataPaging.prototype.setMessageEmpty = function (textHtml) {
    var th__ = this;
    if (typeof textHtml !== "undefined")
        th__.textMessageEmpty = textHtml;
    return th__;
};
JDataPaging.prototype.jmsEvent = function (name, fn) {
    var th_ = this;
    if (typeof (th_.dataSupport) !== "undefined") {
        if (typeof name !== "undefined" && name !== 'pp') {
            th_.dataSupport.fn[name] = fn;
        } else
            window.console.log("INFO!! it is not possible to associate a function with the name (pp) - change function name! - the function [pp] could not be subscribed!! ");
    } else
        window.console.log("the function could not be subscribed, dataSupport and undefined! Add the JDataPagingSupport plugin. Example: JDataPaging.paging('myIstName', {plugin:JDataPagingSupport, .....})");
    return th_;
};
JDataPaging.prototype.jmsPipe = function (name, fn) {
    var th_ = this;
    if (typeof (th_.dataSupport) !== "undefined")
        th_.dataSupport.fn['pp'][name] = fn;
    else
        window.console.log("the function could not be subscribed, dataSupport and undefined! Add the JDataPagingSupport plugin. Example: JDataPaging.paging('myIstName', {plugin:JDataPagingSupport, .....})");
    return th_;
};
JDataPaging.prototype.onCompleteCall = function (args) {
    if (this.onComplete && typeof (this.onComplete) === "function")
        this.onComplete.apply(this, args);
    return this;
};

JDataPaging.prototype.onNextBeforeCall = function (args) {
    if (this.onNextBefore && typeof (this.onNextBefore) === "function")
        this.onNextBefore.apply(this, args);
    return this;
};

JDataPaging.prototype.onNextAfterCall = function (args) {
    if (this.onNextAfter && typeof (this.onNextAfter) === "function")
        this.onNextAfter.apply(this, args);
    return this;
};

JDataPaging.prototype.onPreviusBeforeCall = function (args) {
    if (this.onPreviusBefore && typeof (this.onPreviusBefore) === "function")
        this.onPreviusBefore.apply(this, args);
    return this;
};

JDataPaging.prototype.onPreviousAfterCall = function (args) {
    if (this.onPreviousAfter && typeof (this.onPreviousAfter) === "function")
        this.onPreviousAfter.apply(this, args);
    return this;
};

JDataPaging.prototype.onChangeComboPagesCall = function (args) {
    if (this.onChangeComboPages && typeof (this.onChangeComboPages) === "function")
        this.onChangeComboPages.apply(this, args);
    return this;
};
JDataPaging.prototype.parameter = {};
JDataPaging.sendCallServer = function (this_, btn) {
    var obj = JDataPaging.calculatesSendStartEnd(this_);
    this_.parameter.start = obj.start;
    this_.parameter.end = obj.end;
    this_.parameter.limit = this_.limit;
    this_.parameter.page = this_.pageCurrent;
    this_.parameter.totalrows = this_.rowsTotal;
    if (this_.textSearch)
        this_.parameter.search = this_.textSearch;
    if (typeof this_.textSearch === "undefined" && typeof this_.parameter.search !== "undefined")
        delete this_.parameter.search;
    if (this_.textSearch === "" && typeof this_.parameter.search !== "undefined")
        delete this_.parameter.search;

    this_.parameter._tm = new Date().getTime();

    this_.dataSupport.ajax_.parameters = this_.parameter;
    this_.dataSupport.ajax_.url = this_.ajaxSetting.url;
    this_.dataSupport.ajax_.type = this_.ajaxSetting.type;
    this_.dataSupport.ajax_.dataType = this_.ajaxSetting.dataType;
    this_.dataSupport.ajaxCallServer(btn);

    return this_;
};

JDataPaging.prototype.startServer = function (data, btn) {
    var this_ = this;

    if (data)
        this_.data = this_.isArray(data) ? {data: data, totalrows: data.length} : data;

    if (data.totalrows)
        this_.rowsTotal = data.totalrows;

    this_.pageMax = Math.ceil((this_.rowsTotal / this_.limit));

    if (this_.jmsTemplate)
        this_.creaView().initPageServer();


    var arry = this_.rows.slice(0, this_.limit);

    for (var i in arry)
    {

        this_.selectorBox.appendChild(arry[i]);

    }

    this_.onEmptyMessage();

    if (btn && btn === 'next')
        this_.writeLabels().onNextAfterCall([arry, this_]).onCompleteCall([arry]);
    else if (btn && btn === 'previous')
        this_.writeLabels().onPreviousAfterCall([arry, this_]).onCompleteCall([arry]);
    else if (btn && btn === 'changeCombo')
        this_.writeLabels().onChangeComboPagesCall([{limit: this_.limit, rowsTotal: this_.rowsTotal, pageMax: this_.pageMax}, this_]).onCompleteCall([arry]);
    else
        this_.writeLabels().onCompleteCall([arry]);

    return this_;


};

JDataPaging.nextServer = function (this_) {

    this_.onNextBeforeCall([this_]);

    if (this_.pageCurrent < 1 || this_.pageCurrent > 0 && this_.rowsTotal > 0 && (this_.pageCurrent * this_.limit) < this_.rowsTotal)
    {
        ++this_.pageCurrent;
        this_.clear();
        JDataPaging.sendCallServer(this_, 'next');
    } else
        this_.pageCurrent = this_.pageMax;

    return this_;
};

JDataPaging.calculatesSendStartEnd = function (this_) {
    var start_ = 0;

    if (this_.pageCurrent === 1) {
        start_ = 0;
    }
    if (this_.pageCurrent < 1) {
        this_.pageCurrent = 1;
        start_ = 0;
    }
    if (this_.pageCurrent > 1) {

        start_ = ((this_.pageCurrent - 1) * this_.limit);
    }

    var end_ = (this_.limit * this_.pageCurrent);
    if (end_ > this_.rowsTotal && this_.rowsTotal > 0) {

        end_ = this_.rowsTotal;
    }

    return {start: start_, end: end_};
};

JDataPaging.calculatesNext = function (this_) {
    var start_ = 0;
    if (this_.pageCurrent > 1) {
        start_ = ((this_.limit * this_.pageCurrent) - this_.limit) <= this_.rows.length ? ((this_.limit * this_.pageCurrent) - this_.limit) : ((this_.limit * (this_.pageCurrent - 1)) - this_.limit);
    }

    var end_ = (this_.limit * this_.pageCurrent);

    if ((start_ + this_.limit) >= this_.rows.length) {
        --this_.pageCurrent;
        this_.back = true;
    }
    if (start_ >= this_.rows.length) {
        start_ = (this_.rows.length - this_.limit);
        start_ = start_ < 1 ? 0 : start_;
    }
    if (start_ === 0) {
        end_ = this_.limit;
    }
    return {start: start_, end: end_};
};
/* @function page
 * @param {Number} n
 * @see numero pagina da visualiazzare
 * @returns {JDataPaging}
 **/
JDataPaging.prototype.page = function (n) {
    var this_ = this;
    if (typeof (n) !== "undefined")
        this_.pageCurrent = (Number(n) - 1);

    return this_.next();
};
/* @function next
 * @see avanza di pagina
 * @returns {JDataPaging}
 **/
JDataPaging.prototype.next = function () {
    var this_ = this;
    if (this_.isServer)
        return JDataPaging.nextServer(this_);

    this_.onEmptyMessage();
    this_.onNextBeforeCall([this_]);
    ++this_.pageCurrent;
    this_.back = false;

    this_.disableButtonNext();

    this_.clear();

    var obj = JDataPaging.calculatesNext(this_);

    var start_ = obj.start, end = obj.end;

    var arry = this_.rows.slice(start_, end);

    for (var i in arry)
    {

        this_.selectorBox.appendChild(arry[i]);

    }
    this_.writeLabels().onNextAfterCall([arry, this_]).onCompleteCall([arry]);

    return this_;
};
JDataPaging.previousServer = function (this_) {
    this_.onPreviusBeforeCall([this_]);


    if (this_.pageCurrent > 1)
    {
        this_.clear();
        --this_.pageCurrent;
        JDataPaging.sendCallServer(this_, 'previous');
    } else
        this_.pageCurrent = 1;


    return this_;

};

JDataPaging.calculatesPrevious = function (this_) {
    if (this_.pageCurrent < 1)
        this_.pageCurrent = 1;
    var start_ = 0;
    if (this_.pageCurrent > 1) {
        start_ = ((this_.limit * this_.pageCurrent) - this_.limit) <= this_.rows.length ? ((this_.limit * this_.pageCurrent) - this_.limit) : ((this_.limit * (this_.pageCurrent - 1)) - this_.limit);
    }

    var end_ = (this_.limit * this_.pageCurrent);

    return {start: start_, end: end_};
};
/* @function previous
 * @see pagina precedente
 * @returns {JDataPaging}
 **/
JDataPaging.prototype.previous = function () {
    var this_ = this;
    if (this_.isServer)
        return JDataPaging.previousServer(this_);

    this.onPreviusBeforeCall([this_]);

    this.clear();
    if (!this_.back)
        --this_.pageCurrent;
    this_.back = false;
    this_.disableButtonNext();
    var obj = JDataPaging.calculatesPrevious(this_);

    var start_ = obj.start, end = obj.end;

    var arry = this_.rows.slice(start_, end);

    for (var i in arry)
    {

        this_.selectorBox.appendChild(arry[i]);

    }
    this_.writeLabels().onPreviousAfterCall([arry, this_]).onCompleteCall([arry]);


    return this_;

};
/* @function restart
 * @param {Object json} data
 * @see riesegue un nuovo caricamento
 * @returns {JDataPaging}
 **/
JDataPaging.prototype.restart = function (data) {
    var this_ = this;
    if (data)
        this_.data = this_.isArray(data) ? {data: data} : data;
    this_.pageCurrent = 0;
    this_.limit = this_.pages[0];
    if (this_.isAjax) {
        this_.rows = [];
        this_.dataSupport.ajaxCallServer('start');

    } else if (this_.isServer) {
        this_.pageCurrent = 1;
        return JDataPaging.sendCallServer(this_, 'restart');
    } else if (this_.jmsTemplate)
        return this_.creaView().init().next().writeLabels();
    else
        return this_.init().next().writeLabels();

};

JDataPaging.prototype.clear = function () {
    var _this = this;
    if (typeof (_this.selectorBox) !== "undefined" && typeof (_this.selectorRowName) !== "undefined" && typeof _this.selectorBox.querySelectorAll === "function")
        Array.prototype.forEach.call(_this.selectorBox.querySelectorAll(_this.selectorRowName), function (el, i) {
            el.parentNode.removeChild(el);
        });

    return _this;
};

JDataPaging.prototype.init = function () {
    var _this = this;
    _this.rows = [];
    _this.rowsWrap = [];
    if (typeof (_this.selectorBox) !== "undefined" && typeof (_this.selectorRowName) !== "undefined" && typeof _this.selectorBox.querySelectorAll === "function")
        Array.prototype.forEach.call(_this.selectorBox.querySelectorAll(_this.selectorRowName), function (el, i) {
            _this.rows.push(el);
            _this.rowsWrap.push(el);
            el.parentNode.removeChild(el);
        });
    _this.rowsTotal = _this.rows.length;
    _this.pageMax = Math.ceil((_this.rows.length / _this.limit));

    return _this;
};
JDataPaging.prototype.initPageServer = function () {
    var _this = this;
    _this.rows = [];
    _this.rowsWrap = [];
    if (typeof (_this.selectorBox) !== "undefined" && typeof (_this.selectorRowName) !== "undefined" && typeof _this.selectorBox.querySelectorAll === "function")
        Array.prototype.forEach.call(_this.selectorBox.querySelectorAll(_this.selectorRowName), function (el, i) {
            _this.rows.push(el);
            _this.rowsWrap.push(el);
            el.parentNode.removeChild(el);
        });

    return _this;
};
JDataPaging.prototype.refreshLimit = function (n) {
    var _this = this;
    if (n)
        _this.limit = Number(n);
    _this.pageCurrent = 1;
    _this.back = false;

    _this.clear();
    var start_ = 0;
    var end = (_this.limit * (_this.pageCurrent));
    var arry = _this.rows.slice(start_, end);

    for (var i in arry)
    {

        _this.selectorBox.appendChild(arry[i]);

    }

    if (!_this.isServer)
        _this.rowsTotal = _this.rows.length;

    _this.pageMax = Math.ceil((_this.rowsTotal / _this.limit));

    if (n && _this.comboPages)
        Array.prototype.forEach.call(this.comboPages, function (el, i) {
            el.value = n;
        });

    if (_this.isServer) {
        return JDataPaging.sendCallServer(_this, 'changeCombo');
    }

    _this.writeLabels().onChangeComboPagesCall([{limit: _this.limit, rowsTotal: _this.rowsTotal, pageMax: _this.pageMax}, _this]).onCompleteCall([arry]);

    return _this;
};

JDataPaging.prototype.writeLabels = function () {
    var _this = this;

    if (typeof (_this.labelPageCurrent) !== "undefined")
        Array.prototype.forEach.call(_this.labelPageCurrent, function (el, i) {
            el.innerHTML = _this.back ? (_this.pageCurrent < _this.pageMax) ? (_this.pageCurrent + 1) : _this.pageCurrent : _this.pageCurrent;
        });

    if (typeof (_this.labelPageTotal) !== "undefined")
        Array.prototype.forEach.call(_this.labelPageTotal, function (el, i) {
            el.innerHTML = _this.pageMax;
        });



    _this.disableButtonPrevious();

    return _this;
};

JDataPaging.prototype.initInputSearch = function () {
    var this__ = this;
    if (this__.inputSearch)
    {

        Array.prototype.forEach.call(this__.inputSearch, function (el, i) {
            el.addEventListener('keyup', function () {
                this__.search(el.value);
            }, false);
        });


    }

    return this__;
};

JDataPaging.prototype.initComboPages = function () {
    var this__ = this;
    if (this__.comboPages)
    {

        Array.prototype.forEach.call(this__.comboPages, function (el, i) {
            el.innerHTML = "";
            for (var i in this__.pages) {
                var opt = document.createElement("option");
                opt.text = this__.pages[i];
                el.add(opt);
            }
            el.addEventListener('change', function () {
                this__.refreshLimit(el.value);
            }, false);
        });


    }

    return this__;
};
JDataPaging.eventHandlers = {};

JDataPaging.addListener = function (node, event, handler, capture = false) {
    if (!(event in JDataPaging.eventHandlers)) {
        JDataPaging.eventHandlers[event] = [];
    }
    JDataPaging.eventHandlers[event].push({node: node, handler: handler, capture: capture});
    node.addEventListener(event, handler, capture);
};
JDataPaging.removeAllListeners = function (targetNode, event) {
    if (typeof JDataPaging.eventHandlers[event] !== "undefined") {
        JDataPaging.eventHandlers[event]
                .filter(({ node }) => node === targetNode)
                .forEach(({ node, handler, capture }) => node.removeEventListener(event, handler, capture));

        JDataPaging.eventHandlers[event] = JDataPaging.eventHandlers[event].filter(
                ({ node }) => node !== targetNode,
                );
    }
};
JDataPaging.prototype.initButtons = function () {
    var this__ = this;
    if (this__.btnNext)
    {

        Array.prototype.forEach.call(this__.btnNext, function (el, i) {

            JDataPaging.removeAllListeners(el, 'click');
            JDataPaging.addListener(el, 'click', function () {
                this__.next();
            }, false);
            //el.addEventListener('click', funNext, false);
        });


    }
    if (this__.btnPrevious)
    {

        Array.prototype.forEach.call(this__.btnPrevious, function (el, i) {
            JDataPaging.removeAllListeners(el, 'click');
            JDataPaging.addListener(el, 'click', function () {
                this__.previous();
            }, false);

            //el.addEventListener('click', funPrevious, false);
        });


    }

    return this__;
};

JDataPaging.prototype.disableButtonNext = function () {
    var this__ = this;

    if (this__.disableButton && this__.disableButton === true) {

        if (this__.btnNext)
        {
            if (this__.pageCurrent === this__.pageMax) {
                Array.prototype.forEach.call(this__.btnNext, function (el, i) {
                    if (el.style)
                        el.style.pointerEvents = 'none';
                        el.style.backgroundColor='#ddd';
                });

            } else {
                Array.prototype.forEach.call(this__.btnNext, function (el, i) {
                    if (el.style)
                        el.style.pointerEvents = 'all';
                        el.style.backgroundColor='#ffb600';
                });
            }
        }
    }
    return this__;
};

JDataPaging.prototype.disableButtonPrevious = function () {
    var this__ = this;
    if (this__.disableButton && this__.disableButton === true) {
        if (this__.btnPrevious)
        {
            if (this__.pageCurrent <= 1) {
                Array.prototype.forEach.call(this__.btnPrevious, function (el, i) {
                    if (el.style)
                        el.style.pointerEvents = 'none';
                        el.style.backgroundColor=this__.backgroundDisable;
                });

            } else {
                Array.prototype.forEach.call(this__.btnPrevious, function (el, i) {
                    if (el.style)
                        el.style.pointerEvents = 'all';
                        el.style.backgroundColor=this__.backgroundEnabled;
                });
            }
        }
    }
    return this__;
};


JDataPaging.prototype.disableButtons = function () {
    var this__ = this;
    if (this__.disableButton && this__.disableButton === true) {
        if (this__.btnNext)
        {

            Array.prototype.forEach.call(this__.btnNext, function (el, i) {
                if (el.style)
                    el.style.display = 'none';
            });


        }
        if (this__.btnPrevious)
        {

            Array.prototype.forEach.call(this__.btnPrevious, function (el, i) {
                if (el.style)
                    el.style.display = 'none';
            });


        }

        if (typeof (this__.labelPageCurrent) !== "undefined")
            Array.prototype.forEach.call(this__.labelPageCurrent, function (el, i) {
                if (el.style)
                    el.style.display = 'none';
            });

        if (typeof (this__.labelPageTotal) !== "undefined")
            Array.prototype.forEach.call(this__.labelPageTotal, function (el, i) {
                if (el.style)
                    el.style.display = 'none';
            });
    }
    return this__;
};

JDataPaging.prototype.enableButtons = function () {
    var this__ = this;
    if (this__.btnNext)
    {

        Array.prototype.forEach.call(this__.btnNext, function (el, i) {
            if (el.style)
                el.style.display = 'block';
        });


    }
    if (this__.btnPrevious)
    {

        Array.prototype.forEach.call(this__.btnPrevious, function (el, i) {
            if (el.style)
                el.style.display = 'block';
        });


    }

    if (typeof (this__.labelPageCurrent) !== "undefined")
        Array.prototype.forEach.call(this__.labelPageCurrent, function (el, i) {
            if (el.style)
                el.style.display = 'block';
        });

    if (typeof (this__.labelPageTotal) !== "undefined")
        Array.prototype.forEach.call(this__.labelPageTotal, function (el, i) {
            if (el.style)
                el.style.display = 'block';
        });

    return this__;
};


JDataPaging.prototype.search = function (a) {
    var this_ = this;
    this_.textSearch = String(a).toLowerCase();
    if (!this_.isServer) {
        this_.rows = [];
        for (var i in this_.rowsWrap)
            if (String(this_.rowsWrap[i].innerText).toLowerCase().indexOf(this_.textSearch) !== -1)
                this_.rows.push(this_.rowsWrap[i]);

        this_.clear();

        this_.refreshLimit(this_.limit);
    }
    if (this_.isServer) {
        this_.pageCurrent = 1;
        this_.clear();
        return JDataPaging.sendCallServer(this_, 'changeCombo');
    }

    return this_;
};
JDataPaging.prototype.removeParameter = function (name) {
    var this_ = this;
    if (typeof this_.parameter[name] !== "undefined") {
        delete this_.parameter[name];
    }
    return this_;
};
JDataPaging.prototype.addParameter = function (name, value) {
    var this_ = this;
    this_.parameter[name] = value;
    return this_;
};
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach = function (action, that) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
;

JDataPaging.paging = function (name, object) {
    var n, o;
    if (typeof (arguments[0]) === "object")
        o = arguments[0];
    else if (typeof (arguments[0]) === "string")
        n = arguments[0];
    if (typeof (arguments[1]) === "object")
        o = arguments[1];
    else if (typeof (arguments[1]) === "string")
        n = arguments[1];
    if (typeof (n) === "undefined")
        n = new Date().getTime();

    if (typeof (JDataPaging.get[n]) === "undefined")
    JDataPaging.get[n] = new JDataPaging(o);
    return JDataPaging.get[n];
};
