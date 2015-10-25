
/**
 * Created by Snipey on 10/20/2015.
 */
Structure.prototype.needsRepair = function() {
    return this.hits < this.hitsMax * 0.7;
};

Structure.prototype.needsEnergy = function() {
    return this.energy < this.energyCapacity;
};