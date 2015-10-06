//Creeps
var spawn = require('spawn');
var harvester = require('harvester');
var transport = require('transport');
//Lib
var lca = require('logCreepActions');
var numberWithCommas = require('numbersWithCommas');
var util = require('util');
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
        //console.log('Room' + p_rooms + ' Energy: ' + numberWithCommas(p_rooms.energyAvailable) + ' of ' + numberWithCommas(p_rooms.energyCapacityAvailable));
        //console.log(' Energy: ' + numberWithCommas(p_rooms.energyAvailable) + ' of ' + numberWithCommas(p_rooms.energyCapacityAvailable));
        //console.log('all scripts completed ' + Game.time);
        //console.log('totalEnergy: ' + numberWithCommas(totalEnergy(p_room)));
    //}
/*    for (var creep in Memory.creeps) {
        if (!Game.creeps[creep]) {
            if (Memory.creeps[creep].safeToDelete) {
                delete Memory.creeps[creep];
            }
            else {
                Memory.creeps[creep].safeToDelete = true;
            }
        }
    }
    for (var room in Memory.rooms) {
        if (!Game.rooms[room]) {
            if (Memory.rooms[room].safeToDelete) {
                delete Memory.rooms[room];
            }
            else {
                Memory.rooms[room].safeToDelete = true;
            }
        }
    }
    for (var flag in Memory.flags) {
        if (!Game.flags[flag]) {
            if (Memory.flags[flag].safeToDelete) {
                delete Memory.flags[flag];
            }
            else {
                Memory.flags[flag].safeToDelete = true;
            }
        }
    }*/

};
