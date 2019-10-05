# game-of-life
Game of Life in Preact: https://englishaw.github.io/game-of-life/

React/Preact isn't really meant to handle things like a controlled render loop so this is a bit of a hack but works for a simple Game of Life example. Inorder to create a game loop we will queue the next game step on render, if the game is running and a game step has not already been queued. We use useRefs to avoid unneeded renders when managing the game step queuing.


### Future Features
- User defined width and height cell count for grid
- User defined cell size in pxs
- Save cell state before running so user can quickly loop back
- Save a limited history of cell states to play in reverese
