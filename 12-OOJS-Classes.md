# Classes

## Resources 
- [Pluralsight course material](http://next.plnkr.co/edit/J81EK3TWFof0ekhEnyiJ?p=preview)
- [Object visualizer](http://www.objectplayground.com/)

## Other notes
- Always use strict mode

## ES5 Simple Class
```js
  function Plane(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  // methods "inherited" by all instances
  Plane.prototype.startEngines = function () {
    console.log('starting engines...');
    this.enginesActive = true;
  };

  const richardsPlane = new Plane(1);
  richardsPlane.startEngines();

  const jamesPlane = new Plane(4);
  jamesPlane.startEngines();
```

## ES5 Super and Sub Class
```js
  function Tree(size, leaves) {
    this.size = (typeOf size === "undefined")? 10 : size;
    const defaultLeaves = {spring: 'green', summer: 'green', fall: 'orange', winter: null};
    this.leaves = (typeOf leaves === "undefined")?  defaultLeaves : leaves;
    this.leafColor;
  }

  Tree.prototype.changeSeason = function(season) {
    this.leafColor = this.leaves[season];
    if (season === 'spring') {
      this.size += 1;
    }
  }

  function Maple (syrupQty, size, leaves) {
    Tree.call(this, size, leaves);
    this.syrupQty = (typeOf syrupQty === "undefined")? 15 : syrupQty;
  }

  Maple.prototype = Object.create(Tree.prototype);
  Maple.prototype.constructor = Maple;

  Maple.prototype.changeSeason = function(season) {
    Tree.prototype.changeSeason.call(this, season);
    if (season === 'spring') {
      this.syrupQty += 1;
    }
  }

  Maple.prototype.gatherSyrup = function() {
    this.syrupQty -= 3;
  }

  const myMaple = new Maple(15, 5);
  myMaple.changeSeason('fall');
  myMaple.gatherSyrup();
  myMaple.changeSeason('spring');

```

## ES6 simple class

```js 
  class Plane {
    constructor(numEngines) {
      this.numEngines = numEngines;
      this.enginesActive = false;
    }

    startEngines() {
      console.log('starting engines…');
      this.enginesActive = true;
    }
  }
```

## ES6 Super and Subclass
```js
  class Tree {
    // constructor using ES6 Defaults 
    constructor(size = '10', leaves = {spring: 'green', summer: 'green', fall: 'orange', winter: null}) {
      this.size = size;
      this.leaves = leaves;
      this.leafColor = null;
    }

    // method instead of using prototypes
    changeSeason(season) {
      this.leafColor = this.leaves[season];
      if (season === 'spring') {
        this.size += 1;
      }
    }
  }

  // Notice now Maple 'extends'
  class Maple extends Tree {
    
    // Maple's constructor
    constructor(syrupQty = 15, size, leaves) {

      // NOTE: call to the Tree constructor first
      super(size, leaves);
      this.syrupQty = syrupQty;
    }

    // Methods on the Maple class
    changeSeason(season) {
      // extends tree changeSeason method
      super.changeSeason(season);
      if (season === 'spring') {
        this.syrupQty += 1;
      }
    }

    gatherSyrup() {
      this.syrupQty -= 3;
    }
  }

  const myMaple = new Maple(15, 5);
  myMaple.changeSeason('fall');
  myMaple.gatherSyrup();
  myMaple.changeSeason('spring');

```

### ⚠ Where Are All The Commas?
Did you notice that there aren't any commas between the method definitions in the Class? Commas are not used to separate properties or methods in a Class. If you add them, you'll get a SyntaxError of unexpected token.


### Static methods
To add a static method, the keyword static is placed in front of the method name. Look at the badWeather() method in the code below.

```js
  class Plane {
    constructor(numEngines) {
      this.numEngines = numEngines;
      this.enginesActive = false;
    }

    static badWeather(planes) {
      for (plane of planes) {
        plane.enginesActive = false;
      }
    }

    startEngines() {
      console.log('starting engines…');
      this.enginesActive = true;
    }
  }

  // See how badWeather() has the word static in front of it while startEngines() doesn't? That makes badWeather() a method that's accessed directly on the Plane class, so you can call it like this:

  Plane.badWeather([plane1, plane2, plane3]);

```


### ⚠️ super must be called before this
In a subclass constructor function, before this can be used, a call to the super class must be made.
super replaces Object.create() allowing you to call the super class constructor.

```js
  class Apple {}
  class GrannySmith extends Apple {
    constructor(tartnessLevel, energy) {
      this.tartnessLevel = tartnessLevel; // `this` before `super` will throw an error!
      super(energy); 
    }
  }
```

## Getters and Setters
This is a ES5 feature:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set

```js
  // syntax pattern
  {get prop() { ... } }
  {get [expression]() { ... } }

  // Example
  var privatePrice = 0;

  var myObj = {
    privatePrice,
    get price(){
      return this.privatePrice;
    },
    set price(newPrice) {
      this.privatePrice = newPrice;
    }
  };

  console.log(myObj);

  myObj.price = 45;
  console.log(myObj.price);
```
