/**
 * Created by Dissi on 10/25/2015.
 */
var profiler = require('profiler');
var CONST_DESTINATION_REACHED = 1;
var CONST_PATH_BLOCKED = 2;
var CONST_MOVED = 4;
var CONST_TOO_FAR = 8;
var CONST_AT_START = 16;
var CONST_PATH_LOST = 32;
var CONST_TIRED = 64;
var CONST_PATH_BLOCKED_RETRY = 128;
var CONST_NEW_PATH = 256;

function doTravel(theCreep, theDestination)
{
    if (theCreep.memory.mv === undefined)
    {
        var theOrigin = theCreep.memory.currentLoc;
        var path = findPathTo(theOrigin, theDestination);
        if (path.path === undefined)
        {
            console.log('Creep [' + theCreep.name + "] couldn't travel from [" + theOrigin + "] to [" + theDestination + "]");
        }
        else
        {
            if (path.from === theOrigin)
            {
                theCreep.memory.mv = {
                    from: theOrigin,
                    to: theDestination,
                    inverted: false,
                    currentLoc: undefined
                };
            }
            else if (path.from === theDestination)
            {
                theCreep.memory.mv = {
                    from: theOrigin,
                    to: theDestination,
                    inverted: true,
                    currentLoc: undefined
                };
            }
            return theCreep.memory.mv !== undefined;
        }
    }
    return undefined;
}

function doWalk(theCreep)
{
    if (theCreep.fatigue > 0)
    {
        return CONST_TIRED;
    }
    if (theCreep.memory.mv === undefined)
    {
        return CONST_DESTINATION_REACHED;
    }
    var path = findPathTo(theCreep.memory.mv.from, theCreep.memory.mv.to);

    if (theCreep.memory.mv.currentLoc === undefined)
    {
        var initResult = checkCloseAndMove(theCreep, path);
        if (initResult == CONST_AT_START)
        {
            return validateLocationAndMove(theCreep, path);
        }
        else
        {
            return initResult;
        }
    }
    else
    {
        if (theCreep.memory.mv.complexEnd !== undefined && theCreep.memory.mv.complexEnd)
        {
            return findPlaceOnEnd(theCreep, path);
        }
        return validateLocationAndMove(theCreep, path)
    }
}

function finishCreepPath(theCreep, thePath)
{
    theCreep.memory.currentLoc = theCreep.memory.mv.to;
    if (thePath.temporary !== undefined && thePath.temporary === true)
    {
        console.log('Removed temporary route');
        erasePath(thePath);
    }
    theCreep.memory.mv = undefined;
}

function findPlaceOnEnd(theCreep, thePath)
{
    var toCheck = undefined;
    if (theCreep.memory.mv.inverted)
    {
        toCheck = thePath.fromPoint;
    }
    else
    {
        toCheck = thePath.toPoint;
    }
    for (var i = 0; i < toCheck.l; i++)
    {
        var coord = getCoordinate(toCheck, i);
        if (coord.x == theCreep.pos.x && coord.y == theCreep.pos.y)
        {
            finishCreepPath(theCreep, thePath);
            return CONST_DESTINATION_REACHED;
        }
    }

    var lastCoord = undefined;
    for (var i = 0; i < toCheck.l; i++)
    {
        var coord = getCoordinate(toCheck, i);
        var found = theCreep.room.lookForAt("creep", coord.x, coord.y);
        if (!found.length)
        {
            var junk = locationHasJunk(theCreep.room, coord);
            if(junk)
            {
                erasePath(thePath);
                finishCreepPath(theCreep);
                var toTravelTo = theCreep.memory.currentLoc;
                theCreep.memory.currentLoc = theCreep.id;
                createRouteForSelf(theCreep, toTravelTo);
                return CONST_PATH_BLOCKED;
            }
            // console.log(theCreep.name + ' used pathfinder... to go to ' + coord.x + ' ' + coord.y);
            return theCreep.moveTo(coord.x, coord.y,
                {
                    reusePath: 0
                }) == OK ? CONST_MOVED : CONST_PATH_BLOCKED;
        }
        else
        {
            lastCoord = coord;
        }
    }
    if (lastCoord !== undefined)
    {
        var locationtoMoveTo = getdirection(theCreep.pos, lastCoord);
        theCreep.move(locationtoMoveTo);
    }
    return CONST_PATH_BLOCKED;
}

function getNextLocation(theCreep, thePath)
{
    if (theCreep.memory.mv.inverted)
    {
        return theCreep.memory.mv.currentLoc - 1
    }
    else
    {
        return theCreep.memory.mv.currentLoc + 1;
    }
}

function getPreviousLocation(theCreep, thePath)
{
    if (!theCreep.memory.mv.inverted)
    {
        return theCreep.memory.mv.currentLoc - 1
    }
    else
    {
        return theCreep.memory.mv.currentLoc + 1;
    }
}

function atDestination(theCreep, thePath, aLocation)
{
    if (theCreep.memory.mv.inverted)
    {
        return aLocation == 0;
    }
    else
    {
        return (thePath.path.l - 1) == aLocation;
    }
}

function validateLocationAndMove(theCreep, thePath)
{
    if (theCreep.memory.mv.currentLoc === undefined)
    {
        return CONST_PATH_BLOCKED
    }
    var cLoc = theCreep.memory.mv.currentLoc;
    var coord = getCoordinate(thePath.path, cLoc);


    if (coord.x != theCreep.pos.x || coord.y != theCreep.pos.y) // path blocked
    {
        var result = checkBlockedPath(cLoc, coord, theCreep, thePath);
        if (CONST_PATH_BLOCKED_RETRY == result)
        {
            cLoc = theCreep.memory.mv.currentLoc;
            coord = getCoordinate(thePath.path, cLoc);
        }
        else
        {
            return result;
        }
    }
    else
    {
        theCreep.memory.mv.blockedFor = undefined;
    }

    if (atDestination(theCreep, thePath, cLoc))
    {
        var end = theCreep.memory.mv.inverted ? thePath.from : thePath.to;
        finishCreepPath(theCreep, thePath);
        return CONST_DESTINATION_REACHED;
    }

    var newLoc = getNextLocation(theCreep, thePath);
    var next = getCoordinate(thePath.path, newLoc);
    var direction = getdirection(coord, next);
    if (theCreep.move(direction) === OK)
    {
        theCreep.memory.mv.currentLoc = newLoc;
        return CONST_MOVED;
    }
    else
    {
        return CONST_PATH_BLOCKED;
    }
}

function checkBlockedPath(cLoc, coord, theCreep, thePath)
{
    var previousLoc = getPreviousLocation(theCreep, thePath);
    coord = getCoordinate(thePath.path, previousLoc);
    if (coord.x != theCreep.pos.x || coord.y != theCreep.pos.y)
    {
        // Path was recently removed?
        finishCreepPath(theCreep, thePath);
        var toTravelTo = theCreep.memory.currentLoc;
        theCreep.memory.currentLoc = theCreep.id;
        createRouteForSelf(theCreep, toTravelTo);
        return CONST_NEW_PATH;
        //return CONST_PATH_LOST;
    }
    else if (atDestination(theCreep, thePath, cLoc))
    {
        theCreep.memory.mv.currentLoc = previousLoc;
        theCreep.memory.mv.complexEnd = true;
        return findPlaceOnEnd(theCreep, thePath);
    }
    var blockedCoord = getCoordinate(thePath.path, cLoc);
    theCreep.memory.mv.blockedFor === undefined ? (theCreep.memory.mv.blockedFor = 1) : (theCreep.memory.mv.blockedFor += 1);
    theCreep.memory.mv.currentLoc = previousLoc;
    cLoc = previousLoc;
    if (theCreep.memory.mv.blockedFor > 8)
    {
        var blockedBy = theCreep.room.lookForAt('creep', blockedCoord.x, blockedCoord.y);
        if (blockedBy.length)
        {
            blockedBy[0].memory.inTheWay = true;
            // just wait more...
            return CONST_PATH_BLOCKED_RETRY;
        }
        else if (!isValidPath(thePath))
        {
            erasePath(thePath);
            finishCreepPath(theCreep, thePath);
            var toTravelTo = theCreep.memory.currentLoc;
            theCreep.memory.currentLoc = theCreep.id;
            createRouteForSelf(theCreep, toTravelTo);
            return CONST_NEW_PATH;
        }
    }
    return CONST_PATH_BLOCKED_RETRY;

}

function createRouteForSelf(theCreep, theDestination)
{
    console.log('Traveling from own location to destination [' + theDestination + ']');
    var found = doTravel(theCreep, theDestination);
    if (found !== undefined)
    {
        var path = findPathTo(theCreep.id, theDestination);
        path.temporary = true;
    }
}

function isValidPath(thePath)
{
    console.log('Validating path... ');
    var location = Game.getObjectById(thePath.from).room;
    console.log('Path of room ' + location.name);
    for (var i = 0; i < thePath.path.l; i++)
    {
        var coord = getCoordinate(thePath.path, i);
        var stuffAtLocation = location.lookAt(coord.x, coord.y);
        if (stuffAtLocation.length && hasJunk(stuffAtLocation))
        {
            return false;
        }
    }
    return true;
}

function hasJunk(theList)
{
    for (var i = 0; i < theList.length; i++)
    {
        var toCheck = theList[i];
        if (toCheck.type === 'constructionSite' && toCheck.constructionSite.structureType !== STRUCTURE_RAMPART && toCheck.constructionSite.structureType !== STRUCTURE_ROAD)
        {
            return true;
        }
        else if (toCheck.type === 'structure' && toCheck.structure.structureType !== STRUCTURE_ROAD && toCheck.structure.structureType !== STRUCTURE_RAMPART)
        {
            return true;
        }

    }
    return false;
}

function locationHasJunk(theRoom, theLocation)
{
    var stuffAtLocation = theRoom.lookAt(theLocation.x, theLocation.y);
    return hasJunk(stuffAtLocation);
}


function getdirection(theFrom, theTo)
{
    var xDif = theTo.x - theFrom.x;
    var yDif = theTo.y - theFrom.y;

    if (xDif == 0)
    {
        return yDif == 1 ? BOTTOM : TOP;
    }
    if (yDif == 0)
    {
        return xDif == 1 ? RIGHT : LEFT;
    }
    if (xDif == 1)
    {
        return yDif == 1 ? BOTTOM_RIGHT : TOP_RIGHT;
    }
    else
    {
        return yDif == 1 ? BOTTOM_LEFT : TOP_LEFT;
    }
}

function checkCloseAndMove(theCreep, thePath)
{
    var currentPos = theCreep.pos;
    var startPointId = theCreep.memory.mv.inverted ? (thePath.path.l - 2) : 1;
    var startPoint = getCoordinate(thePath.path, startPointId)

    if (currentPos.x == startPoint.x && currentPos.y == startPoint.y)
    {
        theCreep.memory.mv.currentLoc = theCreep.memory.mv.inverted ? (thePath.path.l - 2) : 1;
        return CONST_AT_START;
    }
    var difX = Math.abs(currentPos.x - startPoint.x);
    var difY = Math.abs(currentPos.y - startPoint.y);
    var totalDistance = difX + difY;
    if (totalDistance > 5)
    {
        return CONST_TOO_FAR;
    }
    var path = theCreep.pos.findPathTo(startPoint.x, startPoint.y,
        {
            ignoreCreeps: true
        });
    if (path.length)
    {
        if(locationHasJunk(theCreep.room, startPoint))
        {
            erasePath(thePath);
            finishCreepPath(theCreep);
            var toTravelTo = theCreep.memory.currentLoc;
            theCreep.memory.currentLoc = theCreep.id;
            createRouteForSelf(theCreep, toTravelTo);
            return CONST_PATH_BLOCKED;
        }
        return theCreep.move(path[0].direction);
    }
    else
    {
        return CONST_PATH_BLOCKED;
    }
}

function findPathTo(theOrigin, theDestination)
{
    var origin = Game.getObjectById(theOrigin);
    var destination = Game.getObjectById(theDestination);

    if (origin === undefined || destination === undefined || origin.pos === undefined || destination.pos === undefined)
    {
        return defaultPath(theOrigin, theDestination);;
    }

    var storedPath = getStoredPath(theOrigin, theDestination);

    if (storedPath !== undefined)
    {
        storedPath.gT++;
        if (storedPath.gT > 5000)
        {
            pavePath(storedPath);
        }
        return storedPath;
    }


    var routeType = 's';
    if (origin.room !== destination.room)
    {
        routeType = 'c';
    }

    if (routeType === 's')
    {
        profiler.openProfile(theOrigin + "_" + theDestination);
        var path = origin.room.findPath(origin.pos, destination.pos,
            {
                ignoreCreeps: true,
                ignoreDestructibleStructures: false,
                heuristicWeight: 1000
            });
        if (path.length)
        {
            var pResult = collapsePath(path, origin.pos, destination.pos);
            var originOpen = getOpenSquares(origin.room, origin.pos);
            var destinationOpen = getOpenSquares(destination.room, destination.pos);

            var collapsedStartPoints = collapsePath(originOpen);
            var collapsedEndPoints = collapsePath(destinationOpen);

            var endResult = {
                path: pResult,
                pathType: routeType,
                fromPoint: collapsedStartPoints,
                from: theOrigin,
                toPoint: collapsedEndPoints,
                to: theDestination,
                gT: 0
            };
            storePath(endResult);
            paveRoughPath(endResult);
            profiler.closeProfile(theOrigin + "_" + theDestination);
            return endResult;
        }
        profiler.closeProfile(theOrigin + "_" + theDestination);
        return defaultPath(theOrigin, theDestination);;
    }
    else // not supported yet
    {
        return defaultPath(theOrigin, theDestination);;
    }
}

function getCoordinate(thePath, index)
{
    var xStart = index * 4;
    var yStart = index * 4 + 2;
    var x = parseInt(thePath.p[xStart] + '' + thePath.p[xStart + 1], 10);
    var y = parseInt(thePath.p[yStart] + '' + thePath.p[yStart + 1], 10);
    return {
        x: x,
        y: y
    };
}

function getOpenSquares(theRoom, thePos)
{
    var surroundings = theRoom.lookForAtArea("terrain", thePos.y - 1, thePos.x - 1, thePos.y + 1, thePos.x + 1);
    var positions = [];
    for (var y in surroundings)
    {
        for (var x in surroundings[y])
        {
            if ((surroundings[y][x][0] === 'plain' || surroundings[y][x][0] === 'swamp') && (x != thePos.x || y != thePos.y))
            {
                var stuffAtLocation = theRoom.lookAt(new RoomPosition(x, y, ''));

                if (stuffAtLocation.length && hasJunk(stuffAtLocation))
                {
                    continue;
                }
                positions.push(
                    {
                        x: x,
                        y: y
                    });
            }

        }
    }

    return positions;
}

function getStoredPath(theOrigin, theDestination)
{
    if (Memory.paths === undefined)
    {
        Memory.paths = {};
        return undefined;
    }

    var pathKey = theOrigin + "_" + theDestination;

    var lookup = Memory.paths[pathKey];
    if (lookup !== undefined)
    {
        return lookup
    }
    var pathKey = theDestination + "_" + theOrigin;
    lookup = Memory.paths[pathKey];
    if (lookup)
    {
        return lookup
    }
    return undefined;
}

function collapsePath(thePath, theStartPoint, theEndPoint)
{
    var pResult = "";
    var amount = 0;
    var p = undefined;
    var allowed = true;
    for (var i = 0; i < thePath.length; i++)
    {
        allowed = true;
        p = thePath[i];

        if (theStartPoint !== undefined && theStartPoint.x == p.x && theStartPoint.y == p.y)
        {
            allowed = false;
        }
        else if (theEndPoint !== undefined && theEndPoint.x == p.x && theEndPoint.y == p.y)
        {
            allowed = false;
        }
        if (allowed)
        {
            amount++;
            pResult += n(p.x) + n(p.y);
        }
    }

    return {
        p: pResult,
        l: amount
    };

}


function defaultPath(theOrigin, theDestination)
{
    return {
        path: undefined,
        from: theOrigin,
        to: theDestination,
        gT: 0
    };
}

function storePath(thePath)
{
    var pathKey = thePath.from + "_" + thePath.to;
    Memory.paths[pathKey] = thePath;

}

function erasePath(thePath)
{
    var pathKey = thePath.from + "_" + thePath.to;
    console.log('Erasing path ' + pathKey);
    delete Memory.paths[pathKey];
}

function n(n)
{
    return n > 9 ? "" + n : "0" + n;
}


function pavePath(thePath)
{
    if (thePath.pathType == 's')
    {
        paveSimplePath(thePath);
    }
}

function paveRoughPath(thePath)
{
    if (thePath.pathType == 's')
    {
        paveRoughSimplePath(thePath);
    }
}

function paveRoughSimplePath(thePath)
{
    var origin = Game.getObjectById(thePath.from);

    pavePoints(origin.room, thePath.path, 'swamp');
    pavePoints(origin.room, thePath.fromPoint, 'swamp');
    pavePoints(origin.room, thePath.toPoint, 'swamp')
}

function paveSimplePath(thePath)
{
    var origin = Game.getObjectById(thePath.from);
    if (thePath.paved === undefined)
    {
        thePath.paved = false;
    }
    if (!thePath.paved)
    {
        pavePoints(origin.room, thePath.path);
        pavePoints(origin.room, thePath.fromPoint);
        pavePoints(origin.room, thePath.toPoint)
        thePath.paved = true;
    }
}

function pavePoints(theRoom, thePath, theRoadType)
{
    for (var i = 0; i < thePath.l; i++)
    {
        var coord = getCoordinate(thePath, i);
        if (theRoadType !== undefined)
        {
            var found = theRoom.lookForAt('terrain', coord.x, coord.y);
            if (found.length && found[0] !== theRoadType)
            {
                continue;
            }
        }

        var createResult = theRoom.createConstructionSite(coord.x, coord.y, STRUCTURE_ROAD);
    }
}

module.exports.findPathTo = findPathTo;
module.exports.getCoordinate = getCoordinate;
module.exports.pavePath = pavePath;
module.exports.doWalk = doWalk;
module.exports.doTravel = doTravel;
module.exports.PATH_DESTINATION_REACHED = CONST_DESTINATION_REACHED;