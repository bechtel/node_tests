var io = require('socket.io-client');
var request = require('request');

    // HTTP - Dont wait for response
    // request.put('http://localhost:3000/devices/ad698900-2546-11e3-87fb-c560cb0ca47b').form({armed:true, token: 'zh4p7as90pt1q0k98fzvwmc9rmjkyb9'});

    // HTTP - Wait for response
    // request.put('http://localhost:3000/devices/ad698900-2546-11e3-87fb-c560cb0ca47b', {form:{armed:true, token: 'zh4p7as90pt1q0k98fzvwmc9rmjkyb9'}}, function (error, response, body){
    //   console.log(body);
    // });

    // Websocket API
    // socket.emit('update', {"uuid":"ad698900-2546-11e3-87fb-c560cb0ca47b", "token": "zh4p7as90pt1q0k98fzvwmc9rmjkyb9", "armed":true});

    // console.log('Device armed via Skynet');

  // Websocket controls
  socket = io.connect('localhost', {
      port: 3000
  });

  socket.on('connect', function(){
    console.log('Requesting websocket connection to Skynet');

    socket.on('identify', function(data){
      console.log('Websocket connected to Skynet with socket id: ' + data.socketid);
      console.log('Sending device uuid: ad698900-2546-11e3-87fb-c560cb0ca47b');
      socket.emit('identity', {uuid: 'ad698900-2546-11e3-87fb-c560cb0ca47b', socketid: data.socketid, token: 'zh4p7as90pt1q0k98fzvwmc9rmjkyb9'});
    });

    socket.on('authentication', function(data){
      if (data.status == 201){
        console.log('Device authenticated with Skynet');
      } else { // 401
        console.log('Device not authenticated with Skynet');
      }
    });

    // test APIs
    socket.emit('status');
    socket.on('status', function(data){
      console.log('status received');
      console.log(data);
    });

    // socket.emit('devices', {"key":"123"});
    // socket.on('devices', function(data){
    //   console.log('devices received');
    //   console.log(data);
    // });

    // socket.emit('whoami', {"uuid":"ad698900-2546-11e3-87fb-c560cb0ca47b"});
    // socket.on('whoami', function(data){
    //   console.log('whoami received');
    //   console.log(data);
    // });

    // socket.emit('register', {"key":"123"});
    // socket.on('register', function(data){
    //   console.log('register received');
    //   console.log(data);
    // });

    // socket.emit('update', {"uuid":"ad698900-2546-11e3-87fb-c560cb0ca47b", "token": "zh4p7as90pt1q0k98fzvwmc9rmjkyb9", "key":"777"});
    socket.on('update', function(data){
      console.log('update received');
      console.log(data);
    });

    // socket.emit('unregister', {"uuid":"b5535950-29fd-11e3-9113-0bd381f0b5ef", "token": "2ls40jx80s9bpgb9w2g0vi2li72v5cdi"});
    // socket.on('unregister', function(data){
    //   console.log('unregister received');
    //   console.log(data);
    // });

    // test sending message api
    setTimeout(function(){
      socket.emit('message', {"devices": "all", "message": {"yellow":"on"}});

      // // get all devices that are online and send them each a message
      // request.get('http://localhost:3000/devices?online=true', function (error, response, body){
      //   console.log(body);
      //   var devices = JSON.parse(body);

      //   var data = {"devices": devices, "message": {"armed":true}};
      //   request.post({uri: 'http://localhost:3000/messages', json: data}, function(err, res, body) {
      //     console.log(body);
      //   });


      // });


    },3000);


    socket.on('message', function(data){
      console.log('message received');      
      console.log(data);      
    });

    socket.on('disconnect', function(){
      console.log('disconnect');
    });
  });




