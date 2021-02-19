require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @user = User.create(first_name: "Muhammad", last_name: "Ali", email: "ali@gmail.com", role: "standard", password: "ali_the_champ", password_confirmation: "ali_the_champ")

    @quiz = Quiz.create(title: "Finance", user_id: @user.id)

    @question = Question.new(quiz_id: @quiz.id,
                             description: "How many moons does Mars have?",
                             options_attributes: [
                               { name: "1", is_correct: false },
                               { name: "2", is_correct: true },
                               { name: "3", is_correct: false },
                             ])
  end

  def test_question_should_be_valid
    assert @question.valid?
  end

  def test_quiz_id_should_be_present
    @question.quiz_id = "  "
    assert_not @question.valid?
    assert_equal ["Quiz must exist"], @question.errors.full_messages
  end

  def test_quiz_id_should_not_be_invalid
    @question.quiz_id = 2121151
    assert_not @question.valid?
    assert_equal ["Quiz must exist"], @question.errors.full_messages
  end

  def test_quiz_id_should_not_be_null
    @question.quiz_id = nil
    assert_not @question.valid?
    assert_equal ["Quiz must exist"], @question.errors.full_messages
  end

  def test_descriptions_should_be_present
    @question.description = "  "
    assert_not @question.valid?
    assert_equal ["Description can't be blank"], @question.errors.full_messages
  end

  def test_description_should_not_be_null
    @question.description = nil
    assert_not @question.valid?
    assert_equal ["Description can't be blank"], @question.errors.full_messages
  end

  def test_options_should_not_be_null
    assert_raises ArgumentError do
      @question.options_attributes = nil
      assert_not @question.valid?
    end
  end

  def test_should_not_have_less_than_two_options
    @question = Question.new(quiz_id: @quiz.id,
                             description: "Any question",
                             options_attributes: [
                               { name: "a", is_correct: true },
                             ])
    assert_not @question.valid?
    assert_equal ["Options is too short (minimum is 2 characters)"], @question.errors.full_messages
  end

  def test_should_not_have_more_than_four_options
    @question = Question.new(quiz_id: @quiz.id,
                             description: "Any question",
                             options_attributes: [
                               { name: "a", is_correct: true },
                               { name: "b", is_correct: false },
                               { name: "c", is_correct: false },
                               { name: "d", is_correct: false },
                               { name: "e", is_correct: false },
                             ])
    assert_not @question.valid?
    assert_equal ["Options is too long (maximum is 4 characters)"], @question.errors.full_messages
  end

  def test_should_have_one_correct_answer
    @question = Question.new(quiz_id: @quiz.id,
                             description: "Any question",
                             options_attributes: [
                               { name: "a", is_correct: false },
                               { name: "b", is_correct: false },
                               { name: "c", is_correct: false },
                               { name: "d", is_correct: false },

                             ])
    assert_not @question.valid?
    assert_equal ["Options must have one correct answer"], @question.errors.full_messages
  end

  def test_should_not_have_more_than_one_correct_answers
    @question = Question.new(quiz_id: @quiz.id,
                             description: "Any question",
                             options_attributes: [
                               { name: "a", is_correct: true },
                               { name: "b", is_correct: false },
                               { name: "c", is_correct: true },
                               { name: "d", is_correct: false },

                             ])
    assert_not @question.valid?
    assert_equal ["Options can not have more than one correct answer"], @question.errors.full_messages
  end
end
