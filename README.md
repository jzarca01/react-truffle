# react-truffle

It is just a todo-list working with smart contracts

## Prerequisites

```
npm install
```

and the chrome extension https://metamask.io/

## How to run

1st console: testrpc
- copy seed words to metamask and be sure to select localhost:8545 as provider
  
2nd console: truffle compile && truffle migrate --reset
- Then copy build/contracts/*.json to src/build/contracts/
  
3rd console: npm start
