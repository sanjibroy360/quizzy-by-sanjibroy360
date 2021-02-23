require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = User.create(first_name: "Muhammad", last_name: "Ali", email: "ali@gmail.com", role: "standard", password: "ali_the_champ", password_confirmation: "ali_the_champ")

    @quiz = Quiz.new(title: "Finance", user_id: @user.id)
  end

  def test_should_be_valid
    assert @quiz.valid?
  end

  def test_quiz_title_should_not_be_blank
    @quiz.title = "   "
    assert_not @quiz.valid?
    assert_equal ["Title can't be blank"], @quiz.errors.full_messages
  end

  def test_title_should_not_be_null
    @quiz.title = nil
    assert_not @quiz.valid?
    assert_equal ["Title can't be blank"], @quiz.errors.full_messages
  end

  def test_user_id_should_be_present
    @quiz.user_id = "   "
    assert_not @quiz.valid?
    assert_equal ["User must exist"], @quiz.errors.full_messages
  end

  def test_user_id_should_not_be_null
    @quiz.user_id = nil
    assert_not @quiz.valid?
    assert_equal ["User must exist"], @quiz.errors.full_messages
  end

  def test_should_not_have_a_invalid_user_id
    @quiz.user_id = 10256545
    assert_not @quiz.valid?
    assert_equal ["User must exist"], @quiz.errors.full_messages
  end
end
