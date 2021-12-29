declare const _default: "module.exports = (world) => {\n  // Module is always available\n  // var surface = Module.getSurface();\n  // var scene = surface.getScene();\n\n  var Animations = Module.require(\"assets/Animations.js\")();\t// built in animation helper\n  \n  // helper methods\n  const getDiffVec3 = (perc, a1, a2) => {\n      return [\n          perc * (a2[0] - a1[0]) + a1[0],\n          perc * (a2[1] - a1[1]) + a1[1],\n          perc * (a2[2] - a1[2]) + a1[2],\n      ]\n  }\n  \n  const getDiffFloat = (perc, a1, a2) => {\n      return perc * (a2 - a1) + a1;\n  }\n  // helper methods\n\n  var inspectorData = {duration:2000, scene:\"\", camera: {\n      distance: 2.031473085436251,\n      position: [-1.2651337339185942,1.125515697724552,1.4102905947753643],\n      target: [0.018281878522202533,0.47353737166849896,-0.023114974122790954],\n      duration: 2000,\n  }};\n\n  var onClick = function (node, object, meshid, button, x, y) { \n      const p = Module.ProjectManager.project;\n      if (p.data.scene[inspectorData.scene] == undefined) return;\n      \n      Module.ProjectManager.selectScene(inspectorData.scene,()=> {\n          // scene is loaded\n        // good time for a fly in\n        \n        // using current camera position as starting position\n          const starting_camera = {\n              distance: Module.controls.distance,\n              target: [...Module.controls.target],\n              position: [...Module.controls.position],\n          }\n          \n          /**\n           * To get the current camera values use the browser inspector and inspect \n           * Module.controls.distance\n           * Module.controls.target\n           * Module.controls.position\n           */\n          const finishing_camera = {\n              distance: Number(inspectorData.camera.distance),\n              position: inspectorData.camera.position,\n              target: inspectorData.camera.target\n          }\n          \n          // disable camera controls while flying camera\n          Module.controls.rotateEnabled = false; \n          Module.controls.zoomEnabled = false; \n          Module.controls.panEnabled = false; \n          Module.controls.clickEnabled = false;\n          \n          const camopts = {\n              delay: 0,\n              duration: Number(inspectorData.camera.duration),\n              starting: starting_camera,\n              finishing: finishing_camera,\n              timing: Animations.timing.easeOutCubic,\n              speed: 1,\n              onDraw: (perc)=> {\n              },\n              onComplete: ()=> {\n                  Module.controls.rotateEnabled = true;\n                  Module.controls.zoomEnabled = true;\n                  Module.controls.panEnabled = true;\n                  Module.controls.clickEnabled = true;\n              }\n          }\n          \n          Module.controls.animation.play(camopts)\n      });\n      \n      return true; \n  }\n\n  \n\n  return Object.assign({\n      onClick,\n      \n      _setInspectorData : (data)=> { inspectorData = data; },\n      _inspector: ()=>{\n      // format options in order\n        let op_camera = {\n            label: \"Camera\",\n            field: \"camera\",\n            type: \"camera\",\n            header: \"Position\",\n            description: \"Position\",\n            allowed: [\"object\"],\n            value: {\n              distance: 2.031473085436251,\n              position: [-1.2651337339185942,1.125515697724552,1.4102905947753643],\n              target: [0.018281878522202533,0.47353737166849896,-0.023114974122790954],\n              duration: 2000,\n            }\n        }\n        \n        let op_Scene = {\n            label: \"Scene\",\n            field: \"scene\",\n            type: \"textarea\",\n            header: \"Enter Scene\",\n            description: \"Enter scene title\",\n            value: \"\"\n        }\n        \n        return [op_Scene, op_camera];\n      }\n  })\n}\n";
export default _default;
