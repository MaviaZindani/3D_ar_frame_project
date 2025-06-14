//@input SceneObject modelToSpawn
//@input Component.Camera camera

function onTouch(eventData) {
    var tapPos = eventData.getTapPosition(); // Screen position (0 to 1)
    
    // Convert screen point to world space using camera
    var worldData = script.camera.screenSpaceToWorldSpace(tapPos, 1); // 1 is z-depth

    // Enable and move model
    script.modelToSpawn.enabled = true;
    script.modelToSpawn.getTransform().setWorldPosition(worldData.worldPosition);
}

var touchComponent = script.createEvent("TapEvent");
touchComponent.bind(onTouch);
