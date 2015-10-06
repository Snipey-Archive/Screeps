/**
 * Created by Snipey on 10/4/2015.
 */

var bodies = {
    turretBody: {
        300: [MOVE, RANGED_ATTACK],
        550: [MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK],
        700: [MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
        1000: [MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK]
    },
    harvesterBody: {
        300: [WORK, WORK, MOVE, MOVE],
        550: [MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK],
        700: [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, WORK],
        1000: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, CARRY, CARRY, MOVE]
    },
    builderBody: {
        300: [WORK, CARRY, MOVE, CARRY, MOVE],
        550: [MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, WORK, CARRY, WORK],
        700: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY],
        1000: [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY]
    },
    upgraderBody: {
        300: [WORK, CARRY, MOVE, CARRY, MOVE],
        550: [MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, WORK, CARRY, WORK],
        700: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY],
        1000: [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY]
    },
    guardBody: {
        300: [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK],
        550: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK],
        700: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK],
        1000: [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK]
    },
    mechanicBody: {
        300: [MOVE, MOVE, WORK, CARRY, CARRY],
        550: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY],
        700: [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY],
        1000: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]
    },
    transportBody: {
        300: [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY],
        550: [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE],
        700: [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE],
        1000: [MOVE, MOVE, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, CARRY]
    },
    archerBody: {
        300: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, RANGED_ATTACK],
        550: [MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
        700: [MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
        1000: [MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK]
    },
    healerBody: {
        300: [MOVE, HEAL],
        550: [MOVE, HEAL, HEAL],
        700: [TOUGH, MOVE, MOVE, MOVE, HEAL, HEAL],
        1000: [TOUGH, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL]
    }
}
module.exports = function (p_room) {
//for E4N9
    var harvesters = 0;
    var transports = 0;
    var upgraders = 0;

    var MAX_TRANSPORTS = 2;
    var MAX_UPGRADERS = 2;
    var MAX_HARVESTERS = 2;

    //var explorerDestination = 'W11S26';

    /*    if(typeof Game.rooms[p_room].memory.harvester_counter === 'undefined') {
     Game.rooms[p_room].memory.harvester_counter = 0;
     }*/

    // count creeps
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            harvesters += 1;
        }
        if (creep.memory.role == 'transport') {
            transports += 1;
        }
        if (creep.memory.role == 'upgrader') {
            transports += 1;
        }
    }

    // calculate MAX #'s

    // report stats
    console.log('There are currently ' + harvesters + ' harvesters and ' + transports + 'transports');
    /*
     var spawn3 = Game.spawns.Spawn3;
     var room2 = Game.spawns.Spawn3.room;
     countCreeps(spawn3, room2);
     var room2Name = Game.spawns.Spawn3.room.name;
     */

    //var harvesterNeed = 8 - harvesterCount;

    /*if (checkEnemys.length > 0) {
     needAllCreepsInRoom = 14;
     guardNeed = 4 - guardCount;
     archerNeed = 1 - archerCount;
     healerNeed = 1 - healerCount;
     turretNeed = 5 - turretCount;
     }*/

//	I have 3 types: 300, 550, 700, 1000.

    function calcEnergy(room) {
        if (room.energyCapacityAvailable >= 1000) {
            return 1000;
        }
        else if (room.energyCapacityAvailable >= 700) {
            return 700;
        }
        else if (room.energyCapacityAvailable >= 550) {
            return 550;
        }
        else if (room.energyCapacityAvailable >= 300) {
            return 300;
        }
    }

    function deleteCreeps() {
        for (var creep in Memory.creeps) {
            if (!Game.creeps[creep]) {
                if (Memory.creeps[creep].safeToDelete) {
                    delete Memory.creeps[creep];
                }
                else {
                    Memory.creeps[creep].safeToDelete = true;
                }
            }
        }
    }

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

