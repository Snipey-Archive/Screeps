
/**
 * Created by Snipey on 10/18/2015.
 */

/**
 * A simple miner.
 *
 * Moves to a source and collects the energy,
 * then returns to base when full.
 *
 * Really you should only make one of this, wait until it's phased out by miners and haulers.
 */
module.exports = function() {
    var builder = {
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

    builder.getPartsForExtensionCount = function(count) {
        console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        builder.getParts = function() {
            return this.getPartsForExtensionCount(0)
        },

        builder.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        builder.getCost = function() {
            return this.getCostForExtensionCount(0)
        },

        builder.performRole = function(CreepRole, creep) {
            var spawn = Game.spawns.Spawn1;
                if (creep.ticksToLive < 30) {
                    var storage = creep.pos.findClosestByRange(FIND_MY_SPAWNS)
                    creep.moveTo(storage);
                    if (creep.energy > 0) {
                        creep.transferEnergy(storage);
                    }
                    else if (creep.energy === 0) {
                        creep.suicide();
                    }
                }
                if (creep.memory.state === undefined || creep.carry.energy === 0) {
                    creep.memory.state = "pickup";
                }
                if (creep.carry.energy === creep.carryCapacity) {
                    creep.memory.state = "work";
                }

                if (creep.memory.state === 'pickup') {
                    var storage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: function(object) {
                            return object.structureType == STRUCTURE_STORAGE && object.store.energy > 0;
                        }
                    });
                    if (storage) {
                        creep.moveTo(storage);
                        storage.transferEnergy(creep);
                        return;
                    }
                    var extension = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: function(object) {
                            return object.structureType == STRUCTURE_EXTENSION && object.energy > 0;
                        }
                    });
                    if (extension) {
                        creep.moveTo(extension);
                        extension.transferEnergy(creep);
                        return;
                    }
                    if (spawn.energy > 10) {
                        creep.moveTo(spawn);
                        spawn.transferEnergy(creep);
                        return;
                    }                }
                else if (creep.memory.state === 'work') {
                    if (creep.memory.target) {
                        var target = Game.getObjectById(creep.memory.target);
                        if (target && target.hits < (creep.memory.targetHits ? creep.memory.targetHits : target.hitsMax)) {
                            creep.say(target.structureType);
                            creep.moveTo(target);
                            creep.repair(target);
                        } else {
                            creep.memory.target = null;
                        }
                        return;
                    }

                    if (spawn.hits < spawn.hitsMax) {
                        creep.moveTo(spawn);
                        creep.repair(spawn);
                        return;
                    }

                    var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);

                    if (constructionSites.length) {
                        if (!creep.pos.inRangeTo(constructionSites[0].pos, 1)) {
                            creep.moveTo(constructionSites[0]);
                        }
                        creep.build(constructionSites[0]);
                        var progress = constructionSites[0].progress
                        var progressTotal = constructionSites[0].progressTotal
                        var percent = Math.round(progress * 100 / progressTotal)
                        //console.log('Construction progress of ' + constructionSites[0].name + ' is ' + percent + '%')
                        return;
                    }

                    var newStructures = creep.room.find(FIND_STRUCTURES, {
                        filter: function(object) {
                            return (object.structureType == STRUCTURE_RAMPART || object.structureType == STRUCTURE_WALL) && (object.hits < object.hitsMax * 0.25);
                        }
                    });
                    if (newStructures.length) {
                        if (!creep.pos.inRangeTo(newStructures[0].pos, 1)) {
                            creep.moveTo(newStructures[0]);
                        }
                        creep.repair(newStructures[0]);

                        return;
                    }


                    var walls = creep.room.find(FIND_STRUCTURES, {
                        filter: function(object) {
                            return object.structureType == STRUCTURE_WALL && object.hits < 100000;
                        }
                    });
                    if (walls.length) {
                        creep.moveTo(walls[0]);
                        creep.repair(walls[0]);
                        return;
                    }
                }
        }
    return builder;
}

