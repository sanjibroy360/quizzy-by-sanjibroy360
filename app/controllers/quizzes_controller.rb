class QuizzesController < ApplicationController
  before_action :authenticate_user, only: [:create, :index, :update, :destroy]
  before_action :authorized, only: [:update, :destroy]

  def index
    quizzes = current_user.quizzes
    render json: { success: true, message: "Quizzes fetched successfully.", quizzes: quizzes }, status: :ok
  end

  def show
    quiz = Quiz.find_by(id: params[:id])
    if (quiz)
      render json: { success: true, quiz: quiz }, status: :ok
    else
      render json: { success: false, message: "Quiz not found." }, status: 404
    end
  end

  def create
    quiz = current_user.quizzes.build(quiz_params)

    if quiz.save
      render json: { success: true, message: "Quiz created successfully.", quiz: quiz }, status: :ok
    else
      render json: { success: false, message: quiz.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def edit
    quiz = Quiz.find_by(id: params[:id])

    if quiz
      render json: { success: true, quiz: quiz }, status: :ok
    else
      render json: { success: false, message: "Quiz not found." }, status: 404
    end
  end

  def update
    if @quiz.update(title: params[:quiz][:title])
      render json: { success: true, message: "Quiz updated successfully.", quiz: @quiz }, status: :ok
    else
      render json: { success: false, message: @quiz.errors.full_messages }, status: 400
    end
  end

  def destroy
    @quiz.destroy
    render json: { success: true, message: "Quiz deleted successfully" }, status: :ok
  end

  private

  def quiz_params
    params.required(:quiz).permit(:user_id, :title)
  end

  def authorized
    @quiz = Quiz.find_by(id: params[:id])
    render json: { success: false, message: "Only author can edit or delete the quiz." }, status: 401 unless (@quiz.user_id == current_user.id)
  end
end
