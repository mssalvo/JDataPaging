# JDataPaging
JDataPaging is a simple plugin for managing paging composed of complex HTML elements that work on the client and server side

# Paging system
The pagin that adapts to the structure of your web page, create your own custom pagin html structure, and JDataPaging will adapt to it

# Getting Started

1. Include JDataPaging on your page before the closing </body> tag
```html
<script src="/path/dist/core/1.1.0/jdata-paging.min.js"></script>
```
2. Include JDataPagingSupport if you are using a javascript / json data object 
```html
<script src="/path/dist/support/1.1.0/jdata-paging-support.min.js"></script>
```



* ### [Usage Documentation EN](https://github.com/mssalvo/JDataPaging/blob/master/translate/en/doc.md)
* ### [Usa Documentazione IT](https://github.com/mssalvo/JDataPaging/blob/master/translate/it/doc.md)

* ## [Demo JDataPaging](https://mssalvo.github.io/JDataPaging/index.html)
 
 
__Example Istance JDataPaging v.1.1.0__
 
 ```js
        JDataPaging.paging('myname',{
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
 
 JDataPaging.get.myname
 
 ```
 
 
 ## License

JDataPaging is available under the MIT license. See the [LICENSE](https://github.com/mssalvo/JDataPaging/blob/master/LICENSE) for more info.

