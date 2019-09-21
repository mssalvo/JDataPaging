 ## License

JDataPagingSupport is available under the MIT license. See the [LICENSE](https://github.com/mssalvo/JDataPaging/blob/master/LICENSE) for more info.



## Third-party software dependency licenses

### Dependencies for JDataPagingSupport

The dependencies for JDataPagingSupport.js are listed below

- [jQuery](https://jquery.com/) © jQuery Foundation, licenza MIT




## JDataPagingSupport

Use JDataPagingSupport outside of JDataPaging to dynamically create and populate portions of HTML


__Example__  


```js
 JDataPagingSupport.istance('myistance1') 
 JDataPagingSupport.istance('myistance2') 
 JDataPagingSupport.istance('myistance3') 
```

```js
 JDataPagingSupport.get.myistance1.setTemplateName("testSub")
 JDataPagingSupport.get.myistance1.setBoxView("#testSub22") 
 JDataPagingSupport.get.myistance1.setData(rows) 
 JDataPagingSupport.get.myistance1.createView() 
```

```js
 JDataPagingSupport.get.myistance1.setTemplateName("testSub").setBoxView("#testSub22").setData(rows).createView()   
```

```js
 JDataPagingSupport.get.myistance1.createView({jmsTemplate:'testSub',box:'#testSub22',data:rows});
```

```js
 JDataPagingSupport.get.myistance1.setTemplateName("testSub").setBoxView("#testSub22") 
 JDataPagingSupport.get.myistance2.setTemplateName("testSub").setBoxView("#tSub33") 
 JDataPagingSupport.get.myistance3.setTemplateName("testSub").setBoxView("#tSub44") 
```

```js
 var boxMainHtml=JDataPagingSupport.get.istance1.setTemplateName("testSub").createView({data:rows}).getHtml();
 $("#testSub").html(boxMainHtml) 
```

```js
 var boxMainHtml=JDataPagingSupport.get.istance1.setTemplateName("testSub").setData(rows).createView().getHtml();
 $("#testSub").html(boxMainHtml) 
```

Or
```js
JDataPagingSupport.get.istance1.setTemplateName("testSub").setData(rows).setBoxView("#testSub22").createView();

```

Or

```js
 JDataPagingSupport.istance().createView({jmsTemplate:'testSub',box:'#testSub22',data:rows}) 
```

Or

```js
 var boxMainHtml=JDataPagingSupport.istance().createView({jmsTemplate:'testSub',data:rows}).getHtml();
 $("#testSub").html(boxMainHtml) 
```

Or

```js
 JDataPagingSupport.istance().setData(rows).setTemplateName("testSub").setBoxView("#testSub22").createView()
```


```js
   var rows= [
     {
        "id": 0,
        "name": "Charlotte Good",
          "ss":{
        "id": 0,
        "name": "Padilla Holland 0",
         "bb":{
        "id": 0,
        "name": "Padilla Holland 0",
        "arr":[{"name": "array Padilla Holland 332","name2": "array Padilla Holland 42"}]
         }     
         }     
      },
      {
        "id": 1,
        "name": "Lenora Solomon",
             "ss":{
        "id": 0,
        "name": "Padilla Holland 1",
         "bb":{
        "id": 0,
        "name": "Padilla Holland 1",
        "arr":[{"name": "array Padilla Holland 213","name2": "array Padilla Holland 4"}]
         }     
         }     
      }
   ]
```

__Example__
 
```html
 <template jms-template="testSub">
       <a  class="list-group-item list-group-item-action" jms-foreach="data" jms-event="click:fn@myprova" for-property-href="data.name|mypipe@@ @@id" for-property="data.ss.bb.id,data.@@ ,data.ss.bb.arr[0].name"></a>    
 </template>
```
 
```html
 <div id="testSub22"> </div>
```

Use of the jms-app attribute

__Example__

```html
 <div jms-app="myapp"> 
  <div jms-write="data.name"> </div>
  <div jms-write="data.id"> </div>
  <div jms-foreach="data"> 
  <a jms-event="click:fn@myprova" for-property-href="data.name|mypipe@@ @@id" for-property="data.ss.bb.id"></a>    
  </div>  
 </div>
```
 
JDataPagingSupport.istance().setData(data).setAppName("myapp").createView()

Or

JDataPagingSupport.istance().createView({jmsApp:'myapp',data:rows})
