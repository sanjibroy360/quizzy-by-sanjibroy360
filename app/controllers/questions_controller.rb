class QuestionsController < ApplicationController
  before_action :authenticate_user, only: [:create]
  before_action :load_quiz, only: [:create, :index, :edit, :update, :destroy]

  def index
    @questions = @quiz.questions
    render json: @questions.to_json(only: [:id, :description], include: [:options]), status: :ok
  end

  def edit
    @question = @quiz.questions.find_by(id: params[:id])
    render json: @question.to_json(only: [:id, :description], include: [:options, :quiz]), status: :ok
  end

  def create
    @question = @quiz.questions.build(question_params)

    if @question.save
      render json: { message: "Question successfully created ", question: @question }, status: :ok
    else
      render json: { message: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @question = @quiz.questions.find_by(id: params[:id])

    if @question.update(question_params)
      render json: { message: "Question successfully updated ", question: @question }, status: :ok
    else
      render json: { message: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @question = @quiz.questions.find_by(id: params[:id])
    @question.destroy
    render json: { message: "Quiz deleted successfully" }, status: :ok
  end

  private

  def load_quiz
    @quiz = Quiz.find_by(id: params[:quiz_id])
    render json: { message: "Quiz not found" }, status: 404 unless @quiz
  end

  def question_params
    params.required(:question).permit(:description, :user_id, options_attributes: [:name, :is_correct, :id, :_destroy])
  end
end
