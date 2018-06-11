# Prototypal Inheritance and Classes

> We'll go on a journey to get to Pseudoclassical Classes.

## Resources
http://www.objectplayground.com/

## Decorator function pattern
We start off with the decorator function takes an object and modifies it and then returns it. 

```js
  let carLike = function(obj, loc) {
    obj.loc = loc;

    obj.move = function() {
      obj.loc ++;
    };

    return obj;
  }
  let myCar = carLike({}, 1); // returns {loc: 1};
```

## Functional class pattern 
Building on the decorator pattern, the class pattern is capable of creating a fleet of the same object.
Here `Car` is a constructor function. 

```js
  let Car = function(loc) {

    let obj = {
      loc: loc,
      move: function() {
        obj.loc ++;
      }
    }

    return obj;
  };
```


## Using Functional shared pattern
As we have seen each object gets its own move function, this means we are duplicating code.
It would be far better if we could abstract out the code.

```js
  let Car = function(loc) {

    let obj = {
      loc: loc,
      move: move
    }

    return obj;
  };

  // ⚠ The method is define out of the Class (optional)
  var move = function() {
    this.loc ++;
  }
```


Whats clear here is that we have to use move twice here. We could try and encapsulate the move function:
```js
  let Car = function(loc) {

    let obj = {
      loc: loc,
      move: move
    }

    return obj;
  };

  // ⚠ People often forget that functions are objects and thus can have properties.
  // however when you invoke that function properties don't interact with that invocation.
  Car.methods{
    move: function() {
      this.loc ++;
    }
  } 
```

### Functional pattern with superclass
```js 
  // This would be our superclass
  let Car = function(loc) {
    let obj = {
      loc: loc,
      move: move
    }
    return obj;
  };

  // And these would be the subclasses
  let Van = function() {
    var obj = Car(loc); // creating a car object.

    // extending the object to have specific methods
    obj.grab = function() {
      ...
    }
    return obj;
  };

```



## Prototypal Classes
```js

  let Car = function(loc) {
    // We are creating an object with a prototype base on a passes in object
    let obj = Object.create(Car.prototype);
    obj.loc = loc;
    return obj;
  };

  // an object with methods
  Car.prototype.move = {
    move: function() {
      this.loc ++;
    }
  }

```


## Pseudoclassical Pattern
> ⚠ The Pseudoclassical pattern is very similar to Prototypal pattern, the `new` keyword is essentially adding `Object.create(Car.prototype)` and `return obj` parts automatically so we don't have to declare them ourselves. 

```js 
  // A common example is this:
  // The problem here is that the .sayName function will be duplicated for each object created.
  function Cat() {
    this.lives = 9;

    this.sayName = function () {
      console.log(`Meow! My name is ${this.name}`);
    };
  }

  // Here is a better model to move all shared methods to the prototype.
  let Car = function(loc){
    this.loc = loc;
  };

  Car.prototype.move = function() {
    this.loc ++;
  };

  // Run this with `new` keyword
  let myCar = new Car(1);

```


## Superclass and Subclasses
Say we have two classes that are identical except for one or two specialist methods.
We can create a superclass to hold all the shared methods, and let the two subclasses define their unique methods.

```js
  // Creating our superclass
  let Car = function(loc){
    this.loc = loc;
  };

  Car.prototype.move = function() {
    this.loc ++;
  };

  let Van = function(loc) {
    // here we are invoking the Car class, and passing in the Van's instance of this.
    // if we didn't we would get this = Car's this.
    Car.call(this, loc);

    // Currently the .move method belongs to the Car.prototype
    // Van.prototype is chained to Object.prototype
    // What we need to do is link the Van.prototype to the Car.prototype
    // Chain amy > Van.proto > Car.proto > Object.proto
  };

  Van.prototype = Car.prototype;  // We don't want to do this as any updates we make to Van.prototype will be added actually to Car.prototype.

  Van.prototype = new Car(); // We also don't want to do this as creating a Car object with no arguments means we can't use dot access as all the properties are set to undefined.
  
  Van.prototype = Object.create(Car.prototype); // This is ideal, here we are delegating the failed lookups to Car.prototype. 

  // By delegating the Van.prototype to the Car.prototype we lost the Van.prototype object that comes free. That Van.prototype also came with an important property `constructor`. So as it stands amy.constructor = Car. To fix this we can do:
  Van.prototype.constructor = Van;

  Van.prototype.grab = function(){...}; 

  var amy = new Van(9);
  amy.move();
  amy.grab();

```


## Finding Properties and Methods on the Prototype Chain
Whether you're accessing a property (e.g., bailey.lives;) or invoking a method (i.e., bailey.meow();), the JavaScript interpreter looks for them along the prototype chain in a very particular order:

- First, the JavaScript engine will look at the object's own properties. 
- If it doesn't find the property in question, it will then search the object's constructor's prototype for a match.
- If the property doesn't exist in the prototype, the JavaScript engine will continue looking up the chain.
- At the very end of the chain is the Object() object, or the top-level parent. If the property still cannot be found, the property is undefined.



## Replacing the prototype Object
What happens if you completely replace a function's prototype object? How does this affect objects created by that function? Let's look at a simple Hamster constructor function and instantiate a few objects:

```js
  function Hamster() {
    this.hasFur = true;
  }

  let waffle = new Hamster();

  // First, note that even after we make the new objects, waffle and pancake, we can still add properties to Hamster's prototype and it will still be able to access those new properties.

    Hamster.prototype.eat = function () {
    console.log('Chomp chomp chomp!');
  };

  waffle.eat(); // 'Chomp chomp chomp!'

  // Now, let's replace Hamster's prototype object with something else entirely:
  Hamster.prototype = {
    isHungry: false,
    color: 'brown'
  };

  console.log(waffle.color); // undefined
  waffle.eat(); // 'Chomp chomp chomp!'

  // The previous objects don't have access to the updated prototype's properties; they just retain their secret link to the old prototype, however new object created after the changes pick up the new prototype.

```

## hasOwnProperty()
hasOwnProperty() allows you to find the origin of a particular property. 

## isPrototypeOf()
Objects also have access to the isPrototypeOf() method, which checks whether or not an object exists in another object's prototype chain. 

## Object.getPrototypeOf()
isPrototypeOf() works well, but keep in mind that in order use it, you must have that prototype object at hand in the first place! 

## The constructor Property
Each time an object is created, a special property is assigned to it under the hood: `constructor`. Accessing an object's constructor property returns a reference to the constructor function that created that object in the first place! 



### What About Just Inheriting the Prototype?
Let's say we want a Child object to inherit from a Parent object. Why shouldn't we just set? `Child.prototype = Parent.prototype?`

First, recall that objects are passed by reference. This means that since the `Child.prototype` object and the `Parent.prototype` object refer to the same object -- any changes you make to Child's prototype will also be made to Parent's prototype! 

On top of all this, no prototype chain will be set up. What if we want an object to inherit from any object we want, not just its prototype?

We still need a way to efficiently manage inheritance without mutating the prototype at all.


## Object.create()
At this point, we've reached a few roadblocks when it comes to inheritance. First, even though __proto__ can access the prototype of the object it is called on, using it in any code you write is not good practice.

What's more: we also shouldn't inherit only the prototype; this doesn't set up the prototype chain, and any changes that we made to a child object will also be reflected in a parent object.

So how should we move forward?

There's actually a way for us to set up the prototype of an object ourselves: using Object.create(). And best of all, this approach lets us manage inheritance without altering the prototype!

Object.create() takes in a single object as an argument, and returns a new object with its __proto__ property set to what argument is passed into it. From that point, you simply set the returned object to be the prototype of the child object's constructor function.


```js
  // First, let's say we have a mammal object with two properties: vertebrate and earBones:
  const mammal = {
    vertebrate: true,
    earBones: 3
  };

  const rabbit = Object.create(mammal);
  // We expect the new rabbit object to be blank, with no properties of its own:

  console.log(rabbit); // {}

  // However, rabbit should now be secretly linked to mammal. That is, its __proto__ property should point to mammal:

  console.log(rabbit.__proto__ === mammal); // true

  // Great! This means that now, rabbit extends mammal (i.e., rabbit inherits from mammal). As a result, rabbit can access mammal's properties as if it were its own!

  console.log(rabbit.vertebrate); // true

  console.log(rabbit.earBones); // 3

```
Object.create() gives us a clean method of establishing prototypal inheritance in JavaScript. We can easily extend the prototype chain this way, and we can have objects inherit from just about any object we want!



