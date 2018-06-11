# New additions to ES6

## Symbols
A symbol is a unique and immutable data type that is often used to identify object properties.

To create a symbol, you write Symbol() with an optional string as its description.


## Iteration & Iterable Protocols

The iterator protocol is used to define a standard way that an object produces a sequence of values. What that really means is you now have a process for defining how an object will iterate. This is done through implementing the .next() method.

## Sets

## WeakSet

## Maps

## Promises

## Proxies

```js 
  var richard = {status: 'looking for work'};
  var agent = new Proxy(richard, {});

  agent.status; // returns 'looking for work'
```

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler

## Generators functions
Whenever a function is invoked, the JavaScript engine starts at the top of the function and runs every line of code until it gets to the bottom. There's no way to stop the execution of the function in the middle and pick up again at some later point. This "run-to-completion" is the way it's always been:

### The Yield Keyword
The yield keyword is new and was introduced with ES6. It can only be used inside generator functions. yield is what causes the generator to pause. Let's add yield to our generator and give it a try:



