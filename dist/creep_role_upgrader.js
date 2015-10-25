
/**
 * Created by Snipey on 10/17/2015.
 */
module.exports = function() {
    var upgrader = {
        parts: [
            [WORK, CARRY, MOVE, CARRY, MOVE],
            [MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, WORK, CARRY, WORK],
            [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY],
            [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY]
        ],

        costs: [
            300,
            550,
            700,
            1000
        ]
    };

    upgrader.getPartsForExtensionCount = function(count) {
        console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        upgrader.getParts = function() {
            var room = Game.rooms['E29N19']
            if (room.energyAvailable >= 300 && room.energyAvailable < 550) {
                console.log("LEVEL 1")
                return this.getPartsForExtensionCount(0)
            } else if (room.energyAvailable >= 550 && room.energyAvailable < 700) {
                console.log("LEVEL 2")
                return this.getPartsForExtensionCount(1)
            } else if (room.energyAvailable >= 700 && room.energyAvailable < 1000) {
                return this.getPartsForExtensionCount(2)
            } else if (room.energyAvailable >= 1000) {
                return this.getPartsForExtensionCount(3)
            }else{
                return this.getPartsForExtensionCount(1)
            }
        },

        upgrader.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        upgrader.getCost = function() {
            var room = Game.rooms['E29N19']
            if (room.energyAvailable >= 300 && room.energyAvailable < 550) {
                console.log("LEVEL 1")
                return this.getCostForExtensionCount(0)
            } else if (room.energyAvailable >= 550 && room.energyAvailable < 700) {
                console.log("LEVEL 2")
                return this.getCostForExtensionCount(1)
            } else if (room.energyAvailable >= 700 && room.energyAvailable < 1000) {
                return this.getCostForExtensionCount(2)
            } else if (room.energyAvailable >= 1000) {
                return this.getCostForExtensionCount(3)
            }else{
                return this.getCostForExtensionCount(2)
            }
        },

        upgrader.performRole = function(CreepRole, creep) {

            if (creep.carry.energy == 0){
                creep.memory.state = "pickup"
            }
            if (creep.memory.state == "pickup"){
                var Target = creep.pos.findClosestByRange(FIND_MY_SPAWNS)
                if (Target != null) {
                    creep.moveTo(Target, {
                        reusePath: 15
                    })
                    Target.transferEnergy(creep)
                }
            }
            if (creep.carry.energy >= creep.carryCapacity){
                creep.memory.state = "work"
            }
            if (creep.memory.state == "work"){
                var Target = creep.room.controller
                if(Target != null){
                    creep.moveTo(Target, {
                        reusePath: 15
                    })
                    creep.upgradeController(Target)
                }
            }
        }
    return upgrader;
}