class AdminsController < ActionController::Base
  skip_before_action :require_login, only: [:new, :create]

  def new
     @admin = Admin.new
   end

   def create
     @admin = Admin.new(admin_params)
     if @admin.save
        login(params[:admin][:email], params[:admin][:password])
       flash[:success] = 'Welcome!'
       redirect_to root_path
     else
       render 'new'
     end
   end

   private

   def admin_params
     params.require(:admin).permit(:email, :password, :password_confirmation, :name)
   end
end
