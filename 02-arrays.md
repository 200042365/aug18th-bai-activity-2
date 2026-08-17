# Arrays

## What is an array?

An array is a list of values stored in one variable. Instead of making a separate variable for every item, you keep them all in one place.

```js
const fruits = ["apple", "banana", "orange"];
```

- Arrays use square brackets `[ ]`.
- Items are separated by commas.
- Each item has a position called an **index**.

## How to create an array

```js
// An empty array
const items = [];

// An array of strings
const names = ["Alex", "Sam", "Jordan"];

// An array of numbers
const scores = [10, 25, 40];
```

Arrays can hold any type of value.

## How to read items

Items are accessed by their index. Indexes start at `0`.

```js
const fruits = ["apple", "banana", "orange"];

console.log(fruits[0]); // "apple"
console.log(fruits[1]); // "banana"
console.log(fruits[2]); // "orange"
```

`fruits[0]` is the first item, not `fruits[1]`.

The number of items is given by `length`:

```js
console.log(fruits.length); // 3
```

The last index is `length - 1`:

```js
console.log(fruits[fruits.length - 1]); // "orange"
```

## How to update an item

Assign a new value to an index:

```js
fruits[1] = "grape";
console.log(fruits); // ["apple", "grape", "orange"]
```

## How to add items

`push()` adds an item to the end of the array:

```js
fruits.push("kiwi");
console.log(fruits); // ["apple", "grape", "orange", "kiwi"]
```

## How to remove items

`splice(index, count)` removes items starting at an index:

```js
// Remove 1 item at index 1
fruits.splice(1, 1);
console.log(fruits); // ["apple", "orange", "kiwi"]
```

`pop()` removes the last item:

```js
fruits.pop();
console.log(fruits); // ["apple", "orange"]
```

## Loop through an array with a for loop

A `for` loop repeats the same code once for each item, using an index to read each item:

```js
const fruits = ["apple", "banana", "orange"];

for (let i = 0; i < fruits.length; i++) {
  console.log(i + ": " + fruits[i]);
}

// 0: apple
// 1: banana
// 2: orange
```

- `i` starts at `0` and goes up to `fruits.length - 1`.
- `fruits[i]` reads the item at that index.

## Arrays of objects

An array can hold objects. This is used later when saving structured data:

```js
const notes = [
  { title: "Shopping", text: "Buy milk" },
  { title: "Ideas", text: "Learn arrays" }
];

console.log(notes[0].title); // "Shopping"
```

Each item in the array is an object, and you access its properties with a dot.

---

[Next: Local Storage →](03-local-storage.md)
