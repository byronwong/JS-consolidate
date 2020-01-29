Understanding Scope and Closures
================================

## Global scope
The global scope is the highest scope in a program. Aka the root scope. 

## Lexical scope
In JS scopes are create with `functions` not `{}`. (Exceptions: `let`, `const`)
```js
	// NOTE: braces do not create scope in JS consider the following:
	var x = 15;
	if (x < 20){
		var y = x;
	}
	var z = y; // NOTE: here 'y' can be accessed outside of the braces

	output.innerHTML=z;
```
```js
	// Javascript has a functional scope
	// External variables can be accessed from outside a function.
	// But we cannot access side1 and side2 from outside of `outer`
	// Inner functions has access to variables in their parent.
	var externalVar = 20;

	function outer (){
		var side1 = 3;
		var side2 = 4;

		function fn1(){
			return side1 * side1;
		}

		function fn2 (){
			return side2 * side2;
		}

		console.log(externalVar);
	}
```

## Types of variables
New to ES6 there are new variable types: `const`, `let` and our usual `var`.
```js
	// the new const and let variables are block scoped.
	// therefore:
	let foo = 25;
	
	if(foo) {
		let foo = 40;
		console.log(foo); // returns 40
	}	

	console.log(foo); // return 25;
```


# Closures

## The basics
> Closure - the (retained) scope of where a function was declared not invoked.

```js
	// Example 1
	// the function innerFunction() retains the scope of testScope()
	// even though testScope no longer exists.
	var scope = "global";

	function testScope(){

		var scope = "local";
		
		// NOTE: Fn is being declared not invoked
		function innerFunction (){
			return scope;
		} 

		return innerFunction();
	}

	var answer = testScope();
	answer() // returns: "local"

	// Here we are saving "innerFunction" with the first ()
	// With the second () we are invoking "innerFunction"
	var answer = testScope()();

```

## Another side effect of closures
```js
	// Here we have variable x - which is declared at global scope, and variable y (locally).
	// because this function forms a closure over x, x is guaranteed to be available
	// even if x goes in or out of scope
	var x = 50;

	function someFunction(){
		var y = 100;
		return x + y;
	}

	x = 25;
	var someFn = someFunction(); // x = 25

	console.log(someFn);
```

## Problems with closure
Whenever you add event listeners in a loop
```js

  var nums = [1,2,3];

  // Let's loop over the numbers in our array
  for (var i = 0; i < nums.length; i++) {

      // This is the number we're on...
      var num = nums[i];

      // We're creating a DOM element for the each number
      var elem = document.createElement('div');
      elem.textContent = num;

      // ... and when we click, alert the value of `num`
      elem.addEventListener('click', function() {
          console.log(num);
      });

      // finally, let's add this element to the document
      document.body.appendChild(elem);
  };

  // when we click on each element we get 3 returned...why?
  // num is globally declared and thus changes with each iteration.
  // each eventListener scope includes access to the same var


  // solution
  // Here we are creating an IIFE function which creates it's own instance 
  // of num (pass by value), the IIFE returns the function to be invoked
  
  // UPDATE ES6 we can use let here and as it is block scope num will not jump out 
  // of the braces
  elem.addEventListener('click', (function(numCopy) {
    return function() {
      alert(numCopy)
    };
  })(num));

```



## Closure - As a function factory - you can make different instances/ environments
AKA higher order function:
```js 
	function makeAdder(x) {
		return function(y) {
			return x + y;
		};
	}

	var add5 = makeAdder(5); // Initialise anonymous functions makeAdder(x) - function now returns 5 + y;
	var add10 = makeAdder(10);

	console.log(add5(2));  // 7
	console.log(add10(2)); // 12
```

## Emulating private methods with closures
```js
	// See getters and setters 
	var counter = (function() {
		var privateCounter = 0;
		function changeBy(val) {
			privateCounter += val;
		}
		return {
			increment: function() {
			changeBy(1);
			},
			decrement: function() {
			changeBy(-1);
			},
			value: function() {
			return privateCounter;
			}
		};   
	})();
	
	console.log(counter.value()); // logs 0
	counter.increment();
	counter.increment();
	console.log(counter.value()); // logs 2
	counter.decrement();
	console.log(counter.value()); // logs 1

```

## Performance considerations
```js
	// It is unwise to unnecessarily create functions within other functions 
	// if closures are not needed for a particular task, as it will negatively 
	// affect script performance both in terms of processing speed and memory consumption.
	// Consider the following case:

	function MyObject(name, message) {
		this.name = name.toString();
		this.message = message.toString();

		this.getName = function() {
		return this.name;
		};
	
		this.getMessage = function() {
		return this.message;
		};
	}

	// Because the previous code does not take advantage of the benefits of closures, 
	// we could instead rewrite it as follows:

	function MyObject(name, message) {
		this.name = name.toString();
		this.message = message.toString();
	}

	MyObject.prototype = {
		getName: function() {
			return this.name;
		},
		getMessage: function() {
			return this.message;
		}
	};

  // However, redefining the prototype is not recommended. 
  // The following example instead appends to the existing prototype:

	function MyObject(name, message) {
		this.name = name.toString();
		this.message = message.toString();
	}

	MyObject.prototype.getName = function() {
		return this.name;
	};
	
	MyObject.prototype.getMessage = function() {
		return this.message;
	};
```
