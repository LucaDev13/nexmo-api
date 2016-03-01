class DlrsController < ApplicationController
  before_action :set_dlr, only: [:show, :edit, :update, :destroy]

  # GET /dlrs
  # GET /dlrs.json
  def index
    @dlrs = Dlr.all
  end

  # GET /dlrs/1
  # GET /dlrs/1.json
  def show
  end

  # GET /dlrs/new
  def new
    @dlr = Dlr.new
  end

  # GET /dlrs/1/edit
  def edit
  end

  # POST /dlrs
  # POST /dlrs.json
  def create
    @dlr = Dlr.new(dlr_params)

    respond_to do |format|
      if @dlr.save
        format.html { redirect_to @dlr, notice: 'Dlr was successfully created.' }
        format.json { render :show, status: :created, location: @dlr }
      else
        format.html { render :new }
        format.json { render json: @dlr.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /dlrs/1
  # PATCH/PUT /dlrs/1.json
  def update
    respond_to do |format|
      if @dlr.update(dlr_params)
        format.html { redirect_to @dlr, notice: 'Dlr was successfully updated.' }
        format.json { render :show, status: :ok, location: @dlr }
      else
        format.html { render :edit }
        format.json { render json: @dlr.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /dlrs/1
  # DELETE /dlrs/1.json
  def destroy
    @dlr.destroy
    respond_to do |format|
      format.html { redirect_to dlrs_url, notice: 'Dlr was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dlr
      @dlr = Dlr.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def dlr_params
      params.require(:dlr).permit(:to)
    end
end
