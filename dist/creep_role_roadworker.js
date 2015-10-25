/**
 * Created by Snipey on 10/24/2015.
 */
"use strict"
/**
 * Created by Snipey on 10/17/2015.
 */
module.exports = function() {
    var roadworker = {
        parts: [
            [MOVE, MOVE, CARRY, CARRY, WORK]
        ],

        costs: [
            300
        ]
    };

    roadworker.getPartsForExtensionCount = function(count) {
        console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        roadworker.getParts = function() {
            return this.getPartsForExtensionCount(0)
        },

        roadworker.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        roadworker.getCost = function() {
            return this.getCostForExtensionCount(0)
        },

        roadworker.performRole = function(CreepRole, creep) {

            if(creep.carry.energy > 0){
                var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_ROAD
                    }
                });
                var roadToRepair = creep.room.find(FIND_STRUCTURES, {
                    filter: function (object) {
                        return object.structureType == STRUCTURE_ROAD && (object.hits < object.hitsMax * 0.25);
                    }
                });
                if(constructionSites != null){
                    creep.moveTo(constructionSites[0])
                    creep.build(constructionSites[0])
                }else{
                    creep.moveTo(roadToRepair[0])
                    creep.repair(roadToRepair[0])
                }

            }else{
                var storage = creep.room.storage;
                if (storage) {
                    creep.moveTo(storage, {
                        reusePath: 15
                    });
                    storage.transferEnergy(creep);
                }
            }

/*

            if (creep.ticksToLive < 25) {
                let storage = creep.room.storage;
                creep.moveTo(storage);
                if (creep.energy > 0) {
                    creep.transferEnergy(storage);
                }
                else if (creep.energy === 0) {
                    creep.suicide();
                }
            }

            if (creep.memory.state == undefined || creep.carry.energy == 0) {
                creep.memory.state = "pickup";
            }
            else if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.state = "work";
            }
            if (creep.memory.state == "pickup") {
                let storage = creep.room.storage;
                if (storage) {
                    creep.moveTo(storage, {
                        reusePath: 15
                    });
                    storage.transferEnergy(creep);
                }
            }
            else if (creep.memory.state == "work") {
                let target = Game.getObjectById(creep.memory.targetId);
                if (target == null) {
                    let roadToRepair = creep.room.find(FIND_STRUCTURES, {
                        filter: function (object) {
                            return object.structureType == STRUCTURE_ROAD && (object.hits < object.hitsMax * 0.25);
                        }
                    });
                    if(roadToRepair == null || constructionSites == null)
                        return;
                    if (constructionSites == null) {
                        creep.memory.targetId = constructionSites.id;
                    }else{
                        creep.memory.targetId = roadToRepair.id;
                    }
                }
                else {
                    if (target.hits == target.hitsMax) {
                        creep.memory.targetId = undefined;
                        target = null;
                    }
                    else {
                        creep.moveTo(target, {
                            reusePath: 15
                        });
                        creep.build(target);
                    }
                }
            }
*/

        }
    return roadworker;
}
