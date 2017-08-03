class WhiteboardsController < ApplicationController
  before_action :set_whiteboard, only: [:show, :edit, :update, :destroy]

  # GET /whiteboards
  # GET /whiteboards.json
  def index
    @whiteboards = Whiteboard.all
  end

  # GET /whiteboards/1
  # GET /whiteboards/1.json
  def show
  end

  # GET /whiteboards/new
  def new
    @whiteboard = Whiteboard.new
  end

  # GET /whiteboards/1/edit
  def edit
  end

  # POST /whiteboards
  # POST /whiteboards.json
  def create
    @whiteboard = Whiteboard.new(whiteboard_params)

    respond_to do |format|
      if @whiteboard.save
        format.html { redirect_to @whiteboard, notice: 'White board was successfully created.' }
        format.json { render :show, status: :created, location: @whiteboard }
      else
        format.html { render :new }
        format.json { render json: @whiteboard.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /whiteboards/1
  # PATCH/PUT /whiteboards/1.json
  def update
    respond_to do |format|
      if @whiteboard.update(whiteboard_params)
        format.html { redirect_to @whiteboard, notice: 'White board was successfully updated.' }
        format.json { render :show, status: :ok, location: @whiteboard }
      else
        format.html { render :edit }
        format.json { render json: @whiteboard.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /whiteboards/1
  # DELETE /whiteboards/1.json
  def destroy
    @whiteboard.destroy
    respond_to do |format|
      format.html { redirect_to whiteboards_url, notice: 'White board was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_whiteboard
      @whiteboard = Whiteboard.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def whiteboard_params
      params.require(:whiteboard).permit(:image, :user_id, :chatroom_id)
    end
end
