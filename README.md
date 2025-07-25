# WordSpeed

WordSpeed is a front-end developed word game in which you use the standard set of Scrabble tiles (minus the two empty ones) to create as many words as possible until the timer runs out. You create words using your deck of 8 tiles, which restacks when you use up letters or swap them out.

![image](https://user-images.githubusercontent.com/13445675/154548317-cae65d34-bc23-4532-8dc6-f99cec7aa43c.png)

## Technologies

- React.js
- TypeScript

## Design Considerations

The flipped tiles are represented as a linked list to make the insertion of swapped tiles run significantly faster as opposed to an array which shifts every other element over, depending on the number of tiles the user wants to swap.

The tiles in your deck are initialized as a linked list, but generate into a map for quicker reference when using a tile for your drafted word. I may change this so there's no need to use one for this particular part; it's only important that the flipped tiles is a linked list.

## TO DO

- Make the full app with high-scores, menu, localhost...

- Remove @ts-ignore lines, see if I can handle this in the linter + make linter config make sense
- Make mobile friendly
- Design - consider making a notepad + coffee cup, as well as an effect when tiles are used/shake the currWord deck when something is wrong
- Implement power-up tiles (Or maybe do this for the paid app)
