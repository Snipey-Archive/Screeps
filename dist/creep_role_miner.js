/**
 * A more advanced miner.
 *
 * Moves to a source and drops the energy on the ground when a miner helper is nearby.
 */
module.exports = function() {
    var miner = {
            parts: [
                [MOVE, WORK, WORK, WORK, WORK]
            ],

            costs: [
                450
            ]
    };

    miner.getPartsForExtensionCount = function(count) {
        return this.parts[count]
    };

    miner.getParts = function() {
        return this.getPartsForExtensionCount(0)
    };

    miner.getCostForExtensionCount = function(count) {
        return this.costs[count]
    };

    miner.getCost = function() {
        return this.getCostForExtensionCount(0)
    };

    miner.performRole = function(creep) {
        if(creep.memory.target == undefined || creep.memory.target == null) {
            var Target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
                filter: function(object) {
                    return (object.memory.miners == null
                              || object.memory.miners == undefined)
                            && object.miners.length <= 1;
                }
            })
            if(Target != null && Target != undefined) {
                if(Target.memory.miners == null || Target.memory.miners == undefined) {
                    Target.memory.miners.push(this.id)
                    creep.memory.target = Target.id
                    creep.moveTo(Target)
                }
            }
        } else {
            var Target = Game.getObjectById(creep.memory.target)
            if(Target != null && Target != undefined) {
                if(creep.pos.isNearTo(Target)) {
                    creep.harvest(Target)
                    creep.dropEnergy();
                }
            }
        }
    }

    return miner;
}