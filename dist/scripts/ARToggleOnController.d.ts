declare const _default: "module.exports = (world) => {\n  // Module is always available\n  // var surface = Module.getSurface();\n  // var scene = surface.getScene();\n  var inspectorData = {\n    configurations: [],\n  };\n  var onClick = function(node, object, meshid, button, x, y) {\n      if (Module.getARWrapper) {\n          \n          if (world.GlobalProps.state == \"ar\"){\n              if (!world.GlobalProps.obtainAnchor) world.GlobalProps.obtainAnchor = true;\n          }else{\n              Module.getCameraPermissions((result) => {\n                  if (result) {\n                      // ar camera allowed\n                      \n                      // resume ar camera\n                      var arWrapper = Module.getARWrapper();\n                      arWrapper.onResume();\n                      \n                      // change global state\n                      world.GlobalProps.state = \"ar\";\n                      \n                      // make sure ar screen is correct\n                      arWrapper.onSurfaceChanged(world.GlobalProps.rotation, world.GlobalProps.width, world.GlobalProps.height);\n                      \n                      // toggle search for anchor\n                      world.GlobalProps.obtainAnchor = true;\n      \n                      // disable standard camera gestures                \n                      Module.controls.rotateEnabled = false;\n                      Module.controls.zoomEnabled = false;\n                      Module.controls.panEnabled = false;\n                      \n                      for (const x in inspectorData.configurations){\n                          const cfg = inspectorData.configurations[x];\n                          const node = Module.ProjectManager.getObject(cfg.file)\n                          node.visible = cfg.toggled;\n                      }\n                  }\n                  console.log(\"camera result :\" + result);\n              });\n          }\n      }else{\n          console.warn('ar not available :(')\n      }\n      \n      return true;\n  }\n  return Object.assign({\n      onClick,\n      _setInspectorData : (data)=> { inspectorData = data; },\n      _inspector: ()=>{\n          // format options in order\n          let op_Configuration = {\n              label: \"Configuration\",\n              field: \"configurations\",\n              type: \"file\",\n              header: \"Configurations\",\n              description: \"Drop Configurations\",\n              allowed: [\"configuration\"],\n              list: true,\n              toggle: true,\n              value: {file:\"\", toggled: true}\n          }\n          return [op_Configuration];\n      }\n  })\n}               \n";
export default _default;
