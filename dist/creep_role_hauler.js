
/**
 * A carrier of energy.
 *
 * Moves to a nearby miner and collects energy from it, then brings it back to the base.
 */
//var profiler = require('profiler')
module.exports = function () {
    var hauler = {
        parts: [
            [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY],
            [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE],
            [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE],
            [MOVE, MOVE, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, CARRY]
        ],

        costs: [
            300,
            550,
            700,
            1000
        ]
    }

    hauler.getPartsForExtensionCount = function (count) {
        console.log("Parts By Extension: " + this.parts[count])
        return this.parts[count]
    },

        hauler.getParts = function () {
            return this.getPartsForExtensionCount(1)
        },

        hauler.getCostForExtensionCount = function (count) {
            return this.costs[count]
        },

        hauler.getCost = function () {
            return this.getCostForExtensionCount(1)
        },

        hauler.performRole = function (CreepRole, creep) {
            //var profiler = require('profiler')
            //profiler.openProfile('CREEP_' + creep.name)
            if (creep.memory.state == undefined) {
                creep.memory.state = 'searching'
                creep.memory.target = null
                //creep.say('Searching')
            }
            if (creep.memory.state == 'searching') {
                if (creep.memory.target == undefined || creep.memory.target == null) {
                    creep.memory.target = null
                }
                if(creep.memory.target == null){
                    var Target = creep.pos.findClosestByRange(FIND_SOURCES, {
                        filter: function(object) {
                            return (object.needsHaulers() == true)
                        }
                    })
                    if(Target != null){
                        creep.memory.target = Target.id
                        creep.memory.state = 'gathering'
                        console.log(creep.name + ' is now a hauler for source ' + creep.memory.target)
                        //creep.say('Gathering')
                    }
                }
            }else{
                if(creep.memory.state == 'gathering'){
                    var Target = Game.getObjectById(creep.memory.target)
                    creep.moveTo(Target);
                    if(creep.pos.findInRange(Target, 2) && creep.pos.isNearTo(Target)) {
                        var energy1 = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
                        creep.moveTo(energy1, {
                            reusePath: 15
                        })
                        creep.pickup(energy1)
                    }
                    if (creep.carry.energy >= creep.carryCapacity) {
                        creep.memory.state = 'transferring'
                        //creep.say('transferring')
                    }
                }else if(creep.memory.state == 'transferring') {
                    if (creep.carry.energy > 0) {/*
                        var nearestHauler = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                            filter: function (object) {
                                return object.memory.role == 'hauler' && object.carry.energy < object.carryCapacity
                            }
                        })
                        if(creep.pos.isNearTo(nearestHauler) && nearestHauler.id != creep.id){
                            creep.transferEnergy(nearestHauler)
                            creep.memory.state = 'gathering'
                        }*/

                        var spawnEnergy = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                            filter: function (object) {
                                if (object.structureType == STRUCTURE_SPAWN) {
                                    return object.energy < object.energyCapacity;
                                }
                            }
                        });
                        if (spawnEnergy) {
                            creep.moveTo(spawnEnergy, {
                                reusePath: 15
                            });
                            creep.transferEnergy(spawnEnergy);
                        }else {
                            var emptyExtensions1 = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                                filter: function (object) {
                                    if (object.structureType == STRUCTURE_EXTENSION) {
                                        return object.energy < object.energyCapacity;
                                    }
                                }
                            });
                            if (emptyExtensions1) {
                                creep.moveTo(emptyExtensions1, {
                                    reusePath: 15
                                });
                                creep.transferEnergy(emptyExtensions1);
                            } else {
                                var storage = creep.room.storage
                                if (storage != null) {
                                    creep.moveTo(storage, { reusePath: 15});
                                    creep.transferEnergy(storage);
                                }
                            }
                        }
                    } else {
                        creep.memory.state = 'gathering'
                    }
                }
            }
            /*
            var Target = creep.pos.findClosestByRange(FIND_SOURCES, {
                filter: function(object) {
                    return (object.needsHarvesters() == true)
                }
            })*/
            //profiler.closeProfile('CREEP_' + creep.name)
            //profiler.showProfiles()
            /*if (creep.carry.energy > 1) {
                if (Game.spawns.Spawn1.energy < 300) {
                    creep.moveTo(Game.spawns.Spawn1);
                    creep.transferEnergy(Game.spawns.Spawn1);
                }
                else {
                    var emptyExtensions1 = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: function (object) {
                            if (object.structureType == 'extension') {
                                return object.energy < object.energyCapacity;
                            }
                        }
                    });
                    if (emptyExtensions1) {
                        creep.moveTo(emptyExtensions1);
                        creep.transferEnergy(emptyExtensions1);
                    } else {
                        var storage = creep.room.storage
                        if (storage != null) {
                            creep.moveTo(storage);
                            creep.transferEnergy(storage);
                        }
                    }
                }
            }
            else {
                var energy1 = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
                creep.moveTo(energy1);
                creep.pickup(energy1);
            }*/
        }
    return hauler;
};