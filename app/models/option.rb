class Option < ApplicationRecord
  belongs_to :question
  has_many :attempt_answers, dependent: :destroy
  validates :name, presence: true
end
