class QuizzesController < ApplicationController
  before_action :authenticate_user, only: [:create, :index, :update, :destroy]
  before_action :load_quiz, only: [:show, :edit, :update, :destroy, :publish]
  before_action :ensure_quiz_not_published, only: [:publish]

  def index
    quizzes = current_user.quizzes
    render json: { message: "Quizzes fetched successfully.", quizzes: quizzes }, status: :ok
  end

  def show
    if (@quiz)
      render json: { quiz: @quiz, questions_count: @quiz.questions.count }, status: :ok
    else
      render json: { message: "Quiz not found." }, status: 404
    end
  end

  def create
    quiz = current_user.quizzes.build(quiz_params)

    if quiz.save
      render json: { message: "Quiz created successfully.", quiz: quiz }, status: :ok
    else
      render json: { message: quiz.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def edit
    if @quiz
      render json: { quiz: @quiz }, status: :ok
    else
      render json: { message: "Quiz not found." }, status: 404
    end
  end

  def update
    if @quiz.update(title: params[:quiz][:title])
      render json: { message: "Quiz updated successfully.", quiz: @quiz }, status: :ok
    else
      render json: { message: @quiz.errors.full_messages }, status: 400
    end
  end

  def publish
    @quiz.generate_slug

    if @quiz.save
      render json: { message: "Quiz published successfully", slug: @quiz.slug }, status: :ok
    else
      render json: { message: @quiz.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @quiz.destroy
    render json: { message: "Quiz deleted successfully" }, status: :ok
  end

  private

  def load_quiz
    @quiz = Quiz.find_by(id: params[:id])
  end

  def quiz_params
    params.required(:quiz).permit(:user_id, :title)
  end

  def ensure_quiz_not_published
    render json: { message: "Quiz already published" }, status: 400 if @quiz.slug
  end
end
