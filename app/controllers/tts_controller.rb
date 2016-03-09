class TtsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  before_action :set_tts, only: [:show, :edit, :update, :destroy]

  # GET /tts
  # GET /tts.json
  def index
    @tts = Tt.all
  end

  # GET /tts/1
  # GET /tts/1.json
  def show
  end

  # GET /tts/new
  def new
    @tt = Tt.new
  end

  # GET /tts/1/edit
  def edit
  end

  # POST /tts
  # POST /tts.json
  def create
    @tt = Tt.new(tt_params)

    respond_to do |format|
      if @tt.save
        format.html { redirect_to @tt, notice: 'TTS was successfully created.' }
        format.json { render :show, status: :created, location: @tt }
      else
        format.html { render :new }
        format.json { render json: @tt.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tts/1
  # PATCH/PUT /tts/1.json
  def update
    respond_to do |format|
      if @tt.update(tt_params)
        format.html { redirect_to @tt, notice: 'TTS was successfully updated.' }
        format.json { render :show, status: :ok, location: @tt }
      else
        format.html { render :edit }
        format.json { render json: @tt.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tts/1
  # DELETE /tts/1.json
  def destroy
    @tt.destroy
    respond_to do |format|
      format.html { redirect_to tts_url, notice: 'TTS was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tts
      @tt = Tt.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tt_params
      params.permit(:status, :call_direction, :call_price, :call_rate, :call_duration, :call_request, :network_code, :call_id, :to, :from, :text, :lg, :voice, :repeat, :machine_detection, :machine_timeout, :callback, :callback_method)
    end
end
