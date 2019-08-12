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
**pages** | Array | [10,20,30,50] | no |  array of number for select construction indicated in the `comboPages`
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
**page** | displays the page indicated by the number passed as a parameter to the method  `myistance.get(3)`
**next** | display the next page   
**previous** | display the previous page   
**restart** |excecutes paging with initial parameters   
**clear** | delete the displayed rows  
**refreshLimit** | update the record limit to display and recalculate the paging   
**search** | filters and displays the records from the parameter passed in the search method `search('bla')`, displays and recalculates the paging  
**removeParameter** | util - removes a parameter passed to a ajax call 


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
`jms-template`
`jms-foreach`
`for-property`
`jms-event`


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
to add a space separator @@ more space `@@ ` `rows.company@@ @@city@@ @@addres`


### Control html

 use of jms-template to dynamically create rows
 
__Example__   
 

* [jms-foreach](#jms-foreach)

* [for-property-*](#for-property)

* [jms-template](#jms-template)


```html
   <template jms-template="myTemplateRow">
            <a href="#" class="list-group-item list-group-item-action" jms-foreach="rows" for-property="rows"></a>    
   </template> 
```

### jms-event
 
It defines the type of event associated with the item

__Example__

* [jms-event](#jms-event)


```html
<input type="button" jms-event="click:fn@myFunctionName" value="go!">

<input type="button" jms-event="click focus blur:fn@myFunctionName" value="go!">
```



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
            <a href='#' class="list-group-item list-group-item-action py-20"> <!--Child Element--> <!--(row)-->
                <div class="row">
                <div class="col">XXXXXXXXXX XXXX</div>
                <div class="col"> XXXXXXXXXX XXXX</div>
                <div class="col"> XXXXXXXXXX XXXX</div>
                <div class="col"> XXXXXXXXXX XXXX </div>
                </div>
              </a>
            <a href='#' class="list-group-item list-group-item-action py-20"> <!--Child Element--> <!--(row)-->
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
