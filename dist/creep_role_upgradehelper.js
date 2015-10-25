
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
            [MOVE, MOVE, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, CARRY]
        ],

        costs: [
            300,
            550,
            700,
            1000
        ]
    }

    upgradehelper.getPartsForExtensionCount = function(count) {
        console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        upgradehelper.getParts = function() {
            return this.getPartsForExtensionCount(0)
        },

        upgradehelper.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        upgradehelper.getCost = function() {
            return this.getCostForExtensionCount(0)
        },

        upgradehelper.performRole = function(CreepRole, creep) {
            if(creep.memory.state === undefined){
                creep.memory.state = 'gathering'
            }
                if (creep.carry.energy >= creep.carryCapacity && creep.memory.state === 'transferring') {
                    var Target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                        filter: function (object) {
                            return object.memory.role == "upgrader"
                        }
                    });
                    if (Target != null) {
                        creep.moveTo(Target)
                        creep.transferEnergy(Target)
                        creep.memory.state = 'gathering'
                    }
                } else {
                    var Target = creep.pos.findClosestByRange(FIND_MY_SPAWNS)
                    if (Target != null) {
                        creep.moveTo(Target)
                        Target.transferEnergy(creep)
                    }
                    creep.memory.state = 'tranferring'
                }

        }
    return upgradehelper;
};