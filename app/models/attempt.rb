class Attempt < ApplicationRecord
  belongs_to :quiz
  belongs_to :user

  has_many :users
  has_many :attempt_answers, dependent: :destroy
  accepts_nested_attributes_for :attempt_answers

  def correct_answers_count
    attempt_answers.count do |answer|
      @question = Question.find_by(id: answer.question_id)
      answer.option_id == @question.correct_answer
    end
  end

  def incorrect_answers_count
    attempt_answers.count do |answer|
      @question = Question.find_by(id: answer.question_id)
      answer.option_id != @question.correct_answer
    end
  end

  def save_result 
    self.correct_answers_count = correct_answers_count
    self.incorrect_answers_count = incorrect_answers_count
  end
end
