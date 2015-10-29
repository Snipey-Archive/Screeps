
/**
 * Created by Snipey on 10/17/2015.
 */
module.exports = function() {
    var repair = {
        parts: [
            [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY],
            [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY]
        ],

        costs: [
            1000,
            1200
        ]
    };

    repair.getPartsForExtensionCount = function(count) {
        //console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        repair.getParts = function() {
            return this.getPartsForExtensionCount(1)
        },

        repair.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        repair.getCost = function() {
            return this.getCostForExtensionCount(1)
        },

        repair.performRole = function(CreepRole, creep) {
            //var repairflag = Game.flags['repair']
            if(creep.ticksToLive < 100){

            }
            if(creep.memory.target == undefined){
                creep.memory.target = null
            }
            var rampconst = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: function(o){
                    return o.structureType == STRUCTURE_RAMPART
                }
            })
            var ramp = creep.room.find(FIND_MY_STRUCTURES, {
                filter: function(o){
                    return o.structureType == STRUCTURE_RAMPART && o.needsRepair() == true && o.hasRepair() == false
                }
            })
            //console.log(rampconst)
            if(creep.carry.energy == 0){
                creep.memory.target = null
                var storage = creep.room.storage /*creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: function (object) {
                        return object.memory.role == 'upgradehelper' && object.carry.energy < object.carryCapacity
                    }
                });*/
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
                    if(creep.pos.isNearTo(rampconst[0])){
                        creep.build(rampconst[0])
                        creep.memory.target = null
                    }else{
                        creep.moveTo(rampconst[0])
                    }
                }
            }
       }
    return repair;
}