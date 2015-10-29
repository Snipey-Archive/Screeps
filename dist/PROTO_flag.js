/**
 * Created by Snipey on 10/26/2015.
 */
Flag.prototype.findEnemiesInRange = function(range){
    return this.pos.findInRange(FIND_HOSTILE_CREEPS, range);
}
Flag.prototype.findStructuresInRange = function(range){
    return this.pos.findInRange(FIND_HOSTILE_STRUCTURES, range);
}
Flag.prototype.findEnemySpawns = function(){
    return this.room.find(FIND_HOSTILE_STRUCTURES, {
        filter: function(object){
            return object.structureType == STRUCTURE_SPAWN
        }
    });
}