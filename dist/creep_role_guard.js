/**
 * Created by Snipey on 10/25/2015.
 */


/**
 * Created by Snipey on 10/17/2015.
 */
module.exports = function() {
    var guard = {
        parts: [
            [MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK]
        ],

        costs: [
            550
        ]
    };

    guard.getPartsForExtensionCount = function(count) {
        //console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        guard.getParts = function() {
            return this.getPartsForExtensionCount(0)
        },

        guard.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        guard.getCost = function() {
            return this.getCostForExtensionCount(0)
        },

        guard.performRole = function(CreepRole, creep) {

        }
    return guard;
}