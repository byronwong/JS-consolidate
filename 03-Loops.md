Loops
=====

## While
```js
  var string = ""; // empty string

  while(age > 0){
    string += "Happy Birthday \n"; // \n = new line
    age = age - 1; // we can simplify the '-=' operator
  } 
```
```js
  // cleaner while loops
  // http://conceptf1.blogspot.co.uk/2014/01/javascript-best-practices-loop-optimization.html
  // for readability use i--
  var fruits = ["apple","banana","orange","mango"];
  var i = fruits.length;

  while(i != 1) {
    ... 
    i--;
  }
```

## Do while
Do one iteration then test for condition.
```js
  do {
    string += "Happy Birthday \n"; // \n = new line
    age = age - 1; // we can simplify the '-=' operator
  } while (age > 0);
```

## For loops
```js
  // Basic version
  var fruits = ["apple","banana","orange","mango"];

  for (i=0; i<fruits.length; i++) {
    console.log(fruits[i]);
  }
```

## For of loop (ES6)
```js
  // ES6 - iterate through each item in the array
  let cards = [];
  for(let card of cards ) {
    ...
  }
```

## Array looping 
For array looping check out the Array object at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array


