# DataElement
DataElement is a simple plugin for managing paging composed of complex HTML elements that work on the client and server side
 
 
 ## _configuration properties_
 
Property | Type | Default | Obligatory | Description
------- | ------- | ------- | ------- | -------
**box** | String |   | **yes** | indicate the parent html that contains the rows
**row** | String |   | **yes** | indicate the line item
**btnNext** | String |  | **yes** |  indicate the html element that acts as a `Next` button
**btnPrevious** | String |  | **yes** | indicate the html element that acts as a `Previous` button 
**data** | Object |  | no | Object javascript or json 
**url** | String |  | no | http address called ajax 
**param** | Function |  | no | function to add parameters to the ajax call
**ajaxSetting** | Function | get | no | configure parameters for ajax calls
**isServer** | Boolean | false | no | for server-side calls set the value to true  
**comboPages** | String |  | no | indicates the html select tag that contains the number of rows to display
**pages** | Array | [10,20,30,50] | no |  indicates the matrix of numbers to manage the limit of rows to be displayed on a page `[10,20,30,50]`
**inputSearch** | String |  | no |  indicates the html input element for the search field
**labelPageCurrent** | String |  | no | indicates the html element that contains the current page number
**labelPageTotal** | String |  | no | indicates the html element that contains the page total 
**jmsTemplate** | String |  | no | indicates the html element that with the `jms-template` property that acts as a template containing the row structure  
**autoStart** | Boolean | true | no | executes the pager build at startup 
**onPreviusBefore** | Function |  | no | executes the function before the command `button Previus` is executed and istance DataElement is injected `function(istance)`
**onPreviousAfter** | Function |  | no | executes the function after the `button Previus` command is executed, the new lines displayed and the instance DataElement will be injected `function(rows,istance)`
**onNextBefore** | Function |  | no | executes the function before the `button Next` command is executed istance DataElement will be injected `function(istance)`
**onNextAfter** | Function |  | no | executes the function after the `button Next` command is executed, the new lines displayed and the instance DataElement will be injected `function(rows,istance)`
**onChangeComboPages** | Function |  | no | executes the function after the command `Change Combo` is executed, the recalculation will be injected as object {limit: 5, rowsTotal: 14, pageMax: 3} plus the instance DataElement `function(obj,istance)`
**onComplete** | Function |  | no |  execute the function at the end of each command `button Next`` button Previus` `comboPages` useful if you need to match new events to newly created html objects
**onBeforeRow** | Function | true | no |  execute the function before the creation of the row the function must return a boolean` (true the row is created - false the row is excluded) `, we will be injected 1. elemeto html (row) 2. the object json, 3. index of row  `function(el,obj,index)`
**onAfterRow** | Function |  | no |  executes the function after the row is created, 1. elemeto html (row) will be injected 2. the json object, 3. index of the row  `function(el,obj,index)`
**plugin** | Object |  | no | indicate the name of the support plugin `DataElementSupport` if you use jmstemplate or call ajax


## basic example data from html

```js
DataElement.paging('myIstName', {
                box: 'div.list-group',
                row: 'a.list-group-item',
                btnNext: 'a.next',
                btnPrevious: 'a.previous'
            })
```

## _methods available for customized needs_

Method | Action  
------- | ------- 
**start** | excecutes the paging instance 
**getCurrentPage** | returns the current page number 
**getTotalPage** | returns the total number of pages calculated based on the limit of records to be displayed  
**page** | displays the page indicated by the number passed as a parameter to the method  `myistance.page(3)`
**next** | display the next page   
**previous** | display the previous page   
**restart** |excecutes paging with initial parameters   
**clear** | delete the displayed rows  
**refreshLimit** | update the record limit to display and recalculate the paging   
**search** | filters and displays the records from the parameter passed in the search method `search('bla')`, displays and recalculates the paging  
**removeParameter** | util - removes a parameter passed to a ajax call 
**addParameter**    | util - adds a parameter to the url passed to an ajax call
**jmsEvent**    | associate functions with html elements  

## _to recover a previous instant, and use the methods available_

example new istance

```js
DataElement.paging('myIstName', {box:'' .....});
```

example to recover

```js
DataElement.get.myIstName.next()
DataElement.get.myIstName.previous()
DataElement.get.myIstName.restart() 
DataElement.get.myIstName.search('b...') 
```

### jsm uses html attributes to cycle create match events and retrieve the value from a json object
### here are those interested in us for the constraint of dynamic paging
+ `jms-template`
+ `jms-foreach`
+ `for-property`
+ `for-property-*`
+ `jms-event`
+ `jms-write`
+ `jms-write-*`


# jms-template
use of the jms-template attribute to dynamically create rows
use a template tag or any html tag
__Example__
```html
   <template jms-template="myTemplateRow">
            <a href="#" class="list-group-item list-group-item-action" jms-foreach="rows" for-property="rows"></a>    
   </template> 
```
or 
```html
   <div jms-template="myTemplateRow">
            <a href="#" class="list-group-item list-group-item-action" jms-foreach="rows" for-property="rows"></a>    
   </div> 
```


# jms-foreach
use of the jms-foreach attribute to cycle over an html element

```js
   {rows:[{company:'',city:'',addres:''},{company:'',city:'',addres:''},{company:'',city:'',addres:''}]}   
```
as the value, indicate the name of the json array to cycle on
```html
   <div jms-foreach="rows" > </div>    
```

**_use to retrieve the value from the json object:_**
# for-property
use of the for-property attribute to retrieve the value of a property of the current json object
```js
   {rows:[{company:'',city:'',addres:''},{company:'',city:'',addres:''},{company:'',city:'',addres:''}]}   
```
as the value indicate the name of the array . property name `rows.company`
```html
   <div jms-foreach="rows" > 
     <div for-property="rows.company" > </div> 
     <div for-property="rows.city" > </div> 
     <div for-property="rows.addres" > </div> 
   </div>    
```
concatenate multiple property
use @@ separator to concatenate multiple property `rows.company@@city@@addres`
```html
   <div jms-foreach="rows" > 
     <div for-property="rows.company@@city@@addres" > </div> 
     <div for-property="rows.city" > </div> 
     <div for-property="rows.addres" > </div> 
   </div>    
```

to create or write the value in a new or existing attribute

```html
   <div jms-foreach="rows"> 
     <a for-property-href="rows.city"></a> <!--result <a href="cuneo"></a>-->
     <a for-property-id="rows.city"></a>  <!--result <a id="cuneo"></a>-->
     <a for-property-mia-nuova-property="rows.city"></a> <!--result <a mia-nuova-property="cuneo"></a>-->
   </div>
```


to add a space separator @@ more space `@@ `   `rows.company@@ @@city@@ @@addres`
```html
     <div for-property="rows.company@@ @@city@@ @@addres" > </div>    
```
to recover the array index separator @@ plus index `@@index` or `rows.index`
```html
     <div for-property="rows.company@@ @@index" > </div>  
        <!--OR-->
     <div for-property="rows.index" > </div> 
```

concatenate a free static text, separator @@ plus text `@@my text free`
note the text must contain a space character `@@my text` or `@@ mytext` or `@@mytext `
```html
     <div for-property="rows.company@@ @@my static text free" > </div> 
        <!--OR--> 
    <div for-property="rows.@@my static text free" > </div>  
```


 
### jms-event
 
It defines the type of event associated with the item

__Example__

* [jms-event](#jms-event)

associate functions with html elements
there are several ways to associate a function with an html element with jms event
* we see the most complex:

* 1. set the autoStart property to false `autoStart:false`
* 2. find the created instance of the paging
* 3. from the instance calls the object fn going up from dataSupport `dataSupport.fn`
all the functions will be injected with the DataElement instance and the event
to retrieve the context of the associated html element use this `this.value`  `this.innerHTML`

__Example__

```js
var istance= DataElement.paging('myIstName', {autoStart:false, .....});
 
istance.dataSupport.fn.myFunctionName=function(dte,evt){
           console.log("dte",dte)
           console.log("evt",evt)
 
           alert("test jms-event " +this.value)
            }
      
      //start creating paging      
     istance.start();       
 
```
_let's match the newly created function to the html element_ 
__the syntax is the following__
+ single event name or multi event
+ character two points `:`
+ sign (fn) `fn` (function object) 
+ separator @ `@`
+ function name created  `click:fn@myFunctionName`  multy event  `click focus blur:fn@myFunctionName`
```html
<input type="button" jms-event="click:fn@myFunctionName" value="go!">

<input type="button" jms-event="click focus blur:fn@myFunctionName" value="go!">
```

Note:
if the property autoStart is set to false  `autoStart:false`
at the end of all declarations
it is mandatory to call the start method
to start creating paging `istance.start()`

```js
var istance= DataElement.paging('myIstName', {autoStart:false,plugin:DataElementSupport, .....});

istance.start();       

//or
DataElement.paging.myIstName.start();
```



* now we see the simplest:

```js
DataElement.paging('myIstName', 
                    {box:'',
                     ... ..,
                     plugin:DataElementSupport, 
                    }).jmsEvent('myFunctionName1',function(istance,evt){
                istance.log('myFunctionName1',this.innerHTML,istance,evt)
            }).jmsEvent('myFunctionName2',function(istance,evt){
                istance.log('myFunctionName2',this.innerHTML,istance,evt)
            }).jmsEvent('myFunctionName3',function(istance,evt){
               istance.log('myFunctionName3',this.innerHTML,istance,evt)
            }).jmsEvent('myFunctionName4',function(istance,evt){
                istance.log('myFunctionName4',this.innerHTML,istance,evt)
                })
 
```

let's match the newly created function to the html element
the syntax is the following

```html

<div jms-event="click:fn@myFunctionName1"></div> 
<div jms-event="click:fn@myFunctionName2"></div>
<div jms-event="click:fn@myFunctionName3"></div>
<div jms-event="click:fn@myFunctionName4"></div>

```
Note:
if you use the method.jmsEvent('..', fn) `jmsEvent`
there is no need to set the autoStart property to false
and therefore it is not necessary to recall the start method  `start`
for paging creation


__Example type mapping Navigaror__
```html

<div class="d-flex justify-content-end  text-muted align-items-center pager-custom-group">
  Visualizza
    <select class="custom-select">  <!--(comboPages)-->
    </select>
  <button class="arrow-button previous"> <!--(btnPrevious)-->
   <<
  </button>
  <p class="d-inline-block text-14 text-sm-11 px-10 text-top mb-0 lh-1">
   <span class="current">1</span>/<span class="total">4</span>  <!--(labelPageCurrent)-->  /  <!--(labelPageTotal)-->
  </p>
  <button class="arrow-button next">  <!--(btnNext)-->
   >>
  </button>
</div>

```
# HTML source - Data from HTML
__Example type mapping body__

1 . Identify the parent element that encloses the rows
```html
  <div class="list-group list-group-flush"> <!--Main Element-->   <!--(box)-->
```
2 . Identify child element that represents a row
```html
   <a href='#' class="list-group-item list-group-item-action py-20"> <!--Child Element-->  <!--(row)-->
```

__Example__
```html
  <div class="list-group list-group-flush"> <!--Main Element-->   <!--(box)-->
            
            <a href='#' class="list-group-item list-group-item-action py-20"> <!--Child Element-->  <!--(row)-->
                <div class="row">
                <div class="col">XXXXXXXXXX XXXX</div>
                <div class="col"> XXXXXXXXXX XXXX</div>
                <div class="col"> XXXXXXXXXX XXXX</div>
                <div class="col"> XXXXXXXXXX XXXX </div>
                </div>
              </a>
            <a href='#' class="list-group-item list-group-item-action py-20"> <!--Child Element-->  <!--(row)-->
                <div class="row">
                <div class="col">XXXXXXXXXX XXXX</div>
                <div class="col"> XXXXXXXXXX XXXX</div>
                <div class="col"> XXXXXXXXXX XXXX</div>
                <div class="col"> XXXXXXXXXX XXXX </div>
                </div>
              </a>

      </div><!-- End Main Element-->

```
 
 
 3 . Instance a DataElement object by setting the various attributes that map the relevant html
 `box` `row` `comboPages` `pages` `labelPageCurrent` `labelPageTotal` `btnNext` `btnPrevious`
 
 __Example Istance DataElement v.1.1.0__
 ```js
        DataElement.paging('myname',{
           box:'div.list-group',  
           row:'a.list-group-item',  
           comboPages:'select.custom-select',   
           pages:[2,3,5,7],  
           labelPageCurrent:'li.current',  
           labelPageTotal:'li.total',   
           btnNext:'a.next',  
           btnPrevious:'a.previous' 
        })
 ```        
__Recover the instance__

 ```js
 
 DataElement.get.myname
 
 ```

### Data from Ajax with client-side processing dynamic paging
_Example_

 ```html
        <div class="container"> 
        <!--NAVIGATORE--> 
            <ul class="pagination pagination-lg">
                <li class="page-item page-link">Show entries:</li>  
                <li class="page-item"> <select style="height: 100%;" class="page-link custom-select"><option>01</option></select> </li>  
                <li class="page-item"><a class="page-link previous" href="#">Previous</a></li>
                <li class="page-item page-link current"></li>
                <li class="page-item page-link">di</li>
                <li class="page-item page-link total"></li>
                <li class="page-item"><a class="page-link next" href="#">Next</a></li>
                <li class="page-item">search:</li>
                <li class="page-item"><input type="text" class="mysearch"></li>
            </ul>
        <!--NAVIGATORE--> 
        </div> 
        <div class="container">
                <div class="row"> <!--HEADER--> 
                    <div class="col" >regione</div>
                    <div class="col" >provincia</div>
                    <div class="col" >sigla</div>
                    <div class="col" >ripartizione_geo</div>  
                    <div class="col" >popolazione</div>  
                </div>
        <!--BOX MAIN--> 
            <div class="list-group">
 
            </div>
        <!--BOX MAIN-->     
        </div>

<!--TEMPLATE ROW jms--> 
        <template jms-template="myTemplateRow">
            <!--ROW-->
            <a href="#" class="list-group-item list-group-item-action" jms-foreach="payload">  
                <div class="row">
                    <div class="col" for-property="payload.regione" jms-event="click:fn@myFunctionName1"></div>   <!--COLUMN-->   
                    <div class="col" for-property="payload.provincia"></div>  <!--COLUMN-->   
                    <div class="col" for-property="payload.sigla" jms-event="click:fn@myFunctionName2"></div> <!--COLUMN-->   
                    <div class="col" for-property="payload.ripartizione_geo"></div>  <!--COLUMN-->    
                    <div class="col" for-property="payload.popolazione"></div>   <!--COLUMN-->  
                    <div class="col" for-property="payload.index@@ @@sigla@@ @@regione @@my static text"></div>   <!--COLUMN MULTY VALUE-->  
                </div>
            </a> 
           <!--ROW-->   
        </template> 
<!--TEMPLATE ROW jms--> 

 ```

* here is a statement with all the existing properties

 ```js
            DataElement.paging('myname', {
                url: './cap-caserta.json',
                param:function(p){ p.myparam1='hello';p.myparam2='3434323442444'},
                ajaxSetting:function(set){set.type="get",set.dataType="json"},
                isServer:false,
                autoStart:true,    
                box: 'div.list-group',
                row: 'a.list-group-item',
                comboPages: 'select.custom-select',
                inputSearch: 'input.mysearch',
                pages: [10, 20, 30, 50],
                labelPageCurrent: 'li.current',
                labelPageTotal: 'li.total',
                btnNext: 'a.next',
                btnPrevious: 'a.previous',
                jmsTemplate: 'myTemplateRow',
                onPreviusBefore:function(a){console.log('onPreviusBefore',a)},
                onPreviousAfter:function(a,b){console.log('onPreviusAfter',a,b);},
                onNextBefore:function(a){console.log('onNextBefore',a)},
                onNextAfter:function(a,b){console.log('onNextAfter',a,b);},
                onChangeComboPages:function(a,b){console.log('onChangeComboPages',a,b);},
                onComplete:function (a,b) {console.log("complete",a,b)},
                onBeforeRow:function (el, obj, index) {
                    console.log(el, obj, index);
                    if (obj == "row 5")
                        return false;
                    return true;
                },
                onAfterRow:function(el,obj,index){console.log("onAfterRow ",el,obj,index);},
                plugin: DataElementSupport
            }).jmsEvent('myFunctionName1',function(istance,evt){
                istance.log('myFunctionName1',this.innerHTML,istance,evt)
            }).jmsEvent('myFunctionName2',function(istance,evt){
                istance.log('myFunctionName2',this.innerHTML,istance,evt)
            })
 ``` 