 ### AioRequest ### 
 ***istance YUI and AUI***
 
 *example istance*
 ```js
 AioRequest.get('incorso')
         .set("url", '/DataElements/incorso.json')
         .set("type", 'get')
        .set("data", {limit: "10", page: "1", totalrows: "18"})
        .onSuccess(function () {})
       .onError(function () {})
       .onComplete(function () {})
 
  var xhr= AioRequest.istances.incorso.start()
  ```
  
```js
  AioRequest.get('incorso').start()
```


### jQAjaxSupport ###
***istance jQuery ajax*** 

*example istance*
 ```js
 jQAjaxSupport.get('incorso')
         .set("url", '/DataElements/incorso.json')
         .set("type", 'get')
        .set("data", {limit: "10", page: "1", totalrows: "18"})
        .onSuccess(function () {})
       .onError(function () {})
       .onComplete(function () {})
 
  var xhr= jQAjaxSupport.istances.incorso.start()
  ```
  
```js
  jQAjaxSupport.get('incorso').start()
```
