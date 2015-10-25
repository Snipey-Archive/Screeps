/**
 * Created by Snipey on 10/25/2015.
 */
/**
 * Created by Snipey on 10/25/2015.
 */


/**
 * Created by Snipey on 10/17/2015.
 */
module.exports = function() {
    var travelhauler = {
        parts: [
            [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY]
        ],

        costs: [
            300
        ]
    };

    travelhauler.getPartsForExtensionCount = function(count) {
        console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        travelhauler.getParts = function() {
            return this.getPartsForExtensionCount(0)
        },

        travelhauler.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        travelhauler.getCost = function() {
            return this.getCostForExtensionCount(0)
        },

        travelhauler.performRole = function(CreepRole, creep) {

            var source = Game.getObjectById('55db34cfefa8e3fe66e060fb')
            if(creep.carry.energy >= creep.carryCapacity){
                creep.moveTo(new RoomPosition(49, 9, 'E28N18'))
                creep.moveTo(new RoomPosition(6, 0, 'E29N18'))
                if(creep.room.name == 'E29N19'){
                    var storage = creep.room.storage
                    if (storage != null) {
                        creep.moveTo(storage);
                        creep.transferEnergy(storage);
                    }
                }
            }else{
                if(creep.room.name != 'E29N19'){
                    if(!source){
                        creep.moveTo(new RoomPosition(2, 49, 'E29N19'))
                        creep.moveTo(new RoomPosition(0, 6, 'E29N18'))
                    }else{
                        if(creep.pos.isNearTo(source)){
                            var energy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY)
                            creep.pickup(energy)
                        }else{
                            creep.moveTo(source)
                        }
                    }
                }
            }
        }
    return travelhauler;
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
