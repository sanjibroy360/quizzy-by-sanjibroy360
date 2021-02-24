require "test_helper"

class AttemptAnswerTest < ActiveSupport::TestCase
  def setup
    @user = User.create(first_name: "Muhammad", last_name: "Ali", email: "ali@gmail.com", role: "standard", password: "ali_the_champ", password_confirmation: "ali_the_champ")

    @quiz = Quiz.create(title: "Finance", user_id: @user.id)
    @attempt = Attempt.create(quiz_id: @quiz.id, user_id: @user.id)
    @question = Question.create(quiz_id: @quiz.id,
                                description: "How many moons does Mars have?",
                                options_attributes: [
                                  { name: "2", is_correct: true },
                                  { name: "1", is_correct: false },
                                  { name: "3", is_correct: false },
                                ])
    @attempt_answers = AttemptAnswer.new(attempt_id: @attempt.id, question_id: @question.id, option_id: @question.options.first.id)
  end

  def test_should_be_valid
    assert @attempt_answers.valid?
  end

  def test_question_id_should_be_present
    @attempt_answers.question_id = nil
    assert_not @attempt_answers.valid?
  end

  def test_question_id_should_be_valid
    @attempt_answers.question_id = 454444545412
    assert_not @attempt_answers.valid?
  end

  def test_option_id_should_be_present
    @attempt_answers.option_id = nil
    assert_not @attempt_answers.valid?
  end

  def test_question_id_should_be_valid
    @attempt_answers.option_id = 45444454541255
    assert_not @attempt_answers.valid?
  end
end
