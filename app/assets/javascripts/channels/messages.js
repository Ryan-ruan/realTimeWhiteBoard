
// var canvas;  // this won't be set until the Fabric is setup in main.js

App.messages = App.cable.subscriptions.create('MessagesChannel', {
  received: function(data) {

    if( data.action === 'draw' ){

      console.log('USER TEST', data.user_id, current_user_id );
      if( data.user_id === current_user_id ){
        return;
      }
      console.log('%cdraw: ', 'color:green', data);

      // check if this user already has a remoteCanvases[user_id] entry
      // if so, update their fields
      // if not, create a new object for them, like this:
      remoteCanvases[data.user_id] = {
        lastPointerPosition: { x: data.x, y: data.y },
        isPaint: false,
        layer: null,   // Konva layer (or canvas??) object here
      };


      if( data.type ){
        switch( data.type ){
        case 'mouseDown':
          remoteDrawStart(data);
          break;
        case 'mouseMove':
          remoteDrawMove(data);
          break;
        case 'mouseUp':
          remoteDrawStop(data);
          break;
        }
      }

    } // action==='draw'

    //   // drawClick(data.x, data.y);
    //   // $(document.elementFromPoint(data.x, data.y)).click();
    //
    //   if( data.type && data.type === 'drawPath' ){
    //
    //     console.log('draw path received!', data);
    //
    //     // draw a smooth path (just as fabric does for us on the original drawing client's canvas)
    //     canvas.freeDrawingBrush._render({
    //       p1: new fabric.Point(data.p1.x, data.p1.y),
    //       p2: new fabric.Point(data.p2.x, data.p2.y),
    //        v: data.v
    //     });
    //
    //   } else {
    //     // draw a point
    //
    //     // canvas.isDrawingMode = true;
    //     // debugger;
    //     // canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
    //     // canvas.freeDrawingBrush.width = 10;
    //     // canvas.freeDrawingBrush.color = '#005E7A';
    //
    //     console.log('%ccolor', 'color:green', canvas.freeDrawingBrush.color, 'new', data.colour, { x: data.x, y:data.y });
    //     canvas.freeDrawingBrush.color = data.colour;
    //     // debugger;
    //
    //     canvas.freeDrawingBrush.onMouseDown({ x: data.x, y: data.y}); //, colour: // canvas.freeDrawingBrush.color,  isWebsocketsDraw: true});
    //   }
    //
    // } else {
    //   // default message is a chat message
    //   console.log('received message: ', data);
    //   $("#messages").removeClass('hidden')
    //   $("#messages").scrollTop($("#messages").children().height());
    //   return $('#messages').append(this.renderMessage(data));
    // }


  },

  renderMessage: function(data) {
    // Render whatever Rails renders when this page is first loaded
    return "<p class='ui message'> <b>" + data.user + ": </b>" + data.message + "</p>";
  },

  draw: function (data) {
    console.log('messages.js draw()', data);
    return this.perform('draw', data);
  }
  //
  //   App.messages.speak({message: form_input_value})
  //   speak: function (data) {
  //   return this.perform('speak', data);
  // }

});
