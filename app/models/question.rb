class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy
  has_many :attempt_answers, dependent: :destroy

  accepts_nested_attributes_for :options, allow_destroy: true
  validates :description, presence: true
  validates_length_of :options, minimum: 2, maximum: 4
  validate :only_one_option_is_correct

  def only_one_option_is_correct
    number_of_correct_answer = options.count do |option|
      option[:is_correct]
    end

    if (number_of_correct_answer < 1)
      errors.add(:options, "must have one correct answer")
    elsif (number_of_correct_answer > 1)
      errors.add(:options, "can not have more than one correct answer")
    end
  end

  def correct_answer
    answer = options.find_by(is_correct: true)
  end
end
