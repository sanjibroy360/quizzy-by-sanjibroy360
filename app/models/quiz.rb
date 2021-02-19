class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy
  validates :title, presence: true
end
