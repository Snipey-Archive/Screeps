/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('explore'); // -> 'a thing'
 */

module.exports = function(creep, p_room) {
  var lca = require('logCreepAction');
  var displayErr = require('displayError');
  var moveToDest = require('findPathToExit');
  var results = null;

  if(creep.spawning == true) {
    lca(creep, 'is still spawning.');
    return OK;
  }

  switch(creep.memory.mode) {
  case 'pillage':
    // lca(creep, 'pillaging in ' + creep.room.name + '.',true);
    var hostileCreeps = creep.room.find(FIND_HOSTILE_CREEPS);
    // lca(creep, 'hostile creeps present: ' + hostileCreeps.length,true);
    if(hostileCreeps && hostileCreeps.length > 0) {
      // There are hostiles, run without concern and attack them.
      lca(creep, ' pillaging ' + hostileCreeps.length + ' hostile creeps in ' + creep.room.name + '.');
      creep.moveTo(hostileCreeps[0]);
      creep.attack(hostileCreeps[0]);
    } else {
      var hostileTargets = creep.room.find(FIND_HOSTILE_STRUCTURES);
      // lca(creep, 'hostile targets present: ' + hostileTargets.length,true);
      if(hostileTargets && hostileTargets.length > 1){
         lca(creep, ' pillaging ' + hostileTargets.length + ' hostile structures in ' + creep.room.name + '.');
        for(id in hostileTargets) {
          var target = hostileTargets[id];
          if(target.structureType != 'controller') {
            creep.moveTo(target);
            creep.attack(target);
            break;
          }
        }
      } else {
        targets = creep.room.find(FIND_STRUCTURES);
        for(id in targets) {
          var target = targets[id];
          if(target.structureType != 'controller') {
            lca(creep, ' pillaging a ' + target.structureType + ' at ' + target.pos.x + ',' + target.pos.y + ' of '+ targets.length + ' standard structures in ' + creep.room.name + '.');
            creep.moveTo(target);
            creep.attack(target);
            break;
          }
        }
      }
    }
    break;
  case 'room':
    if(typeof creep.memory.roomDestination === 'undefined') {
      lca(creep,'is in room mode, but has no roomDestination');
    } else {
      lca(creep, 'is in room mode in room: ' + creep.pos.roomName + ' heading to ' + creep.memory.roomDestination + '.');
      results = moveToDest(creep, creep.memory.roomDestination);
    }
    break;
  case 'pos':
    if(typeof creep.memory.posDestination === 'undefined' || creep.memory.posDestination == null) {
      lca(creep,'is in pos mode, but has no posDestination');
    } else {
      // position is defined - handle movement of creep
      if(creep.pos.roomName == creep.memory.posDestination.roomName) {
        // we are in the correct room
        // 1. check to see if we have reached destination
        //    yes - stop
        //    no  - move
        if(creep.pos.x == creep.memory.posDestination.x &&
           creep.pos.y == creep.memory.posDestination.y &&
           creep.pos.roomName == creep.memory.posDestination.roomName) {
          lca(creep, 'has reached the destination.');
          //creep.memory.posDestination = null;f
        } else {
          lca(creep, 'heading to ' + creep.memory.posDestination.x + ',' + creep.memory.posDestination.y);
          creep.moveTo(creep.memory.posDestination.x, creep.memory.posDestination.y);
        }
      } else {
        lca(creep,'is not in the room matching his posDestination');
        if(creep.pos.x == 49) {
          creep.move(LEFT);
        }
        if(creep.pos.x == 0) {
          creep.move(RIGHT);
        }
        if(creep.pos.y == 49) {
          creep.move(TOP);
        }
        if(creep.pos.y == 0) {
          creep.move(BOTTOM);
        }
        creep.memory.posDestination = null;
      }

    }
    break;
  case 'target':
    // Check for appropriate destination
    if(typeof creep.memory.targetDestination === 'undefined' || creep.memory.targetDestination == null) {
      console.log(creep.name + 'is in target mode, but has no targetDestination');
    } else {
      // targetDestination is defined
      var target = creep.memory.targetDestination;
      results = creep.moveTo(Game.structures[target.id]);
      if(results != OK) { console.log(creep.name + ' call to moveTo returned: ' + displayError(results)); }
    }
    break;
  case 'controller':
    creep.moveTo(creep.room.controller);
    results = creep.claimController(creep.room.controller);
    if(results != OK) {
      console.log(creep.name + ' call to claimController returned: ' + displayError(results));
    }
    break;
  default:
    //console.log(creep.name + ' is in ' + creep.memory.mode + ' mode (default?).');
}

    /*
    if(typeof creep.memory.roomDestination === undefined) {
         if(Game.time % 1 == 0){
             console.log( creep.name + ' is awaiting a roomDestination to be set.');
         }
     }
     else {
        if(creep.room.name != creep.memory.roomDestination) {
            var route = creep.room.findExitTo(creep.memory.roomDestination);
            if(route != ERR_NO_PATH) {
                console.log(creep.name + '\'s route is ' + route);
                creep.moveTo(creep.pos.findClosestByPath(route));
            } else {
                console.log(creep.name + ' is standing by... console please')
            }
        }
     }
     */
 }