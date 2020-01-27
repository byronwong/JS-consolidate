Objects
=========

## Declaring an object
While both methods ultimately return an object without properties of its own, the Object() constructor function is a bit slower and more verbose. As such, the recommended way to create new objects in JavaScript is to use literal notation, if possible.
```js
  // Using literal notation:
  const myObject = {};

  // Using the Object() constructor function:
  const myObject = new Object();

  // Both of these methods use Object.create under the hood.
  Object.create();

```

```javascript

	var myObject1 = {};
	var myObject2 = {a:1, b:2};

	// declaring an object with constructor 
	var dog = new Object(); // creates a empty object called dog

```

## Adding properties to an object
```javascript 

	var myObject = {a:1, b:2};

	// using '.' notation
	myObject.c = 3;
	console.log(myObject); // {a:1, b:2, c:3};

	// using 'bracket []' notation
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors
	myObject['d'] = 4;
	console.log(myObject); // {a:1, b:2, c:3, d:4};

```

### Object Properties
[Object API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
```js 
  // Allows you to define the properties behaviour
  Object.defineProperty();
  Object.defineProperties();

  configurable // [bool] - allows you to edit property behaviour
  enumerable // [bool] - say whether a property can be looped or serialized to JSON
  writable // [bool] - whether you can change the property
  value // - actual value of the property object/function array etc

  // See Bellow
  get // The get syntax binds an object property to a function that will be called when that property is looked up.
  set // The set syntax binds an object property to a function to be called when there is an attempt to set that property.

```

### Getters and Setters
```js 
  'use strict';

  // Create a cat object
  var cat = {
    name: {
      first:'Fluffy', 
      last: 'LaBeouf'
    }, 
    color: 'blue'
  };

  // use defineProperty to add getters and setters
  // notice that getters and setters are merely functions in the back
  Object.defineProperty(cat, 'fullName', {
    get: function() {
      return this.name.first + ' ' + this.name.last;  
    },
    set: function(value){
      var nameParts = value.split(' ');
      this.name.first = nameParts[0];
      this.name.last = nameParts[1];
    }
  });
  
  cat.fullName = 'Muffin Top';
  display(cat.fullName);

```






## Dot vs Bracket notation
Why/When should we use dot / brackets?

### Example 1 - using a variable as a key
By default we should use dot notation, but in some cases we will need to use bracket notation.

```javascript

	obj = {};
	
	// The job object is taken from a JSON object from an API
	if (!obj[job.location.country]) { // Here: if obj does not have 'job.location.country' property
      obj[job.location.country] = []; // create a new array for that country as a member of obj
    }
	obj[job.location.country].push(job); // push the current job to the right array according to it location

```

### Example 2 - using keys with spaces
Another time when you might use bracket notation (not advised) is when you want to use spaces in property names
NOTE: everything in the brackets is converted to a string. 
Thus anything in the brackets have to be convertible to a string.
```javascript
	dog['has ears'] = true;
	// note to access this property you will have to use brackets
	console.log(dog['has ears']);
```


## Recalling data / properties
If you try to reference an object that is not defined you will get back 'undefined' not 'null'

```javascript
	var dog = {
		name:'charlie',
		breed:'mix',
	};

	console.log(dog.colour); // undefined
```

You can also get the properties in an object, not this method does not output in order unless in an array
```javascript
	Object.keys(myObj); // returns the child properties only. grand children are not returned.
	Object.key(myObj.nested); // returns grandchildren properties.
```

## Deleting properties
```js
	delete object.name
	delete object[expression]
```
>	NOTE: you can use the "." notation or the "[]" notation as they are interchangeable
>	NOTE: delete id a pre-fix operator, just put it in front and it will delete the item you wish



## Comparing an Object with Another Ob
Let's see what happens when we compare one object with another object. The following objects, parrot and pigeon, have the same methods and properties:

```js 
  const parrot = {
    group: 'bird',
    feathers: true,
    chirp: function () {
      console.log('Chirp chirp!');
    }
  };

  const pigeon = {
    group: 'bird',
    feathers: true,
    chirp: function () {
      console.log('Chirp chirp!');
    }
  };

  parrot === pigeon; // false

```
Naturally, one might expect the parrot object and pigeon object to be equal. After all, both objects look exactly the same!

What's going on here? As it turns out, the expression will only return true when comparing two references to exactly the same object. Using what we now know about passing objects, let's confirm this. To start off, let's create a new variable, myBird, and assign it to one of the objects above:

## This keyword
> A Method Can Access the Object it was Called On

Recall that an object can contain data and the means to manipulate that data. But just how can an object reference its own properties, much less manipulate some of those properties itself? This is all possible with the this keyword!

Using this, methods can directly access the object that it is called on. Consider the following object, triangle:

```js
  const triangle = {
    type: 'scalene',
    identify: function () {
      console.log(`This is a ${this.type} triangle.`);
    }
  };

  triangle.identify(); // 'This is a scalene triangle.'
```

## Object.keys
NOTE: only return the top level, nested object keys will not be returned.
```js
	var obj = { 
    0: 'a',
    1: 'b',
    2: 'c'
  };
	console.log(Object.keys(obj)); // console: ['0', '1', '2']
```


## Object.values
```js 
  const dictionary = {
    car: 'automobile',
    apple: 'healthy snack',
    cat: 'cute furry animal',
    dog: 'best friend'
  };

  Object.keys(dictionary); // [car, apple, 'cat', 'dog']
  Object.values(dictionary); // ['automobile', 'healthy snack', 'cute furry animal', 'best friend']

```

## Object literals Extension

```js
  // price and tax are mapped to the context
  // so the properties pick up the values.
  // so we no longer need to do `price : price`.
  var price = 15, tax = 10;
  
  var myObj = {
    price,
    tax
  };
```

```js
  // We can also add a function using the new syntax.
  // previously we would have to do myFunc : function(){...},
  var myObj = {
    myFn() {
      console.log('hello world');
    }
  };
```

```js    
  // Understanding 'this'
  // what does 'this' refer to? the context or the property
  // by using this syntax this refers to the context.
  // Note: this is the Fn's context which is the object
  let price = 15, tax = 10;

  let myObj = {
    price: 7.88,
    myFunc() {
      return this.price
    }
  };

  console.log(myObj.myFunc()); // returns 7.88
```

```js
  // Using bracket notation
  // here we are creating a property called 'moes' with a value of tax
  var text = "panda moes", tax = 10;

  var myObj = {
    [text]: tax,
    // we can even use concat
    [text + "-001"]() {
      console.log('it works');
    }
  };
  console.log(myObj);

  // NOTE: HERE we are using bracket notation to call the fn name with a space
  console.log(myObj["panda moes"]); // 10
  myObj["panda moes-001"](); // it works

```
