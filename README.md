# WordSpeed

WordSpeed is a word game in which you use the standard set of Scrabble tiles (minus the two empty ones) to create as many words as possible until the timer runs out. You create words using your deck of 8 tiles, which restacks when you use up letters or swap them out.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Technologies
- React.js
- TypeScript

## Design Considerations

The flipped tiles are represented as a Linked List to make the insertion of swapped tiles run significantly faster as opposed to an array which shifts elements over per tile used.

The tiles in your deck are initialized as an array, but generate into a map for quicker reference when using a tile for your drafted words.