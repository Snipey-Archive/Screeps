
/**
 * Created by Snipey on 10/17/2015.
 */
module.exports = function() {
    var janitor = {
        parts: [
            [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY]
        ],

        costs: [
            300
        ]
    };

    janitor.getPartsForExtensionCount = function(count) {
        console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        janitor.getParts = function() {
                return this.getPartsForExtensionCount(0)
        },

        janitor.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        janitor.getCost = function() {
                return this.getCostForExtensionCount(0)
        },

        janitor.performRole = function(CreepRole, creep) {
/*

            if (creep.carry.energy == 0){
                creep.memory.state = "pickup"
            }
            if (creep.memory.state == "pickup"){
                var Target = creep.room.find(FIND_DROPPED_ENERGY)
                if (Target != null) {
                    creep.moveTo(Target)
                    creep.pickup(Target)
                }
            }
            if (creep.carry.energy >= creep.carryCapacity || target.length == 0){
                creep.memory.state = "dropoff"
            }
            if (creep.memory.state == "dropoff"){
                var Target = creep.pos.findClosestByRange(FIND_MY_SPAWNS)
                if(Target.energy >= Target.energyCapacity){
                    if (Target != null) {
                        creep.moveTo(Target)
                        creep.transferEnergy(Target)
                    }
                }else{
                    var emptyExtensions1 = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: function (object) {
                            if (object.structureType == STRUCTURE_EXTENSION) {
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
            }*/
        }
    return janitor;
}