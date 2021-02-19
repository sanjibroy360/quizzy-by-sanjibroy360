class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions
  validates :title, presence: true
end
