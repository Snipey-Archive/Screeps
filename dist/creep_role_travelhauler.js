//var path = require('pathfinding')
module.exports = function() {
    var travelhauler = {
        parts: [
            [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE],
            [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]
        ],

        costs: [
            550,
            1000
        ]
    };


    travelhauler.getPartsForExtensionCount = function(count) {
        //console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        travelhauler.getParts = function() {
            return this.getPartsForExtensionCount(1)
        },

        travelhauler.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        travelhauler.getCost = function() {
            return this.getCostForExtensionCount(1)
        },

        travelhauler.performRole = function(CreepRole, creep) {
            //var exitflag = Game.flags['E29N18_HAULER']
            var storageflag = Game.flags['storage']
            var creepflag = Game.flags[creep.name]

            //console.log(creepflag)

            if(creep.carry.energy < creep.carryCapacity){
                var energy
                if(creepflag != undefined && creep.room.name == creepflag.roomName){
                    energy = creepflag.pos.findClosestByRange(FIND_DROPPED_ENERGY)
                }
                if(creep.room.name == creepflag.roomName){
                    if(creepflag.pos.findInRange(creep, 7)){

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
    return travelhauler;
}
