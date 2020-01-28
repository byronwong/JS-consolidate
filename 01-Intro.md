JS Basics
=========

## Expression
An expression is any valid unit of code that resolves to a value.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators

Conceptually, there are two types of expressions: those that assign a
value to a variable and those that simply have a value.

### example 1
```js
	var x = 4;
```

### example 2
```js
  // This is the second type to expressions JS will still do the math even though it is not saved
	3 + 4
```


## Statement

Is a single unit of work.

JavaScript applications consist of statements with an appropriate syntax.
A single statement may span multiple lines. Multiple statements may occur
on a single line if each statement is separated by a semicolon.
This isn't a keyword, but a group of keywords.


### User Messages
```js
	alert();
	prompt();
	console.log();
```


## Variables
Always use 'var', if you don't you will create a global variable.
If you intend to create a global variable name it in CAPS.
```
	e.g. GLOBAL
```

### Pass by reference vs pass by value
Primitive values are passed by value where as objects (also arrays, functions) are passed by reference.


## Primitive & Data types
There are 7 data types, of which 6 are primitives.
A primitive (primitive value, primitive data type) is data that is not an object and has no methods. In JavaScript, there are 6 primitive data types:

>	string,
>	number,
>	boolean,
>	null,
>	undefined,
>	symbol (new in ECMAScript 2015).

Most of the time, a primitive value is represented directly at the lowest level of the language implementation.
All primitives are immutable (cannot be changed).

The only other datatype in JS is:

> Object

## Strings
> can use "" or ''
> can escape \"\"

> \n - new line
> NOTE: escapes is ignored by html

### Methods
```js
  var string1 = "The quick brown fox jumps over the 'lazy' dog";
  var string2 = "Happily ever after";

  // .split()
  // creates an array of words that have been split at space character
  var myArray = newString.split(" "); 
  alert(myArray); // returns The,quick,brown,fox etc.
  // NOTE: lazy entry in the array keeps is quotation marks


  // indexOf()
  // ---------
  var indexOfBrown = newString.indexOf('brown'); 
  alert(indexOfBrown); // returns: 10
  var indexOfJumps = newString.indexOf('jumps'); // used for slice example

  // Slice()
  // -------
  var myFox = newString.slice(indexOfBrown, indexOfJumps); // returns: 'brown fox'

  // you can also use splice to copy an index.
  var myFox = newString.slice();

```

## Let
- `Let` is block scoped
```js
  // let variables are not affected by hoisting, thus the following will result in a ref error.
  console.log(productId);
  // var productId = 12;
  let productId = 12;
```
```js 
  // even though we use productId before it is declared, 
  // the productId var in updateProductId exists in the temporal dead zone.
  function updateProductId(){
    productId = 12;
  }
  let productId = null;
  updateProductId();
  console.log(productId); // returns 12
```
```js
  let updateFn = [];

  // swap out var for let
  // when you swap out var for let i gets an independent value.
  // i is now scoped to the for loop
  for(let i=0; i < 2; i++){
    // note a closure is formed here
    updateFn.push( function(){return i;} );
  };
  
  console.log(updateFn[0];

```
```js 
  // here productId=0 is scoped to the for loop and once that end it no longer exists (block scope)
  let productId = 42;
  for(let productId=0; productId < 10; productId++){
    // other code...
  }
  console.log(productId);
```

Only declaring variables with the var keyword will add them to the window object. If you declare a variable outside of a function with either let or const, it will not be added as a property to the window object.

```js
let currentlyEating = 'ice cream';
window.currentlyEating === currentlyEating // false!
```

## const

```js
  // short for constant
  // scoped to block
  // once declared they cannot be reassigned a value.
  // you also can't have an un defined const variable, will result in error

  const speed = 70;
```
```js
  // const can't be changed however within a new block we can redefine it until the block ends. 
  const speed = 70;
  {
    const speed = 40;
    console.log(speed); // returns 40
  }
```
```js
  // here even though myObj is a const, it's internal properties can be changed.
  // however we can't change it from an object to an array.
  const myObj = {
    message: 'hello'
  }

  myObj.message = 'hello moes';

  console.log(myObj.message);
```


## Block scoping
>Resource: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block

Only works with `let` and `const`.

```js
  let y = 1;

  if (true) {
    var x = 2;
    y = 2;
  }

  console.log(x);
  // expected output: 2

  console.log(y);
  // expected output: 1
```

## Rest and Spread
- Rest refers to gathering up parameters and putting them into an array

```js
  // Rest
  // ====
  var myFunc = function(productId, ...otherData) {
    console.log(productId); // '9023493'
    console.log(otherData); // ['other1', 'other2', 'other3']
  };

  myFunc('9023493', 'other1', 'other2', 'other3');
  // NOTE: if otherData is empty we will get an empty array
```

```js
  // returning the number of params
  // myFunc.length vs arguments.length
  var myFunc = function(productId, ...otherData) {
    console.log(productId); // '9023493'
    console.log(otherData); // ['other1', 'other2', 'other3']

    console.log(arguments.length); // includes all the parameter including the rest ones.
  };

  myFunc('9023493', 'other1', 'other2', 'other3');

  console.log(myFunc.length); // returns on the productId param, and ignores the rest param

```

```js 
  // using rest with dynamic functions
  var myFunc = new Function('...categories', 'return categories');
  console.log(myFunc(1,2,3,4,5)); // returns [1,2,3,4,5]
```

- Spread refers to taking an array/iterable and spreading them out into separate items.

```js
  // Spread
  // ======
  var prices = [20, 30, 50];
  var maxPrice = Math.max(...prices);
  console.log(maxPrice); // returns 50
```
```js 
  // creating a new array
  // note the spread is in square brackets
  var prices = [20, 30, 50];
  var newPrices = [...prices];
  console.log(newPrices); // returns [20, 30, 50]
```
```js
  // Creating a new array shorthand
  var newPrices = [...[,]];
  console.log(newPrices); // returns [undefined, undefined]
```
```js
  // using spread on strings
  var mayArray = ['a', ...'bcd', 'e', 'f'];
  console.log(mayArray); // returns ['a', 'b', 'c', 'd', 'e', 'f']
```


## Default Parameters
```js
  // Basic use
  var getProduct = function(productId=1000, type="software"){
    console.log(productId);
    console.log(type);
  };
  getProduct(undefined, "hardware");
```
```js
  // One parameter using another
  var getPrice = function(price, tax= price * 0.07){
    console.log(price + tax);
  };
  getPrice(5.00);
```
```js
  // Use before declared arguments
  // here we have an error, this is because we try to use the default adjustment before it is defined.
  var getPrice = function(price=adjustment, adjustment=1){
    console.log(price + adjustment);
  };
  getPrice();
```
```js
  // if we now add a price, we do use the default and the code runs as normal.
  var getPrice = function(price=adjustment, adjustment=1){
    console.log(price + adjustment);
  };
  getPrice(5.00);
```
```js
  // Creating a function dynamically using defaults
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
  // here we we can set price to 20 (default)
  var fn = new Function('price=20', 'return price'); 
  console.log(fn());
```

## Template literals
```js
  // Basic use
  var text="moes";
  console.log(`hello, ${text}!`);

  // can be escaped
  console.log(`hello, \${text}!`);

  // NOTE: when using the `` white space and new lines are ignored
  // also can use concat
  console.log(`hello, ${'cheeky ' + text}!`);
```
```js
  // Interpolation with template literals
  // notice how the message is interpolated first
  // same if we used traditional concat
  function showMessage(message){
    let name = 'panda'; // attempt to change name
    console.log(message);
  }
  let name = 'moes';
  showMessage(`Hello ${name}`); // returns hello moes
```
```js 
  // We can create an array from all the text in a template
  function showMessage(segments){
    console.log(segments);
  }

  // The key here is to invoke the function like this:
  // here we are invoking showMessage with a template literal
  showMessage `templates `; // returns ["templates "]
```
```js
  // Adding more complexity 
  let name = 'Panda', name2 = 'moes'
  
  // We also can get the values by using a rest operator
  function showMessage2(segments, ...values){
    console.log(segments);
    console.log(values);
  }

  showMessage2 `hello ${name} the ${name2}`;
  // returns ["hello ", " the ", ""] [Panda", "moes"]
  // all the template is captured in the first param
  // and the vars are individual params, hence we use ...rest to group into array
```

```js 
  // https://stackoverflow.com/questions/718091/alternative-for-innerhtml
  // creating a template
  var myContent={
    greeting: 'hello',
    name: 'panda',
    lastName: 'moes'
  };

  let code= `<div>
    <h1>${myContent.greeting} ${myContent.lastName}s</h1>
    <h2>How are you today ${myContent.name}</h2>
  </div>`;

  // Note security waring with innerHTML
  // Checkout createDocumentFragment, createElement instead
  document.querySelector('.page').innerHTML = code;
```



## Destructuring
Really to take apart something. In most cases it will be arrays or objects.
```js 
  let salary = ['20000', '75000'];
  let [low, average, high] = salary;

  console.log(high); // returns undefined
```

```js 
  // destructuring with ...rest
  let salary = ['20000', '50000', '75000'];
  let [low, ...others] = salary;

  console.log(others); // returns ['50000', '75000']
```

```js 
  // destructuring with defaults
  let salary = ['20000', '50000'];
  let [low, average, high='80000'] = salary;

  console.log(high); // returns "80000"
```

```js 
  // destructuring with nested arrays
  let salary = ['20000', '50000', ['88000', '99000']];
  let [low, average,[actualLow, actualHigh]] = salary;

  console.log(actualLow); // returns "88000"
```

```js 
  // destructuring with pre-defined variables
  let salary = ['20000', '50000'];
  let low, average, high;

  // when we de-structure here we are assigning before we were declaring.
  [low, average, high=88000] = salary;

  console.log(high); // returns "88000"
```
