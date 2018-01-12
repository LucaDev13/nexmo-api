class MosController < ApplicationController
  skip_before_filter :verify_authenticity_token
  skip_before_action :require_login, only: [:new, :create]
  before_action :set_mo, only: [:show, :edit, :update, :destroy]

  # GET /mos
  # GET /mos.json
  def index
    @mos = Mo.paginate(:page => params[:page]).order(created_at: :desc)
  end

  # GET /mos/1
  # GET /mos/1.json
  def show
  end

  # GET /mos/new
  def new
    @mo = Mo.new
  end

  # GET /mos/1/edit
  def edit
  end

  # POST /mos
  # POST /mos.json
  def create
    @mo = Mo.new(mo_params)

    respond_to do |format|
      if @mo.save
        format.html { redirect_to @mo, notice: 'Mo was successfully created.' }
        format.json { render :show, status: :created, location: @mo }
      else
        format.html { render :new }
        format.json { render json: @mo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /mos/1
  # PATCH/PUT /mos/1.json
  def update
    respond_to do |format|
      if @mo.update(mo_params)
        format.html { redirect_to @mo, notice: 'Mo was successfully updated.' }
        format.json { render :show, status: :ok, location: @mo }
      else
        format.html { render :edit }
        format.json { render json: @mo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /mos/1
  # DELETE /mos/1.json
  def destroy
    @mo.destroy
    respond_to do |format|
      format.html { redirect_to mos_url, notice: 'Mo was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_mo
      @mo = Mo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def mo_params
      params.permit(:status, :msisdn, :to, :messageId, :message_timestamp, :text, :keyword, :type, :created_at, :updated_at)
    end
end
