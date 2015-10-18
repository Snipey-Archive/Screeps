/**
 * A carrier of energy.
 *
 * Moves to a nearby miner and collects energy from it, then brings it back to the base.
 */

module.exports = function() {
    var hauler = {
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

    hauler.getPartsForExtensionCount = function(count) {
        return this.parts[0];
    }

    hauler.getParts = function() {
        return this.getPartsForExtensionCount(0);
    }

    hauler.getCostForExtensionCount = function(count) {
        return this.costs[count]
    }

    hauler.getCost = function() {
        return this.getCostForExtensionCount(0)
    }

    hauler.performRole = function(creep) {
        if(creep.memory.target == undefined || creep.memory.target == null) {
            if(creep.carry.energy >= creep.carryCapacity) {
                var Target = creep.pos.findClosestByRange(FIND_MY_SPAWNS, {
                    filter: function(object) {
                        return (object.energyCapacity - object.energy) >= creep.carryCapacity
                    }
                })
                if(Target != null) {
                    creep.memory.target = Target.id
                    creep.moveTo(Target)
                }
            } else {
                var Target = creep.pos.findClosest(FIND_DROPPED_ENERGY, {
                    filter: function(object) {
                        return object.energy >= 100
                    }
                })
                if(Target != null) {
                    creep.memory.target = Target.id
                    creep.moveTo(Target)
                }
            }
        } else {
            var Target = Game.getObjectById(creep.memory.target)
            if (creep.carry.energy >= creep.carryCapacity && !creep.memory.hauling) {
                //Reset the target, else it would be stuck at the energy it ended at.
                creep.memory.target = null
                creep.memory.hauling = true
            }else if (creep.carry.energy == 0 && creep.memory.hauling) {
                //Reset the target, else it would be stuck at the spawn it dropped the energy off at.
                creep.memory.target = null
                creep.memory.hauling = false
            } else if(creep.pos.isNearTo(Target)) {
                if(creep.memory.hauling) {
                    creep.transferEnergy(Target)
                } else {
                    creep.pickup(Target)
                    creep.memory.target = null
                }
            }
        }
    }

    return hauler;
};