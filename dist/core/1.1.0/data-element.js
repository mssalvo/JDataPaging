/*!
 * DataElement v1.1.0
 * @author salvatore mariniello - salvo.mariniello@gmail.com 
 * https://github.com/mssalvo/DataElement 
 **/

function DataElement(o) {
    if (o) {
        var t_ = this;
        t_._new().settyng(o)
    }
}
;
DataElement.rows = []; /*lista di elementi (Rows)*/
DataElement.selectorBox = {};/*elemento che racchiude gli elementi figli (Rows)*/
DataElement.selectorRowName = '';
DataElement.limit = 4; /* row visualizzate in pagine */
DataElement.pagination = {};
DataElement.pageCurrent = 0;
DataElement.pageMax = 1;
DataElement.labelPageCurrent = undefined;
DataElement.labelPageTotal = undefined;
DataElement.btnNext = undefined;
DataElement.btnPrevious = undefined;
DataElement.comboPages = undefined;
DataElement.pages = ['10', '20', '30', '40', '50'];
DataElement.prototype.dataSupport = undefined;
DataElement.prototype.creaView = function () {
    var this_ = this;
    if (this_.plugin) {
        this_.clear();
        this_.dataSupport.home = this_;
        this_.dataSupport.createView(this_.jmsTemplate, this_.data, this_.selectorBox);
    } else {
        console.log("[DataElement] Info error:: dataSupport not istance > check include data-support.js")
    }
    return this_;
};
DataElement.prototype.settyng = function (o) {
    this.pages = ['1', '2', '3', '4', '5'];
    this.btnNext = undefined;
    this.btnPrevious = undefined;
    this.ajaxSetting={url:'',type:'get',dataType:'json'};
    if (o.box)
        this.selectorBox = document.querySelector(o.box)
    if (o.row)
        this.selectorRowName = o.row;
    this.rows = [];
    this.pageCurrent = 0;
    if (o.pages)
        this.pages = o.pages;
    if (o.btnNext)
        this.btnNext = document.querySelectorAll(o.btnNext)
    if (o.btnPrevious)
        this.btnPrevious = document.querySelectorAll(o.btnPrevious)
    if (o.comboPages)
        this.comboPages = document.querySelectorAll(o.comboPages)
    if (o.labelPageCurrent)
        this.labelPageCurrent = document.querySelectorAll(o.labelPageCurrent)
    if (o.labelPageTotal)
        this.labelPageTotal = document.querySelectorAll(o.labelPageTotal)
    this.limit = Number(this.pages[0]);
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
    if (o.plugin)
        this.plugin = o.plugin;
    if (typeof (o.autoStart) !== "undefined")
        this.autoStart = o.autoStart;
    if (o.jmsTemplate)
        this.jmsTemplate = o.jmsTemplate;
    if (o.data)
        this.data = o.data;
    if (this.plugin) {
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
 
    if (this.autoStart && typeof (o.url) !== "undefined")
    {
        this.isAjax = true;
        this.dataSupport.ajaxCallServer('start');
    } else if (this.autoStart && typeof (o.url) === "undefined")
        return this.start();
    else
        return this;
};
DataElement.prototype.start = function (data) {
    var th_ = this;
    if (data)
        th_.data = data;

    if (th_.jmsTemplate)
        return th_.creaView().init().initComboPages().initButtons().next().writeLabels();
    else
        return th_.init().initComboPages().initButtons().next().writeLabels();
};
DataElement.prototype.getCurrentPage = function () {
    return this.pageCurrent;
};
DataElement.prototype.getTotalPage = function () {
    return this.pageMax;
};
DataElement.prototype._new = function () {
    this.isServer = false;
    this.isAjax = false;
    this.ajaxSetting={url:'',type:'get',dataType:'json'};
    this.jmsTemplate = undefined;
    this.plugin = {};
    this.data = {};
    this.autoStart = true;
    this.rows = []; /*lista di elementi (Rows)*/
    this.selectorBox = undefined;
    this.selectorRowName = '';
    this.limit = 10; /* row visualizzate in pagine */
    this.rowsTotal = 0;
    this.pagination = undefined;
    this.pageCurrent = 0;
    this.pageMax = 1;
    this.labelPageCurrent = undefined;
    this.labelPageTotal = undefined;
    this.btnNext = undefined;
    this.btnPrevious = undefined;
    this.comboPages = undefined;
    this.onComplete = undefined;
    this.onNextBefore = undefined;
    this.onNextAfter = undefined;
    this.onPreviusBefore = undefined;
    this.onPreviousAfter = undefined;
    this.onChangeComboPages = undefined;
    this.pages = ['10', '20', '30', '50', '100'];
    this.back = false;
    return this;
};
DataElement.prototype.onCompleteCall = function (args) {
    if (this.onComplete && typeof (this.onComplete) === "function")
        this.onComplete.apply(this, args);
    return this;
}

DataElement.prototype.onNextBeforeCall = function (args) {
    if (this.onNextBefore && typeof (this.onNextBefore) === "function")
        this.onNextBefore.apply(this, args);
    return this;
}

DataElement.prototype.onNextAfterCall = function (args) {
    if (this.onNextAfter && typeof (this.onNextAfter) === "function")
        this.onNextAfter.apply(this, args);
    return this;
}

DataElement.prototype.onPreviusBeforeCall = function (args) {
    if (this.onPreviusBefore && typeof (this.onPreviusBefore) === "function")
        this.onPreviusBefore.apply(this, args);
    return this;
}

DataElement.prototype.onPreviousAfterCall = function (args) {
    if (this.onPreviousAfter && typeof (this.onPreviousAfter) === "function")
        this.onPreviousAfter.apply(this, args);
    return this;
}

DataElement.prototype.onChangeComboPagesCall = function (args) {
    if (this.onChangeComboPages && typeof (this.onChangeComboPages) === "function")
        this.onChangeComboPages.apply(this, args);
    return this;
};
DataElement.prototype.parameter = {}
DataElement.sendCallServer = function (this_, btn) {
    var obj = DataElement.calculatesSendStartEnd(this_);
    this_.parameter.start = obj.start;
    this_.parameter.end = obj.end;
    this_.parameter.limit = this_.limit;
    this_.parameter.page = this_.pageCurrent;
    this_.parameter.totalrows = this_.rowsTotal;
    this_.parameter._tm = new Date().getTime();

    this_.dataSupport.ajax_.parameters = this_.parameter;
    this_.dataSupport.ajax_.url = this_.ajaxSetting.url;
    this_.dataSupport.ajax_.type = this_.ajaxSetting.type;
    this_.dataSupport.ajax_.dataType = this_.ajaxSetting.dataType;
    this_.dataSupport.ajaxCallServer(btn);

    return this_;
};

DataElement.prototype.startServer = function (data, btn) {
    var this_ = this;

    if (data)
        this_.data = data;

    if (data.totalrows)
        this_.rowsTotal = data.totalrows;

    this_.pageMax = Math.ceil((this_.rowsTotal / this_.limit));

    if (this_.jmsTemplate)
        this_.creaView().initPageServer();


    var arry = this_.rows.slice(0, this_.limit);

    for (var i in arry)
    {

        this_.selectorBox.appendChild(arry[i])

    }

    if (btn && btn === 'next')
        this_.writeLabels().onNextAfterCall([arry, this_]).onCompleteCall(arry);
    if (btn && btn === 'previous')
        this_.writeLabels().onPreviousAfterCall([arry, this_]).onCompleteCall(arry);
    if (btn && btn === 'changeCombo')
        this_.writeLabels().onChangeComboPagesCall([{limit: this_.limit, rowsTotal: this_.rowsTotal, pageMax: this_.pageMax}, this_]).onCompleteCall();

    return this_;


};

DataElement.nextServer = function (this_) {
    this_.onNextBeforeCall([this_]);

    if (this_.pageCurrent < 1 || this_.pageCurrent > 0 && this_.rowsTotal > 0 && (this_.pageCurrent * this_.limit) < this_.rowsTotal)
    {
        ++this_.pageCurrent;
        this_.clear();
        DataElement.sendCallServer(this_, 'next');
    } else
        this_.pageCurrent = this_.pageMax;

    return this_;
};

DataElement.calculatesSendStartEnd = function (this_) {
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
}

DataElement.calculatesNext = function (this_) {
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
}


DataElement.prototype.next = function () {
    if (this.isServer)
        return DataElement.nextServer(this);

    this.onNextBeforeCall([this])
    ++this.pageCurrent;
    this.back = false;

    this.clear();

    var obj = DataElement.calculatesNext(this);

    var start_ = obj.start, end = obj.end;

    var arry = this.rows.slice(start_, end);

    for (var i in arry)
    {

        this.selectorBox.appendChild(arry[i])

    }
    this.writeLabels().onNextAfterCall([arry, this]).onCompleteCall(arry);

    return this;
};
DataElement.previousServer = function (this_) {
    this_.onPreviusBeforeCall([this_])


    if (this_.pageCurrent > 1)
    {
        this_.clear();
        --this_.pageCurrent;
        DataElement.sendCallServer(this_, 'previous');
    } else
        this_.pageCurrent = 1;


    return this_;

};

DataElement.calculatesPrevious = function (this_) {
    if (this_.pageCurrent < 1)
        this_.pageCurrent = 1;
    var start_ = 0;
    if (this_.pageCurrent > 1) {
        start_ = ((this_.limit * this_.pageCurrent) - this_.limit) <= this_.rows.length ? ((this_.limit * this_.pageCurrent) - this_.limit) : ((this_.limit * (this_.pageCurrent - 1)) - this_.limit);
    }

    var end_ = (this_.limit * this_.pageCurrent);

    return {start: start_, end: end_};
}
DataElement.prototype.previous = function () {
    if (this.isServer)
        return DataElement.previousServer(this);

    this.onPreviusBeforeCall([this])

    this.clear();
    if (!this.back)
        --this.pageCurrent;
    this.back = false;

    var obj = DataElement.calculatesPrevious(this);

    var start_ = obj.start, end = obj.end;

    var arry = this.rows.slice(start_, end);

    for (var i in arry)
    {

        this.selectorBox.appendChild(arry[i])

    }
    this.writeLabels().onPreviousAfterCall([arry, this]).onCompleteCall(arry);


    return this;

};
DataElement.prototype.restart = function (data) {
    var this_ = this;
    if (data)
        this_.data = data;
    this_.pageCurrent = 0;
    this_.limit = this_.pages[0];
    if (this_.isAjax) {
        this_.rows = [];
        this_.dataSupport.ajaxCallServer('start');
    } else if (this_.isServer) {
        this_.pageCurrent = 1;
        return DataElement.sendCallServer(this_, 'restart');
    } else
        return this_.start();
    
};

DataElement.prototype.clear = function () {
    var _this = this; //_this.selectorRowName
    Array.prototype.forEach.call(_this.selectorBox.querySelectorAll(_this.selectorRowName), function (el, i) {
        el.parentNode.removeChild(el);
    });

    return this;
};

DataElement.prototype.init = function () {
    var _this = this;
    _this.rows = [];
    Array.prototype.forEach.call(_this.selectorBox.querySelectorAll(_this.selectorRowName), function (el, i) {
        _this.rows.push(el)
        el.parentNode.removeChild(el);
    });
    this.rowsTotal = _this.rows.length;
    this.pageMax = Math.ceil((_this.rows.length / _this.limit));

    return this;
};
DataElement.prototype.initPageServer = function () {
    var _this = this;
    _this.rows = [];
    Array.prototype.forEach.call(_this.selectorBox.querySelectorAll(_this.selectorRowName), function (el, i) {
        _this.rows.push(el)
        el.parentNode.removeChild(el);
    });

    return this;
};
DataElement.prototype.refreshLimit = function (n) {
    if (n)
        this.limit = Number(n);
    this.pageCurrent = 1;
    this.back = false;

    this.clear();
    var start_ = 0;
    var end = (this.limit * (this.pageCurrent));
    var arry = this.rows.slice(start_, end);

    for (var i in arry)
    {

        this.selectorBox.appendChild(arry[i])

    }

    if (!this.isServer)
        this.rowsTotal = this.rows.length;

    this.pageMax = Math.ceil((this.rowsTotal / this.limit));

    if (n)
        Array.prototype.forEach.call(this.comboPages, function (el, i) {
            el.value = n;
        });

    if (this.isServer) {
        return DataElement.sendCallServer(this, 'changeCombo');
    }

    this.writeLabels().onChangeComboPagesCall([{limit: this.limit, rowsTotal: this.rowsTotal, pageMax: this.pageMax}, this]).onCompleteCall();

    return this;
};

DataElement.prototype.writeLabels = function () {
    var _this = this;
    Array.prototype.forEach.call(_this.labelPageCurrent, function (el, i) {
        el.innerHTML = _this.back ? (_this.pageCurrent < _this.pageMax) ? (_this.pageCurrent + 1) : _this.pageCurrent : _this.pageCurrent;
    });
    Array.prototype.forEach.call(_this.labelPageTotal, function (el, i) {
        el.innerHTML = _this.pageMax;
    });


    return this;
};

DataElement.prototype.initComboPages = function () {
    var this__ = this;
    if (this.comboPages)
    {

        Array.prototype.forEach.call(this.comboPages, function (el, i) {
            el.innerHTML = "";
            for (var i in this__.pages) {
                var opt = document.createElement("option");
                opt.text = this__.pages[i]
                el.add(opt);
            }
            el.addEventListener('change', function () {
                this__.refreshLimit(el.value);
            }, false)
        });


    }

    return this;
};

DataElement.prototype.initButtons = function () {
    var this__ = this;
    if (this.btnNext)
    {

        Array.prototype.forEach.call(this.btnNext, function (el, i) {
            el.addEventListener('click', function () {
                this__.next();
            }, false)
        });


    }
    if (this.btnPrevious)
    {

        Array.prototype.forEach.call(this.btnPrevious, function (el, i) {
            el.addEventListener('click', function () {
                this__.previous();
            }, false)
        });


    }

    return this;
};

DataElement.prototype.search = function () {};
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach = function (action, that) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
};
(function(){
if(typeof window.console === 'undefined' || typeof window.console.log === 'undefined') {
    window.console = { log: function() {}};
}
})();