class PublicController < ApplicationController
  before_action :get_quiz, only: [:show]

  def show
    @questions = @quiz.questions
    render json: { success: true, questions: @questions }, status: :ok
  end

  private

  def get_quiz
    @quiz = Quiz.find_by(slug: params[:slug])
    render json: { success: false, message: "Quiz not found" }, status: 404 unless @quiz
  end
end
