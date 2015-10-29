
/**
 * Created by Snipey on 10/18/2015.
 */
/**
 * A carrier of energy.
 *
 * Moves to a nearby miner and collects energy from it, then brings it back to the base.
 */

module.exports = function() {
    var upgradehelper = {
        parts: [
            [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY],
            [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE],
            [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE],
            [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]
        ],

        costs: [
            300,
            550,
            700,
            1000
        ]
    }

    upgradehelper.getPartsForExtensionCount = function(count) {
        //console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        upgradehelper.getParts = function() {
            return this.getPartsForExtensionCount(3)
        },

        upgradehelper.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        upgradehelper.getCost = function() {
            return this.getCostForExtensionCount(3)
        },

        upgradehelper.performRole = function(CreepRole, creep) {
            if(creep.memory.state == undefined){
                creep.memory.state = 'sittingstill'
            }

            var flag = Game.flags[creep.name]
            //console.log(flag)
            if(flag == undefined) {
                if (creep.carry.energy > 0) {
                    creep.memory.state = 'transferring'
                    var Target = creep.room.find(FIND_MY_CREEPS, {
                        filter: function (object) {
                            return object.memory.role == 'upgradehelper' && object.carry.energy < object.carryCapacity && object.memory.state == 'sittingstill'
                        }
                    });
                    console.log(Target)
                    if (Target != null) {
                        creep.moveTo(Target[0], {
                            reusePath: 15
                        })
                        //console.log('4132412fdsfsdfsdf432')
                        creep.transferEnergy(Target[0])
                        //creep.memory.state = 'gathering'
                    }
                } else {
                    creep.memory.state = 'gathering'
                    var Target = creep.room.storage
                    if (Target != null) {
                        creep.moveTo(Target, {
                            reusePath: 15
                        })
                        Target.transferEnergy(creep)
                    }
                    //creep.memory.state = 'tranferring'
                }
            }else{
                creep.moveTo(flag, {
                    reusePath: 15
                })
            }
        }
    return upgradehelper;
};