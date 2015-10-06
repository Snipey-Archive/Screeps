/**
 * Created by Snipey on 10/5/2015.
 */
/**
 * Created by Snipey on 10/4/2015.
 */

module.exports = function (creep, p_room) {
    var lca = require('logCreepActions');

    if(creep.spawning == true) {
        lca(creep, 'is still spawning.');
        return 0;
    }
    var emptyExtensions1 = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: function(object){
            if(object.structureType == 'extension'){
                return object.energy < object.energyCapacity;
            }
        }
    });
    //var drops = p_room.find(FIND_DROPPED_ENERGY);
    //lca(creep,'dropped energies available: ' + drops.length);
    //lca(creep, creep.carry.energy + ' - ' + creep.memory.state + ' - ' + creep.carryCapacity + '.', true)
    if(creep.carry.energy < creep.carryCapacity){
        //lca(creep, 'Finding sources', true);
        var energy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
        if(creep.pos.isNearTo(energy)){
            creep.pickup(energy);
        }
        else{
            creep.moveTo(energy);
        }
    }else{
        if(emptyExtensions1){
            creep.moveTo(emptyExtensions1);
            creep.transferEnergy(emptyExtensions1);
        }
        else{
            creep.moveTo(Game.spawns.Spawn1);
            creep.transferEnergy(Game.spawns.Spawn1);
        }
    }
};