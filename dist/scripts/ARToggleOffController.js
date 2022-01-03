export default `module.exports = (world) => {
  // Module is always available
  // var surface = Module.getSurface();
  // var scene = surface.getScene();
  // TODO: Discuss with Walid supported JS feature in CherryG
  var inspectorData = {
    configurations: [],
  };
  var onClick = function(node, object, meshid, button, x, y) {
      
      if (Module.getARWrapper) {
          var arWrapper = Module.getARWrapper();
          arWrapper.onPause();
          world.resetAnchors();
          world.GlobalProps.state = "main";
          
          Module.controls.rotateEnabled = true;
          Module.controls.zoomEnabled = true;
          Module.controls.panEnabled = true;
          
          for (const x in inspectorData.configurations){
              const cfg = inspectorData.configurations[x];
              const node = Module.ProjectManager.getObject(cfg.file)
              node.visible = cfg.toggled;
          }
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
