
# Blockchat!

A physics simulation chat program! All messages are anonymous and displayed in a 2d world, falling to the ground and stacking up on each other.

I threw this together in a few hours with socket.io and ReactJS. The physics is done with [matter.js](http://brm.io/matter-js/).

A demo should hopefully be running at http://blockchat.tablekat.net:3078/

## Images

![Example](http://i.imgur.com/4wFUYSN.gif)

![Example](http://i.imgur.com/6kkJhGx.png)

![Example](http://i.imgur.com/zc8YOXw.png)

## To Install

Run the following command in this folder:

    npm install

And again, this time in wwwsrc folder:

    npm install

### To Build

To build the server, run in this folder:

    npm run tsc

To build the client, run in wwwsrc:

    npm run build

To rebuild on updates to the client:

    npm run watch


# To run

In this folder:

    npm run start

Then open your browser to http://localhost:3078/
