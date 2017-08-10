var stage, bg, layer, canvas, image, context, lastPointerPosition, mode;

var remoteCanvases = {
  // // indexed by user
  // 5: {
  //   lastPointerPosition: { x: null, y: null  },
  //   isPaint: false,
  //   layer: null,   // Konva layer (or canvas??) object here
  // },
};

var remoteDrawStart = function( data ){
  isPaint = true;  // needs to be changed to prevent interference with local user drawing
  lastPointerPosition = {x: data.x, y: data.y};
  console.log('%cremoteDrawStart: ', 'color:blue', data);

};
var remoteDrawStop = function( data ){
  isPaint = false;
  console.log('%cremoteDrawStop: ', 'color:blue', data);
};

var remoteDrawMove = function( data ){
  // most of the code copied from local user mouseMove callback
  // - should be in shared function?

  console.log('%cremoteDrawMove: ', 'color:blue', data);

  var pos = { x: data.x, y: data.y };

  if (mode === 'brush') {
    context.globalCompositeOperation = 'source-over';
  }
  if (mode === 'eraser') {
    context.globalCompositeOperation = 'destination-out';
  }
  context.beginPath();
  var localPos = {
    x: lastPointerPosition.x - image.x(),
    y: lastPointerPosition.y - image.y()
  };
  context.moveTo(localPos.x, localPos.y);
  // WAS HERE: var pos = stage.getPointerPosition();
  localPos = {
    x: pos.x - image.x(),
    y: pos.y - image.y()
  };
  context.lineTo(localPos.x, localPos.y);
  context.closePath();
  context.stroke();
  lastPointerPosition = pos;
  layer.draw();
};


$(document).ready(function(){

  if( !$('body.chatrooms.show').length ) {
    return;
  }

  // https://konvajs.github.io/docs/sandbox/Free_Drawing.html
    var width = 640;  //window.innerWidth;
    var height = 480; //window.innerHeight - 25;
    // first we need Konva core things: stage and layer
    stage = new Konva.Stage({
      container: 'draw-container',
      width: width,
      height: height,
      // opacity: 0
    });

    // set up background layer, fill with bg colour
    bg = new Konva.Layer();
    stage.add(bg);

    var bgRect = new Konva.Rect({
      x: 0,
      y: 0,
      width: width,
      height: height,
      fill: 'white',
      // stroke: 'black',
    });
    // add the shape to the layer
    bg.add(bgRect);


    layer = new Konva.Layer({
      // opacity: 0
    });
    stage.add(layer);

    // then we are going to draw into special canvas element
    canvas = document.createElement('canvas');
    canvas.width = stage.width(); //     / 2;
    canvas.height = stage.height(); //   / 2;
    // creted canvas we can add to layer as "Konva.Image" element
    image = new Konva.Image({
        image: canvas,
        x : 0, //stage.width() / 4,
        y : 0, //stage.height() / 4,
        stroke: 'green',
        shadowBlur: 5
    });
    layer.add(image);
    stage.draw();

    // Good. Now we need to get access to context element
    context = canvas.getContext('2d');
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;
    var isPaint = false;
    mode = 'brush';
    // now we need to bind some events
    // we need to start drawing on mousedown
    // and stop drawing on mouseup
    stage.on('contentMousedown.proto', function() {
      isPaint = true;
      lastPointerPosition = stage.getPointerPosition();

      App.messages.draw({
          action: 'draw',
          type: 'mouseDown',
          x: lastPointerPosition.x,
          y: lastPointerPosition.y
      });

    });
    stage.on('contentMouseup.proto', function() {
        isPaint = false;

        App.messages.draw({
          action: 'draw',
          type: 'mouseUp',
          x: lastPointerPosition.x,
          y: lastPointerPosition.y
        });

    });
    // and core function - drawing
    stage.on('contentMousemove.proto', function() {
      if (!isPaint) {
        return;
      }

      // moved from ~117  (but maybe needs to be inside beginPath?)
      var pos = stage.getPointerPosition();

      App.messages.draw({
        action: 'draw',
        type: 'mouseMove',
        x: pos.x,
        y: pos.y
      });

      if (mode === 'brush') {
        context.globalCompositeOperation = 'source-over';
      }
      if (mode === 'eraser') {
        context.globalCompositeOperation = 'destination-out';
      }
      context.beginPath();
      var localPos = {
        x: lastPointerPosition.x - image.x(),
        y: lastPointerPosition.y - image.y()
      };
      context.moveTo(localPos.x, localPos.y);
      // WAS HERE: var pos = stage.getPointerPosition();
      localPos = {
        x: pos.x - image.x(),
        y: pos.y - image.y()
      };
      context.lineTo(localPos.x, localPos.y);
      context.closePath();
      context.stroke();
      lastPointerPosition = pos;
      layer.draw();
    });

    // var select = document.getElementById('tool');
    // select.addEventListener('change', function() {
    //   mode = select.value;
    // });
















});
