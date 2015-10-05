/**
 * Created by Snipey on 10/4/2015.
 */
module.exports = function(workers, p_room) {
    var harvest = require('harvester');

    for(var id in workers) {
        var creep = Game.getObjectById(workers[id]);
        switch(creep.memory.role) {
            case 'harvester':
                harvest(creep, p_room);
                break;
        }
    }
}