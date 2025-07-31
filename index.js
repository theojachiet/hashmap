import { HashMap } from "./hashmap.js";
import { HashSet } from "./hashset.js";

const test = new HashMap();
const set = new HashSet();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('moon', 'silver')
test.set('pear', 'green')
test.set('wood', 'brown')
test.set('soldier', 'dark green')
test.set('fridge', 'gray')
// test.set('pear', 'green')
// test.set('pear', 'green')
// test.set('pear', 'green')


// console.log(test.remove('ice cream'));

// console.log(test.entries());

// console.log(test.values())

set.set('apple')
set.set('banana')
set.set('carrot')
set.set('dog')
set.set('elephant')
set.set('frog')
set.set('grape')
set.set('hat')
set.set('ice cream')
set.set('moon')
set.set('pear')
set.set('wood')
set.set('soldier')
set.set('fridge')

console.log(set.entries());

set.remove('moon');

console.log(set.keys());