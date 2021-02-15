class QuizzesController < ApplicationController
  before_action :authenticate_user, only: [:create]

  def create
    quiz = Quiz.new(quiz_params)

    if quiz.save && quiz.user == current_user
      render json: { success: true, message: "Quiz created successfuly.", quiz: quiz }, status: :ok
    else
      render json: { success: false, message: quiz.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def quiz_params
    params.required(:quiz).permit(:user_id, :title)
  end
end