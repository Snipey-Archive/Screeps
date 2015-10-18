/**
 * A simple miner.
 *
 * Moves to a source and collects the energy,
 * then returns to base when full.
 *
 * Really you should only make one of this, wait until it's phased out by miners and haulers.
 */
module.exports = function() {
    var upgrader = {
            parts: [
                [WORK, CARRY, MOVE, CARRY, MOVE],
                [MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, WORK, CARRY, WORK],
                [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY],
                [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY]
            ],

            costs: [
                300,
                550,
                700,
                1000
            ]
    };

    upgrader.getPartsForExtensionCount = function(count) {
        console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

    upgrader.getParts = function() {
        return this.getPartsForExtensionCount(0)
    },

    upgrader.getCostForExtensionCount = function(count) {
        return this.costs[count]
    },

    upgrader.getCost = function() {
        return this.getCostForExtensionCount(0)
    },

    upgrader.performRole = function(CreepRole, creep) {
        if (creep.ticksToLive < 20) {
            var storage = creep.room.storage;
            creep.moveTo(storage);
            if (creep.energy > 0) {
                creep.transferEnergy(storage);
            }
            else if (creep.energy === 0) {
                creep.suicide();
            }
        }

        if (creep.carry.energy === 0) {
            creep.memory.state = "pickup";
        }
        if (creep.carry.energy === creep.carryCapacity || creep.memory.state === undefined) {
            creep.memory.state = "work";
        }
        if (creep.memory.state === 'pickup') {
            var storages = creep.room.find(FIND_MY_STRUCTURES, {
                filter: function (s) {
                    return s.structureType == STRUCTURE_STORAGE && s.store.energy > 0;
                }
            });

            if (storages.length > 0) {
                creep.moveTo(storages[0]);
                storages[0].transferEnergy(creep);
            }
        }
        else if (creep.memory.state === 'work') {
            var spawn = Game.spawns.Spawn1;
            creep.moveTo(spawn.room.controller);
            creep.upgradeController(spawn.room.controller);
        }
    }
    return upgrader;
}