class UsersController < ApplicationController
  def new
    @user = User.new
    render 'new'
  end

  def login
    @user = User.new
    render 'users/login'
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      if Upload.all.length > 0
        @upload = Upload.find(1)
        redirect_to @upload
      else
        @user = User.new
        render 'uploads/new'
      end
    else
      @errors = @user.errors.full_messages
      render 'new'
    end
  end

  def destroy
    session.clear
  end

private

  def user_params
    params.require(:user).permit(:user_name, :email, :password)
  end
end
