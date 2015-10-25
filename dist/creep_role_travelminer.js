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
            if(creep.room.name = 'E29N19'){
                path.doTravel(creep, '562c868d86c8a46c1e41977e')//flag_out_1
            }else if(creep.room.name == 'E29N18'){
                path.doTravel(creep, '562c86b186c8a46c1e41bfe9')//flag_out_2
            }else if(creep.roomName == 'E28N18'){
                path.doTravel(creep, '562ca73986c8a46c1e6684b3')//travel_mine_1
                if(creep.pos.isNearTo(Game.getObjectById('562ca73986c8a46c1e6684b3'))){
                    var source = Game.getObjectById('55db34cfefa8e3fe66e060fb')
                    creep.harvest(source)
                    if(creep.carry.energy >= creep.carryCapacity){
                        creep.memory.state = 'transferring'
                    }
                }
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
