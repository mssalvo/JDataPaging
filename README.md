# DataElement
DataElement is a simple plugin for paging complex HTML elements working on the client side, for managing pages with average load


__Example type mapping Navigaror__
```html

<div class="d-flex justify-content-end  text-muted align-items-center pager-custom-group">
  Visualizza
    <select class="custom-select">  <!--(comboPages)-->
      <option>10</option>
      <option>25</option>
      <option>50</option>
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

__Example type mapping body__

```html
  <div class="list-group list-group-flush"> <!--Main Element-->   <!--(box)-->
            
            <a href='#' class="list-group-item list-group-item-action py-20"> <!--Child Element-->  <!--(row)-->
                <div class="row">
                  <div class="col-lg-7 col-12 border-right b-md-0 mb-xs-10 mb-lg-0">
                    <div class="d-flex">
 

                      <div class="ml-md-10 my-auto">
                        <p class="m-0 text-8">XXXXXXXXXX XXXX XXXXXXX</p>
                        <p class="m-0 text-19 text-sm-13">XXXXXXXXXX XXXX XXXXXXX</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-5 col-12 d-flex align-items-center" style="max-width: 480px;">
                    <div class="w-100">
                      <p class="m-0 text-8">XXXXXXXXXX XXXX XXXXXXX</p>
                      <p class="m-0 text-8 font-light text-uppercase">XXXXXXXXXX XXXX XXXXXXX <br> XXXXXXXXXX XXXX XXXXXXX</p>
                    </div>
                  </div>
                </div>
              </a>
            <a href='#' class="list-group-item list-group-item-action py-20"> <!--Child Element-->  <!--(row)-->
                <div class="row">
                  <div class="col-lg-7 col-12 border-right b-md-0 mb-xs-10 mb-lg-0">
                    <div class="d-flex">
 

                      <div class="ml-md-10 my-auto">
                        <p class="m-0 text-8">XXXXXXXXXX XXXX XXXXXXX</p>
                        <p class="m-0 text-19 text-sm-13">222222 XXXXXXXXXX XXXX XXXXXXX</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-5 col-12 d-flex align-items-center" style="max-width: 480px;">
                    <div class="w-100">
                      <p class="m-0 text-8">XXXXXXXXXX XXXX XXXXXXX</p>
                      <p class="m-0 text-8 font-light text-uppercase">XXXXXXXXXX XXXX XXXXXXX <br> XXXXXXXXXX XXXX XXXXXXX</p>
                    </div>
                  </div>
                </div>
              </a>
            <a href='#' class="list-group-item list-group-item-action py-20"> <!--Child Element--> <!--(row)-->
                <div class="row">
                  <div class="col-lg-7 col-12 border-right b-md-0 mb-xs-10 mb-lg-0">
                    <div class="d-flex">
 

                      <div class="ml-md-10 my-auto">
                        <p class="m-0 text-8">XXXXXXXXXX XXXX XXXXXXX</p>
                        <p class="m-0 text-19 text-sm-13">333333XXXXXXXXXX XXXX XXXXXXX</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-5 col-12 d-flex align-items-center" style="max-width: 480px;">
                    <div class="w-100">
                      <p class="m-0 text-8">XXXXXXXXXX XXXX XXXXXXX</p>
                      <p class="m-0 text-8 font-light text-uppercase">XXXXXXXXXX XXXX XXXXXXX <br> XXXXXXXXXX XXXX XXXXXXX</p>
                    </div>
                  </div>
                </div>
              </a>
            <a href='#' class="list-group-item list-group-item-action py-20"> <!--Child Element--> <!--(row)-->
                <div class="row">
                  <div class="col-lg-7 col-12 border-right b-md-0 mb-xs-10 mb-lg-0">
                    <div class="d-flex">
 

                      <div class="ml-md-10 my-auto">
                        <p class="m-0 text-8">XXXXXXXXXXXX / XXXX</p>
                        <p class="m-0 text-19 text-sm-13">444444 XXXXXXXXXXXXX / XXXXXXXXXXXX</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-5 col-12 d-flex align-items-center" style="max-width: 480px;">
                    <div class="w-100">
                      <p class="m-0 text-8">XXXXXXXX 8</p>
                      <p class="m-0 text-8 font-light text-uppercase">XXX XXXXXXX XXXXXXX, X - XXXX <br> XXX XXX XXXX</p>
                    </div>
                  </div>
                </div>
              </a>

      </div><!-- End Main Element-->

```



__Example Istance DataElement v.1.0.0__

```js
   var dataIstance=new DataElement({
           box:'div.list-group',  
           row:'a.list-group-item',  
           comboPages:'select.custom-select',   
           pages:[2,3,5,7],  
           labelPageCurrent:'span.current',  
           labelPageTotal:'span.total',   
           btnNext:'button.next',  
           btnPrevious:'button.previous' 
           });
 ```   
 
 
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
