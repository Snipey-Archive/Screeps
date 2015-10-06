/**
 * Created by Snipey on 10/4/2015.
 */

module.exports = function (p_room) {
//for E4N9
    var countCreeps = require('countCreeps');
    var util = require('util');

    var harvesters = p_room.memory.harvester_count;
    var transports = p_room.memory.transport_count;
    var upgraders = p_room.memory.upgrader_count;

    var MAX_TRANSPORTS = 2;
    var MAX_UPGRADERS = 2;
    var MAX_HARVESTERS = 2;

    //var explorerDestination = 'W11S26';

    /*    if(typeof Game.rooms[p_room].memory.harvester_counter === 'undefined') {
     Game.rooms[p_room].memory.harvester_counter = 0;
     }*/

    // count creeps
    countCreeps(util.getCreepsInRoom(p_room), p_room);

    // calculate MAX #'s

    // report stats
    console.log('There are currently ' + harvesters + ' harvesters and ' + transports + 'transports');

    if (harvesters < MAX_HARVESTERS) {
        Game.spawns.Spawn1.createCreep([WORK, WORK, MOVE, MOVE], null, {
            role: "harvester",
        });
    }
    if (transports < MAX_TRANSPORTS) {
        Game.spawns.Spawn1.createCreep([MOVE, MOVE, MOVE, CARRY, CARRY, CARRY], null, {
            role: "transport",
        });
    }
    if (upgraders < MAX_UPGRADERS) {
        Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, CARRY, MOVE], null, {
            role: "upgrader",
        });
    }
    //JSON.stringify(Game.spawns.Spawn1.pos.findInRange(FIND_SOURCES_ACTIVE, 30));
}

