/**
 * A simple miner.
 *
 * Moves to a source and collects the energy,
 * then returns to base when full.
 *
 * Really you should only make one of this, wait until it's phased out by miners and haulers.
 */
module.exports = function () {
    var harvester = {
        parts: [
            [WORK, WORK, MOVE, MOVE],
            [MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK],
            [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, WORK],
            [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, CARRY, CARRY, MOVE]
        ],

        costs: [
            300,
            550,
            700,
            1000
        ]
    };

    harvester.getPartsForExtensionCount = function (count) {
        console.log("Parts By Extension: " + this.parts[count])
        return this.parts[count]
    },

        harvester.getParts = function () {
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

        harvester.getCostForExtensionCount = function (count) {
            return this.costs[count]
        },

        harvester.getCost = function () {
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
                return this.getCostForExtensionCount(1)
            }
//Game.getObjectById('55db34f1efa8e3fe66e061be').needsHarvesters()
        },

        harvester.performRole = function (CreepRole, creep) {

            if (creep.memory.state === undefined) {
                creep.memory.state = 'searching'
            }
            if (creep.memory.state === 'searching') {
                if (creep.memory.target === undefined) {
                    creep.memory.target = null
                }
                var Target = creep.pos.findClosestByRange(FIND_SOURCES, {
                    filter: function(object) {
                        return (object.needsHarvesters() == true)
                    }
                })
                if(Target != null){
                    creep.memory.target = Target.id
                    creep.memory.state = 'harvesting'
                }
            } else {
                //creep.memory.state = 'harvesting'
                var Target = Game.getObjectById(creep.memory.target)
                creep.moveTo(Target)
                creep.harvest(Target)
                creep.dropEnergy()
            }
        }
    return harvester;
}