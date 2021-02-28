class PublicController < ApplicationController
  before_action :load_quiz, only: [:show, :details, :questions]

  def show
    redirect_to "/public/#{params[:slug]}/attempt/new"
  end

  def details
    render json: { quiz: @quiz }, status: :ok
  end

  def questions
    @questions = @quiz.questions
    if @questions.count > 0
      render json: @questions.to_json(only: [:id, :description], include: [:options]), status: :ok
    else
      render json: { message: "There are no questions in this quiz" }, status: :unprocessable_entity
    end
  end

  private

  def load_quiz
    @quiz = Quiz.find_by(slug: params[:slug])
    render json: {  message: "Quiz not found" }, status: 404 unless @quiz
  end
end
