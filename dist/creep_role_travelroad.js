/**
 * Created by Snipey on 10/26/2015.
 */
/**
 * Created by Snipey on 10/25/2015.
 */


/**
 * Created by Snipey on 10/17/2015.
 */
module.exports = function() {
    var travelroad = {
        parts: [
            [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY]
        ],

        costs: [
            1200
        ]
    };

    travelroad.getPartsForExtensionCount = function(count) {
        //console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        travelroad.getParts = function() {
            return this.getPartsForExtensionCount(0)
        },

        travelroad.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        travelroad.getCost = function() {
            return this.getCostForExtensionCount(0)
        },

        travelroad.performRole = function(CreepRole, creep) {
            var exit = Game.flags[creep.name]
            //var flag = creep.room.find(FIND_FLAGS)
            if(exit.roomName != creep.room.name){
                creep.moveTo(exit, {
                    reusePath: 15
                })
            }
            if(exit.roomName == creep.room.name){
                if(creep.carry.energy > 0){
                    var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES, {
                        filter: function(object){
                            return object.structureType == STRUCTURE_ROAD
                        }
                    });
                    var roadToRepair = creep.room.find(FIND_STRUCTURES, {
                        filter: function (object) {
                            return object.structureType == STRUCTURE_ROAD && (object.hits < object.hitsMax * 0.5);
                        }
                    });
                    if(constructionSites != null){
                        creep.moveTo(constructionSites[0], {
                            reusePath:20,
                            serializeMemory: true
                        })
                        creep.build(constructionSites[0])
                    }else{
                        creep.moveTo(roadToRepair[0],{
                            reusePath: 20,
                            serializeMemory: true
                        })
                        creep.repair(roadToRepair[0])
                    }

                }else{
                    var energy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY)
                    /* creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                     filter: function (object) {
                     return object.memory.role == 'upgradehelper' && object.carry.energy < object.carryCapacity
                     }
                     });*/
                    if (energy) {
                        creep.moveTo(energy, {
                            reusePath: 15,
                            serializeMemory: true
                        });
                        creep.pickup(energy)
                    }
                }
                /*if (creep.carry.energy <= 0) {
                    var energy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY)
                    if(energy != null) {
                        if (creep.pos.isNearTo(energy)) {
                            creep.pickup(energy)
                        }
                        else {
                            creep.moveTo(energy)
                        }
                    }
                } else if(creep.carry.energy > 0){
                    var sites = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                        filter: function (o) {
                            return o.structureType == STRUCTURE_ROAD
                        }
                    })
                    var repairs = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function (o) {
                            return o.structureType == STRUCTURE_ROAD && o.hits < o.hitsMax
                        }
                    })
                    if (sites != null && sites.length > 0) {
                        creep.moveTo(sites[0], {
                            reusePath: 15
                        })
                        creep.build(sites[0])
                    } else if (repairs != null && repairs.length > 0) {
                        creep.moveTo(repairs[0], {
                            reusePath: 15
                        })
                        creep.repair(repairs[0])
                    } else {
                        if (!creep.pos.isNearTo(exit)) {
                            creep.moveTo(exit)
                        }
                    }
                }*/
            }
        }
    return travelroad;
}