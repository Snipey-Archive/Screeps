
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
        //console.log("Parts By Extension: " + this.parts[count])
        return this.parts[count]
    },

        hauler.getParts = function () {

            var room = Game.rooms['E29N19']
            if (room.energyAvailable >= 300 && room.energyAvailable < 550) {
                console.log("LEVEL 1")
                return this.getPartsForExtensionCount(0)
            } else if (room.energyAvailable >= 550 && room.energyAvailable < 700) {
                console.log("LEVEL 2")
                return this.getPartsForExtensionCount(1)
            } else if (room.energyAvailable >= 700 && room.energyAvailable < 1000) {
                return this.getPartsForExtensionCount(2)
            } else if (room.energyAvailable >= 1000) {
                return this.getPartsForExtensionCount(3)
            }else{
                return this.getPartsForExtensionCount(1)
            }
            //return this.getPartsForExtensionCount(1)
        },

        hauler.getCostForExtensionCount = function (count) {
            return this.costs[count]
        },

        hauler.getCost = function () {

            var room = Game.rooms['E29N19']
            if (room.energyAvailable >= 300 && room.energyAvailable < 550) {
                console.log("LEVEL 1")
                return this.getCostForExtensionCount(0)
            } else if (room.energyAvailable >= 550 && room.energyAvailable < 700) {
                console.log("LEVEL 2")
                return this.getCostForExtensionCount(1)
            } else if (room.energyAvailable >= 700 && room.energyAvailable < 1000) {
                return this.getCostForExtensionCount(2)
            } else if (room.energyAvailable >= 1000) {
                return this.getCostForExtensionCount(3)
            }else{
                return this.getCostForExtensionCount(1)
            }
            //return this.getCostForExtensionCount(1)
        },

        hauler.performRole = function (CreepRole, creep) {
            var storageflag = Game.flags['storage']
            var creepflag = Game.flags[creep.name]

            //console.log(creepflag)

            if(creep.carry.energy < creep.carryCapacity){
                var energy = creepflag.pos.findClosestByRange(FIND_DROPPED_ENERGY)
                if(creep.room.name == creepflag.roomName){
                    if(creepflag.pos.findInRange(creep, 3)){

                    }else{
                        creep.moveTo(creepflag)
                    }
                    if(creep.pos.isNearTo(energy)){
                        creep.pickup(energy)
                    }else{
                        creep.moveTo(energy, {
                            reusePath: 20
                        })
                    }
                }else{
                    if(creepflag != undefined){
                        creep.moveTo(creepflag, {
                            reusePath: 20
                        })
                    }
                }
            }else{
                if(creep.pos.isNearTo(storageflag) && creep.room.name == storageflag.roomName){
                    var energy = creep.room.storage
                    var emptyExtensions = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: function (object) {
                            if (object.structureType == STRUCTURE_EXTENSION || object.structureType == STRUCTURE_SPAWN) {
                                return object.energy < object.energyCapacity;
                            }
                        }
                    });
                    if (emptyExtensions) {
                        creep.moveTo(emptyExtensions, {
                            reusePath: 20
                        });
                        creep.transferEnergy(emptyExtensions);
                    } else {
                        creep.moveTo(creepflag)
                    }
                    if(creep.pos.isNearTo(energy)){
                        creep.transferEnergy(energy)
                    }else{
                        creep.moveTo(energy, {
                            reusePath: 20
                        })
                    }
                }else{
                    creep.moveTo(storageflag, {
                        reusePath: 20
                    })
                }
            }
            /*
             profiler.closeProfile('CREEP_' + creep.name)
             profiler.showProfiles()
             */
        }
    return hauler;
};