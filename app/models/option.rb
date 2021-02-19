class Option < ApplicationRecord
  belongs_to :question
  validates :name, :isCorrect, presence: true
end
