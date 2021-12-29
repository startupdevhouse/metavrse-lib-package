export default `var Animations = Module.require('assets/Animations.js')();

module.exports = () => {
    // Module is always available
    var surface = Module.getSurface();
    var scene = surface.getScene();

    var arWrapper;
    var arAnchor;
    
    var viewport = Module.camera.viewport;

    var GlobalProps = {
        state: 'main',
        obtainAnchor: false,
        scene: {},
        assets: {},
        width: viewport[2],
        height: viewport[3],
        rotation: viewport[0],
        rotate_direction: 1,
        color:"white"
    }

    var cam; // camera animation
    var camRunning = false;

    // modify these values for AR
    var ar_instructions_id = "1587108381162";
    var marker_id = "1586746813004";
    var mobile_config = "1587148816752";
    // modify these values for AR
    
    var arscene = [];
    var world_id;

    var anchorCamera = Module.require('assets/ARObjectController.js')({
        zoomFactor:20,
        rotateFactor:100,
        scaleBounds:[0.1, Infinity],
        scale:1,
    });
    
    var resetAnchors = function(){
        // show scene and hide marker
        arAnchor = undefined;
        var anchors = {}
        
        for (key in arscene) {
            if (Module.ProjectManager.getObject(arscene[key])){
                Module.ProjectManager.getObject(arscene[key]).addToRedraw("visible");
                Module.ProjectManager.getObject(arscene[key]).addToRedraw("transform");
            }
        }
        
        // reset skybox
        if (Module.ProjectManager.getObject("world")) {
            const show = Module.ProjectManager.getObject('world').skybox.show;
            Module.ProjectManager.getObject('world').skybox.show = !show;
            Module.ProjectManager.getObject('world').skybox.show = show;
        }

        // hide marker
        if (Module.ProjectManager.getObject(marker_id)) {
            Module.ProjectManager.getObject(marker_id).visible = false;
        }
    }
    
    const getRootNodes = ()=> {
        arscene = [];
        var project = Module.ProjectManager.project;
        var _scene = project.data['scene'][project.data.selected_scene];
        
        for (var x = 0; x < _scene.tree.length; x++) {
            var n = _scene.tree[x];
            if (n.type == "world") world_id = n.key;
            if (n.key == marker_id || n.type == "hud" || n.type == "configuration" || n.type == "world") continue;

            arscene.push(n.key);
        }
    }

    var onInit = () => {
        // get root nodes
        getRootNodes();
        
        // reset anchors
        resetAnchors();
        
        // mobile up
        onSurfaceChanged(GlobalProps.rotation, GlobalProps.width, GlobalProps.height);

        // ar
        if (Module.getARWrapper) {
            arWrapper = Module.getARWrapper();
            arWrapper.onSurfaceCreated();
        }
        
        // fly camera in
        
        const starting_camera = {
            distance: Module.controls.distance,
            target: [...Module.controls.target],
            position: [...Module.controls.position],
        }
        
        const finishing_camera = {
            distance: 1.9000105431572794,
            target: [0, 0, 0],
            position: [0.5955932386055451, 0.7370691533925217, 1.653768490202123],
        }
        
        Module.controls.rotateEnabled = false;
        Module.controls.zoomEnabled = false;
        Module.controls.panEnabled = false;
        Module.controls.clickEnabled = false;
        
        const camopts = {
            delay: 0,
            duration: 2500,
            starting: starting_camera,
            finishing: finishing_camera,
            timing: Animations.timing.easeOutCubic,
            speed: 1,
            onDraw: (perc)=> {
                camRunning = true;
            },
            onComplete: ()=> {
                camRunning = false;
                Module.controls.rotateEnabled = true;
                Module.controls.zoomEnabled = true;
                Module.controls.panEnabled = true;
                Module.controls.clickEnabled = true;
            }
        }
        
        Module.controls.animation.play(camopts)

        return true;
    }

    var onRender = () => {
        if (GlobalProps.state == "ar" && arWrapper && arWrapper.isAvailable()) {
            // hijack renderer and override for AR
            if (GlobalProps.obtainAnchor) {
                // looking for an anchor
                var t_anchor = arWrapper.obtainAnchor(GlobalProps.width / 2, GlobalProps.height / 2, -1);
                if (t_anchor != null && arAnchor != null) {
                    arWrapper.releaseAnchor(arAnchor);
                    arAnchor = t_anchor;
                } else if (t_anchor != null) arAnchor = t_anchor;
            }

            // always hide skybox in AR
            scene.showSkybox(false);
            
            // use AR camera information and render
            arWrapper.render();
            scene.setProjectionMatrix(arWrapper.getProjectionMatrix());
            scene.setCameraMatrix(arWrapper.getViewMatrix());

            if (arAnchor != null) {
                // found anchor
                anchorCamera.update();
                var mat = arWrapper.getAnchorMatrix(arAnchor);
                if (!GlobalProps.obtainAnchor) mat4.multiply(mat, mat, anchorCamera.matrix);
                
                var anchors = {}
                if (GlobalProps.obtainAnchor) {
                    // hide instructions
                    if (Module.ProjectManager.getObject(ar_instructions_id)){
                        anchors[ar_instructions_id] = { visible: false }
                        Module.ProjectManager.getObject(ar_instructions_id).visible = false;
                        Module.ProjectManager.getObject(ar_instructions_id).addToRedraw('visible');
                    }
                    
                    // showing marker
                    if (Module.ProjectManager.getObject(marker_id)){
                        anchors[marker_id] = { transform: mat, visible: true }
                        Module.ProjectManager.getObject(marker_id).visible = true;
                        Module.ProjectManager.getObject(marker_id).addToRedraw('visible');
                    }

                    // hiding everything else
                    for (key in arscene) {
                        if (Module.ProjectManager.getObject(arscene[key])){
                            anchors[arscene[key]] = { visible: false }
                            Module.ProjectManager.getObject(arscene[key]).addToRedraw('visible');
                        }
                    }
                } else {
                    // marker chosen, transform scene items with anchor
                    for (key in arscene) {
                        if (Module.ProjectManager.getObject(arscene[key])){
                            anchors[arscene[key]] = { transform: mat, visible: true }
                            Module.ProjectManager.getObject(arscene[key]).addToRedraw('visible');
                        }
                    }

                    // hide marker
                    if (Module.ProjectManager.getObject(marker_id)){
                        anchors[marker_id] = { visible: false }
                        Module.ProjectManager.getObject(marker_id).visible = false;
                        Module.ProjectManager.getObject(marker_id).addToRedraw('visible');
                    }
                    
                }
            }else{
                // show instructions to get anchor
                var anchors = {}
                
                if (scene.getObject(ar_instructions_id)){
                    scene.getObject(ar_instructions_id).playAnimation(0)
                }
                
                // hide everything
                for (key in arscene) {
                    if (Module.ProjectManager.getObject(arscene[key])){
                        anchors[arscene[key]] = { visible: false }
                        Module.ProjectManager.getObject(arscene[key]).addToRedraw('visible');
                    }
                }
                
                // instructions
                if (Module.ProjectManager.getObject(ar_instructions_id)){
                    anchors[ar_instructions_id] = { visible: true }
                    Module.ProjectManager.getObject(ar_instructions_id).visible = true;
                    Module.ProjectManager.getObject(ar_instructions_id).addToRedraw('visible');
                }
                
                // hide marker
                if (Module.ProjectManager.getObject(marker_id)){
                    anchors[marker_id] = { visible: false }
                    Module.ProjectManager.getObject(marker_id).visible = false;
                    Module.ProjectManager.getObject(marker_id).addToRedraw('visible');
                }
            }
            
            Module.ProjectManager.render(anchors);  // process scene with overrides
            
            surface.render();

            return false;
        }
        
        

        return true;
    }
    var onDestroy = function() {
        return true;
    }
    var onMouseEvent = function(event, button, x, y) {
        if (camRunning) return false;
        
        return true;
    }
    var onScroll = function(y) {
        return true;
    }
    
    var ts = Date.now();
    
    var onTouchEvent = function(event, touches, pointer, x, y) {
        if (camRunning) return false;

        if (GlobalProps.state == "ar" && arWrapper && arWrapper.isAvailable()) {
            // if tapped to confirm anchor
            if (event == 1 && touches == 1) ts = Date.now();
            else if (arAnchor != null && GlobalProps.obtainAnchor && event == 0 && touches == 1 && (Date.now()-ts < 200)) {
                // stop looking for an anchor
                GlobalProps.obtainAnchor = false;
            }
            
            anchorCamera.onTouchEvent(event, touches, pointer, x, y);
        }
        return true;

    }
    var onSurfaceChanged = function(rotation, width, height) {
        GlobalProps.width = width;
        GlobalProps.height = height;
        GlobalProps.rotation = rotation;
        
        anchorCamera.viewport = [rotation, 0, width, height];
        
        if (arWrapper) arWrapper.onSurfaceChanged(rotation, width, height);
        
        // mobile
        if (Module.ProjectManager.getObject(mobile_config)){
            var density = Module.pixelDensity ? Module.pixelDensity : 1;
            
            if (GlobalProps.width/density < 1400 && GlobalProps.height/density < 1400){
                Module.ProjectManager.getObject(mobile_config).visible = true;
            } else if (Module.ProjectManager.getObject(mobile_config).visible) {
                Module.ProjectManager.getObject(mobile_config).visible = false;
            }
        }
        
        return true;
    }
    var onPause = function() {
        return true;
    }

    return Object.assign({
        onInit,
        onRender,
        onDestroy,
        onMouseEvent,
        onScroll,
        onTouchEvent,
        onSurfaceChanged,
        onPause,
        resetAnchors,
        
        // custom props
        GlobalProps,
    })
}                          
`;
