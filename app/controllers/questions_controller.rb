class QuestionsController < ApplicationController
  before_action :authenticate_user, only: [:create]

  def create
    @question = current_user.questions.build(question_params)
    if @question.save
      render json: { success: true, message: "Question successfully created ", question: @question }, status: :ok
    else
      render json: { success: false, message: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def question_params
    params.required(:question).permit(:description, :user_id, options_attributes: [:name, :isCorrect])
  end
end
