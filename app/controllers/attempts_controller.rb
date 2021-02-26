class AttemptsController < ApplicationController
  before_action :check_for_previous_unsubmitted_attempt, only: [:create]
  before_action :get_attempt, only: [:update]

  def create
    if @user.nil?
      @user = User.new(user_params)
      render json: { message: @user.errors.full_messages }, status: :unprocessable_entity unless @user.save
    end

    @attempt = @quiz.attempts.build(user_id: @user.id) if @attempt.nil?

    if @attempt.save
      render json: { attempt: @attempt }, status: :ok
    else
      render json: { message: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if (@attempt.is_submitted?)
      render json: { message: "You have already submitted the quiz" }, status: unprocessable_entity
    else
      @attempt.update(attempt_params)
      render json: { message: "Answers submitted successfully", attempt: @attempt }, status: :ok
    end
  end

  def show
    @attempt = Attempt.find_by(id: params[:id])
    if @attempt
      @attempt_answers = @attempt.attempt_answers
      if @attempt_answers.count > 0
        render json: { attempt_answers: @attempt_answers, correct_answer_count: @attempt.correct_answers_count, incorrect_answer_count: @attempt.incorrect_answers_count }, status: :ok
      else
        render json: { message: "You have not answered any question" }, status: :unprocessable_entity
      end
    else
      render json: { message: "No attempt record found." }, status: 404
    end
  end

  private

  def check_for_previous_unsubmitted_attempt
    @user = User.find_by(email: params[:user][:email])
    @quiz = Quiz.find_by(id: params[:quiz_id])
    if @user
      @attempt = Attempt.find_by(user_id: @user.id, quiz_id: @quiz.id)
      if (@attempt)
        if @attempt.is_submitted?
          render json: { message: "You have already submitted the quiz" }, status: :unprocessable_entity if (@attempt && @attempt.is_submitted?)
        else
          render json: { attempt: @attempt }, status: :ok
        end
      end
    end
  end

  def get_attempt
    @attempt = Attempt.find_by(quiz_id: params[:quiz_id], user_id: params[:user_id])
    render json: { message: "You have not attempted the quiz." }, status: 404 unless @attempt
  end

  def user_params
    params.required(:user).permit(:first_name, :last_name, :email)
  end

  def attempt_params
    params.required(:attempt).permit(:quiz_id, :user_id, :is_submitted, attempt_answers_attributes: [:attempt_id, :question_id, :option_id])
  end
end
