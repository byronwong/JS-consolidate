Control statements
==================

## IF Statments
Check the condition whether TRUE/FALSE
```js
	if (condition){
		// true ...
	} else if (condition) {
		// false ...
	} else {
		// false ...
	}
```

### Falsy Values - values that will return false
>	null
>	undefined
>	NaN - not a number
>	"" - empty string
>	0

> Everything else is truthy


### Conditional or ternairy operator
>	condition ? ifTrue : ifFalse

If condition is true, the operator returns the value of expr1;
otherwise, it returns the value of expr2.
```js
	var y = x < 10 ? x : 10;
```

## Switch 
```js
  var animal = "dog";

  switch(animal) {

    case "cat":
      console.log("meow");
      break; // closes the statement

    case "dog":
      console.log("Bark");
      break;

    default:
      console.log("silence");
      break; 
  }
```
