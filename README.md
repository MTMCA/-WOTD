# -WOTD
Binance WOTD guess scripts. Calculate correct vocabulary using dictionaries and rules. For entertainment purposes only

This library runs on the command line of Node.js, The first you need install node.js

This library uses the vocabulary clues provided by Binance to search for eligible words in the English lexicon
Set a length parameter in the first round to obtain a list of words that meet the specified length (it is recommended to choose a word that does not repeat letters, which can provide more possible prompt information)
```
len = 8; // if the word need length 8. It is located at line __198__ of the *wordExp.js* file
```
```
right = []; 
```
- run Scripts. **node wordExp.js**
```
node wordExp.js
```
- Select a word from the word field list output by the controller that is as unique as possible and fill it in the WOTD first opportunity

---

1. After receiving the prompt, create a right rule based on the type of prompt. In right, there are three fields: name is an English letter, state is a prompt rule type, and position is the index position of the letter in the word. The default index is 0. For example, if the word length requirement is 8, the index range is 0-8

2. In the right rule, there are four types: OK for correct position, AVAIABLE for incorrect position but correct word, BLOCKED for positions where letters are not allowed, INVALID for unused letters.

---
```
[
  {name: "A", state: Task.authType.OK, position: []}, // The A position is correct and the letters are correct
  {name: "A", state: Task.authType.AVAIABLE, position:[]}, // The letter A is correct and must contain that letter
  {name: "A", state: Task.authType.BLOCKED, position: [2,3,4]}, // The letter A is correct, but it should not appear in index positions 2, 3, and 4
  {name: "A", state: Task.authType.INVALID, position:[]} // The letter A is invalid, the word does not contain that letter
]
```

### The name value can be defined repeatedly in multiple conditions
This is a complete set of right rules
```
{
  len: 7,
  right: [
        {
            name: "A",
            state: Task.authType.OK,
            position: [0]
        },
        {
            name: "I",
            state: Task.authType.OK,
            position: [1]
        },
        {
            name: "R",
            state: Task.authType.BLOCKED,
            position: [5]
        },
        {
            name: "R",
            state: Task.authType.OK,
            position:[2]
        },
        {
            name: "I",
            state: Task.authType.AVAIABLE,
            position:[]
        },
        {
            name: "P",
            state: Task.authType.AVAIABLE,
            position: []
        },
        {
            name: "O",
            state: Task.authType.AVAIABLE,
            position: []
        },
        {
            name: "P",
            state: Task.authType.BLOCKED,
            position: [3]
        },
        {
            name: "O",
            state: Task.authType.BLOCKED,
            position: [4]
        },
        {
            name: "I",
            state: Task.authType.BLOCKED,
            position:[4]
        },
        {
            name: "S",
            state: Task.authType.INVALID,
            position: []
        },
        {
            name: "E",
            state: Task.authType.INVALID,
            position: []
        },
        {
            name: "V",
            state: Task.authType.INVALID,
            position: []
        },
        {
            name: "C",
            state: Task.authType.INVALID,
            position: []
        },
        {
            name: "T",
            state: Task.authType.INVALID,
            position: []
        },
    ],
  word: []
}
```

### By using the above rules to execute the command `node wordExp.js`, the following result can be obtained

```
{
  len: 7,
  word: [ 'airdrop' ],
  right: [
    [ [Object] ],
    { name: 'A', state: 1, position: [Array] },
    { name: 'I', state: 1, position: [Array] },
    { name: 'R', state: 3, position: [Array] },
    { name: 'R', state: 1, position: [Array] },
    { name: 'I', state: 2, position: [] },
    { name: 'P', state: 2, position: [] },
    { name: 'O', state: 2, position: [] },
    { name: 'P', state: 3, position: [Array] },
    { name: 'O', state: 3, position: [Array] },
    { name: 'I', state: 3, position: [Array] },
    { name: 'S', state: 4, position: [] },
    { name: 'E', state: 4, position: [] },
    { name: 'V', state: 4, position: [] },
    { name: 'C', state: 4, position: [] },
    { name: 'T', state: 4, position: [] }
  ]
}
```
#### You can see in Word that our accurate result is `airport`
