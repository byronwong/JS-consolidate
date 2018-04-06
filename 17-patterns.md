# Patterns



### Creating and name-spacing modules (Module pattern)
> Protects variables from the global variable scope use IIFE to minimise global scope numbers

```js
  var myNameSpace = (function(){
    var privateVar = "this variable is protected";
    return {
      speak : function(){
        var message = privateVar;
        console.log(message);
      }
    };
  })();

  myNameSpace.speak(); // even though "privateVar" is protected we can still reach it via the speak function.
```


### Passing arguments and setting module defaults
```js
  var myNameSpace = (function(){
    var privateVar = "this variable is protected";

    return {
      speak : function() {
        // short curcuit evaluation. if the user does not enter a value,
        // instead of throwing an error sets the value to "(blank)".
        myArguments = arguments[0] || "";

        // second fall back if "myArguments.say" is empty use "hello"
        var statement = myArguments.say || "hello";
        console.log(statement);
      }
    };
  })();

  myNameSpace.speak({say : "boo"}); // pass an object

  // ----

  // if you have a lot of items it may be better to create a defaults object to cross reference

  var myNameSpace = (function(){
    var privateVar = "this variable is protected";

    // creates defaults object
    var DEFAULTS = { 
      say : "hello"
    };

    return {
      speak : function(params){
        var myArguments = params || "";
        
        // this time it reads from the "DEFAULTS" object, also easier to maintain.
        var statement = myArguments.say || DEFAULTS.say; 
        console.log(statement);
      }
    };
    
  })();

  myNameSpace.speak({say : "moes"}); // pass an object
```


### Chaining module method calls
```js
  var myNameSpace = (function(){
    // creates defaults object,
    // USE ALL CAPS to denote constants
    var DEFAULTS = {
      say: "hello",
      speed : "normal"
    };

    var speak = function(){
      var myArgs = arguments[0] || "";
      var statement = myArgs.say || DEFAULTS.say;
      console.info(statement); // Just to check
      return(this);
    };

    var run = function(){
      var myArgs = arguments[0] || "";
      var running = myArgs.speed || DEFAULTS.speed;
      console.info(running); // Just to check
      return(this);
    };

    return {
      speak: speak,
      run: run,
    };

  })();

  // If you do not return "this" you will have to call the namespace again like bellow:
  myNameSpace.speak({say:"moes"}); 
  myNameSpace.run({speed:"fast"});

  // By Calling "return(this)" you can chain methods.
  myNameSpace.speak({say:"moes"}).run({speed:"fast"});
```


## Self revealing pattern
```js
// Create a class
var moduleName = function (){

	// private variable
	var count = 0;

	// define functions
	var myFunction1 = function(){
		count +=1;
		console.log("function1 is working" + "No. Times: " + count);
	};
	var myFunction2 = function(){
		count +=1;
		console.log("function2 is working" + "No. Times: " + count);
	};

	// return object properties
	return{
		task1: myFunction1,
		task2: mayFunction2
	};
};

// create return object by invoking the "moduleName" function.
var worker = moduleName();
console.dir(worker);
// call returned methods
worker.task1();
worker.task2();
```
> NOTE: draw back, creates global variables can be useful if you want it to be non global put it in a anon. fn.
> Modules should be used to encapsulated functionality e.g all the functions in a nav can be invoked as properties of a returned object.
> NOTE: the module Fn, would have to be invoked first to create the exposed object, that you can then action on.
> This is what the example shows, alternatively you can make it an iffy.


## Singleton pattern
```js
// Allows only one instance at a time, further initialisations return existing instance

var myModule = (function(){

    //private variable to hold the
    //only instance of module that will exists.
    var existingInstance; 

    var createModule = function(){

       // variables and functions here
        return {
          // return API
        };
    };

    return {
        getInstance: function(){

            // if instance does not exist create one
            if(!existingInstance){
                existingInstance = createModule(); 
            }
    
            // else return the existing one
            return existingInstance; 
        }
    };

})();
```

## Constructor Pattern
The module pattern is easily converted into a constructor pattern.
```js
  // Step 1:

  // Notice we did not use caps as this is not a constructor but a function
  function myPowerConstructor(x) { 
    // Use "that" to store "this"
    var that = otherMaker(x); 		
  }
  // For the "that" variable we are invoking another (constructor) function to make the object. This will give us another dimension of inheritance.
```


```js
  // Step 2

  // add private (secret members) variable and functions
  function myPowerConstructor(x) {
    var that = otherMaker(x);
    
    var secret = f(x);
  }


```
```js
  // Step 3

  // Create privileged methods/ functions, these are methods that have access to private variable and functions, any parameters that are passed into the constructor.

  function myPowerConstructor(x) {
    var that = otherMaker(x);

    var secret = f(x);

    that.priv = function() {
      ... secret x that ...
    }
  }
```
```js
  // Step 4
  // return that

  function myPowerConstructor(x) {
    var that = otherMaker(x);

    var secret = f(x);

    that.priv = function() {
      ... secret x that ...
    }
    return that;
  }
  // This is a really powerful way of creating objects.
```

### Creating a constructor
```js 

  // Constructor
  function SoftwareDeveloper() {
    this.favoriteLanguage = 'JavaScript';
  }

  // Creating an new object
  let developer = new SoftwareDeveloper();
```

### Seeing the Object's Constructor (instanceOf)
What if we want to see if an object was created with a constructor function in the first place? We can use the instanceOf (which returns a boolean) to give us some insight. 

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof


