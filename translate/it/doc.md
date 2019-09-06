# JDataPaging
JDataPaging è un semplice plug-in per gestire le paginazioni  composte da elementi HTML complessi, gestisce il loro funzionamento sia lato client che server
 

* ## [Demo JDataPaging](https://mssalvo.github.io/JDataPaging/index.html)


 ## _proprietà di configurazione_
 
Property | Type | Default | Obligatory | Description
------- | ------- | ------- | ------- | -------
**box** | String |   | **yes** | indicare l'elemento html principale che contiene le righe
**row** | String |   | **yes** | indicare l'elemento html che compone la riga
**btnNext** | String |  | **yes** |  indica l'elemento html che funge da pulsante `Next`
**btnPrevious** | String |  | **yes** | indica l'elemento html che funge da pulsante `Precedente` 
**data** | Object |  | no | Oggetto javascript o json 
**url** | String |  | no | indirizzo ulr http per una chiamata ajax
**param** | Function |  | no | funzione per aggiungere parametri all'url di una chiamata ajax
**ajaxSetting** | Function | get | no | configura i parametri per le chiamate ajax (default type=get, dataType=json)
**isServer** | Boolean | false | no |  per le chiamate gestite lato server impostare il valore a true
**comboPages** | String |  | no | indicare il tag <select> html che contiene il limite numerico di righe da visualizzare
**pages** | Array | [10,20,30,50] | no | indica la matrice di numeri per gestire il limite di righe da visualizzare in una pagina `[10,20,30,50]`
**inputSearch** | String |  | no |  indica l'elemento di input html per il campo di ricerca
**labelPageCurrent** | String |  | no | indica l'elemento html che contiene il numero di pagina corrente
**labelPageTotal** | String |  | no | indica l'elemento html che contiene il totale della pagina 
**jmsTemplate** | String |  | no | indica l'elemento html che con la proprietà `jms-template` che funge da modello contenente la struttura delle righe  
**autoStart** | Boolean | true | no |esegue la generazione del paginatore all'avvio
**onPreviusBefore** | Function |  | no | esegue la funzione prima dell'esecuzione del comando `pulsante Previus` verrà iniettato alla funzione l'istanza corrente di JDataPaging `function(istance)`
**onPreviousAfter** | Function |  | no | esegue la funzione dopo che è stato eseguito il comando `pulsante Previus`, verranno iniettate alla funzione, le nuove righe visualizzate e l'istanza corrente di JDataPaging `function(rows,istance)`
**onNextBefore** | Function |  | no |  esegue la funzione prima dell'esecuzione del comando `pulsante Next` verrà iniettato alla funzione l'istanza corrente di JDataPaging `function(istance)`
**onNextAfter** | Function |  | no |  esegue la funzione dopo che è stato eseguito il comando `pulsante Next`, verranno iniettate alla funzione, le nuove righe visualizzate e l'istanza corrente di JDataPaging `function(rows,istance)`
**onChangeComboPages** | Function |  | no | esegue la funzione dopo l'esecuzione del comando `change Combo`, verrà iniettato il ricalcolo come oggetto {limite: 5, righe Totale: 14, pageMax: 3} più l'istanza corrente di JDataPaging `function(obj, istanza)`
**onComplete** | Function |  | no |   esegue la funzione alla fine di ciascun comando pulsante `Next`  `Previus`  `comboPages` utile se è necessario abbinare nuovi eventi a oggetti html appena creati
**onBeforeRow** | Function | true | no |  esegue la funzione prima della creazione della riga, la funzione deve restituire un valore booleano `(true viene creata la riga - falso viene esclusa la riga)`, verrenno iniettati alla funzione 1. l'elemeto html da creare (riga) 2. l'oggetto json, 3. l'indice della riga corrente `function(el,obj,index)`
**onAfterRow** | Function |  | no |  esegue la funzione dopo aver creato la riga, verrenno iniettati alla funzione 1. l'elemeto html già creato (riga) 2. l'oggetto json, 3. l'indice della riga corrente `function(el,obj,index)`
**plugin** | Object |  | no | indica il nome del plug-in di supporto `JDataPagingSupport` se usi jmstemplate o chiami ajax  `plugin:JDataPagingSupport`


## esempio base di fonte dati da HTML

```js
JDataPaging.paging('myIstName', {
                box: 'div.list-group',
                row: 'a.list-group-item',
                btnNext: 'a.next',
                btnPrevious: 'a.previous'
            })
```

## _metodi disponibili per esigenze personalizzate_

Method | Action  
------- | ------- 
**play** | esegue l'istanza del paginatore
**getCurrentPage** | restituisce il numero di pagina corrente
**getTotalPage** | restituisce il numero totale di pagine calcolate in base al limite dei record da visualizzare 
**page** | visualizza la pagina indicata dal numero passato come parametro al metodo `myistance.page(3)`
**next** |visualizza la pagina successiva  
**previous** | visualizza la pagina precedente
**restart** | riesegue il paginatore con i parametri iniziali
**clear** | elimina le righe visualizzate 
**refreshLimit** | aggiorna il limite di righe da visualizzare e ricalcolare il paginatore  
**search** | filtra e visualizza le righe che risultano positive alla condizione passata al parametro nel metodo di ricerca `search('bla')`, visualizza e ricalcola il paginatore
**removeParameter** | util - rimuove un parametro passato a una chiamata ajax
**addParameter**    |util - aggiunge un parametro all'URL passato a una chiamata ajax
**jmsEvent**    | associa le funzioni agli elementi html

## _per recuperare un istanzia precedente e utilizzare i metodi disponibili_

esempio nuova istanzia

```js
JDataPaging.paging('myIstName', {box:'' .....});
```

esempio recupero istanzia

```js
JDataPaging.get.myIstName.next()
JDataPaging.get.myIstName.previous()
JDataPaging.get.myIstName.restart() 
JDataPaging.get.myIstName.search('b...') 
```

### jsm utilizza gli attributi html per creare, ciclicare gli elementi html, recuperare il valore da un oggetto json
### ecco gli attributi interessati per creare un paginatore dinamico
+ `jms-template`
+ `jms-foreach`
+ `for-property`
+ `for-property-*`
+ `jms-event`
+ `jms-write`
+ `jms-write-*`


# jms-template
utilizza l'attributo jms-template, per dichiarare il contenuto di una strittura html (row)
usa un tag template o qualsiasi tag html
__Esempio__
```html
   <template jms-template="myTemplateRow">
            <a href="#" class="list-group-item list-group-item-action" jms-foreach="rows" for-property="rows"></a>    
   </template> 
```
oppure 
```html
   <div jms-template="myTemplateRow">
            <a href="#" class="list-group-item list-group-item-action" jms-foreach="rows" for-property="rows"></a>    
   </div> 
```


# jms-foreach
uso dell'attributo jms-foreach per ciclare su un elemento html

```js
   {rows:[{company:'',city:'',addres:''},{company:'',city:'',addres:''},{company:'',city:'',addres:''}]}   
```
come valore, indica il nome dell'array json su cui eseguire il ciclo
```html
   <div jms-foreach="rows" > </div>    
```

**_utilizza per recuperare il valore dall'oggetto json:_**
# for-property
utilizza dell'attributo for-property per recuperare il valore di una proprietà dell'oggetto json corrente
```js
   {rows:[{company:'',city:'',addres:''},{company:'',city:'',addres:''},{company:'',city:'',addres:''}]}   
```
per recuperare il valore, usa for-property come valore inserisci il nome dell'array +.+ (nome della proprieta) `rows.company`
```html
   <div jms-foreach="rows" > 
     <div for-property="rows.company" > </div> 
     <div for-property="rows.city" > </div> 
     <div for-property="rows.addres" > </div> 
   </div>    
```
concatena più proprietà,
usa il separatore @@ per concatenare più property `rows.company@@city@@addres`
```html
   <div jms-foreach="rows" > 
     <div for-property="rows.company@@city@@addres" > </div> 
     <div for-property="rows.city" > </div> 
     <div for-property="rows.addres" > </div> 
   </div>    
```

per creare o scrivere il valore in un attributo nuovo o esistente

```html
   <div jms-foreach="rows"> 
     <a for-property-href="rows.city"></a> <!--risultato <a href="cuneo"></a>-->
     <a for-property-id="rows.city"></a>  <!--risultato <a id="cuneo"></a>-->
     <a for-property-mia-nuova-property="rows.city"></a> <!--risultato <a mia-nuova-property="cuneo"></a>-->
   </div>
```

per aggiungere un carattere spazio, usa separatore@@ + carattere spazio `@@  `   `rows.company@@ @@city@@ @@addres`

```html
     <div for-property="rows.company@@ @@city@@ @@addres" > </div>    
```
per recuperare l'indice dell'array usa  @@index  `@@index` oppure usa `rows.index`

```html
     <div for-property="rows.company@@ @@index" > </div>  
        <!--OR-->
     <div for-property="rows.index" > </div> 
```

per concatenare un testo statico, usa separatore @@ + testo  `@@my text free`
nota che il testo deve contenere un carattere spazio `@@my text` o `@@ mytext` o  `@@mytext `
```html
     <div for-property="rows.company@@ @@my static text free" > </div> 
        <!--OR--> 
    <div for-property="rows.@@my static text free" > </div>  
```


 
### jms-event
 
associa eventi e funzioni all'elemento html

__Esempio__

* [jms-event](#jms-event)

associa le funzioni agli elementi html,
ci sono diversi modi per associare una funzione a un elemento html con l'evento jms
* vediamo il più complesso:

* 1 impostare la proprietà autoStart su false `autoStart:false`
* 2 recupera l'istanza creata del paginatore
* 3 dichiara l'oggetto fn proprietà di dataSupport `dataSupport.fn` 

a tutte le funzioni create, verrà iniettata l'istanza JDataPaging + l'evento,
per recuperare il contesto dell'elemento html associato, usare in this `this.value`  `this.innerHTML`

__Esempio__

```js
var istance= JDataPaging.paging('myIstName', {autoStart:false, .....});
 
istance.dataSupport.fn.myFunctionName=function(dte,evt){
           console.log("dte",dte)
           console.log("evt",evt)
 
           alert("test jms-event " +this.value)
            }
      
      //start creating paging      
     istance.start();       
 
```
_abbiniamo la funzione appena creata all'elemento html_ 
 __la sintassi è la seguente__
 + nome del singolo evento o multi evento (click focus blur keyup keypress ... ...)
 + carattere due punti `:`
 + sigla (fn) `fn` (oggetto funzione)
 + separatore @ `@`
 + nome della funzione creata  `click:fn@myFunctionName`  multy event  `click focus blur:fn@myFunctionName`
```html
<input type="button" jms-event="click:fn@myFunctionName" value="go!">

<input type="button" jms-event="click focus blur:fn@myFunctionName" value="go!">
```

Note:
se la proprietà autoStart è impostata su false  `autoStart:false`, 
alla fine di tutte le dichiarazioni,
è obbligatorio chiamare il metodo start 
per inizializzare il paginatore  `istance.play()`

```js
var istance= JDataPaging.paging('myIstName', {autoStart:false,plugin:JDataPagingSupport, .....});

istance.play();       

//or
JDataPaging.paging.myIstName.play();
```



* ora vediamo il modo più semplice:

```js
JDataPaging.paging('myIstName', 
                    {box:'',
                     ... ..,
                     plugin:JDataPagingSupport, 
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

abbiniamo la funzione appena creata all'elemento html,
la sintassi è la seguente

```html

<div jms-event="click:fn@myFunctionName1"></div> 
<div jms-event="click:fn@myFunctionName2"></div>
<div jms-event="click:fn@myFunctionName3"></div>
<div jms-event="click:fn@myFunctionName4"></div>

```
Note:
se usi method.jmsEvent('..', fn) `jmsEvent`, 
non è necessario impostare la proprietà autoStart su false, 
è quindi, non è necessario richiamare il metodo play  `play`, 
per la creazione di paginatore


__Esempio di mappatura  Navigator__
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
# Fonte dati da HTML
__Esempio mappatura__

1 . Identificare l'elemento principale che racchiude le righe
```html
  <div class="list-group list-group-flush"> <!--Main Element-->   <!--(box)-->
```
2 . Identificare l'elemento figlio che rappresenta una riga
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
 
 
 3 . Istanzia un oggetto JDataPaging, impostando i vari attributi che mappano l'html
 `box` `row` `comboPages` `pages` `labelPageCurrent` `labelPageTotal` `btnNext` `btnPrevious`
 
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

### Dati da Ajax elaborazione dinanica lato client
_Esempio_

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

* ecco una dichiarazione con tutte le proprietà disponibili

 ```js
            JDataPaging.paging('myname', {
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
                plugin: JDataPagingSupport
            }).jmsEvent('myFunctionName1',function(istance,evt){
                istance.log('myFunctionName1',this.innerHTML,istance,evt)
            }).jmsEvent('myFunctionName2',function(istance,evt){
                istance.log('myFunctionName2',this.innerHTML,istance,evt)
            })
 ``` 

### Gestire la paginazione dinanica lato server
per gestire la paginazione lato server, 
saranno passati sempre al server i suddetti parametri: `start`  `end`  `limit`  `page`  `totalrows`

 __?start=10&end=20&limit=10&page=2&totalrows=110__

quando si utilizza la casella di ricerca, sarà aggiunto un nuovo parametro a quelli standart dal nome `search`

 __?start=10&end=20&limit=10&page=2&totalrows=110&search=italy__ 

il parametro search sarà presente fin quando la casella di ricerca conterrà un valore

altrimenti sarà rimosso.

per gestire la paginazione lato server in modo corretto,
la struttura minina dell'oggetto json di risposta,
deve contenere la proprietà dal nome `totalrows` ,
nel `totalrows` indica il totale generale dei record, non il totale dei record dell'ogetto json, ma il totale dei record disponibile.


```js
{
   "totalrows": 110,
   "data": [{"name": "jon","age": 20},{"name": "jon","age": 20},{"name": "jon","age": 20}]
}
```

* Nota: senza la sudetta proprietà `totalrows` non sara possibile gestire la paginazione 


### Configurazione minima per gestire richieste lato server
per gestire il paginatore lato serve impostare la proprietà `isServer` a `true` 
 
```js
 JDataPaging.paging('myname',{
          url: './myServerUlr.php',
          isServer: true,
          box:'div.list-group',  
          row:'a.list-group-item',  
          btnNext:'a.next',  
          btnPrevious:'a.previous',
          plugin: JDataPagingSupport
       })
```
