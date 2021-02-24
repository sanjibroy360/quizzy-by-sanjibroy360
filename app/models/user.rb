class User < ApplicationRecord
  before_save { email.downcase! }
  enum role: { standard: 0, administrator: 1 }
  has_secure_password(validations: false)
  has_many :quizzes
  has_many :attempts, :dependent => :destroy

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :first_name, :last_name, presence: true, length: { maximum: 50 }
  validates :email, format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }

  validates_presence_of :password_digest, length: { minimum: 6 }, unless: :standard?
  validates_presence_of :password, unless: :standard?
  validates_length_of :password, minimum: 6, unless: :standard?
  validates_confirmation_of :password
end
