/**
 * Created by Snipey on 10/24/2015.
 */
"use strict"
/**
 * Created by Snipey on 10/17/2015.
 */
module.exports = function () {
    var roadworker = {
        parts: [
            [MOVE, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, CARRY, WORK, WORK]
        ],

        costs: [
            600
        ]
    };

    roadworker.getPartsForExtensionCount = function (count) {
        //console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        roadworker.getParts = function () {
            return this.getPartsForExtensionCount(0)
        },

        roadworker.getCostForExtensionCount = function (count) {
            return this.costs[count]
        },

        roadworker.getCost = function () {
            return this.getCostForExtensionCount(0)
        },

        roadworker.performRole = function (CreepRole, creep) {
            var creepflag = Game.flags[creep.name]
            var sites = creepflag.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                filter: function (object) {
                    return object.structureType == STRUCTURE_ROAD
                }
            });
            //console.log('Sites: ' + sites)

            var repairs = creepflag.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (o) {
                    return o.structureType == STRUCTURE_ROAD && o.hits < o.hitsMax * 0.75
                }
            })

            if (creep.carry.energy == 0) {
                var storage = creep.room.storage
                creep.moveTo(storage, {
                    reusePath: 20
                })
                if (creep.pos.isNearTo(storage)) {
                    storage.transferEnergy(creep)
                }
            } else {
                if (sites != undefined) {
                    if (creep.pos.isNearTo(sites)) {
                        creep.build(sites)
                    }else{
                        creep.moveTo(sites)
                    }
                } else if (repairs != undefined) {
                    if (creep.pos.isNearTo(repairs)) {
                        creep.build(repairs)
                    }else{
                        creep.moveTo(repairs)
                    }
                } else {
                    creep.moveTo(creepflag)
                }
            }
        }
    return roadworker;
}
