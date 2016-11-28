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
      var cubesArray = []

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

        controls = new THREE.OrbitControls( camera );

        for ( var i = 0; i < 600; i ++ ) {
          var radius   = 100,
              segments = 64,
          geometry = new THREE.CircleGeometry( radius, segments );
       geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
       geometry.vertices.push(new THREE.Vector3(0, 10, 0));
       geometry.vertices.push(new THREE.Vector3(10, 0, 0));
          material = new THREE.LineBasicMaterial({
            color: 0x000000
        });
          var line = new THREE.Line(geometry, material);
          scene.add(line);

          line.position.x = Math.random() * 1500 - 750;
          line.position.y = Math.random() * 1500 - 750;
          line.position.z = Math.random() * 1500 - 750;

          line.rotation.x = Math.random() * 2 * Math.PI;
          line.rotation.y = Math.random() * 2 * Math.PI;
geometry.vertices.shift();
          scene.add(line);
          cubesArray.push( line )

        }

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
