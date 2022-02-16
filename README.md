# WordSpeed
WordSpeed is a front-end developed word game in which you use the standard set of Scrabble tiles (minus the two empty ones) to create as many words as possible until the timer runs out. You create words using your deck of 8 tiles, which restacks when you use up letters or swap them out.

## Technologies
- React.js
- TypeScript

## Design Considerations
The flipped tiles are represented as a linked list to make the insertion of swapped tiles run significantly faster as opposed to an array which shifts every other element over, depending on the number of tiles the user wants to swap.

The tiles in your deck are initialized as a linked list, but generate into a map for quicker reference when using a tile for your drafted word.

## To do
- Fix score counter
- Fix bug where entering a word will show the "Cannot be less than 2 characters" error
- Consider using keyCode instead of key
- Cleanup some areas
- Make more modern design
- Ensure user can type anywhere on the screen instead of just the bottom part