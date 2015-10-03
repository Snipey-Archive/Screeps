module.exports = function (creep, p_room) {
  var lca = require('logCreepAction');

  var fixPrioritizedStructure = require('builderGetPrioritizedStructure');

    if(creep.spawning == true) {
      lca(creep, 'is still spawning.');
      return 0;
    }

    if(creep.carry.energy == 0  && Game.rooms['W11S23'].energyAvailable > 200) {
      lca( creep, 'is getting energy from spawn.');
        creep.moveTo(Game.spawns.Spawn1);
        Game.spawns.Spawn1.transferEnergy(creep);
    }
    else {
        if(creep.carry.energy == 0) {
          lca( creep, 'is traveling to spawn for energy.');
          creep.moveTo(Game.spawns.Spawn1);
        }
        else {
            var targets = Game.rooms['W11S23'].find(FIND_CONSTRUCTION_SITES);
            if(targets.length == 0) {
              // lca(creep, 'calling fixPrioritizedStructure', true);
              creep.memory.state = 'repairing';
              fixPrioritizedStructure(creep);
            }
            else {
                // console.log('[DEBUG] Construction sites: ' + targets.length);
                if(targets.length > 0) {
                  creep.memory.state = 'constructing';
                  lca(creep, 'found a construction site.');
                  creep.moveTo(targets[0]);
                  creep.build(targets[0]);
                  creep.memory.currentTarget = null; // this causes them to forget what they were working on before
                } else {
                  console.log(creep.name + '|' + creep.memory.role + ' needs a construction site.');
                }
            }
        }
    }
}
