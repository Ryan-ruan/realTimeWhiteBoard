class ChatroomsController < ApplicationController
  before_action :set_chatroom, only: [:show, :destroy]
  before_action :check_if_logged_in, except: [:index]

  # GET /chatrooms
  # GET /chatrooms.json
  def index
    @chatrooms = Chatroom.all
  end

  def show
    # raise 1
    # @chatroom = Chatroom.find_by name: params[:id]
    @message = Message.new


  end

  def direct
    redirect_to  "/chatrooms/#{params[:Name]}"
    #chatroom_path( @chatroom.name )

  end

  # GET /chatrooms/new
  def new
    @chatroom = Chatroom.new
  end

  def create
    @chatroom = Chatroom.new(chatroom_params)

    respond_to do |format|
      if @chatroom.save
        format.html { redirect_to chatroom_path( @chatroom.name ), notice: 'Chat room was successfully created.' }
        # format.json { render :show, status: :created, location: @chatroom }
      else
        format.html { render :new }
        # format.json { render json: @chatroom.errors, status: :unprocessable_entity }
      end
    end
  end
  #
  # # PATCH/PUT /chatrooms/1
  # # PATCH/PUT /chatrooms/1.json
  # def update
  #   respond_to do |format|
  #     if @chatroom.update(chat_room_params)
  #       format.html { redirect_to @chatroom, notice: 'Chat room was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @chatroom }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @chatroom.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # DELETE /chatrooms/1
  # DELETE /chatrooms/1.json
  def destroy
    @chatroom.destroy
    respond_to do |format|
      format.html { redirect_to chat_rooms_url, notice: 'Chat room was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chatroom
      @chatroom = Chatroom.find_by( name: params[:id] )
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def chatroom_params
      params.require(:chatroom).permit(:name)
    end
end
