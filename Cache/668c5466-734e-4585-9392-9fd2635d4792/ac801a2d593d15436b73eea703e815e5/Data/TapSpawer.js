//@input SceneObject modelToSpawn

function onTouch(eventData) {
    var tapPos = eventData.getTapPosition();
    var sceneTransform = script.getSceneObject().getTransform();
    var scenePos = script.getSceneObject().getTransform().screenPointToWorld(tapPos, 10);

    script.modelToSpawn.enabled = true;
    script.modelToSpawn.getTransform().setWorldPosition(scenePos);
}

var touchComponent = script.createEvent("TapEvent");
touchComponent.bind(onTouch);
