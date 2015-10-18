/**
 * A simple miner.
 *
 * Moves to a source and collects the energy,
 * then returns to base when full.
 *
 * Really you should only make one of this, wait until it's phased out by miners and haulers.
 */
module.exports = function() {
    var harvester = {
            parts: [
                [WORK, WORK, MOVE, MOVE],
                [MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK],
                [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, WORK],
                [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, CARRY, CARRY, MOVE]
            ],

            costs: [
                300,
                550,
                700,
                1000
            ]
    };

    harvester.getPartsForExtensionCount = function(count) {
        console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

    harvester.getParts = function() {
        return this.getPartsForExtensionCount(0)
    },

    harvester.getCostForExtensionCount = function(count) {
        return this.costs[count]
    },

    harvester.getCost = function() {
        return this.getCostForExtensionCount(0)
    },

    harvester.performRole = function(CreepRole, creep) {
        if(creep.memory.harvesting == undefined || creep.memory.harvesting == null) {
            creep.memory.harvesting = true
        }

        if(creep.memory.target == undefined || creep.memory.target == null) {
            if(creep.carry.energy >= creep.carryCapacity) {
                var Target = creep.pos.findClosestByRange(FIND_MY_SPAWNS, {
                    filter: function(object) {
                        return (object.energyCapacity - object.energy) >= creep.carryCapacity
                    }
                })
                if(Target != null && Target != undefined) {
                    creep.memory.target = Target.id
                    creep.moveTo(Target)
                }
            } else {
                var Target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)
                if(Target != null && Target != undefined) {
                    creep.memory.target = Target.id
                    creep.moveTo(Target)
                }
            }
        } else {
            var Target = Game.getObjectById(creep.memory.target)
            if(Target != null && Target != undefined) {
                //Yeah, turns out you run moveTo each iteration.
                creep.moveTo(Target)

                if(creep.carry.energy >= creep.carryCapacity && creep.memory.harvesting) {
                    //Reset the target, else it would be stuck at the source it was mining.
                    creep.memory.target = null
                    creep.memory.harvesting = false
                } else if (creep.carry.energy == 0 && !creep.memory.harvesting) {
                    //Reset the target, else it would be stuck at the spawn it dropped the energy off at.
                    creep.memory.target = null
                    creep.memory.harvesting = true
                } else if(creep.pos.isNearTo(Target)) {
                    if(creep.memory.harvesting) {
                        creep.harvest(Target)
                    } else {
                        creep.transferEnergy(Target)
                    }
                }
            }
        }
    }
    return harvester;
}