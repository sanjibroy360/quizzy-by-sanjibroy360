class PublicController < ApplicationController
  before_action :get_quiz, only: [:show, :details, :questions]

  def show
    redirect_to "/public/#{params[:slug]}/attempt/new"
  end

  def details
    render json: { success: false, quiz: @quiz }, status: :ok
  end

  def questions
    @questions = @quiz.questions
    if @questions.count > 0
      render json: @questions.to_json(only: [:id, :description], include: [:options]), status: :ok
    else
      render json: { success: false, message: "There are no questions in this quiz" }, status: :unprocessable_entity
    end
  end

  private

  def get_quiz
    @quiz = Quiz.find_by(slug: params[:slug])
    render json: { success: false, message: "Quiz not found" }, status: 404 unless @quiz
  end
end
