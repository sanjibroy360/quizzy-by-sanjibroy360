class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options
  accepts_nested_attributes_for :options, allow_destroy: true
  validates :description, presence: true
  validates_length_of :options, minimum: 2, maximum: 4
  validate :only_one_option_is_correct

  def only_one_option_is_correct
    number_of_correct_answer = options.count { |option| option[:isCorrect] }
    if (number_of_correct_answer < 1)
      errors.add(:questions, "should have one correct answer")
    elsif (number_of_correct_answer > 1)
      errors.add(:questions, "cannot have more than one correct answer")
    end
  end
end
