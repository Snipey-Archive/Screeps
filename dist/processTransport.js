/**
 * Created by Snipey on 10/5/2015.
 */
/**
 * Created by Snipey on 10/4/2015.
 */
module.exports = function(workers, p_room) {
    var transport = require('transport');

    for(var id in workers) {
        var creep = Game.getObjectById(workers[id]);
        switch(creep.memory.role) {
            case 'transport':
                transport(creep, p_room);
                break;
        }
    }
}