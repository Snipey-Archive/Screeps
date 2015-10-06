function getCreepsInRoom(room){
    var creeps = room.find(FIND_MY_CREEPS);
    return creeps;
}

function getSpawn(room){
    var spawn = room.find(FIND_MY_SPAWNS);
    return spawn;
}

function getRoomSpawn(spawn){
    var room = spawn.room;
    return room;
}

function getRoomCreep(creep){
    var room = creep.room;
    return room;
}

function getNameRoom(creep){
    var roomName = creep.pos.roomName;
    return roomName;
}


module.exports = {
    getCreepsInRoom: getCreepsInRoom,
    getSpawn: getSpawn,
    getRoomCreep: getRoomCreep,
    getRoomSpawn: getRoomSpawn,
    getNameRoom: getNameRoom
}