# GAZORKAZORK
A game by Matt, Brannan, Josh, and Rudy.
[http://gazorkazork.netlify.com](http://gazorkazork.netlify.com)

## Data structures ##
LRU cache - Used to store history of player commands.  Player can go through and select previous commands (using up and down arrows) This is a useful structure here because it stops players from seeing duplicate entries in their history, while also keeping their recent commands at the front.

Array - A simple array is used to store history of chat / console output. It's fairly simple, and has been set up with a max capacity so as to not overload users with data. (Oldest entries get removed when the limit is reached.)

Graph - Used in room generation to link room objects together as they are created. Data is stored in a class object for the current room and all connecting rooms as a tuple (x, y), which corresponds to coordinates on a map. This data is also used in conjunction with d3 on the frontend, where it is displayed as an actual, visual graph.