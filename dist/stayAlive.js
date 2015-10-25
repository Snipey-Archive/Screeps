
/**
 * Created by Snipey on 10/18/2015.
 */
/*
 * Stayalive - code to keep breeding creeps
 */
module.exports = function stayAlive() {
    Memory.bots = {
        harvester: [],
        hauler: [],
        builder: [],
        upgrader: [],
        roadworker: [],
        janitor: [],
        travelminer: [],
        travelhauler: []
    };

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role) {
            Memory.bots[creep.memory.role].push(creep.id);
        }
    }

    for(var i in Memory.spawnQueue){
        if(Memory.spawnQueue[i] == 'harvester'){
            Memory.bots['harvester'].push('inQ');
        } else if (Memory.spawnQueue[i] == 'hauler'){
            Memory.bots['hauler'].push('inQ');
        } else if (Memory.spawnQueue[i] == 'upgrader'){
            Memory.bots['upgrader'].push('inQ');
        } else if (Memory.spawnQueue[i] == 'janitor'){
            Memory.bots['janitor'].push('inQ');
        } else if (Memory.spawnQueue[i] == 'builder'){
            Memory.bots['builder'].push('inQ');
        }else if (Memory.spawnQueue[i] == 'roadworker'){
            Memory.bots['roadworker'].push('inQ');
        }else if (Memory.spawnQueue[i] == 'travelhauler'){
            Memory.bots['travelhauler'].push('inQ');
        }else if (Memory.spawnQueue[i] == 'travelminer'){
            Memory.bots['travelminer'].push('inQ');
        }
    }
    if(Memory.bots['harvester'].length < 2){
        Memory.spawnQueue.unshift('harvester')
    }
    if(Memory.bots['hauler'].length < 6 && Memory.bots['harvester'].length > 1){
        Memory.spawnQueue.unshift('hauler')
    }else if(Memory.bots['hauler'].length > 1 && Memory.bots['hauler'].length < 6){
        Memory.spawnQueue.push('hauler')
    }
    /*
     if(Memory.bots['janitor'].length < 1){
     Memory.spawnQueue.push('janitor')
     }*/
    if(Memory.bots['builder'].length < 3){
        Memory.spawnQueue.push('builder')
    }
    if(Memory.bots['upgrader'].length < 1){
        Memory.spawnQueue.push('upgrader')
    }
    if(Memory.bots['roadworker'].length < 2){
        Memory.spawnQueue.push('roadworker')
    }
    /*if(Memory.bots['travelminer'].length < 1){
        Memory.spawnQueue.push('travelminer')
    }
    if(Memory.bots['travelhauler'].length < 5){
        Memory.spawnQueue.push('travelhauler')
    }*/
}
/*

/!**
 * Created by Snipey on 10/18/2015.
 *!/
/!*
 * Stayalive - code to keep breeding creeps
 *!/
module.exports = function stayAlive() {
    for(var j in Game.rooms) {
        Memory.rooms[j].bots = {
            harvester: [],
            hauler: [],
            builder: [],
            upgrader: [],
            upgradehelper: []
        };
    }
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role) {
            Memory.rooms[j].bots[creep.memory.role].push(creep.id);
        }
    }

    for(var j in Game.rooms) {
        for (var i in Memory.rooms[j].spawnQueue) {
            if (Memory.rooms[j].spawnQueue[i] == 'harvester') {
                Memory.rooms[j].bots['harvester'].push('inQ');
            } else if (Memory.rooms[j].spawnQueue[i] == 'hauler') {
                Memory.rooms[j].bots['hauler'].push('inQ');
            } else if (Memory.rooms[j].spawnQueue[i] == 'upgrader') {
                Memory.rooms[j].bots['upgrader'].push('inQ');
            } else if (Memory.rooms[j].spawnQueue[i] == 'upgradehelper') {
                Memory.rooms[j].bots['upgradehelper'].push('inQ');
            } else if (Memory.rooms[j].spawnQueue[i] == 'builder') {
                Memory.rooms[j].bots['builder'].push('inQ');
            }
        }
    }


    for(var i in Game.rooms) {
        var room = Game.rooms[i]
        if (Memory.rooms[j].bots['harvester'].length < 6) {
            Memory.spawnQueue.unshift('harvester')
        }
        if (Memory.rooms[j].bots['hauler'].length < 5 && Memory.rooms[j].bots['harvester'].length > 1) {
            Memory.spawnQueue.unshift('hauler')
        } else if (Memory.rooms[j].bots['hauler'].length > 1 && Memory.rooms[j].bots['hauler'].length < 5) {
            Memory.spawnQueue.push('hauler')
        }
        if (Memory.rooms[j].bots['builder'].length < 1) {
            Memory.spawnQueue.push('builder')
        }
        if (Memory.rooms[j].bots['upgrader'].length < 1) {
            Memory.spawnQueue.push('upgrader')
        }
        /!*
         if(Memory.rooms[j].bots['upgradehelper'].length < 1){
         Memory.spawnQueue.push('upgradehelper')
         }*!/
    }
}*/
