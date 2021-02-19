require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @user = User.create(first_name: "Muhammad", last_name: "Ali", email: "ali@gmail.com", role: "standard", password: "ali_the_champ", password_confirmation: "ali_the_champ")

    @quiz = Quiz.create(title: "Finance", user_id: @user.id)

    @question = Question.create(quiz_id: @quiz.id,
                                description: "How many moons does Mars have?",
                                options_attributes: [
                                  { name: "1", is_correct: false },
                                  { name: "2", is_correct: true },
                                  { name: "3", is_correct: false },
                                ])

    @option = Option.new(question_id: @question.id, name: "4", is_correct: false)
  end

  def test_should_be_valid
    assert @option.valid?
  end

  def test_name_should_be_present
    @option.name = "   "
    assert_not @option.valid?
    assert_equal ["Name can't be blank"], @option.errors.full_messages
  end

  def test_name_should_not_be_null
    @option.name = nil
    assert_not @option.valid?
    assert_equal ["Name can't be blank"], @option.errors.full_messages
  end

  def test_is_correct_should_be_false_by_default
    @option = Option.new(question_id: @question.id, name: "4")
    assert @option.valid?
    assert_not @option.is_correct
  end

  def test_question_id_should_be_present
    @option = Option.new(name: "4", is_correct: false)
    assert_not @option.valid?
    assert_equal ["Question must exist"], @option.errors.full_messages
  end

  def test_question_id_should_not_be_null
    @option.question_id = nil
    assert_not @option.valid?
    assert_equal ["Question must exist"], @option.errors.full_messages
  end

  def test_question_id_should_not_be_invalid
    @option.question_id = 54544848
    assert_not @option.valid?
    assert_equal ["Question must exist"], @option.errors.full_messages
  end
end
