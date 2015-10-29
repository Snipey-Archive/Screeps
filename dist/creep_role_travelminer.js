/**
 * Created by Snipey on 10/25/2015.
 */


/**
 * Created by Snipey on 10/17/2015.
 */
module.exports = function() {
    var travelminer = {
        parts: [
            [MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK]
        ],

        costs: [
            550
        ]
    };

    travelminer.getPartsForExtensionCount = function(count) {
        //console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        travelminer.getParts = function() {
            return this.getPartsForExtensionCount(0)
        },

        travelminer.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        travelminer.getCost = function() {
            return this.getCostForExtensionCount(0)
        },

        travelminer.performRole = function(CreepRole, creep) {
            var exit = Game.flags[creep.name]
            if(creep.pos.isNearTo(exit)){
                var source = creep.pos.findClosestByRange(FIND_SOURCES)
                if (creep.pos.isNearTo(source)) {
                    creep.harvest(source)
                    if (creep.carry.energy >= creep.carryCapacity) {
                        creep.dropEnergy()
                    }
                }else{
                    creep.moveTo(source)
                }
            }else{
                creep.moveTo(exit, {
                    reusePath: 20,
                    serializeMemory: true
                });
            }
        }
    return travelminer;
}