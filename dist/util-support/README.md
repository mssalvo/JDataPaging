 ### AioRequest ###
 
 *example istance*
 ```js
 AioRequest.istance('incorso')
         .set("url", '/DataElements/incorso.json')
         .set("type", 'get')
        .set("data", {limit: "10", page: "1", totalrows: "18"})
        .onSuccess(function () {})
       .onError(function () {})
       .onComplete(function () {})
 
  var xhr= AioRequest.istances.incorso.start()
  ```
  
```js
  AioRequest.istance('incorso').start()
```
