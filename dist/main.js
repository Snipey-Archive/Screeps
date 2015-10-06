//Creeps
var spawn = require('spawn');
var harvester = require('harvester');
var transport = require('transport');
//Lib
var lca = require('logCreepActions');
var numberWithCommas = require('numbersWithCommas');
//Logic
var processHarvester = require('processHarvester');
var processTransport = require('processTransport');
var processUpgrade = require('processUpgrade');
var p_rooms = ["W11S29"];

module.exports.loop = function () {

    console.log('===== Tick =====');

    spawn(p_rooms);

    var harvester = [];
    var transport = [];
    var upgrader = [];

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.age < 25) {
            lca(creep, 'is about to die in ' + creep.age + ' ticks.');
        }

        switch(creep.memory.role) {
            case 'harvester':
                harvester.push(creep.id);
                break;
            case 'transport':
                transport.push(creep.id);
                break;
            case 'upgrader':
                upgrader.push(creep.id);
                break;
            default:
                lca(creep, 'does not have a programmed role.');
                break;
        }
    }

    processHarvester(harvester, p_rooms);
    processTransport(transport, p_rooms);
    processUpgrade(transport, p_rooms);
    //processBuilders(builders, p_room);
    //processHoarders(hoarders, p_room);
    //processExplorers(explorers);

    console.log('Global Control Report - Level: ' + Game.gcl.level + ' - ' + numberWithCommas(Game.gcl.progress) + ' of ' + numberWithCommas(Game.gcl.progressTotal) + '.');
    //for(var p_room in p_rooms){
        console.log('Room' + p_rooms + ' Energy: ' + numberWithCommas(p_rooms.energyAvailable) + ' of ' + numberWithCommas(p_rooms.energyCapacityAvailable));
        console.log(' Energy: ' + numberWithCommas(p_rooms.energyAvailable) + ' of ' + numberWithCommas(p_rooms.energyCapacityAvailable));
        console.log('all scripts completed ' + Game.time);
        //console.log('totalEnergy: ' + numberWithCommas(totalEnergy(p_room)));
    //}
};
