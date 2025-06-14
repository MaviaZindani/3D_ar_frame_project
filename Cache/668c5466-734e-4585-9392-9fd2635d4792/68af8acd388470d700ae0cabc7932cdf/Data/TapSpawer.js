//@input SceneObject modelToSpawn

var model = script.getSceneObject("modelToSpawn"); // Yeh property chahiye

function onTouch(eventData) {
    var tapPos = eventData.getTapPosition();
    var sceneTransform = script.getSceneObject().getTransform();
    var scenePos = sceneTransform.screenPointToWorld(tapPos, 10);
    model.enabled = true;
    model.getTransform().setWorldPosition(scenePos);
}

var touchComponent = script.createEvent("TapEvent");
touchComponent.bind(onTouch);
