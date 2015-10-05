/**
 * Created by Snipey on 10/4/2015.
 */

module.exports = function (creep, p_room) {
    var lca = require('logCreepAction');

    if(creep.spawning == true) {
        lca(creep, 'is still spawning.');
        return 0;
    }
    var drops = p_room.find(FIND_DROPPED_ENERGY);
    lca(creep,'dropped energies available: ' + drops.length);
    //lca(creep, creep.carry.energy + ' - ' + creep.memory.state + ' - ' + creep.carryCapacity + '.', true)
    if(creep.carry.energy < creep.carryCapacity){
        var energy = creep.pos.findClosest(FIND_SOURCES);
        if(creep.pos.isNearTo(energy)){
            creep.harvest(energy);
        }
        else{
            creep.moveTo(energy);
        }
        creep.dropEnergy(creep.carry.energy);
    }
};