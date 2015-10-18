/**
 * Created by Snipey on 10/17/2015.
 */
/**
 * Created by Snipey on 10/17/2015.
 */

var harvester = 0;
var upgrader = 0;
var builder = 0;

var roomNeed = [];

function getRoomRoles(p_room){
    var count = [];
    for(var creep in p_room.creeps){
        if(creep.memory.role == 'harvester'){
            count.harvester += 1
        }
        if(creep.memory.role == 'upgrader'){
            count.upgrader += 1
        }
        if(creep.memory.role == 'builder'){
            count.builder += 1
        }
    }
    return count;
}

function getRoomNeed(){
    for(var room in Game.rooms){
        var count = getRoomRoles(room);
        if(room.name == 'E27N16'){
            if (count.harvester <= 2){
                  Memory.spawnQueue.push('harvester');
            }
        }
    }
}

module.exports = {
    getRoomRoles: getRoomRoles,
    getRoomNeed: getRoomNeed
}