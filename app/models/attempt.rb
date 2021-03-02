class Attempt < ApplicationRecord
  belongs_to :quiz
  belongs_to :user

  has_many :users
  has_many :attempt_answers, dependent: :destroy
  accepts_nested_attributes_for :attempt_answers
  before_save :save_result

  def correct_answers_count
    attempt_answers.count do |answer|
      @question = Question.find_by(id: answer.question_id)
      answer.option_id == @question.correct_answer.id
    end
  end

  def incorrect_answers_count
    attempt_answers.count do |answer|
      @question = Question.find_by(id: answer.question_id)
      answer.option_id != @question.correct_answer.id
    end
  end

  def save_result
    self.correct_answers_count = correct_answers_count
    self.incorrect_answers_count = incorrect_answers_count
  end

  def self.generate_report
    attempts = Attempt.where(is_submitted: true)
    reports = []

    attempts.each do |attempt|
      user = attempt.user
      quiz = attempt.quiz

      report = { quiz_name: quiz.title,
                 user_name: "#{user.first_name} #{user.last_name}",
                 email: user.email,
                 correct_answers_count: attempt.correct_answers_count,
                 incorrect_answers_count: attempt.incorrect_answers_count }
      reports.push(report)
    end
    return reports
  end
end
