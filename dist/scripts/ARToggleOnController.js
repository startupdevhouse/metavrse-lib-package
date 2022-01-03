export default `module.exports = (world) => {
  // Module is always available
  // var surface = Module.getSurface();
  // var scene = surface.getScene();
  var inspectorData = {
    configurations: [],
  };
  var onClick = function(node, object, meshid, button, x, y) {
      if (Module.getARWrapper) {
          
          if (world.GlobalProps.state == "ar"){
              if (!world.GlobalProps.obtainAnchor) world.GlobalProps.obtainAnchor = true;
          }else{
              Module.getCameraPermissions((result) => {
                  if (result) {
                      // ar camera allowed
                      
                      // resume ar camera
                      var arWrapper = Module.getARWrapper();
                      arWrapper.onResume();
                      
                      // change global state
                      world.GlobalProps.state = "ar";
                      
                      // make sure ar screen is correct
                      arWrapper.onSurfaceChanged(world.GlobalProps.rotation, world.GlobalProps.width, world.GlobalProps.height);
                      
                      // toggle search for anchor
                      world.GlobalProps.obtainAnchor = true;
      
                      // disable standard camera gestures                
                      Module.controls.rotateEnabled = false;
                      Module.controls.zoomEnabled = false;
                      Module.controls.panEnabled = false;
                      
                      for (const x in inspectorData.configurations){
                          const cfg = inspectorData.configurations[x];
                          const node = Module.ProjectManager.getObject(cfg.file)
                          node.visible = cfg.toggled;
                      }
                  }
                  console.log("camera result :" + result);
              });
          }
      }else{
          console.warn('ar not available :(')
      }
      
      return true;
  }
  return Object.assign({
      onClick,
      _setInspectorData : (data)=> { inspectorData = data; },
      _inspector: ()=>{
          // format options in order
          let op_Configuration = {
              label: "Configuration",
              field: "configurations",
              type: "file",
              header: "Configurations",
              description: "Drop Configurations",
              allowed: ["configuration"],
              list: true,
              toggle: true,
              value: {file:"", toggled: true}
          }
          return [op_Configuration];
      }
  })
}               
`;
