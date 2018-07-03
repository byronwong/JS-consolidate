
Promises
========

## Key parts
A promise is a try catch wrapper around something that may happen later. The new syntax allows for cleaner code avoiding callback hell.

[Promises sandbox](https://bevacqua.github.io/promisees/)

Using Promises:
- [Promise API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

Use this if the current system is not using promises
- [Promise Constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)


### Promise States
- Pending (Still waiting) - promises are created in the pending state. They either get fulfilled or rejected. 
- Fulfilled (Resolved) - it worked, and the result is passed on.
- Rejected - It didn't work, and the reason is passed on.
- Settled (Something happened) - either fulfilled or rejected, the promise is no longer pending or waiting.


### Promise phases
- wrapping phase
- thening and catching phase
- chaining


## Creating a Promise (If implementing promises into your functions)
```js 
  // A very basic implementation
  var myPromise = new Promise(function(resolve, reject) {
    ...
    img.onload = resolve();
    img.error = reject();
  })
  .then(function() {
    ...
  })
  .catch(function(){
    ...
  });
```


### chaining .then()
Here we are returning a value for the next then to use.
If we don't return anything then whatever was returned from the promise is used (check)

When handling callbacks it's important that you do one of 3 things:
- return another promise
- return a value
- throw an error

```js
  get(url)
  .then(function(response){
    ...
    return response.planets;
  })
  .then(function(planets){
    console.log(planets);
  });
```

```js
  // here we are getting the json
  //json
  {
    "query":"exo planets",
    "results": [
      "data/planets/Kepler-22b.json",
      "data/planets/Kepler-62f.json",
      "data/planets/Kepler-69c.json",
      "data/planets/Kepler-186f.json",
      "data/planets/Kepler-452b.json",
      "data/planets/GJ667Cc.json"
    ]
  }

  // code
  // get initial json and the get subsequent json (any order)
  getJSON('../data/earth-like-results.json')
  .then(function(response) {
    console.log('response: ', response);
    response.results.forEach(function(url) {
      getJSON(url)
      .then(createPlanetThumb);
    });
  });
  
```

### understanding catch()
```js
  get().then().catch() // most of our catching has come in this form 

  // however .catch is just short for: 
  .then(undefined, catchFn)

  // also if the promise resolves and the first .then() does not have a resolve 
  // js will skip to the next then with a resolveFn 
  get().then(undefined, catchFn).then(resolveFn, catchFn);

  // NOTE: Only one can be called in this instance: 
  // If resolveFn fails you will need a rejectFn down the line to catch it.
  get().then(resolveFn, rejectFn);

  // Therefore if the get resolves and the then fails Both then and catch here could be called:
  get().then().catch(); 
```

### Error handling 
```js

  get()
    .then(resolveFn, catchFn)
    .then(resolveFn, catchFn);

  // however is recommended we use a .catch for easy reading 
```

## Implementing promises in your own functions
You can use promises in you own code.


### example implementation in a function
```js
  // callback Fn
  function finish(test) {
    console.log("Complete after " + milliseconds + "ms.");
  };

  // Fn that returns a Fn
  // wait returns a promise
  function wait(ms) {
    // create a promise object using the promise constructor
    // what is returned is a resolved promise
    return new Promise(function(resolve){
      window.setTimeout(function() {
        resolve(); // resolve the promise
      }, ms);
    });
  };

  var milliseconds = 2000;

  // we can now .then and .catch on wait
  wait(milliseconds).then(finish);
```


### Working with XHR objects
```js
  function get(url) {
    return new Promise(function(resolve, reject){
      var req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = function() {
        if (req.status === 200) {
          resolve(req.response);
        } else {
          reject(req.statusText);
        }
      };
      req.onerror = function() {
        reject(Error('file not found'));
      };
      req.send();
    });
  }
```


## Using items already implementing promises
Newer features like fetch and service workers use promises.

> For more on AJAX (XHR request) and fetch see chapter 21.

### Working with fetch
As we know working with XHR is a pain Fetch API provides a more cleaner approach
see: https://davidwalsh.name/fetch
```js
  // this is a long winded version from Udacity course (See Promises Demo)
  // but is does show how a promise (fetch) can be passed on
  function get(url) {
    return fetch(url, {
      method: 'get'
    });
  }
  
  function getJSON(url) {
    return get(url).then(function(response){
      return response.json();
    });
  }

  // getJSON() like before 
  getJSON('../data/earth-like-results.json')
  .then(function(response){
    addSearchHeader(response.query);
    console.log(response);
    return response.results[0]; // passed to next then()
  })
  .catch(function(error){
    addSearchHeader('unknown');
    console.log(error);
  })
  .then(function(result){
    console.log(result);
  });

```

### Series vs Parallel
```js 

  //json data
  {
    "query":"exo planets",
    "results": [
      "data/planets/Kepler-22b.json",
      "data/planets/Kepler-62f.json",
      "data/planets/Kepler-69c.json",
      "data/planets/Kepler-186f.json",
      "data/planets/Kepler-452b.json",
      "data/planets/GJ667Cc.json"
    ]
  }

  // Series 
  // requests each url in results after the one before it completes
  // this can be a very slow process as each one has to wait
  // NOTE: sequence gets longer by 2 then() each loop
  var sequence = Promise.resolve(); 

  getJSON('../data/earth-like-results.json')
  .then(function(response) {
    response.results.forEach(function(url) {
      sequence = sequence.then(function(){
        return getJSON(url);
      }) 
      .then(createPlanetThumb); // once request complete create thumb
    });
  });

  // Parallel
  // both then() stay attached to each other before being overwritten
  // code is executed before it is overwritten 
  // here we cannot guarantee the order as it is in parallel
  getJSON('../data/earth-like-results.json')
  .then(function(response) {
    response.results.forEach(function(url) {
      sequence.then(function(){
        return getJSON(url);
      }) 
      .then(createPlanetThumb); 
    });
  });

```

### parallel array.map()
More simplified instead of using forEach loop
```js 
  // allows response to keep some order
  getJSON('../data/earth-like-results.json')
  .then(function(response){
    response.results.map(function(url){
      getJSON(url)
      .then(createPlanetThumb);
    });
  });
```

### Promise.all
[Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

> See Promises project 

Takes an array of promises and the creates a array of values in the same order.

> Note: if there is one error in one request then all of them are rejected.

But once all the request are resolved then the next `.then()` gets the array of values.

```js
  getJSON('../data/earth-like-results.json')
  .then(function(response) {
    addSearchHeader(response.query);
    var arrayOfPromises = response.results.map(function(url) {
      return getJSON(url);
    });
    return Promise.all(arrayOfPromises);
  })
  .then(function(arrayOfValues){
    arrayOfValues.map(function(data){
      createPlanetThumb(data);
    });
  })
  .catch(function(){
    console.log('error');
  });


  // Further simplify
  getJSON('../data/earth-like-results.json')
  .then(function(response) {
    addSearchHeader(response.query);
    return Promise.all(response.results.map(getJSON));
  })
  .then(function(arrayOfValues){
    arrayOfValues.map(function(data){
      createPlanetThumb(data);
    });
  })
  .catch(function(){
    console.log('error');
  });
```

## Promise.race
Basically the first response to get back gets taken through.

## Branching Promises
copy this code into Promi sees

```js
  var p = fetch('/foo')

  // branch 1
  p
  .then((response)=>{
    return response
  })
  .then((response)=>{
    return response
  })
  .catch(error=>log.error(error))

  // branch 2
  p
  .then((response)=>{
    return response
  })
  .then((response)=>{
    return response
  })


  // branch 3
  p
  .then((response)=>{
    return response
  })
  .then((response)=>{
    return response
  })

```
