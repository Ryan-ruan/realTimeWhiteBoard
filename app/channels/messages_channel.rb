
class MessagesChannel < ApplicationCable::Channel
  def subscribed
      stream_from 'messages'
      # stream_from "private_channel_#{ @current_user.id }"
                  # "private_channel_12"
  end
  def unsubscribed
  #clean up!
  end

  def speak(data)
    puts "GOT DATA", data
    ActionCable.server.broadcast('messages', data)
  end

  def draw(data)

    data[:user_id] = current_user.id  # defined in app/channels/application_cable/connection.rrb
    puts "draw: ", data
    puts "setting current user for this draw to #{ current_user.id }============ "

    ActionCable.server.broadcast('messages', data)
  end

  ## the draw broadcast
  # def draw(data)
  # ApplicationCable.server.broadcast("chatroom_channel",message =>data['message'])
  # end

end
