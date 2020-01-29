Functions
=========

## The Basics
### Creating a function
You can create a function in 2 ways:
1)	Traditional Declaration (Statement)
2)	Definition Expression (Expression)
```js 

  // 1. function statement
  function add(x, y) {
    var z = x + y;
    return z;
  } // notice here no ';' is required, similar to if or switch statements


  // 2. function definition
  // here we are creating a variable add and assigning an anonymous function to it.
  var add = function() {
    ...
  }; // notice here this is an expression and need a ';'

  // Invoke/ call the function
  add(5, 7);
```

### Definition Expression vs Declaration
> https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/
> http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html

The main difference is in how these are hoisted.
The declaration is hoisted in it entirety, whereas with the expression only the var portion is hoisted. 

```js 
  function foo(){

    function bar() {
      return 3;
    }

    return bar();

    // this function gets hoisted above the return statement, hence 8 is returned.
    function bar() {
      return 8;
    }
  }
  console.log(foo());  // returns 8
```
With function expressions:
```js 
  function foo() {

    var bar = function() {
        return 3;
    };

    return bar();

    var bar = function() {
        return 8;
    };
  }
  console.log(foo()); // returns 3!!!


  // So what is happening?
  function foo() {
    // First the JS interpreter hoists and initialises bar.
    // ⚠️ Only 1 bar will exist.
    var bar = undefined;
    var bar = undefined;

    // the first Function Expression is assigned to bar.
    bar = function() {
      return 3;
    };

    // bar is invoked and the value if any is returned.
    return bar();
    
    // second Function Expression unreachable
    bar = function() {
      return 8;
    };
  }
  console.log(foo()); //3
```

### Things to know 
- Function Declarations are officially prohibited within non-function blocks (such as if) . However all browsers allow them and interpret them in different ways. 
- Function declarations can be forgiving as hoisting can fix the order so that functions declared after invocation will still run.
- However this kind of forgiveness does not encourage tight coding and in the long run is probably more likely to promote surprises than prevent them. After all, programmers arrange their statements in a particular sequence for a reason.

### Debuging function expressions
```js
  var today = function() {return new Date()}

  // adding a name to the anonymous function helps with debuging
  var today = function today() {return new Date()}

```

## Return
If a function does not return a value it returns `undefined`.`return` exits the function.
```js
  return (expression);
  // or
  return;
```

## Parameters

### Parameters vs Arguments
Parameters are place holders for arguments.
```js
  // when we define a function we can add parameters to the declaration/definition
  var myFunc = function(param1, param2){
    ...
  };  

  // When we invoke a function we pass in arguments
  myFunc(2,4);
```

### Pseudo parameters
Each functions receives two pseudo parameters:
- arguments
- this

See more on `this`


### Pass by value vs Pass by reference
> Passing a Primitive = passing by value 

In JavaScript, a primitive (e.g., a string, number, boolean, etc.) is immutable. In other words, any changes made to an argument inside a function effectively creates a copy local to that function, and does not affect the primitive outside of that function. Check out the following example:

```js 
  function changeToEight(n) {
    n = 8; // whatever n was, it is now 8... but only in this function!
  }

  let n = 7;

  changeToEight(n);
  console.log(n); // 7

```

> Passing an Object = pass by reference

On the other hand, objects in JavaScript are mutable. If you pass an object into a function, Javascript passes a reference to that object. Let's see what happens if we pass an object into a function and then modify a property:

```js 
  let originalObject = {
    favoriteColor: 'red'
  };

  function setToBlue(object) {
    object.favoriteColor = 'blue';
  }

  setToBlue(originalObject);

  originalObject.favoriteColor; // 'blue'
```


### Arguments parameter
Array like object:
> arguments[x]
> arguments.length
> basically use this when you don't know how many argument will be submitted.
> When a function is invoked, in additional parameters are saved in an object called `arguments`

```js
  var plus = function(){
    sum = 0;
    for ( var i = 0; i == arguments.length; i ++){
      sum = sum + arguments[i];
      // OR sum += arguments[i];
      return(sum);
    }
  };

  console.log(plus(2,2,2,2,2,2));
```
> NOTE: this is a 0 based index



### Rest ...
The rest parameter syntax allows us to represent an indefinite number of arguments as an array.
```js 
  function sum(...theArgs) {
    return theArgs.reduce((previous, current) => {
      return previous + current;
    });
  }

  console.log(sum(1, 2, 3));
  // expected output: 6

  console.log(sum(1, 2, 3, 4));
  // expected output: 10
```

### Default function parameters
```js
function greet(name = 'Student', greeting = 'Welcome') {
  return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!
```


## Invoking a function
> There are several different ways of invoking a function in JS

### Traditional invocation (as functions)

```js
  myFunction(2,2);
```

### Invoking as object method

```js 
  var myObject = {
    status : "Awesome",
    plus : function(){
      // function code ...
    }
  };
  myObject.plus(2,2); // invoke function
  // NOTE: "this" becomes the object "myObject" at invocation time
```

### Through a constructor

```js
  // NOTE: "Dog" has caps to indicate it is a constructor.
  var Dog = function(){
    var breed, name;
  };


  // create new instance of "Dog"
  var newDog = new Dog();
  newDog.breed = "breed name";
  newDog.name = "dog name";

  console.dir(newDog);
  // NOTE: "this" gets the instance "newDog".
```

### Invoking through prototypes

```js
  // use this when you want different objects to have the same method.
  // a common mistake it to use closures but this impacts performance and memory
  var speak = function(what){ // function to be shared
    console.log(what);
  };

  var Dog = function(){
    var breed, name;
  };

  var Cat = function(){
    var breed, name;
  };

  Dog.prototype.speak = speak; // links the class "Dog" with the method "speak"
  Cat.prototype.speak = speak; // links the class "Cat" with the method "speak"

  var newDog = new Dog();
  newDog.breed = "breed name";
  newDog.name = "dog name";
  newDog.speak("woof"); // once linked we can invoke the method "speak"

  var newCat = new Cat();
  newCat.breed = "breed name";
  newCat.name = "cat name";
  newCat.speak("meow");
```


### Immediate invocation 

```js
  // Immediately Invoked Function Expression (IIFE)
  // code executes after declaration 

  // NOTE: use let and const for block scope now, no more scope leak!!!

  (function() {
    ...
  })();

  // As a closure
  var makeFn = function() {
    var newFn = function() {
      ...
    }
    return newFn;
  };

  var myFn = makeFn()(); // runs newFn
```


### Callback Fn
A function that takes other functions as arguments (and/or returns a function, as we learned in the previous section) is known as a higher-order function. A function that is passed as an argument into another function is called a callback function.

Where have you probably seen callback functions used? In array methods! Functions are commonly passed into array methods and called on elements within an array (i.e., the array on which the method was called).


## The "This" Keyword
> How the function is invoked determines the value of this inside the function:
️️️

### 1. If invoked in the global scope 

```js
  
  // 1. If invoked in the global scope 
  // return undefined (strict mode) or global object
  function myFunc() {
    console.log(this);
  }

```

### 2. invoked as a method
```js
  var myObj2 = {
    foo: function() {
      console.log(this); // returns myObj2 
    }
  };

  // ️️️️️️️⚠ using myFunc defined above
  var myObj = {
    foo: myFunc() // returns the object myObj
  };

```

### 3. Within a constructor using 'new'
```js
  // This is the object created by the constructor
  var Bear = function() {
    this.getThis = function(){
      console.log(this);
    }
  };

  var panda = new Bear();
  panda.getThis(); // returns panda
```


### 4. Call, Apply and Bind form -- allows you to supply you own this.
All three allow you to define the `this` keyword.
However Call and Apply cause the function to be invoked, whereas bind returns a new function with our desired `this` object. 

#### Call and Apply 
```js
  // Call() basic
  // allows you define the "this" argument
  // additional parameters as comma separated
  var speak =  function(what){
    console.log(this.normal);
  };

  var sayObject = {normal:"baz", high: "maz"};
  speak.call(sayObject);
  // NOTE: "this" now takes "sayObject"

  // Call()
  // speak.call([this], [param])
  // parameters passed as comma separated
  var speak = function(what){
    console.log(what);
  };

  var sayObject = {normal:"baz", high: "maz"};
  speak.call(sayObject, sayObject.normal); // added argument
```
```js
  // Apply() Method
  // pass additional parameters as an array
  var speak = function(what){
    console.log(what);
  };

  var sayObject = {normal:"baz", high: "maz"};
  speak.apply (sayObject, ["value1"]); // added array
```
#### Bind
Similar to call() and apply(), the bind() method allows us to directly define a value for this. bind() is a method that is also called on a function, but unlike call() or apply(), which both invoke the function right away -- bind() returns a new function that, when called, has this set to the value we give it.
```js
  // Bind()
  var module = {
    x: 42,
    getX: function() {
      return this.x;
    }
  }

  console.log(module.getX); // 42

  var retrieveX = module.getX;
  console.log(retrieveX()); // The function gets invoked at the global scope
  // expected output: undefined

  var boundGetX = retrieveX.bind(module);
  console.log(boundGetX());
  // expected output: 42
```

### Regarding inner functions 

> NOTE: an inner function does not get access to the this object, instead it gets its own `this`, to solve this you can bind this in a variable and then pass it e.g.
> BETTER use an internal arrow function as this is inherited fron the parent scope.

```js 
  var foo = {
    name: 'bar'
  };

  var myFunc1 = function(){
    console.log('myFunc1', this.name); // returns bar

    // var that = this;
    var myFunc2 = function(){
      console.log('myFunc2', this.name); // returns global / undefined
    }
    // .bind(that); // myFunc2 now returns bar
    
    myFunc2();

    // A better solution is using an arrow function as arrow functions get their this from parent scope
    var myFunc3 = ()=> {
      console.log('myFunc3', this.name); // returns "bar"
    };
    
    myFunc3(); // returns "bar"
    
  }.bind(foo); // binding to set initial this for demo

  myFunc1();

```


### Callbacks and this
Invoking a method in a callback function
```js

  function invokeTwice(cb) {
    console.log('cb', cb); // here cb is just the Fn without 'this' context
    cb();
    cb();
  }

  const dog = {
    age: 5,
    growOneYear: function () {
      this.age += 1;
      // console.log('this', this); // returns window
    }
  };

  invokeTwice(dog.growOneYear); 
  // note: just passing the reference to the function.
  // i.e. if we returned dog.growOneYear we would get function(){...} with no context

  dog.age; // 5 - What! not 7?
```
As it turns out, invokeTwice() does indeed invoke growOneYear -- but it is invoked as a function rather than a method!

> Remember, if a function is invoked: 
> As a constructor Fn with new this = to the object being created.
> As a method on an object this = to the object itself
> As a function this = global object


In this case growOneYear is invoked in the context of global rather than Dog.
We can solve this by saving 'this' with an Anonymous Closure:

```js 
  // code as before:
  function invokeTwice(cb) {
    cb();
    cb();
  }

  const dog = {
    age: 5,
    growOneYear: function () {
      this.age += 1;
    }
  };

  // this time we pass in a function that when invoked, invokes dog.growOneYear
  invokeTwice(function () { 
    dog.growOneYear(); // NOTE: this is a reference to dog object
  });

  dog.age; // 7
```
Using this approach, invoking invokeTwice() still sets the value of this to window. However, this has no effect on the closure; within the anonymous function, the growOneYear() method will still be directly called onto the dog object! As a result, the value of dog's age property increases from 5 to 7.

Since this is such a common pattern, JavaScript provides an alternate and less verbose approach: the bind() method.

In some cases it might not be possible to use the .bind() method.

Note: this also happens with arrow functions.

```js

  ProductItem.prototype.registerHoverStatic = function() {
    var thisProductItem = this; // This = ProductItem
    this.$listItems.each(function(){
      // This = node element
      thisProductItem.hoverRows($(this), thisProductItem); // [nodeEle, ProductItem]
    });
  };

```

## Higher Order functions
These are functions that take a function as a argument and/or return a modified function or object with functions.


## Arrow functions
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

> (param1, param2, …, paramN) => { statements } 
> (param1, param2, …, paramN) => expression
> // equivalent to: => { return expression; } 
> 
> // Parentheses are optional when there's only one parameter name:
> (singleParam) => { statements }
> singleParam => { statements }
> 
> // The parameter list for a function with no parameters should be written with a pair of parentheses.
> () => { statements }

### 'this' in arrow functions

With regular functions, the value of this is set based on how the function is called. With arrow functions, the value of this is based on the function's surrounding context. In other words, the value of this inside an arrow function is the same as the value of this outside the function. 

```js
// constructor
function IceCream() {
  this.scoops = 0;
  this.me = this;
}

// adds scoop to ice cream
IceCream.prototype.addScoop = function() {

  // NOTE: event loop, setTimeout is taken out of context
  setTimeout(function() {
    this.scoops++;
    console.log(this); // returns window
    console.log('scoop added!');
  }, 500);
};

const dessert = new IceCream();
dessert.addScoop();
```
The function passed to setTimeout() is called without new, without call(), without apply(), and without a context object. This means the value of this inside the function is the global object and NOT the dessert object. So what actually happened was that a new scoops variable was created (with a default value of undefined) and was then incremented (undefined + 1 results in NaN):

One way around this is to use closure:
```js
// constructor
function IceCream() {
  this.scoops = 0;
}

// adds scoop to ice cream
IceCream.prototype.addScoop = function() {
  const cone = this; // sets `this` to the `cone` variable
  setTimeout(function() {
    cone.scoops++; // references the `cone` variable available
    console.log(cone); // returns dessert object
    console.log('scoop added!');
  }, 0.5);
};

const dessert = new IceCream();
dessert.addScoop();

```

The code above will work because instead of using this inside the function, it sets the cone variable to this and then looks up the cone variable when the function is called. This works because it's using the value of the this outside the function. So if we check the number of scoops in our dessert right now, we'll see the correct value of 1:

Well that's exactly what arrow functions do, so let's replace the function passed to setTimeout() with an arrow function:
```js
// constructor
function IceCream() {
  this.scoops = 0;
}

// adds scoop to ice cream
IceCream.prototype.addScoop = function() {
  setTimeout(() => { // an arrow function is passed to setTimeout
    this.scoops++; // this is inherited from outside scope this = dessert obj
    console.log('scoop added!');
  }, 0.5);
};

const dessert = new IceCream();
dessert.addScoop();
```

Since arrow functions inherit their this value from the surrounding context.

When addScoop() is called, the value of this inside addScoop() refers to dessert. Since an arrow function is passed to setTimeout(), it's using its surrounding context to determine what this refers to inside itself. So since this outside of the arrow function refers to dessert, the value of this inside the arrow function will also refer to dessert.

Now what do you think would happen if we changed the addScoop() method to an arrow function?
```js
// constructor
function IceCream() {
    this.scoops = 0;
}

// adds scoop to ice cream
IceCream.prototype.addScoop = () => { // addScoop is now an arrow function
  setTimeout(() => {
    this.scoops++;
    console.log('scoop added!');
  }, 0.5);
};

const dessert = new IceCream();
dessert.addScoop();
```

Yeah, this doesn't work for the same reason - arrow functions inherit their this value from their surrounding context. Outside of the addScoop() method, the value of this is the global object. So if addScoop() is an arrow function, the value of this inside addScoop() is the global object. Which then makes the value of this in the function passed to setTimeout() also set to the global object!

### log and return trick 
```js
// arrow function that also returns result
// Note: anything after the => is returned
(result => console.log(result) || result);

// also 

(param1) => ({
  // auto return using block syntax
  // return param1++;
  param1 ++;
})

```

## Async await
[DOCS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
