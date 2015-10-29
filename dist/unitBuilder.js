
/**
 * Created by Snipey on 10/5/2015.
 */
var bodies = {
    turretBody: {
        300: [MOVE, RANGED_ATTACK],
        550: [MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK],
        700: [MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
        1000: [MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK]
    },
    harvesterBody: {
        300: [WORK, WORK, MOVE, MOVE],
        550: [MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK],
        700: [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, WORK],
        1000: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, CARRY, CARRY, MOVE]
    },
    builderBody: {
        300: [WORK, CARRY, MOVE, CARRY, MOVE],
        550: [MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, WORK, CARRY, WORK],
        700: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY],
        1000: [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY]
    },
    upgraderBody: {
        300: [WORK, CARRY, MOVE, CARRY, MOVE],
        550: [MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, WORK, CARRY, WORK],
        700: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY],
        1000: [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY]
    },
    guardBody: {
        300: [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, ATTACK, ATTACK],
        550: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK],
        700: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK],
        1000: [TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK]
    },
    mechanicBody: {
        300: [MOVE, MOVE, WORK, CARRY, CARRY],
        550: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY],
        700: [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY],
        1000: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]
    },
    transportBody: {
        300: [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY],
        550: [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE],
        700: [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, MOVE, CARRY, MOVE],
        1000: [MOVE, MOVE, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, MOVE, CARRY, CARRY, CARRY, CARRY]
    },
    archerBody: {
        300: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, MOVE, MOVE, RANGED_ATTACK],
        550: [MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
        700: [MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK],
        1000: [MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK]
    },
    healerBody: {
        300: [MOVE, HEAL],
        550: [MOVE, HEAL, HEAL],
        700: [TOUGH, MOVE, MOVE, MOVE, HEAL, HEAL],
        1000: [TOUGH, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL]
    }
}

function calcEnergy(p_room) {
    if (Game.rooms[p_room].energyCapacityAvailable >= 1000) {
        return 1000;
    }
    else if (Game.rooms[p_room].energyCapacityAvailable >= 700) {
        return 700;
    }
    else if (Game.rooms[p_room].energyCapacityAvailable >= 550) {
        return 550;
    }
    else if (Game.rooms[p_room].energyCapacityAvailable >= 300) {
        return 300;
    }
}

module.exports = {
    bodies: bodies,
    calcEnergy: calcEnergy
}

/**
 * All credit goes to Djinni
 * @url https://bitbucket.org/Djinni/screeps/
 */
rest: function(civilian)
{
    var creep = this.creep;

    var distance = 4;
    var restTarget = creep.pos.findNearest(Game.MY_SPAWNS);

    if(!civilian) {
        var flags = Game.flags;
        for (var i in flags) {
            var flag = flags[i];
            if (creep.pos.inRangeTo(flag, distance) || creep.pos.findPathTo(flag).length > 0) {
                restTarget = flag;
                break;
            }
        }
    }

//		var flag = Game.flags['Flag1'];
//		if(flag !== undefined && civilian !== true)
//			restTarget = flag;
//
//		var flag2 = Game.flags['Flag2'];
//		if(flag !== undefined && civilian !== true && !creep.pos.inRangeTo(flag, distance) && !creep.pos.findPathTo(flag).length)
//			restTarget = flag2;

    if (creep.getActiveBodyparts(Game.HEAL)) {
//			distance = distance - 1;
    }
    else if (creep.getActiveBodyparts(Game.RANGED_ATTACK)) {
//			distance = distance - 1;
    }
    if (creep.pos.findPathTo(restTarget).length > distance) {
        creep.moveTo(restTarget);
    }
},

/**
 * All credit goes to Djinni
 * @url https://bitbucket.org/Djinni/screeps/
 */
rangedAttack: function(target) {
    var creep = this.creep;

    if(!target)
        target = creep.pos.findNearest(Game.HOSTILE_CREEPS);

    if(target) {
        if (target.pos.inRangeTo(creep.pos, 3) ) {
            creep.rangedAttack(target);
            return target;
        }
    }
    return null;
},

keepAwayFromEnemies: function()
{
    var creep = this.creep;

    var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
    if(target !== null && target.pos.inRangeTo(creep.pos, 3))
        creep.moveTo(creep.pos.x + creep.pos.x - target.pos.x, creep.pos.y + creep.pos.y - target.pos.y );
},

/**
 * All credit goes to Djinni
 * @url https://bitbucket.org/Djinni/screeps/
 */
kite: function(target) {
    var creep = this.creep;

    if (target.pos.inRangeTo(creep.pos, 2)) {
        creep.moveTo(creep.pos.x + creep.pos.x - target.pos.x, creep.pos.y + creep.pos.y - target.pos.y );
        return true;
    } else if (target.pos.inRangeTo(creep.pos, 3)) {
        return true;
    }
    else {
        creep.moveTo(target);
        return true;
    }

    return false;
},

getRangedTarget: function()
{
    var creep = this.creep;

    var closeArchers = creep.pos.findNearest(Game.HOSTILE_CREEPS, {
        filter: function(enemy)
        {
            return enemy.getActiveBodyparts(Game.RANGED_ATTACK) > 0
                && creep.pos.inRangeTo(enemy, 3);
        }
    });

    if(closeArchers != null)
        return closeArchers;

    var closeMobileMelee = creep.pos.findNearest(Game.HOSTILE_CREEPS, {
        filter: function(enemy)
        {
            return enemy.getActiveBodyparts(Game.ATTACK) > 0
                && enemy.getActiveBodyparts(Game.MOVE) > 0
                && creep.pos.inRangeTo(enemy, 3);
        }
    });

    if(closeMobileMelee != null)
        return closeMobileMelee;

    var closeHealer = creep.pos.findNearest(Game.HOSTILE_CREEPS, {
        filter: function(enemy)
        {
            return enemy.getActiveBodyparts(Game.HEAL) > 0
                && enemy.getActiveBodyparts(Game.MOVE) > 0
                && creep.pos.inRangeTo(enemy, 3);
        }
    });

    if(closeHealer != null)
        return closeHealer;

    return creep.pos.findNearest(Game.HOSTILE_CREEPS);
}