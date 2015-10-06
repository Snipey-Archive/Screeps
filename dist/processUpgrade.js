/**
 * Created by Snipey on 10/5/2015.
 */
/**
 * Created by Snipey on 10/4/2015.
 */
module.exports = function(workers, p_room) {
    var upgrader = require('upgrader');

    for(var id in workers) {
        var creep = Game.getObjectById(workers[id]);
        switch(creep.memory.role) {
            case 'upgrader':
                upgrader(creep, p_room);
                break;
        }
    }
}