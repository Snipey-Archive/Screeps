/**
 * An attacker.
 */

module.exports = function() {
    var archer = {
        parts: [
	        [RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE],
            [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE]
        ],

        costs: [
            400,
            600
        ]
    }

	archer.getPartsForExtensionCount = function(count) {
		return this.parts[0];
	},

	archer.getParts = function() {
	    return this.getPartsForExtensionCount(0);
	},

	archer.getCostForExtensionCount = function(count) {
        return this.costs[count]
    },

    archer.getCost = function() {
        return this.getCostForExtensionCount(0)
    },

    archer.performRole = function(creep) {

	}

    return archer;
};