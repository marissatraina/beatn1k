// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .
$(document).ready(function() {

      // var imageArray = ['images.jpg', 'imgres.jpg']
      var bg = document.body.style;
      // bg.backgroundImage = "EFFECTS.jpg"

      // below i declare all my global audio context variables
      var ctx = new AudioContext();
      var audio = document.getElementById('visualAudio');
      var audioSrc = ctx.createMediaElementSource(audio);
      var analyser = ctx.createAnalyser();
      audioSrc.connect(analyser);
      audioSrc.connect(ctx.destination);
      var frequencyData = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(frequencyData) //this is where we actually feed data to the array

      var cubesArray = [] //I'm declaring this globally so I can use it in every function below
      var particlesArray = [] //I'm declaring this globally so I can use it in every function below

      if ( ! Detector.webgl ) Detector.addGetWebGLMessage(); //makes usure we have web gl if not,
      //throws friendly error

      var camera, scene, renderer; //more globals
      var geometry, controls, material, mesh;

      function setup() {
        //getting correct sizing based on the browser window (more adaptable)
        var W = window.innerWidth, H = window.innerHeight;

        renderer = new THREE.WebGLRenderer();

        renderer.setSize( W, H );

        document.body.appendChild( renderer.domElement ); //the renderer's dom friendly copy
        //gets added to the DOM so we can actually see things happen.
        camera = new THREE.PerspectiveCamera( 50, W/H, 1, 10000 );
        camera.position.z = 100;

        scene = new THREE.Scene();

        geometry = new THREE.CubeGeometry( 25, 25, 25 );

        controls = new THREE.OrbitControls( camera );

        for ( var i = 0; i < 600; i ++ ) {

          var points = [
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 100, 0, 0 ),
            new THREE.Vector3( 100, 100, 0 ),
            new THREE.Vector3( 0, 100, 0 ),
            new THREE.Vector3( 0, 100, 100 ),
            new THREE.Vector3( 0, 0, 100 ),
          ];

          // var points = [
          //   new THREE.Vector3( -12.556202011182904, -6.6237210761755705, 11.476452415809035 ),
          //   new THREE.Vector3( -26.308831991627812, -36.702050315216184, -65.70204044692218 ),
          //   new THREE.Vector3( 30.030598351731896, 53.670027665793896, -48.4273636713624 ),
          //   new THREE.Vector3( -91.64749449118972, 86.79489707574248, -39.410504000261426 ),
          //   new THREE.Vector3( -9.040775801986456, 24.351109005510807, -25.116276880726218 ),
          //   new THREE.Vector3( 45.43574578128755, 91.02062359452248, -22.751434659585357 ),
          //   new THREE.Vector3( 95.66223728470504, 46.15802983753383, 15.478686103597283 ),
          //   new THREE.Vector3( 40.25877616368234, 69.51988283544779, -17.296824790537357 ),
          //   new THREE.Vector3( -44.74278939887881, 80.29115716926754, -75.00841468572617 ),
          //   new THREE.Vector3( -89.60328730754554, 74.49235524982214, 47.89038090966642 ),
          //   new THREE.Vector3( 97.9008749127388, -44.629028998315334, -52.1704429294914 ),
          //   new THREE.Vector3( -50.608135061338544, 24.322520522400737, -82.82752600498497 ),
          //   new THREE.Vector3( 25.44669136404991, -54.02610534802079, -38.45692528411746 ),
          //   new THREE.Vector3( -82.40420743823051, -40.75323059223592, 76.98600050061941 ),
          //   new THREE.Vector3( -39.261171920225024, 60.10815342888236, -73.79144192673266 ),
          // ];

          geometry = new THREE.ConvexGeometry( points );
          material = new THREE.MeshNormalMaterial({shading: THREE.FlatShading });
          mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);

          mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.2;

          mesh.position.x = Math.random() * 1500 - 750;
          mesh.position.y = Math.random() * 1500 - 750;
          mesh.position.z = Math.random() * 1500 - 750;

          mesh.rotation.x = Math.random() * 2 * Math.PI;
          mesh.rotation.y = Math.random() * 2 * Math.PI;

          scene.add(mesh);
          cubesArray.push( mesh )

        }

          ///////////background particles/////////////

        backGroundies = new THREE.Geometry();
        for ( i = 0; i < 5000; i ++ ) {
          var vertex = new THREE.Vector3();
          vertex.x = 1000 * Math.random() - 500;
          vertex.y = 1000 * Math.random() - 500;
          vertex.z = 1000 * Math.random() - 500;
          backGroundies.vertices.push( vertex );
        }
        material = new THREE.ParticleBasicMaterial( { size: 5, sizeAttenuation: false, transparent: true } );
        material.color.setHex( 0xff00ff );
        particles = new THREE.ParticleSystem( backGroundies, material );
        particles.sortParticles = true;
        scene.add( particles );
        particlesArray.push( particles );

      }

        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
        }

      function draw() {
        requestAnimationFrame( draw );
        controls.update();

        analyser.getByteFrequencyData(frequencyData)

          freqSum = frequencyData.reduce(function(a, b) {
            return a + b;
          }, 0);

          console.log(frequencyData);

          for ( var i = 0; i < (cubesArray.length * .1); i ++ ) {
            // bg.background = ('#000000')
             camera.position.z = 150;
             cubesArray[i].position.x = (frequencyData[i] / 10)
             cubesArray[i].position.y = (frequencyData[i] / 10)
             cubesArray[i].position.z = (frequencyData[i] / 10)
          }
          for ( var i = (cubesArray.length * .1); i < (cubesArray.length * .2); i ++ ) {
             camera.position.z = 150;
             cubesArray[i].position.x = -(frequencyData[i] / 10)
             cubesArray[i].position.y = (frequencyData[i] / 10)
             cubesArray[i].position.z = (frequencyData[i] / 10)
          }
          for ( var i = (cubesArray.length * .2); i < (cubesArray.length * .3); i ++ ) {
             camera.position.z = 150;
             cubesArray[i].position.x = (frequencyData[i] / 10)
             cubesArray[i].position.y = -(frequencyData[i] / 10)
             cubesArray[i].position.z = (frequencyData[i] / 10)
          }
          for ( var i = (cubesArray.length * .3); i < (cubesArray.length * .4); i ++ ) {
             camera.position.z = 150;
             cubesArray[i].position.x = (frequencyData[i] / 10)
             cubesArray[i].position.y = (frequencyData[i] / 10)
             cubesArray[i].position.z = -(frequencyData[i] / 10)
          }
          for ( var i = (cubesArray.length * .4); i < (cubesArray.length * .5); i ++ ) {
             camera.position.z = 150;
             cubesArray[i].position.x = -(frequencyData[i] / 10)
             cubesArray[i].position.y = -(frequencyData[i] / 10)
             cubesArray[i].position.z = (frequencyData[i] / 10)
          }
          for ( var i = (cubesArray.length * .5); i < (cubesArray.length * .6); i ++ ) {
             camera.position.z = 150;
             cubesArray[i].position.x = (frequencyData[i] / 10)
             cubesArray[i].position.y = -(frequencyData[i] / 10)
             cubesArray[i].position.z = -(frequencyData[i] / 10)
          }
          for ( var i = (cubesArray.length * .6); i < (cubesArray.length * .7); i ++ ) {
             camera.position.z = 150;
             cubesArray[i].position.x = -(frequencyData[i] / 10)
             cubesArray[i].position.y = -(frequencyData[i] / 10)
             cubesArray[i].position.z = -(frequencyData[i] / 10)
          }
          for ( var i = (cubesArray.length * .7); i < (cubesArray.length * .8); i ++ ) {
             camera.position.z = 150;
             cubesArray[i].position.x = -(frequencyData[i] / 10)
             cubesArray[i].position.y = (frequencyData[i] / 10)
             cubesArray[i].position.z = (frequencyData[i] / 10)
          }
          for ( var i = (cubesArray.length * .8); i < (cubesArray.length * .9); i ++ ) {
             camera.position.z = 150;
             cubesArray[i].position.x = (frequencyData[i] / 10)
             cubesArray[i].position.y = -(frequencyData[i] / 10)
             cubesArray[i].position.z = (frequencyData[i] / 10)
          }
          for ( var i = (cubesArray.length * .9); i < cubesArray.length; i ++ ) {
             camera.position.z = 150;
             cubesArray[i].position.x = (frequencyData[i] / 10)
             cubesArray[i].position.y = (frequencyData[i] / 10)
             cubesArray[i].position.z = -(frequencyData[i] / 10)
          }


        camera.position.x = Math.sin( Date.now() * 0.0005 ) * 5;

        renderer.render( scene, camera );

     }

      setup();
      draw();

  });
