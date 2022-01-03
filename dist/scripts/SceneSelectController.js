export default `module.exports = (world) => {
  // Module is always available
  // var surface = Module.getSurface();
  // var scene = surface.getScene();

  var Animations = Module.require("assets/Animations.js")();	// built in animation helper
  
  // helper methods
  const getDiffVec3 = (perc, a1, a2) => {
      return [
          perc * (a2[0] - a1[0]) + a1[0],
          perc * (a2[1] - a1[1]) + a1[1],
          perc * (a2[2] - a1[2]) + a1[2],
      ]
  }
  
  const getDiffFloat = (perc, a1, a2) => {
      return perc * (a2 - a1) + a1;
  }
  // helper methods

  var inspectorData = {duration:2000, scene:"", camera: {
      distance: 2.031473085436251,
      position: [-1.2651337339185942,1.125515697724552,1.4102905947753643],
      target: [0.018281878522202533,0.47353737166849896,-0.023114974122790954],
      duration: 2000,
  }};

  var onClick = function (node, object, meshid, button, x, y) { 
      const p = Module.ProjectManager.project;
      if (p.data.scene[inspectorData.scene] == undefined) return;
      
      Module.ProjectManager.selectScene(inspectorData.scene,()=> {
          // scene is loaded
        // good time for a fly in
        
        // using current camera position as starting position
          const starting_camera = {
              distance: Module.controls.distance,
              target: [...Module.controls.target],
              position: [...Module.controls.position],
          }
          
          /**
           * To get the current camera values use the browser inspector and inspect 
           * Module.controls.distance
           * Module.controls.target
           * Module.controls.position
           */
          const finishing_camera = {
              distance: Number(inspectorData.camera.distance),
              position: inspectorData.camera.position,
              target: inspectorData.camera.target
          }
          
          // disable camera controls while flying camera
          Module.controls.rotateEnabled = false; 
          Module.controls.zoomEnabled = false; 
          Module.controls.panEnabled = false; 
          Module.controls.clickEnabled = false;
          
          const camopts = {
              delay: 0,
              duration: Number(inspectorData.camera.duration),
              starting: starting_camera,
              finishing: finishing_camera,
              timing: Animations.timing.easeOutCubic,
              speed: 1,
              onDraw: (perc)=> {
              },
              onComplete: ()=> {
                  Module.controls.rotateEnabled = true;
                  Module.controls.zoomEnabled = true;
                  Module.controls.panEnabled = true;
                  Module.controls.clickEnabled = true;
              }
          }
          
          Module.controls.animation.play(camopts)
      });
      
      return true; 
  }

  

  return Object.assign({
      onClick,
      
      _setInspectorData : (data)=> { inspectorData = data; },
      _inspector: ()=>{
      // format options in order
        let op_camera = {
            label: "Camera",
            field: "camera",
            type: "camera",
            header: "Position",
            description: "Position",
            allowed: ["object"],
            value: {
              distance: 2.031473085436251,
              position: [-1.2651337339185942,1.125515697724552,1.4102905947753643],
              target: [0.018281878522202533,0.47353737166849896,-0.023114974122790954],
              duration: 2000,
            }
        }
        
        let op_Scene = {
            label: "Scene",
            field: "scene",
            type: "textarea",
            header: "Enter Scene",
            description: "Enter scene title",
            value: ""
        }
        
        return [op_Scene, op_camera];
      }
  })
}
`;
