
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
            [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY],
            [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY]

        ],

        costs: [
            300,
            550,
            700,
            1000,
            1200
        ]
    };

    builder.getPartsForExtensionCount = function(count) {
        //console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        builder.getParts = function() {
            return this.getPartsForExtensionCount(4)
        },

        builder.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        builder.getCost = function() {
            return this.getCostForExtensionCount(4)
        },

        builder.performRole = function(CreepRole, creep) {
            /*//var repairflag = Game.flags['repair']
            if(creep.memory.target == undefined){
                creep.memory.target = null
            }
            var const = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: function(o){
                    return o.structureType != STRUCTURE_RAMPART && o.structureType != STRUCTURE_ROAD
                }
            })
            var ramp = creep.room.find(FIND_MY_STRUCTURES, {
                filter: function(o){
                    return o.structureType == STRUCTURE_RAMPART && o.needsRepair() == true && o.hasRepair() == false
                }
            })
            //console.log(rampconst)
            if(creep.carry.energy == 0){
                var storage = creep.room.storage /!*creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                 filter: function (object) {
                 return object.memory.role == 'upgradehelper' && object.carry.energy < object.carryCapacity
                 }
                 });*!/
                if(creep.pos.isNearTo(storage)){
                    storage.transferEnergy(creep)
                }else{
                    creep.moveTo(storage)
                }
            }else{
                if(ramp.length > 0){
                    if(creep.memory.target == null){
                        creep.memory.target = ramp[0].id
                    }else{
                        var target = Game.getObjectById(creep.memory.target)
                        if(creep.pos.isNearTo(target)){
                            creep.repair(target)
                        }else{
                            creep.moveTo(target)
                        }
                    }
                    if(creep.carry.energy == 0){
                        creep.memory.target = null
                    }
                }else{
                    //creep.memory.target = null
                    if(creep.pos.isNearTo(rampconst[0])){
                        creep.build(rampconst[0])
                    }else{
                        creep.moveTo(rampconst[0])
                    }
                }
            }*/
            var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: function(object){
                    return object.structureType != STRUCTURE_ROAD && object.structureType != STRUCTURE_RAMPART
                }
            });

            var walls = creep.room.find(FIND_STRUCTURES, {
                filter: function(object) {
                    return object.structureType == STRUCTURE_WALL
                        && object.hits < object.hitsMax * 0.002
                        && object.hasBuilder() == false
                }
            });
            if (creep.memory.target == undefined) {
                creep.memory.target = null
                //creep.memory.state = 'searching'
            }
            if (creep.memory.state === undefined || creep.carry.energy === 0) {
                creep.memory.state = "pickup";
            }
            if (creep.carry.energy === creep.carryCapacity) {
                creep.memory.state = "work";
            }
            if(creep.memory.state == 'searching'){
                if(walls.length > 0){
                    if(creep.memory.target == null){
                        creep.memory.target = walls[0].id
                    }else{
                        creep.memory.state = 'work'
                    }
                }else if (constructionSites.length > 0){
                    if(creep.memory.target == null){
                        creep.memory.target = constructionSites[0].id
                    }else{
                        creep.memory.state = 'work'
                    }
                }
            }
            else if (creep.memory.state == 'pickup') {
                var storage = creep.room.storage
                if (storage) {
                    creep.moveTo(storage);
                    storage.transferEnergy(creep);
                    return;
                }
                if(creep.carry.energy >= creep.carryCapacity){
                    creep.memory.target = null
                    creep.memory.state = 'searching'
                }
            }
            else if (creep.memory.state == 'work') {
                if (creep.memory.target) {
                    var target = Game.getObjectById(creep.memory.target)
                    if(creep.pos.isNearTo(target)){
                        creep.build(target)
                        creep.repair(target)
                    }else{
                        creep.moveTo(target)
                    }
                }


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

                if (walls.length) {
                    creep.moveTo(walls[0]);
                    creep.repair(walls[0]);
                    return;
                }

            }
        }
    return builder;
}

