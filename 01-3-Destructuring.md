# Destructuring

## Resources

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

## Destructuring an object from an array of objects

```js
const [a, ...c] = [
  {
    id: 42,
    displayName: "jdoe",
    fullName: {
      firstName: "John",
      lastName: "Doe",
    },
  },
  2,
  3,
  4,
  5,
];

console.log(a); // returns the object
console.log(c); // return rest of array
```

## Destructuring a property from an object in an array of objects

Here the first item is an object destructure followed by rest

```js
const props = [
  { id: 1, name: "Fizz" },
  { id: 2, name: "Buzz" },
  { id: 3, name: "FizzBuzz" },
];

const [, , { name: a }] = props; // note here we are skipping the first 2 entries of the array

console.log(a); // "FizzBuzz"
```

## Destructuring a nested property from an object

```js
const user = {
  id: 42,
  displayName: "jdoe",
  fullName: {
    firstName: "John",
    lastName: "Doe",
  },
};

const {
  id,
  fullName: { firstName: a },
} = user;

console.log(a); // "John"
```
