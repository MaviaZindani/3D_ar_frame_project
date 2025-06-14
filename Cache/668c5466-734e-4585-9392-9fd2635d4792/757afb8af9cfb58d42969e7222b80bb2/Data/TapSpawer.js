var model = script.getSceneObject("modelToSpawn");

function onTouch(eventData) {
    var tapPos = eventData.getTapPosition(); // [x, y] screen coords
    var sceneTransform = script.getSceneObject().getTransform();

    var scenePos = sceneTransform.screenPointToWorld(tapPos, 10); // 10 is distance
    model.enabled = true;
    model.getTransform().setWorldPosition(scenePos);
}

var touchComponent = script.createEvent("TapEvent");
touchComponent.bind(onTouch);