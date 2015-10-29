
/**
 * The main module for the Screeps project.
 *
 * This module runs once every CPU "tick".
 *
 */

var profiler = require('UTIL_profiler')
var CreepSpawning = require('creep_spawner')
var CreepRole = require('creep_role')()
var structure = require('PROTO_structure')
var source = require('PROTO_source')
var creep = require('PROTO_creep')
var flag = require('PROTO_flag')
var spawn = require('stayAlive')
var controllerStatus = require('DEBUG_controllerStatus')
// Notes to self:
// -Game.rooms accesses only rooms you have presence in.
// -For arrays, shift removes and returns the first item,
//    pop removes and returns the last item,
//    array[array.length - 1] gets the last item,
//    and array[0] gets the first item,

for(var i in Game.spawns){
    var room = Game.spawns[i].room.name
    //console.log(room)
    if(Memory.rooms[room].spawnQueue == undefined) {
        Memory.rooms[room].spawnQueue = []
    }
}

// MAIN UPDATE LOOP
// Stuff outside this loop only executes when a new global is created.
module.exports.loop = function() {
    if(Memory.debug === true) {
            for (var i in Game.rooms) {
                var room = Game.rooms[i]
                profiler.openProfile('ROOM_' + room.name)
            }
    }
    profiler.openProfile('1: spawnlogic')
    spawn()
    profiler.closeProfile('1: spawnlogic')
    //controllerStatus()
    //Have each of our creeps do its job.
    profiler.openProfile('2: creepLogic')
    for(var i in Game.creeps) {
        var CreepCurrent = Game.creeps[i]

        if(CreepCurrent.spawning || CreepCurrent.memory.role == undefined || CreepCurrent.memory.role == null)
            continue;

        CreepCurrent.performRole(CreepRole)
    }
    profiler.closeProfile('2: creepLogic')
    profiler.openProfile('3: creepCreation')
    //Have each of our spawns create creeps.
    for(var i in Game.spawns) {
        var SpawnCurrent = Game.spawns[i]
        var room = SpawnCurrent.room.name

        if(SpawnCurrent.spawning == null && Memory.rooms[room].spawnQueue[0] || Memory.rooms[room].spawnQueue[0] != undefined) {
            //console.log("    - Spawn has "+SpawnCurrent.room.energyAvailable+"/"+CreepRole.getRoleCost(Memory.spawnQueue[0])+" needed energy")
            if(SpawnCurrent.room.energyAvailable >= CreepRole.getRoleCost(Memory.rooms[room].spawnQueue[0])) {
                if(Number.isInteger(SpawnCurrent.createRole(CreepRole, Memory.rooms[room].spawnQueue[0]))) {
                    console.log("Creating creep: Failed")
                } else {
                    console.log("Creating creep: Succeeded")
                    console.log("Spawning " + Memory.rooms[room].spawnQueue[0] + " in room " + SpawnCurrent.room.name)
                    Memory.rooms[room].spawnQueue.shift();
                }
            }
        }
    }
    profiler.closeProfile('3: creepCreation')
/*    for(var i in Memory.creeps) {
        for (var s in Game.spawns){
            var SpawnCurrent = Game.spawns[s]
            if (SpawnCurrent.spawning === i){
                continue
            }
        }
        var creep = Game.creeps[i]
        if(!i === creep){
            console.log("Creep is not in mem and alive")
        }
    }*/

    //profiler.showProfiles()
    if(Memory.debug === true){
        for (var i in Game.rooms){
            var room = Game.rooms[i]
            profiler.closeProfile('ROOM_' + room.name)
        }
    }

if(Memory.debug === true){
    profiler.showProfiles()
    console.log
    console.log("-------------------------------")
    console.log("|    Snipey's Screeps v0.1    |")
    console.log("-------------------------------")
    console.log(" - Current Rooms: "+Object.keys(Game.rooms).length)
    console.log(" - Current Creeps: "+Object.keys(Game.creeps).length)
    if(Memory.spawnQueue[0] == undefined || Memory.spawnQueue[0] == null){
        console.log(" - There is no creep in queue")
    }else{
        console.log(" - Next Creep: "+Memory.spawnQueue[0]+" ("+CreepRole.getRoleCost(Memory.spawnQueue[0])+")")
    }
    console.log(" - Current Spawns: "+Object.keys(Game.spawns).length)
    console.log(" - Current Queue: "+Object.keys(Memory.spawnQueue).length)
    console.log(" - Harvester count: " + Memory.bots['harvester'].length)
    console.log(" - Upgrader count: " + Memory.bots['upgrader'].length)
    console.log(" - Hauler count: " + Memory.bots['hauler'].length)
    console.log(" - Helper count: " + Memory.bots['upgradehelper'].length)
    console.log(" - Builder count: " + Memory.bots['builder'].length)
}
    for(var creep in Memory.creeps){
        if(!Game.creeps[creep]){
            if(Memory.creeps[creep].safeToDelete){
                delete Memory.creeps[creep];
            }
            else {
                Memory.creeps[creep].safeToDelete = true;
            }
        }
    }
}