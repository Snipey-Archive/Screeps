/**
 * Created by Snipey on 10/24/2015.
 */
"use strict";
module.exports = function () {
    let rooms = Game.rooms
    for(var i in rooms){
        let room = Game.rooms[i]
        let controllerTick = room.controller.progress - Memory.controllerTick;
        Memory.controllerTick = room.controller.progress;
        let ticksLeft = room.controller.progressTotal - room.controller.progress;
        ticksLeft = ticksLeft / controllerTick;
        ticksLeft = ticksLeft.toFixed(0);
        let controllerProgress = (room.controller.progress / room.controller.progressTotal) * 100;
        controllerProgress = +controllerProgress.toFixed(2);
        //delay 50 to print status
        console.log('Controller upgrade progress: ' + controllerProgress + "%");
        var ticks = ticksLeft;

        var hh = Math.floor( (ticks / 1800) );
        var mm = Math.floor( (ticks % 1800) / 30);
        var ss = (ticks % 1800) % 30;

        //alert( hh + ":" + mm + ":" + ss );
        console.log(' ~ ' + hh + " hours, " + mm + " minutes, " + ss + " seconds ");
    }
};