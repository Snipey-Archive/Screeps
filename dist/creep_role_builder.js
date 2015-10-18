/**
 * A simple miner.
 *
 * Moves to a source and collects the energy,
 * then returns to base when full.
 *
 * Really you should only make one of this, wait until it's phased out by miners and haulers.
 */
module.exports = function() {
    var builder = {
        parts: [
            [WORK, CARRY, MOVE, CARRY, MOVE],
            [MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, WORK, CARRY, WORK],
            [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY],
            [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY]
        ],

        costs: [
            200,
            550,
            700,
            1000
        ]
    };

    builder.getPartsForExtensionCount = function(count) {
        console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        builder.getParts = function() {
            return this.getPartsForExtensionCount(0)
        },

        builder.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        builder.getCost = function() {
            return this.getCostForExtensionCount(0)
        },

        builder.performRole = function(CreepRole, creep) {

        }
    return builder;
}