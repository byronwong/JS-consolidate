Objects
=========

## Declaring an object
While both methods ultimately return an object without properties of its own, the Object() constructor function is a bit slower and more verbose. As such, the recommended way to create new objects in JavaScript is to use literal notation.
```js
  // Using literal notation:
  const myObject = {};

  // Using the Object() constructor function:
  const myObject = new Object();
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

## Dot vs Bracket notation
Why/When should we use dot / brackets?

### 1
By default we should use dot notation, but in some cases we will need to use bracket notation.

```javascript

	// When the object property is dynamically determined at runtime
	// This example is from the reduce buildit website
	obj = {
		// this is a empty object
	}
	
	// The job object is taken from a JSON object from an API
	if (!obj[job.location.country]) { // Here: if obj does not have 'job.location.country' property
      obj[job.location.country] = []; // create a new array for that country as a member of obj
    }
	obj[job.location.country].push(job); // push the current job to the right array according to it location

```

### 2
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

## This 
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

Object.keys
-----------
NOTE: only return the top level, nested object keys will not be returned.
```javascript
	var obj = { 0: 'a', 1: 'b', 2: 'c' };
	console.log(Object.keys(obj)); // console: ['0', '1', '2']
```

	JS objects
	==========
	The 3 most basic JS operations on an object are GET, SET and DELETE

	NOTE: brackets and dots do the same thing in JS

	Get
	---
	object.name
	object[expression]


	Set
	---
	object.name = value;
	object[expression] = value;

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






	Object Literals
	===============
	JavaScript has object literals, which is one of the good parts.

	the systems allows you to quickly add object properties, and as many as you like

	var my_object = {foo: bar};

	In ES5 we added meta API, which allows you to do the same thing:

	var my_object = Object.defineProperties( Object.create (Object.prototype), {
		foo: {
			value: bar,
			writable: true,
			enumerable: true,
			configurable: true
		}
	});

	So this gives you more control on what the thing inherits from, you can also use
	'null' (Object.null/.prototype) which no inheritence is happening at all (does not inherit from object.prototype).

	We also now have these 3 attributes, which you now have control over
