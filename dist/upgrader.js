/**
 * Created by Snipey on 10/5/2015.
 */

module.exports = function (creep, p_room) {
    var lca = require('logCreepAction');


    if(creep.spawning == true) {
        lca(creep,'is still spawning.');
        return 0
    }

    if(creep.carry.energy == creep.carryCapacity) {
            lca(creep, 'is upgrading controller.');
            creep.moveTo(creep.room.controller);
            creep.upgradeController(creep.room.controller);

    }else{
        creep.moveTo(Game.spawns.Spawn1);
        creep.transferEnergy(creep);
    }
}