/**
 * Created by Snipey on 10/5/2015.
 */

module.exports = function (creep, p_room) {
    var util = require('util');

    var creeps = util.getCreepsInRoom(p_room);

    for (var name in creeps) {
        var creep = creeps[name];
        if (creep.memory.role == 'harvester') {
            Game.rooms[p_room].memory.harvester_count += 1;
        }
        else if (creep.memory.role == 'upgrader') {
            Game.rooms[p_room].memory.upgrader_count += 1;
        }
        else if (creep.memory.role == 'transport') {
            Game.rooms[p_room].memory.transport_count += 1;
        }
    }

}