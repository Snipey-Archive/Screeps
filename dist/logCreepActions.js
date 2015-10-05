/**
 * Created by Snipey on 10/4/2015.
 */
module.exports = function(creep, message, debug) {
    if(debug) {
        console.log('[DEBUG] ' + creep.name + '|' + creep.memory.role + ' ' + message);
    } else {
        console.log(creep.name + '|' + creep.memory.role + ' (' + creep.memory.state + ') ' + message);
    }

}