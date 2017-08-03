
// var canvas;  // this won't be set until the Fabric is setup in main.js

App.messages = App.cable.subscriptions.create('MessagesChannel', {
  received: function(data) {

    if( data.action === 'draw' ){

      console.log('USER TEST', data.user_id, current_user_id );
      if( data.user_id === current_user_id ){
        return;
      }

      // drawClick(data.x, data.y);
      // $(document.elementFromPoint(data.x, data.y)).click();

      if( data.type && data.type === 'drawPath' ){

        console.log('draw path received!', data);

        // draw a smooth path (just as fabric does for us on the original drawing client's canvas)
        canvas.freeDrawingBrush._render({
          p1: new fabric.Point(data.p1.x, data.p1.y),
          p2: new fabric.Point(data.p2.x, data.p2.y),
           v: data.v
        });

      } else {
        // draw a point
        canvas.freeDrawingBrush.onMouseDown({x: data.x, y:data.y, isWebsocketsDraw: true});
      }

    } else {
      // default message is a chat message
      console.log('received message: ', data);
      $("#messages").removeClass('hidden')
      return $('#messages').append(this.renderMessage(data));
    }
  },

  renderMessage: function(data) {
    // Render whatever Rails renders when this page is first loaded
    return "<p> <b>" + data.user + ": </b>" + data.message + "</p>";
  },

  draw: function (data) {
    return this.perform('draw', data);
  }
  //
  //   App.messages.speak({message: form_input_value})
  //   speak: function (data) {
  //   return this.perform('speak', data);
  // }

});
