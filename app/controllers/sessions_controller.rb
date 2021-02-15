class SessionsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :authenticate_user, only: [:destory]
  before_action :authorized, only: [:create]

  def create
    @user = User.find_by(email: params[:session][:email])
    if (@user && @user.authenticate(params[:session][:password]))
      log_in @user
      render json: { success: true, message: "Welcome, #{@user.first_name}!", user: @user }, status: :ok
    else
      render json: { success: false, message: "Wrong email or password." }, status: 401
    end
  end

  def destroy
    log_out
    render json: { success: true, message: "Logged out successfuly." }, status: :ok
  end

  private

  def authorized
    if logged_in?
      render json: { success: false, message: "#{current_user.first_name}, you're already logged in." }, status: 400
    end
  end
end
