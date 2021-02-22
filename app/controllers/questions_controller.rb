class QuestionsController < ApplicationController
  before_action :authenticate_user, only: [:create]
  before_action :check_quiz_id, only: [:create, :index, :edit, :update, :destroy]

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
      render json: { success: true, message: "Question successfully created ", question: @question }, status: :ok
    else
      render json: { success: false, message: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @question = @quiz.questions.find_by(id: params[:id])

    if @question.update(update_question_params)
      render json: { success: true, message: "Question successfully updated ", question: @question }, status: :ok
    else
      render json: { success: false, message: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @question = @quiz.questions.find_by(id: params[:id])
    @question.destroy
    render json: { success: true, message: "Quiz deleted successfully" }, status: :ok
  end

  private

  def check_quiz_id
    @quiz = Quiz.find_by(id: params[:quiz_id])
    render json: { success: false, message: "Quiz not found" }, status: 404 unless @quiz
  end

  def question_params
    params.required(:question).permit(:description, :user_id, options_attributes: [:name, :is_correct])
  end

  def update_question_params 
    params.required(:question).permit(:description, :user_id, options_attributes: [:name, :is_correct, :id, :_destroy])
  end
end
