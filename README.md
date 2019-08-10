# DataElement
DataElement is a simple plugin for paging complex HTML elements working on the client side, for managing pages with average load

# Paging system
The pagin that adapts to the structure of your web page, create your own custom pagin html structure, and DataElement will adapt to it

# Getting Started

1. Include DataElement on your page before the closing </body> tag
```html
<script src="/path/dist/core/1.1.0/data-element.min.js"></script>
```
2. Include DataElementSupport if you are using a javascript / json data object 
```html
<script src="/path/dist/support/1.1.0/data-element-support.min.js"></script>
```



# [Usage Documentation](https://github.com/mssalvo/DataElement/blob/master/doc.md).

 
 
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
 
