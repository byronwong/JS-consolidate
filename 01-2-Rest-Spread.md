
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
