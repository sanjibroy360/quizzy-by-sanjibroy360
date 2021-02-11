class SessionsController < ApplicationController
  def create
    @user = User.find_by(email: params[:session][:email])
    if (@user && @user.authenticate(params[:session][:password]))
      reset_session
      log_in @user
      render json: { success: "Welcome, #{@user.first_name}!", user: @user }, status: :ok
    end
  end
end
