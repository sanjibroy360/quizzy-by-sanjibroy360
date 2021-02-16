class QuizzesController < ApplicationController
  before_action :authenticate_user, only: [:create, :index]

  def index
    quizzes = current_user.quizzes
    render json: { success: true, message: "Quizzes fetched successfully.", quizzes: quizzes }, status: :ok
  end

  def create
    quiz = Quiz.new(quiz_params)

    if quiz.save && quiz.user == current_user
      render json: { success: true, message: "Quiz created successfully.", quiz: quiz }, status: :ok
    else
      render json: { success: false, message: quiz.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def quiz_params
    params.required(:quiz).permit(:user_id, :title)
  end
end
