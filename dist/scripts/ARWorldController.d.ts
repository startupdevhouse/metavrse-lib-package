declare const _default: "var Animations = Module.require('assets/Animations.js')();\n\nmodule.exports = () => {\n    // Module is always available\n    var surface = Module.getSurface();\n    var scene = surface.getScene();\n\n    var arWrapper;\n    var arAnchor;\n    \n    var viewport = Module.camera.viewport;\n\n    var GlobalProps = {\n        state: 'main',\n        obtainAnchor: false,\n        scene: {},\n        assets: {},\n        width: viewport[2],\n        height: viewport[3],\n        rotation: viewport[0],\n        rotate_direction: 1,\n        color:\"white\"\n    }\n\n    var cam; // camera animation\n    var camRunning = false;\n\n    // modify these values for AR\n    var ar_instructions_id = \"1587108381162\";\n    var marker_id = \"1586746813004\";\n    var mobile_config = \"1587148816752\";\n    // modify these values for AR\n    \n    var arscene = [];\n    var world_id;\n\n    var anchorCamera = Module.require('assets/ARObjectController.js')({\n        zoomFactor:20,\n        rotateFactor:100,\n        scaleBounds:[0.1, Infinity],\n        scale:1,\n    });\n    \n    var resetAnchors = function(){\n        // show scene and hide marker\n        arAnchor = undefined;\n        var anchors = {}\n        \n        for (key in arscene) {\n            if (Module.ProjectManager.getObject(arscene[key])){\n                Module.ProjectManager.getObject(arscene[key]).addToRedraw(\"visible\");\n                Module.ProjectManager.getObject(arscene[key]).addToRedraw(\"transform\");\n            }\n        }\n        \n        // reset skybox\n        if (Module.ProjectManager.getObject(\"world\")) {\n            const show = Module.ProjectManager.getObject('world').skybox.show;\n            Module.ProjectManager.getObject('world').skybox.show = !show;\n            Module.ProjectManager.getObject('world').skybox.show = show;\n        }\n\n        // hide marker\n        if (Module.ProjectManager.getObject(marker_id)) {\n            Module.ProjectManager.getObject(marker_id).visible = false;\n        }\n    }\n    \n    const getRootNodes = ()=> {\n        arscene = [];\n        var project = Module.ProjectManager.project;\n        var _scene = project.data['scene'][project.data.selected_scene];\n        \n        for (var x = 0; x < _scene.tree.length; x++) {\n            var n = _scene.tree[x];\n            if (n.type == \"world\") world_id = n.key;\n            if (n.key == marker_id || n.type == \"hud\" || n.type == \"configuration\" || n.type == \"world\") continue;\n\n            arscene.push(n.key);\n        }\n    }\n\n    var onInit = () => {\n        // get root nodes\n        getRootNodes();\n        \n        // reset anchors\n        resetAnchors();\n        \n        // mobile up\n        onSurfaceChanged(GlobalProps.rotation, GlobalProps.width, GlobalProps.height);\n\n        // ar\n        if (Module.getARWrapper) {\n            arWrapper = Module.getARWrapper();\n            arWrapper.onSurfaceCreated();\n        }\n        \n        // fly camera in\n        \n        const starting_camera = {\n            distance: Module.controls.distance,\n            target: [...Module.controls.target],\n            position: [...Module.controls.position],\n        }\n        \n        const finishing_camera = {\n            distance: 1.9000105431572794,\n            target: [0, 0, 0],\n            position: [0.5955932386055451, 0.7370691533925217, 1.653768490202123],\n        }\n        \n        Module.controls.rotateEnabled = false;\n        Module.controls.zoomEnabled = false;\n        Module.controls.panEnabled = false;\n        Module.controls.clickEnabled = false;\n        \n        const camopts = {\n            delay: 0,\n            duration: 2500,\n            starting: starting_camera,\n            finishing: finishing_camera,\n            timing: Animations.timing.easeOutCubic,\n            speed: 1,\n            onDraw: (perc)=> {\n                camRunning = true;\n            },\n            onComplete: ()=> {\n                camRunning = false;\n                Module.controls.rotateEnabled = true;\n                Module.controls.zoomEnabled = true;\n                Module.controls.panEnabled = true;\n                Module.controls.clickEnabled = true;\n            }\n        }\n        \n        Module.controls.animation.play(camopts)\n\n        return true;\n    }\n\n    var onRender = () => {\n        if (GlobalProps.state == \"ar\" && arWrapper && arWrapper.isAvailable()) {\n            // hijack renderer and override for AR\n            if (GlobalProps.obtainAnchor) {\n                // looking for an anchor\n                var t_anchor = arWrapper.obtainAnchor(GlobalProps.width / 2, GlobalProps.height / 2, -1);\n                if (t_anchor != null && arAnchor != null) {\n                    arWrapper.releaseAnchor(arAnchor);\n                    arAnchor = t_anchor;\n                } else if (t_anchor != null) arAnchor = t_anchor;\n            }\n\n            // always hide skybox in AR\n            scene.showSkybox(false);\n            \n            // use AR camera information and render\n            arWrapper.render();\n            scene.setProjectionMatrix(arWrapper.getProjectionMatrix());\n            scene.setCameraMatrix(arWrapper.getViewMatrix());\n\n            if (arAnchor != null) {\n                // found anchor\n                anchorCamera.update();\n                var mat = arWrapper.getAnchorMatrix(arAnchor);\n                if (!GlobalProps.obtainAnchor) mat4.multiply(mat, mat, anchorCamera.matrix);\n                \n                var anchors = {}\n                if (GlobalProps.obtainAnchor) {\n                    // hide instructions\n                    if (Module.ProjectManager.getObject(ar_instructions_id)){\n                        anchors[ar_instructions_id] = { visible: false }\n                        Module.ProjectManager.getObject(ar_instructions_id).visible = false;\n                        Module.ProjectManager.getObject(ar_instructions_id).addToRedraw('visible');\n                    }\n                    \n                    // showing marker\n                    if (Module.ProjectManager.getObject(marker_id)){\n                        anchors[marker_id] = { transform: mat, visible: true }\n                        Module.ProjectManager.getObject(marker_id).visible = true;\n                        Module.ProjectManager.getObject(marker_id).addToRedraw('visible');\n                    }\n\n                    // hiding everything else\n                    for (key in arscene) {\n                        if (Module.ProjectManager.getObject(arscene[key])){\n                            anchors[arscene[key]] = { visible: false }\n                            Module.ProjectManager.getObject(arscene[key]).addToRedraw('visible');\n                        }\n                    }\n                } else {\n                    // marker chosen, transform scene items with anchor\n                    for (key in arscene) {\n                        if (Module.ProjectManager.getObject(arscene[key])){\n                            anchors[arscene[key]] = { transform: mat, visible: true }\n                            Module.ProjectManager.getObject(arscene[key]).addToRedraw('visible');\n                        }\n                    }\n\n                    // hide marker\n                    if (Module.ProjectManager.getObject(marker_id)){\n                        anchors[marker_id] = { visible: false }\n                        Module.ProjectManager.getObject(marker_id).visible = false;\n                        Module.ProjectManager.getObject(marker_id).addToRedraw('visible');\n                    }\n                    \n                }\n            }else{\n                // show instructions to get anchor\n                var anchors = {}\n                \n                if (scene.getObject(ar_instructions_id)){\n                    scene.getObject(ar_instructions_id).playAnimation(0)\n                }\n                \n                // hide everything\n                for (key in arscene) {\n                    if (Module.ProjectManager.getObject(arscene[key])){\n                        anchors[arscene[key]] = { visible: false }\n                        Module.ProjectManager.getObject(arscene[key]).addToRedraw('visible');\n                    }\n                }\n                \n                // instructions\n                if (Module.ProjectManager.getObject(ar_instructions_id)){\n                    anchors[ar_instructions_id] = { visible: true }\n                    Module.ProjectManager.getObject(ar_instructions_id).visible = true;\n                    Module.ProjectManager.getObject(ar_instructions_id).addToRedraw('visible');\n                }\n                \n                // hide marker\n                if (Module.ProjectManager.getObject(marker_id)){\n                    anchors[marker_id] = { visible: false }\n                    Module.ProjectManager.getObject(marker_id).visible = false;\n                    Module.ProjectManager.getObject(marker_id).addToRedraw('visible');\n                }\n            }\n            \n            Module.ProjectManager.render(anchors);  // process scene with overrides\n            \n            surface.render();\n\n            return false;\n        }\n        \n        \n\n        return true;\n    }\n    var onDestroy = function() {\n        return true;\n    }\n    var onMouseEvent = function(event, button, x, y) {\n        if (camRunning) return false;\n        \n        return true;\n    }\n    var onScroll = function(y) {\n        return true;\n    }\n    \n    var ts = Date.now();\n    \n    var onTouchEvent = function(event, touches, pointer, x, y) {\n        if (camRunning) return false;\n\n        if (GlobalProps.state == \"ar\" && arWrapper && arWrapper.isAvailable()) {\n            // if tapped to confirm anchor\n            if (event == 1 && touches == 1) ts = Date.now();\n            else if (arAnchor != null && GlobalProps.obtainAnchor && event == 0 && touches == 1 && (Date.now()-ts < 200)) {\n                // stop looking for an anchor\n                GlobalProps.obtainAnchor = false;\n            }\n            \n            anchorCamera.onTouchEvent(event, touches, pointer, x, y);\n        }\n        return true;\n\n    }\n    var onSurfaceChanged = function(rotation, width, height) {\n        GlobalProps.width = width;\n        GlobalProps.height = height;\n        GlobalProps.rotation = rotation;\n        \n        anchorCamera.viewport = [rotation, 0, width, height];\n        \n        if (arWrapper) arWrapper.onSurfaceChanged(rotation, width, height);\n        \n        // mobile\n        if (Module.ProjectManager.getObject(mobile_config)){\n            var density = Module.pixelDensity ? Module.pixelDensity : 1;\n            \n            if (GlobalProps.width/density < 1400 && GlobalProps.height/density < 1400){\n                Module.ProjectManager.getObject(mobile_config).visible = true;\n            } else if (Module.ProjectManager.getObject(mobile_config).visible) {\n                Module.ProjectManager.getObject(mobile_config).visible = false;\n            }\n        }\n        \n        return true;\n    }\n    var onPause = function() {\n        return true;\n    }\n\n    return Object.assign({\n        onInit,\n        onRender,\n        onDestroy,\n        onMouseEvent,\n        onScroll,\n        onTouchEvent,\n        onSurfaceChanged,\n        onPause,\n        resetAnchors,\n        \n        // custom props\n        GlobalProps,\n    })\n}                          \n";
export default _default;
