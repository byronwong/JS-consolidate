# Arrays

## Resource 
Please refer to the mdn array api to see all features
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce


## Creating an Array
You can create an empty array and then assign values
```javascript
  var myArray = [];
  myArray[0] = 1;
  myArray[1] = 2;
```

You can create an array with values
```javascript
  var primes = [1, 2, 3, 5, 7, 11];
  var thirdPrime = primes[2];
``` 

## In built properties
Understand arrays are objects therefore the same rules apply, so they can also hold properties.
These properties are not part of the array index.
```js
  
  var myArray = [1,2,3,4];

  // Normally we use bracket notation
  myArray[0]; // returns '1'

  // we can't use dot notation to get values but you can for properties
  myArray.0; // returns '1'
  
```

```js 
  // We can add properties to arrays
  myArray.prop1 = 'hello'; // ["foo", "bar", myProp: "hello"]
  
  // NOTE: these properties are not part of the array index.
  myArray[3] // undefined

  // you can access properties like you can with objects
  myArray.prop1 // 'hello'
  myArray['prop1'] // 'hello'

  // you can also pass in a variable as a key
  myArray[myKey] // error not defined
  // define the key variable
  var myKey = 'prop1';
  myArray[myKey]; // 'hello'

  // adding to an array with
  myArray['2'] = 'baz'; // ["foo", "bar", "baz"]
  myArray.3 = 'moes';  // error

  // Remember bracket notation can take expressions
  myArray[ myArray.length - 1]; // bar
```

### Getting length
`array.length` returns the number of items in the array not the last position number therefore:
```javascript 
  var arrayPositionNumber = myArray.length - 1;
```

In built methods 
----------------

### .push() - Adding to an array (at the end)
`myArray.push("newEntry");`

### .pop()
remove and returns the last element in the array
`myArray.pop();`

### .splice()
Allows you to edit arrays
```javascript

var numbers = ["1", "2", "3", "4"];

// Adding to arrays
numbers.splice(2, 0, "A", "B"); // ["1", "2", "A", "B", "3", "4"]

// Removing from arrays
numbers.splice(1, 1); // ["1", "3", "4"]

```

Iterating over arrays
---------------------

For loops are too imperative, and there is a push to being declartive (functional programming)
https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0

A better way would be to use `prototype.map()`;


Processing arrays prototype.map()
---------------------------------

[Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
Creates a new array base on the function passed into .map() on every item in the array. 

Code structure:

```javascript 
  var new_array = arr.map(function callback(currentValue, index, array) {
      // Return element for new_array
  }[, thisArg])
```

Examples: Basic Usage
```javascript 
  var numbers = [1, 5, 10, 15];
  var doubles = numbers.map(function(x) {
    return x * 2;
  });
  // doubles is now [2, 10, 20, 30]
  // numbers is still [1, 5, 10, 15]
```

Example: Using maps to process arrays
```javascript
  // Object.keys(jobs) returns ['us', 'uk', etc]
  // .map sorts the city in each country array.

  // Example structure of jobs object
  var jobs = {
    uk:['array of job objects'],
    us:['array of job objects'],
  };

  Object.keys(jobs).map(function (currentItem) {
    jobs[currentItem].sort(sortCity);
  });
```

Example: Data binding to templates
```javascript
  // You can use map to bind to templates
  function template(jobData) {
    var template = '<li class="opening-job job column eight wide">';
    template += '<h3 class="details-title job-title link--block-target">' + jobData.name + '</h3>';
    template += '</li>';
    return template;
  }

  // combined jobs is a flattened array of jobs
  // each iteration of map is creating an array of HTML strings(template) for each job.
  // we are then calling .join to join each string with a space as a separator.
  // Then append to HTML.
  wrapper.append(
    combinedJobs
      .map(template)
      .join('')
  );

```

Prototype.reduce();
-------------------

Example: basic use:
```javascript 

  // Code Pattern
  var result = yourArray.reduce(function(accumulator, currentValue, currentIndex, array){
    // your code...
  }, initialValue);

  var data = [1,2,3,4];
  var initialValue = 10;

  console.log(data);

  var total = data.reduce(function(accumulator, currentValue, currentIndex, array){
    
    console.log('accumulator: ' + accumulator); // returns the running total
    console.log('currentValue: ' + currentValue); // returns the current item in the array loop
    console.log('currentIndex: ' + currentIndex); // returns the index number of the current item int he loop
    console.log('array: ' + array); // returns the array we are doing .reduce to
    console.log('-----------------------------');
    
    return accumulator + currentValue;
    
  }, initialValue);

  console.log(total);

``` 
Example: Flattening an array
```javascript 
  var jobs = {
    uk:['array of job objects'],
    us:['array of job objects'],
  };

  // as jobs is an object, we can create an array by using Object.keys()
  Object.keys(jobs).reduce(function (accumulator, currentItem) {
    return accumulator.concat(jobs[currentItem]); // concat as we are joining arrays
  }, []);
```

Array.foreach()
---------------

## For...in
For...in loops through all properties of an object / array, this includes properties that are not part of the index. 

```js 
  var myArray = ['1', '2'];
  myArray.prop1 = 'hello'; // ["1", "2", prop1: "hello"]

  for(var index in myArray) {
    console.log(myArray[index]);
  } // 1, 2, hello
```
