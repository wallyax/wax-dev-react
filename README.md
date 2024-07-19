# WAX Dev Testing Framework

## Description
A lightweight and extensive automated accessibility testing framework

As a part of the WallyAX ecosystem accessibility tools, this package helps run accessibility tests on React App.

## Installation
Install the package using npm:
```sh
npm install @wally-ax/wax-dev-react
```
Or using yarn:
```sh
yarn add @wally-ax/wax-dev-react
```

## Dependencies 

Install the React Dom package using npm:
```sh
npm install react-dom
```
Or using yarn:
```sh
yarn add react-dom
```

## Usage
### Configuration
In your React Application, in the main entry file (typically App.js):

import the ReactDOM and runWax Module

```sh
import ReactDOM from 'react-dom';
import runWax from '@wally-ax/wax-dev-react'
```
Add the following at the top of your component in the same file:
```
const waxConfig = {
    rules: [],
    apiKey: "YOUR_WALLY_DEVELOPER_API_KEY",
  };
runWax(React, ReactDOM, waxConfig);
```
rules: An array of strings representing rule definitions. Available rules can be found [here]("https://kb.wallyax.com/docs/wax-dev/rules"). An empty array will include all rules.

apiKey: A string required for the wax-dev to work. You can get the api key from [WallyAX Developer Portal](https://developer.wallyax.com)



### Results
The results will be displayed in your browser's Developer console.

![Wax Dev React in action](https://assets2.wallyax.com/common/wax-dev-react-in-action.png
)

If there is no accessibility issues, it will say No issues found

![Wax Dev React with no issues](https://assets2.wallyax.com/common/wax-dev-react-no-issues.png)

## License
Mozilla Public License Version 2.0 (see license.txt)

WAX Dev React is licensed as Mozilla Public License Version 2.0 and the copyright is owned by Wally Solutions Pvt Ltd and Contributors.

By contributing to WAX Dev React, you agree that your contributions will be licensed under its Mozilla Public License Version 2.0.