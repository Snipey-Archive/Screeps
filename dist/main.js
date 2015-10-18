/**
 * The main module for the Screeps project.
 *
 * This module runs once every CPU "tick".
 *
 */

var CreepSpawning = require('creep_spawner')
var CreepRole = require('creep_role')()
//var creepCount = require('creepCounter')
// Notes to self:
// -Game.rooms accesses only rooms you have presence in.
// -For arrays, shift removes and returns the first item,
//    pop removes and returns the last item,
//    array[array.length - 1] gets the last item,
//    and array[0] gets the first item,
if(Memory.spawnQueue == undefined) {
    //Create the array of creeps that need to be spawned.
    Memory.spawnQueue = []
}

/*if(Memory.spawnInfinite == undefined) {
    //The creep that the spawn creates infinitely after the queue is done.
    Memory.spawnInfinite = 'archer'
}*/

// MAIN UPDATE LOOP
// Stuff outside this loop only executes when a new global is created.
module.exports.loop = function() {
    //creepCount.getRoomNeed();
    //Have each of our creeps do its job.
    for(var i in Game.creeps) {
        var CreepCurrent = Game.creeps[i]

        if(CreepCurrent.spawning || CreepCurrent.memory.role == undefined || CreepCurrent.memory.role == null)
            continue;

        CreepCurrent.performRole(CreepRole)
    }

    //Have each of our spawns create creeps.
    for(var i in Game.spawns) {
        var SpawnCurrent = Game.spawns[i]

        if(SpawnCurrent.spawning == null) {
            console.log("    - Spawn has "+SpawnCurrent.energy+"/"+CreepRole.getRoleCost(Memory.spawnQueue[0])+" needed energy")
            if(SpawnCurrent.energy >= CreepRole.getRoleCost(Memory.spawnQueue[0])) {
                if(Number.isInteger(SpawnCurrent.createRole(CreepRole, Memory.spawnQueue[0]))) {
                    console.log("Creating creep: Failed")
                } else {
                    console.log("Creating creep: Succeeded")
                    Memory.spawnQueue.shift();
                }
            }
        }
    }
    //Print status to the console.

    console.log("-------------------------------")
    console.log("|  Snipey's screeps v0.1  |")
    console.log("-------------------------------")
    console.log(" - Current Rooms: "+Object.keys(Game.rooms).length)
    console.log(" - Current Creeps: "+Object.keys(Game.creeps).length)
    console.log("   - Next Creep: "+Memory.spawnQueue[0]+" ("+CreepRole.getRoleCost(Memory.spawnQueue[0])+")")
    console.log(" - Current Spawns: "+Object.keys(Game.spawns).length)
    console.log(" - Current Queue: "+Object.keys(Memory.spawnQueue).length)

}
