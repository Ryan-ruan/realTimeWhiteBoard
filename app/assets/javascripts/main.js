var canvas;
$(document).ready(function(){

/*
  App.messages.draw({  //app not set
    type: 'drawPath',
    p1: {x: 235.75, y: 225},
    p2: {x: 236.75, y: 225},
    v: [1, 0, 0, 1, 0, 0],
    brushType: 'pencil',
    colour:  '#FF0099' //{r: 255, g: 200, b: 10}
  });
*/

  var websocketsDrawPathSend = function () {};
  // var websocketsDrawPathSend = function (drawData) {
  //   console.log('websocketsDrawPathSend', drawData);
  //   App.messages.draw({  //app not set
  //     type: 'drawPath',
  //     p1: {x: drawData.p1.x, y: drawData.p1.y},
  //     p2: {x: drawData.p2.x, y: drawData.p2.y},
  //     v: drawData.v,
  //     brushType: 'pencil',
  //     colour:  '#FF0099' //{r: 255, g: 200, b: 10}
  //   });
  // };

  console.log("all good");
  // fabric js canvas
  canvas = this.__canvas =
  new fabric.Canvas('canvas', {
      width: 640,
      height: 480,
      });
    //

    canvas.isDrawingMode = true;
    // debugger;
    canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas, websocketsDrawPathSend);
    canvas.freeDrawingBrush.width = 10;
    canvas.freeDrawingBrush.color = '#005E7A';


    $('.canvas-container').mousemove(
      function(e){
        if( event.buttons == 1) {

          console.log(e.offsetX, e.offsetY);
          App.messages.draw({  //app not set
            x: e.offsetX,
            y: e.offsetY,
            brushType: 'pencil',
            colour:  canvas.freeDrawingBrush.color //{r: 255, g: 200, b: 10}
          });
        }
      });






        $('#drawing').on('click',function() {
          $('#editor_ui').show();
        });



        $('#clear').on('click',function() {
          canvas.clear();
        });

        $('#drawing-line-width').on('change', function(){
          canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
          $('#width-info').text(this.value);
        });

        $('#drawing-line-color').on('change', function(){
          canvas.freeDrawingBrush.color = this.value;
          $('#color-info').text(this.value);

        });
    //
    //
        $('#text').on('click', function(){
          console.log("123");
          canvas.isDrawingMode = false;
          if ( $('#brush').hasClass('active') ){
            canvas.isDrawingMode = true;
          };
        });
    //---- tab -----
    $('.top.menu .item').tab();


        // // set font color and size
        // var fontColor = $('#font-color').val();
        // var fontSize = parseInt( $('#font-size').val() );
        //
        // $('#font-color').on('change', function(){
        //   fontColor = $(this).val();
        // });
        //
        // $('#font-size').on('change', function(){
        //   fontSize = $(this).val();
        //   $('#size-info').text(fontSize);
        // });
        //
        // $('#add-text').on('click', function(){
        //   var text = new fabric.IText('Type text here', {
        //     width: 300,
        //     top: 240,
        //     left: 80,
        //     fontSize: fontSize,
        //     textAlign: 'center',
        //     fixedWidth: 150,
        //     fill: fontColor,
        //     fontFamily: 'Avenir'
        //   });
        //
        //   canvas.add(text);
        // });


        // ======================Save to computer ==========================
        //--autodownload?
        $('#download').click(function() {
          window.location = canvas.toDataURL("image/png");
        });

        // ======================Upload to cloud ==========================


        $('#upload').submit(function () {

          var dataurl = canvas.toDataURL('image/png');
          $('#image').val( dataurl );

        });







});
