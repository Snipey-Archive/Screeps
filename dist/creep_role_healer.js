/**
 * Created by Snipey on 10/25/2015.
 */


/**
 * Created by Snipey on 10/17/2015.
 */
module.exports = function() {
    var healer = {
        parts: [
            [MOVE, HEAL],
            [MOVE, HEAL, HEAL],
            [TOUGH, MOVE, MOVE, MOVE, HEAL, HEAL],
            [TOUGH, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL]
        ],

        costs: [
            300,
            550,
            700,
            1000
        ]
    };

    healer.getPartsForExtensionCount = function(count) {
        console.log("Parts By Extension: "+this.parts[count])
        return this.parts[count]
    },

        healer.getParts = function() {
            return this.getPartsForExtensionCount(2)
        },

        healer.getCostForExtensionCount = function(count) {
            return this.costs[count]
        },

        healer.getCost = function() {
            return this.getCostForExtensionCount(2)
        },

        healer.performRole = function(CreepRole, creep) {
            /*var flag = Game.flags['attack']
            if(flag.roomName != creep.roomName){
                creep.moveTo(flag, {
                    reusePath: 20,
                    serializeMemory: true
                })
            }
            var needHeal = creep.pos.findClosestByRange(FIND_CREEPS, {
                filter: function (object) {
                    return object.hits < object.hitsMax && object.owner.username == 'Snipey92' || object.owner.username == 'Max_well'
                }
            });
            if (needHeal) {
                if (creep.pos.isNearTo(needHeal)) {
                    //console.log(creep.heal(needHeal));
                    creep.heal(needHeal);
                }
                else {
                    creep.moveTo(needHeal, {reusePath: 0});
                }
            } else {
                creep.moveTo(Game.flags['heal'])
            }*/
        }
    return healer;
}