
/**
 * Created by Snipey on 10/17/2015.
 */
module.exports = function() {
    var hoarder = {
        parts: [
            [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY],
            [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE],
            [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]
        ],

        costs: [
            300,
            700,
            1000
        ]
    };

    hoarder.getPartsForExtensionCount = function(count) {
        //console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        hoarder.getParts = function() {
            var room = Game.rooms['E29N19']
            if (room.energyAvailable >= 300 && room.energyAvailable < 700) {
                console.log("LEVEL 1")
                return this.getPartsForExtensionCount(0)
            } else if (room.energyAvailable >= 700 && room.energyAvailable < 1000) {
                console.log("LEVEL 2")
                return this.getPartsForExtensionCount(1)
            } else if (room.energyAvailable >= 700 && room.energyAvailable < 1000) {
                return this.getPartsForExtensionCount(2)
            }else{
                return this.getPartsForExtensionCount(0)
            }
        },

        hoarder.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        hoarder.getCost = function() {
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
        },

        hoarder.performRole = function(CreepRole, creep) {
            var creepflag = Game.flags[creep.name]
                if(creep.carry.energy <= 0){
                    var storage = creep.room.storage
                    creep.moveTo(storage)
                    storage.transferEnergy(creep)
                }else {
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
                }
        }
    return hoarder;
}