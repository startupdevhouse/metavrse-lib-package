module.exports = (world) => {
  // Module is always available
  // var surface = Module.getSurface();
  // var scene = surface.getScene();
  var Animations = Module.require("assets/Animations.js")(); // built in animation helper
  const {
      mat4,
      vec3,
      quat
  } = Module.require('assets/gl-matrix.js');
  
  var inspectorData = {
      camera: {
          distance: 2.031473085436251,
          position: [-1.2651337339185942, 1.125515697724552, 1.4102905947753643],
          target: [0.018281878522202533, 0.47353737166849896, -0.023114974122790954],
          duration: 2000,
      },
      configurations: [],
      objectanimations: [],
      videos: [],
      prejs: "",
      postjs: "",

      cameracomponent: [],
      duration: 2000,

      objectanimationsequence: [],

      configurationfolders: [],


  };
  var runningAnimations = [];

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

  const playAnimation = (animation) => {
      let obj = Module.ProjectManager.getObject(animation.file);
      if (!obj) return false;

      let opts = {
          id: animation.animationid, // animation id (index # from animations list)
          loop: animation.loop,
          timing: Animations.timing.linear,
          speed: animation.speed,
          delay: animation.delay,
          start: animation.startTime,
          end: animation.endTime,
          reverse: animation.reverse,
          raw: true,
          onDraw: (perc) => {

          },
          onComplete: () => {
              // console.log('finished')
          }
      }

      obj.animation.play(opts);

      return true;
  }

  let currentAnimation = null;
  const playAnimationSeqeunce = (animations) => {
      if (animations.length <= 0) {
          currentAnimation = null;
          return;
      }

      currentAnimation = animations.pop();

      let animation = currentAnimation;
      let obj = Module.ProjectManager.getObject(animation.file);
      if (!obj) return false;

      let opts = {
          id: animation.animationid, // animation id (index # from animations list)
          timing: Animations.timing.linear,
          speed: animation.speed,
          delay: animation.delay,
          start: animation.startTime,
          end: animation.endTime,
          reverse: animation.reverse,
          raw: true,
          onDraw: (perc) => {

          },
          onComplete: () => {
              // console.log('finished')
              playAnimationSeqeunce(animations)
          }
      }

      obj.animation.play(opts);

      return true;
  }

  const stopAnimation = (animation) => {
      let obj = Module.ProjectManager.getObject(animation.file);
      if (!obj) return false;

      obj.animation.stop();
  }

  var onClick = function(node, object, meshid, button, x, y) {
      // apply configurations
      for (const x in inspectorData.configurations) {
          try {
              const cfg = inspectorData.configurations[x];
              const node = Module.ProjectManager.getObject(cfg.file)
              if (cfg.aftercamera == undefined || !cfg.aftercamera) node.visible = cfg.toggled;
          } catch (e) {
              console.log(e)
          }

      }

      // apply configuration folders
      let traverseA = (children, enabled, aftercam) => {
          for (var [key, value] of children) {
              try {
                  const node = Module.ProjectManager.getObject(key);
                  if (aftercam == undefined || !aftercam) {
                      if (node.item.type == "configuration") {
                          node.visible = enabled;
                      } else if (node.children.size > 0) {
                          traverseA(node.children, enabled, aftercam)
                      }
                  }
              } catch (e) {
                  console.log(e)
              }
          }

      }

      let traverseB = (children, enabled, aftercam) => {
          for (var [key, value] of children) {
              try {
                  const node = Module.ProjectManager.getObject(key);
                  if (aftercam) {
                      if (node.item.type == "configuration") {
                          node.visible = enabled;
                      } else if (node.children.size > 0) {
                          traverseB(node.children, enabled, aftercam)
                      }
                  }
              } catch (e) {
                  console.log(e)
              }
          }

      }

      for (const x in inspectorData.configurationfolders) {
          try {
              const cfg = inspectorData.configurationfolders[x];
              const node = Module.ProjectManager.getObject(cfg.file);
              if (cfg.aftercamera == undefined || !cfg.aftercamera) {
                  if (node.item.type == "configuration") {
                      node.visible = cfg.toggled;
                  } else if (node.children.size > 0) {
                      traverseA(node.children, cfg.toggled, cfg.aftercamera)
                  }
              }
          } catch (e) {
              console.log(e)
          }

      }

      // animations
      if (runningAnimations.length == 0) {
          for (const x in inspectorData.objectanimations) {
              const animation = inspectorData.objectanimations[x];
              // const newanim = newAnimation(anim);
              runningAnimations.push(animation);
              if (!animation.aftercamera) {
                  playAnimation(animation);
              }
          }
      } else {
          for (let animation of runningAnimations) {
              try {
                  stopAnimation(animation)
                  if (!animation.aftercamera) {
                      playAnimation(animation);
                  }
              } catch (e) {
                  console.error(e)
              }
          }
      }

      // animation sequence

      let sequence = [];
      for (const x in inspectorData.objectanimationsequence) {
          const animation = inspectorData.objectanimationsequence[x];

          if (!animation.aftercamera) {
              sequence = [animation, ...sequence]
              stopAnimation(animation)
          }
      }

      playAnimationSeqeunce(sequence);

      //videos
      for (const x in inspectorData.videos) {
          const cfg = inspectorData.videos[x];
          const video = Module.ProjectManager.getObject(cfg.file)
          if (!cfg.aftercamera) {
              switch (cfg.type) {
                  case 'play':
                      video.play();
                      break;
                  case 'pause':
                      video.pause();
                      break;
                  case 'stop':
                      video.stop();
                      break;
              }
          }
      }
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

      let cam;
      let finishing_camera = {
          //   distance: Number(inspectorData.camera.distance),
          //   position: inspectorData.camera.position,
          //   target: inspectorData.camera.target
      }

      if (inspectorData.cameracomponent.length > 0) {
          try {
              cam = Module.ProjectManager.getObject(inspectorData.cameracomponent[0].file);
              // console.log(cam)
              finishing_camera = {
                  distance: Number(cam.distance),
                  position: [...cam.position],
                  target: [...cam.target]
              }
          } catch (e) {
              console.log(e)
          }

      }


      // disable camera controls while flying camera
      Module.controls.rotateEnabled = false;
      Module.controls.zoomEnabled = false;
      Module.controls.panEnabled = false;
      // Module.controls.clickEnabled = false;
      // after cam
      const afterCam = () => {
          // apply configurations
          for (const x in inspectorData.configurations) {
              try {
                  const cfg = inspectorData.configurations[x];
                  const node = Module.ProjectManager.getObject(cfg.file)
                  if (cfg.aftercamera) node.visible = cfg.toggled;
                  /* code */
              } catch (e) {
                  console.log(e)
              }
          }


          for (const x in inspectorData.configurationfolders) {
              try {
                  const cfg = inspectorData.configurationfolders[x];
                  const node = Module.ProjectManager.getObject(cfg.file);
                  if (cfg.aftercamera) {
                      if (node.item.type == "configuration") {
                          node.visible = cfg.toggled;
                      } else if (node.children.size > 0) {
                          traverseB(node.children, cfg.toggled, cfg.aftercamera)
                      }
                  }
              } catch (e) {
                  console.log(e)
              }

          }

          try {
              var postjs = String(inspectorData.postjs);
              if (postjs.trim() != "") eval(postjs);
          } catch (e) {
              console.error(e)
          }
          // renable camera controls
          Module.controls.rotateEnabled = true;
          Module.controls.zoomEnabled = true;
          Module.controls.panEnabled = true;
          // Module.controls.clickEnabled = true;
          for (let animation of runningAnimations) {
              try {
                  if (animation.aftercamera) {
                      playAnimation(animation);
                  }
              } catch (e) {
                  console.error(e)
              }
          }

          let sequenceAfter = [];
          for (const x in inspectorData.objectanimationsequence) {
              const animation = inspectorData.objectanimationsequence[x];

              if (animation.aftercamera) {
                  sequenceAfter = [animation, ...sequenceAfter]
                  stopAnimation(animation)
              }
          }

          playAnimationSeqeunce(sequenceAfter);

          //videos
          for (const x in inspectorData.videos) {
              const cfg = inspectorData.videos[x];
              const video = Module.ProjectManager.getObject(cfg.file)
              if (cfg.aftercamera) {
                  switch (cfg.type) {
                      case 'play':
                          video.play();
                          break;
                      case 'pause':
                          video.pause();
                          break;
                      case 'stop':
                          video.stop();
                          break;
                  }
              }
          }
      }


      try {
          var prejs = String(inspectorData.prejs);
          if (prejs.trim() != "") eval(prejs);
      } catch (e) {
          console.error(e)
      }
      if (inspectorData.duration > 0 && cam != undefined) {
          // play animation (fly camera)
          let dur = Number(inspectorData.duration);
          let d = 6000 * vec3.distance(starting_camera.position, finishing_camera.position);
          if (d > dur) d = dur;
          else if (d < 100) d = 100;

          Module.controls.animation.play({
              duration: d,
              starting: starting_camera,
              finishing: finishing_camera,
              timing: Animations.timing.easeOutCubic,
              speed: 1,
              onDraw: (perc) => {},
              onComplete: () => {
                  // console.log('finished')
                  afterCam();
              }
          })
      } else {
          afterCam();
      }
      return true;
  }
  return Object.assign({
      onClick,
      _setInspectorData: (data) => {
          inspectorData = data;
      },
      _inspector: () => {
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
                  position: [-1.2651337339185942, 1.125515697724552, 1.4102905947753643],
                  target: [0.018281878522202533, 0.47353737166849896, -0.023114974122790954],
                  duration: 2000,
              }
          }

          let op_camera_component = {
              label: "Camera",
              field: "cameracomponent",
              type: "file",
              header: "Camera",
              description: "Drop Camera",
              allowed: ["camera"],
              list: false,
              toggle: false,
              aftercamera: false,
              value: {
                  file: "",
                  toggled: true,
                  aftercamera: true,
              }
          }

          let op_duration = {
              label: "Camera Duration",
              field: "duration",
              type: "textarea",
              header: "Duration",
              description: "Duration for flyin",
              value: "2000",
              columns: 2,
          }


          let op_Configuration = {
              label: "Configuration",
              field: "configurations",
              type: "file",
              header: "Configurations",
              description: "Drop Configurations",
              allowed: ["configuration"],
              list: true,
              toggle: true,
              aftercamera: true,
              value: {
                  file: "",
                  toggled: true,
                  aftercamera: true,
              }
          }

          let op_ConfigurationFolders = {
              label: "Configuration", // v2
              field: "configurationfolders",
              type: "file",
              header: "Configurations V2",
              description: "Drop Configurations",
              allowed: ["configuration", "object-group", "hud"],
              list: true,
              toggle: true,
              aftercamera: true,
              value: {
                  file: "",
                  toggled: true,
                  aftercamera: true,
              }
          }

          let op_pre = {
              label: "Pre Camera JS",
              field: "prejs",
              type: "textarea",
              header: "JS",
              description: "Custom JS before camera flyin",
              value: "",
              columns: 2,
          }
          let op_post = {
              label: "Post Camera JS",
              field: "postjs",
              type: "textarea",
              header: "JS",
              description: "Custom JS after fly in",
              value: "",
              columns: 2,
          }
          let op_ObjectAnimations = {
              label: "Object Animation",
              field: "objectanimations",
              type: "object-animation-custom",
              header: "Object Animation",
              description: "Drop Object",
              allowed: ["object", "object-hud"],
              list: true,
              value: {
                  file: "",
                  aftercamera: true,
                  animationid: 0,
                  start: 0,
                  end: 0,
                  delay: 0,
                  reverse: false,
                  speed: 1,
              },
          }
          let op_ObjectAnimationSequence = {
              label: "Object Animation sequence",
              field: "objectanimationsequence",
              type: "object-animation-custom",
              header: "Object Animation sequence",
              description: "Drop Object",
              allowed: ["object", "object-hud"],
              list: true,
              value: {
                  file: "",
                  aftercamera: true,
                  animationid: 0,
                  start: 0,
                  end: 0,
                  delay: 0,
                  reverse: false,
                  speed: 1,
              },
          }
          let op_Videos = {
              label: "Video Component",
              field: "videos",
              type: "video",
              header: "Video Component",
              description: "Drop Video",
              allowed: ["video"],
              list: true,
              value: {
                  file: "",
                  type: "play",
                  aftercamera: false,
              },
          }
          return [op_camera_component, op_duration, op_ConfigurationFolders, op_ObjectAnimations, op_ObjectAnimationSequence, op_Videos, op_pre, op_post];
      }
  })
}