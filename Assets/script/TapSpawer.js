// ----- SCRIPT INPUTS -----
@input Component.Camera camera
@input SceneObject modelToSpawn
@input float modelScale = 100.0

// ----- INTERNAL VARIABLES -----
var isDragging = false;
var isPinching = false;
var lastTouchPos;
var initialDistance = 0;
var initialScale = script.modelToSpawn.getTransform().getWorldScale();

vec3.prototype.uniformScale = function (factor) {
    return new vec3(this.x * factor, this.y * factor, this.z * factor);
}

// ----- HELPER: Set Model Position -----
function setModelPosition(screenPos) {
    var worldData = script.camera.screenSpaceToWorldSpace(screenPos, 1);
    if (worldData) {
        script.modelToSpawn.getTransform().setWorldPosition(worldData.worldPosition);
    }
}

// ----- ON TAP: Place Model -----
function onTouch(eventData) {
    var screenPos = eventData.getTapPosition();
    script.modelToSpawn.enabled = true;
    setModelPosition(screenPos);
    script.modelToSpawn.getTransform().setWorldScale(new vec3(script.modelScale, script.modelScale, script.modelScale));
}
var tapEvent = script.createEvent("TapEvent");
tapEvent.bind(onTouch);

// ----- ON TOUCH START -----
function onTouchStart(eventData) {
    if (eventData.getTouchCount() == 1) {
        isDragging = true;
        lastTouchPos = eventData.getTouchPosition(0);
    } else if (eventData.getTouchCount() == 2) {
        isPinching = true;
        var p0 = eventData.getTouchPosition(0);
        var p1 = eventData.getTouchPosition(1);
        initialDistance = p0.distance(p1);
        initialScale = script.modelToSpawn.getTransform().getWorldScale();
    }
}
var touchStartEvent = script.createEvent("TouchStartEvent");
touchStartEvent.bind(onTouchStart);

// ----- ON TOUCH MOVE -----
function onTouchMove(eventData) {
    if (isDragging && eventData.getTouchCount() == 1) {
        var currentPos = eventData.getTouchPosition(0);
        setModelPosition(currentPos);
    } else if (isPinching && eventData.getTouchCount() == 2) {
        var p0 = eventData.getTouchPosition(0);
        var p1 = eventData.getTouchPosition(1);
        var currentDistance = p0.distance(p1);
        var scaleFactor = currentDistance / initialDistance;

        var newScale = initialScale.uniformScale(scaleFactor);
        script.modelToSpawn.getTransform().setWorldScale(newScale);
    }
}
var touchMoveEvent = script.createEvent("TouchMoveEvent");
touchMoveEvent.bind(onTouchMove);

// ----- ON TOUCH END -----
function onTouchEnd(eventData) {
    isDragging = false;
    isPinching = false;
}
var touchEndEvent = script.createEvent("TouchEndEvent");
touchEndEvent.bind(onTouchEnd);
