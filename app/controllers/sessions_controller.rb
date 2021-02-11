class SessionsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :authenticate_user, only: [:destory]

  def create
    @user = User.find_by(email: params[:session][:email])
    if (@user && @user.authenticate(params[:session][:password]))
      reset_session
      log_in @user
      render json: { success: true, message: "Welcome, #{@user.first_name}!", user: @user,status: :ok
    else
      render json: { success: false, message: "Wrong email or password." }, status: 401
    end
  end

  def destroy
    log_out
    reset_session
    render json: { success: true, message: "Logged out successfuly." }, status: :ok
  end
end
