/**
 * Created by Snipey on 10/25/2015.
 */


/**
 * Created by Snipey on 10/17/2015.
 */
module.exports = function() {
    var travelminer = {
        parts: [
            [WORK, WORK, MOVE, MOVE]
        ],

        costs: [
            300
        ]
    };

    travelminer.getPartsForExtensionCount = function(count) {
        console.log("Parts By Extension: "+this.parts[count])
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
            var source = Game.getObjectById('55db34cfefa8e3fe66e060fb')
            if(!source){
                var exit = creep.room.find(FIND_FLAGS, {
                    filter: function(object){
                        return object.color == COLOR_GREEN
                    }
                })
                creep.moveTo(new RoomPosition(2, 49, 'E29N19'))
                creep.moveTo(new RoomPosition(0, 6, 'E29N18'))
                //console.log('source is not in this room')
            }
            if(creep.pos.isNearTo(source)){
                creep.harvest(source)
                creep.dropEnergy()
            }else{
                creep.moveTo(source)
            }
        }
    return travelminer;
}
/*
module.exports = function (creep) {
    let mineSource = Game.getObjectById(creep.memory.source);
    let assignedTransporter = Game.getObjectById(creep.memory.transporter);

    //if assignedTransporter does not exist....
    if (!assignedTransporter) {
        delete creep.memory.transporter;
    }
    if (creep.harvest(mineSource) == -9) {
        creep.moveTo(mineSource);
    }
    else if (!mineSource) {
        var sources = creep.room.find(FIND_SOURCES);
        creep.memory.source = sources[creep.memory.modulo].id;
    }*/
