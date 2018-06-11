JS Basics
=========

<!-- TOC -->

- [0.1. Expression](#01-expression)
    - [0.1.1. example 1](#011-example-1)
    - [0.1.2. example 2](#012-example-2)
- [0.2. Statement](#02-statement)
    - [0.2.1. User Messages](#021-user-messages)
- [0.3. Variables](#03-variables)
    - [0.3.1. Pass by reference vs pass by value](#031-pass-by-reference-vs-pass-by-value)
- [0.4. Primitive & Data types](#04-primitive--data-types)
- [0.5. Strings](#05-strings)
    - [0.5.1. Methods](#051-methods)
- [0.6. let](#06-let)
- [0.7. const](#07-const)

<!-- /TOC -->

## 0.1. Expression
An expression is any valid unit of code that resolves to a value.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators

Conceptually, there are two types of expressions: those that assign a
value to a variable and those that simply have a value.

### 0.1.1. example 1
```js
	var x = 4;
```

### 0.1.2. example 2
```js
  // This is the second type to expressions JS will still do the math even though it is not saved
	3 + 4
```


## 0.2. Statement

Is a single unit of work.

JavaScript applications consist of statements with an appropriate syntax.
A single statement may span multiple lines. Multiple statements may occur
on a single line if each statement is separated by a semicolon.
This isn't a keyword, but a group of keywords.


### 0.2.1. User Messages
```js
	alert();
	prompt();
	console.log();
```


## 0.3. Variables
Always use 'var', if you don't you will create a global variable.
If you intend to create a global variable name it in CAPS.
```
	e.g. GLOBAL
```

### 0.3.1. Pass by reference vs pass by value
Primitive values are passed by value where as objects (also arrays, functions) are passed by reference.


## 0.4. Primitive & Data types
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

## 0.5. Strings
> can use "" or ''
> can escape \"\"

> \n - new line
> NOTE: escapes is ignored by html

### 0.5.1. Methods
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

## 0.6. let

## 0.7. const

