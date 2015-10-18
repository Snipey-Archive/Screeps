/**
 * An attacker.
 */

module.exports = function() {
    var guard = {
        parts: [
            [TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK]
        ],

        costs: [
            280
        ]
    };

    guard.getPartsForExtensionCount = function(count) {
        return this.parts[0];
    };

    guard.getParts = function() {
        return this.getPartsForExtensionCount(0);
    };

    guard.getCostForExtensionCount = function(count) {
        return this.costs[count]
    };

    guard.getCost = function() {
        return this.getCostForExtensionCount(0)
    };

    guard.performRole = function(creep) {
        /*if(creep.memory.target == null || creep.memory.target == undefined) {
            var targets = creep.room.find(HOSTILE_CREEPS);
            if (targets.length) {
                var Target = targets[0];
                creep.memory.target = Target.id;

                creep.moveTo(Target);
                creep.attack(Target);
            }
        } else {
            creep.attack(Target);
        }*/
    }

    return guard;
};