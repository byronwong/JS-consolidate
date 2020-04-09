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

console.log(a); // returns object
console.log(c); // return rest of array
```

## Destructuring a property from an object in an array of objects

Here the first item is an object destructure followed by rest

```js
const [
  {
    fullName: { firstName: a },
  },
  ...c
] = [
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
console.log(a); // returns 'John'
console.log(c); // return rest of array
```
