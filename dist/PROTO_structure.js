
/**
 * Created by Snipey on 10/20/2015.
 */
Structure.prototype.needsRepair = function() {
    if(this.structureType == STRUCTURE_RAMPART){
        return this.hits < 60000;
    }else if(this.structureType == STRUCTURE_WALL){
        return this.hits < this.hitsMax * 0.002
    }

};

Structure.prototype.hasRepair = function() {
    var hasRepair = false
    for(var i in Game.creeps){
        var creep = Game.creeps[i]
        if(creep.memory.role == 'repair' && this.id == creep.memory.target){
            hasRepair = true
        }
    }
    return hasRepair
}

Structure.prototype.hasBuilder = function() {
    var hasRepair = false
    for(var i in Game.creeps){
        var creep = Game.creeps[i]
        if(creep.memory.role == 'builder' && this.id == creep.memory.target){
            hasRepair = true
        }
    }
    return hasRepair
}

Structure.prototype.needsEnergy = function() {
    return this.energy < this.energyCapacity;
};