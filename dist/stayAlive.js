
/**
 * Created by Snipey on 10/18/2015.
 */
/*
 * Stayalive - code to keep breeding creeps
 */
var settings = require('settings')
module.exports = function stayAlive() {
    Memory.travel = {
        travelminer: [],
        travelhauler: [],
        travelroad: [],
    }
    /*
     else if (Memory.spawnQueue[i] == 'travelhauler'){
     Memory.bots['travelhauler'].push('inQ');
     }else if (Memory.spawnQueue[i] == 'travelminer'){
     Memory.bots['travelminer'].push('inQ');
     }else if (Memory.spawnQueue[i] == 'travelroad'){
     Memory.bots['travelroad'].push('inQ');
     }
     */
    for (var i in Game.spawns) {
        var room = Game.spawns[i].room.name
        Memory.rooms[room].creepCounts = {
            harvester: [],
            hauler: [],
            builder: [],
            upgrader: [],
            roadworker: [],
            repair: [],
            hoarder: [],
            healer: [],
            archer: [],
            guard: [],
            upgradehelper: []
        };
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.role) {
                Memory.rooms[room].creepCounts[creep.memory.role].push(creep.id);
            }
        }


        for (var i in Memory.rooms[room].spawnQueue) {
            if (Memory.rooms[room].spawnQueue[i] == 'harvester') {
                Memory.rooms[room].creepCounts['harvester'].push('inQ');
            } else if (Memory.rooms[room].spawnQueue[i] == 'hauler') {
                Memory.rooms[room].creepCounts['hauler'].push('inQ');
            } else if (Memory.rooms[room].spawnQueue[i] == 'upgrader') {
                Memory.rooms[room].creepCounts['upgrader'].push('inQ');
            } else if (Memory.rooms[room].spawnQueue[i] == 'janitor') {
                Memory.rooms[room].creepCounts['janitor'].push('inQ');
            } else if (Memory.rooms[room].spawnQueue[i] == 'builder') {
                Memory.rooms[room].creepCounts['builder'].push('inQ');
            } else if (Memory.rooms[room].spawnQueue[i] == 'roadworker') {
                Memory.rooms[room].creepCounts['roadworker'].push('inQ');
            } else if (Memory.rooms[room].spawnQueue[i] == 'repair') {
                Memory.rooms[room].creepCounts['repair'].push('inQ');
            } else if (Memory.rooms[room].spawnQueue[i] == 'hoarder') {
                Memory.rooms[room].creepCounts['hoarder'].push('inQ');
            } else if (Memory.rooms[room].spawnQueue[i] == 'healer') {
                Memory.rooms[room].creepCounts['healer'].push('inQ');
            } else if (Memory.rooms[room].spawnQueue[i] == 'archer') {
                Memory.rooms[room].creepCounts['archer'].push('inQ');
            } else if (Memory.rooms[room].spawnQueue[i] == 'guard') {
                Memory.rooms[room].creepCounts['guard'].push('inQ');
            } else if (Memory.rooms[room].spawnQueue[i] == 'upgradehelper') {
                Memory.rooms[room].creepCounts['upgradehelper'].push('inQ');
            }
        }
        if(Memory.rooms[room].creepCounts['harvester'].length < settings.roomSpec[room].harvester){
            Memory.rooms[room].spawnQueue.unshift('harvester')
        }

        if(Memory.rooms[room].creepCounts['hoarder'].length < settings.roomSpec[room].hoarder){
            Memory.rooms[room].spawnQueue.unshift('hoarder')
        }

        if(Memory.rooms[room].creepCounts['hauler'].length < settings.roomSpec[room].hauler){
            Memory.rooms[room].spawnQueue.unshift('hauler')
        }

        if(Memory.rooms[room].creepCounts['repair'].length < settings.roomSpec[room].repair){
            Memory.rooms[room].spawnQueue.push('repair')
        }

        if(Memory.rooms[room].creepCounts['upgrader'].length < settings.roomSpec[room].upgrader){
            Memory.rooms[room].spawnQueue.push('upgrader')
        }

        if(Memory.rooms[room].creepCounts['roadworker'].length < settings.roomSpec[room].repair){
            Memory.rooms[room].spawnQueue.push('roadworker')
        }

        if(Memory.rooms[room].creepCounts['builder'].length < settings.roomSpec[room].repair){
            Memory.rooms[room].spawnQueue.push('builder')
        }
    }
}