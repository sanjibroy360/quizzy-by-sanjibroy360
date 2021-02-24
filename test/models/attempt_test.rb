require "test_helper"

class AttemptTest < ActiveSupport::TestCase
  def setup
    @user = User.create(first_name: "Muhammad", last_name: "Ali", email: "ali@gmail.com", role: "standard", password: "ali_the_champ", password_confirmation: "ali_the_champ")

    @quiz = Quiz.create(title: "Finance", user_id: @user.id)
    @attempt = Attempt.new(quiz_id: @quiz.id, user_id: @user.id)
  end

  def test_should_be_valid
    assert @attempt.valid?
  end

  def test_user_id_should_be_present
    @attempt.user_id = nil
    assert_not @attempt.valid?
  end

  def test_user_id_should_be_valid
    @attempt.user_id = 213131135451121551
    assert_not @attempt.valid?
  end

  def test_quiz_id_should_be_present
    @attempt.quiz_id = nil
    assert_not @attempt.valid?
  end

  def test_quiz_id_should_be_valid
    @attempt.quiz_id = 45455445445411
    assert_not @attempt.valid?
  end
end
