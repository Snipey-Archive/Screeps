/**
 * Created by Snipey on 10/25/2015.
 */


/**
 * Created by Snipey on 10/17/2015.
 */
module.exports = function() {
    var archer = {
        parts: [
            [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, RANGED_ATTACK],
            [MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
            [MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
            [MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK]
        ],

        costs: [
            300,
            550,
            700,
            1150
        ]
    };

    archer.getPartsForExtensionCount = function(count) {
        console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        archer.getParts = function() {
            return this.getPartsForExtensionCount(3)
        },

        archer.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        archer.getCost = function() {
            return this.getCostForExtensionCount(3)
        },

        archer.performRole = function(CreepRole, creep) {
            var attackFlag = Game.flags['attack']
            var spawnflag = Game.flags['spawn']
            var archerflag = Game.flags['archer']
            if(attackFlag.roomName != creep.room.name){
                creep.moveTo(attackFlag)
            }else{/*
                var spawn = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                    filter: function(object){
                        return object.structureType == STRUCTURE_SPAWN
                    }
                })*/
                //console.log(spawn)
                var enemies = attackFlag.findEnemiesInRange(10)
                if(enemies != null || enemies != undefined){
                    if(creep.pos.getRangeTo(enemies[0]) <= 3){
                        creep.rangedAttack(enemies[0])
                    }else{
                        creep.moveTo(enemies[0])
                    }
                }
                if(spawnflag != null || spawnflag != undefined && spawnflag.findEnemySpawns().length > 0){
                    //console.log("YAY")
                    var spawn = spawnflag.findEnemySpawns()
                    if(creep.pos.getRangeTo(spawnflag) <= 3){
                        creep.rangedAttack(spawn[0])
                    }else{
                        creep.moveTo(spawnflag)
                    }
                }
                if(archerflag != undefined || archerflag != null && enemies.length <= 0){
                    creep.moveTo(archerflag)
                }
            }
        }
    return archer;
}