class SessionsController < ApplicationController
 skip_before_action :require_login, except: [:destroy]
  def new
  end

  def create
    if login(params[:email], params[:password])
      flash[:success] = 'Welcome back!'
      redirect_back_or_to root_path
    else
      flash.now[:warning] = 'E-mail and/or password is incorrect.'
      render 'new'
    end
  end

  def destroy
    logout
    flash[:success] = 'You have been successfully logged out'
    redirect_to root_path
  end
end
