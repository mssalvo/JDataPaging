/*!
 * DataElement v1.0.0
 * @author salvo mariniello - salvo.mariniello@gmail.com 
 * https://github.com/mssalvo/DataElement
 *  GNU General Public License v3.0
 *  https://github.com/mssalvo/DataElement/blob/master/LICENSE
 *  
 * @example istance      
 *  var dataIstance=new DataElement(
 *            {
 *           box:'div.list-group',  >> Indicare l'elemento html principale che racchiude gli elementi figli (rows) 
 *           row:'a.list-group-item', >> Indicare elemento html figlio (row) 
 *           comboPages:'select.custom-select', >> Indicare la select html che da la possibilita di selezionare il numero di elementi da visualizzare. 
 *           pages:[2,3,5,7], >> Indicare i valori che popolano la select <comboPages> per la visualizzazione delle righe.
 *           labelPageCurrent:'span.current',  >> Indicare elemento html che contiele il valore della pagina corrente
 *           labelPageTotal:'span.total',   >> Indicare elemento html che contiele il valore del totale pagine
 *           btnNext:'button.next',      >> Indicare elemento html che esegue l'evento di pagina successiva (<button> <input> <a> <div> etc.)
 *           btnPrevious:'button.previous' >> Indicare elemento html che esegue l'evento di pagina precedente  (<button> <input> <a> <div> etc.)
 *           });
 *  
 *  @example next
 *  @function dataIstance.next()
 *  
 *  @example previous
 *  @function dataIstance.previous()
 *
 *  @example refreshLimit
 *  @function dataIstance.refreshLimit(n)
 *  
 *  
 */

function DataElement(o) {
    if (o) {
        var t_ = this;
        t_.new_().settyng(o)
    }
}
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

DataElement.prototype.settyng = function (o) {
    this.pages = ['1', '2', '3', '4', '5'];
    this.btnNext = undefined;
    this.btnPrevious = undefined;
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

    var th_ = this;
    return th_.init().initComboPages().initButtons().next().writeLabels();
}
DataElement.prototype.getCurrentPage = function () {
    return this.pageCurrent;
}
DataElement.prototype.getTotalPage = function () {
    return this.pageMax;
}
DataElement.prototype.new_ = function () {
    this.rows = []; /*lista di elementi (Rows)*/
    this.selectorBox = undefined;
    this.selectorRowName = '';
    this.limit = 10; /* row visualizzate in pagine */
    this.pagination = undefined;
    this.pageCurrent = 0;
    this.pageMax = 1;
    this.labelPageCurrent = undefined;
    this.labelPageTotal = undefined;
    this.btnNext = undefined;
    this.btnPrevious = undefined;
    this.comboPages = undefined;
    this.pages = ['10', '20', '30', '50', '100'];
    this.back = false;
    return this;
}
DataElement.prototype.next = function () {

    ++this.pageCurrent;
    this.back = false;

    this.clear();

    var start = 0;
    if (this.pageCurrent > 1) {
        start = ((this.limit * this.pageCurrent) - this.limit) <= this.rows.length ? ((this.limit * this.pageCurrent) - this.limit) : ((this.limit * (this.pageCurrent - 1)) - this.limit);

    }

    var end = (this.limit * (this.pageCurrent));

    if ((start + this.limit) >= this.rows.length) {
        --this.pageCurrent
        this.back = true;
    }
    if (start >= this.rows.length) {
        start = this.rows.length - 1;
    }
    var arry = this.rows.slice(start, end);

    for (var i in arry)
    {

        this.selectorBox.appendChild(arry[i])

    }
    this.writeLabels();
    return this;
}
DataElement.prototype.previous = function () {

    this.clear();
    if (!this.back)
        --this.pageCurrent;
    this.back = false;
    if (this.pageCurrent < 1)
        this.pageCurrent = 1;
    var start = 0;
    if (this.pageCurrent > 1) {
        start = ((this.limit * this.pageCurrent) - this.limit) <= this.rows.length ? ((this.limit * this.pageCurrent) - this.limit) : ((this.limit * (this.pageCurrent - 1)) - this.limit);
    }

    var end = (this.limit * this.pageCurrent);
    var arry = this.rows.slice(start, end);

    for (var i in arry)
    {

        this.selectorBox.appendChild(arry[i])

    }
    this.writeLabels();

    return this;

}

DataElement.prototype.clear = function () {
    var _this = this;
    Array.prototype.forEach.call(_this.selectorBox.querySelectorAll(_this.selectorRowName), function (el, i) {
        el.parentNode.removeChild(el);
    });

    return this;
}

DataElement.prototype.init = function () {
    var _this = this;
    Array.prototype.forEach.call(_this.selectorBox.querySelectorAll(_this.selectorRowName), function (el, i) {
        _this.rows.push(el)
        el.parentNode.removeChild(el);
    });

    this.pageMax = Math.ceil((_this.rows.length / _this.limit));

    return this;
}

DataElement.prototype.refreshLimit = function (n) {
    if (n)
        this.limit = Number(n);
    this.pageCurrent = 1;


    this.clear();
    var start = 0;
    var end = (this.limit * (this.pageCurrent));
    var arry = this.rows.slice(start, end);

    for (var i in arry)
    {

        this.selectorBox.appendChild(arry[i])

    }

    this.pageMax = Math.ceil((this.rows.length / this.limit));

    if (n)
        Array.prototype.forEach.call(this.comboPages, function (el, i) {
            el.value = n;
        });
    this.writeLabels();

    return this;
}

DataElement.prototype.writeLabels = function () {
    var _this = this;
    Array.prototype.forEach.call(_this.labelPageCurrent, function (el, i) {
        el.innerHTML = _this.back ? (_this.pageCurrent + 1) : _this.pageCurrent;
    });
    Array.prototype.forEach.call(_this.labelPageTotal, function (el, i) {
        el.innerHTML = _this.pageMax;
    });


    return this;
}

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
}

DataElement.prototype.filter = function () {}
DataElement.prototype.search = function () {}
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach = function (action, that) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
;
 
