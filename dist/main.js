var harvester = require('harvester');
var spawn = require('spawn');
var lca = require('logCreepActions');
var processHarvester = require('processHarvester');
var numberWithCommas = require('numbersWithCommas');
var p_rooms = [];
p_rooms[0] = Game.rooms['W11S29'];
//p_rooms[1] = '';
module.exports.loop = function () {

    console.log(Game.COLOR_BLUE + '===== Tick =====');

    //spawn(p_rooms[0]);

    var harvester = [];

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.age < 25) {
            lca(creep, 'is about to die in ' + creep.age + ' ticks.');
        }

        switch(creep.memory.role) {
            case 'harvester':
                harvester.push(creep.id);
                break;
            default:
                lca(creep, 'does not have a programmed role.');
                break;
        }
    }

    processHarvester(harvester, p_rooms[0]);
    //processWorkers(workers, p_room);
    //processBuilders(builders, p_room);
    //processHoarders(hoarders, p_room);
    //processExplorers(explorers);

    console.log('Global Control Report - Level: ' + Game.gcl.level + ' - ' + numberWithCommas(Game.gcl.progress) + ' of ' + numberWithCommas(Game.gcl.progressTotal) + '.');
    //for(var p_room in p_rooms){
        console.log('Room' + p_rooms[0] + ' Energy: ' + numberWithCommas(p_rooms[0].energyAvailable) + ' of ' + numberWithCommas(p_rooms[0].energyCapacityAvailable));
        console.log(' Energy: ' + numberWithCommas(p_rooms[0].energyAvailable) + ' of ' + numberWithCommas(p_rooms[0].energyCapacityAvailable));
        console.log('all scripts completed ' + Game.time);
        //console.log('totalEnergy: ' + numberWithCommas(totalEnergy(p_room)));
    //}
};
