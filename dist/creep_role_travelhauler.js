var path = require('pathfinding')
module.exports = function() {
    var travelhauler = {
        parts: [
            [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY]
        ],

        costs: [
            300
        ]
    };

    travelhauler.getPartsForExtensionCount = function(count) {
        console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        travelhauler.getParts = function() {
            return this.getPartsForExtensionCount(0)
        },

        travelhauler.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        travelhauler.getCost = function() {
            return this.getCostForExtensionCount(0)
        },

        travelhauler.performRole = function(CreepRole, creep) {

            var profiler = require('profiler')
            profiler.openProfile('CREEP_' + creep.name)

            if(creep.memory.state == undefined){
                creep.memory.state = 'gathering'
            }
            if(creep.memory.state == 'gathering'){
                if(creep.room.name = 'E29N19'){
                    path.doTravel(creep, '562c868d86c8a46c1e41977e')//flag_out_1
                }else if(creep.room.name == 'E29N18'){
                    path.doTravel(creep, '562c86b186c8a46c1e41bfe9')//flag_out_2
                }else if(creep.roomName == 'E28N18'){
                    path.doTravel(creep, '562ca73986c8a46c1e6684b3')//travel_mine_1
                    if(creep.pos.isNearTo(Game.getObjectById('562ca73986c8a46c1e6684b3'))){
                        var energy = creep.room.find(FIND_DROPPED_ENERGY)
                        creep.pickup(energy)
                        if(creep.carry.energy >= creep.carryCapacity){
                            creep.memory.state = 'transferring'
                        }
                    }
                }
            }else if(creep.memory.state == 'transferring'){
                if(creep.room.name = 'E28N18'){
                    path.doTravel(creep, '562c86c286c8a46c1e41d38e')//flag_in_1
                }else if(creep.room.name == 'E29N18'){
                    path.doTravel(creep, '562c86d686c8a46c1e41eb66')//flag_in_2
                }else if(creep.roomName == 'E29N19'){
                    path.doTravel(creep, '562c7a6bb722a4545cea4c10')//storage
                    if(creep.pos.isNearTo(Game.getObjectById('562c7a6bb722a4545cea4c10'))){
                        var storage = creep.room.storage
                        creep.transferEnergy(storage)
                        if(creep.carry.energy < 0){
                            creep.memory.state = 'gathering'
                        }
                    }
                }
            }

            profiler.closeProfile('CREEP_' + creep.name)
            profiler.showProfiles()
        }
    return travelhauler;
}
