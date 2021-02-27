class User < ApplicationRecord
  before_save { email.downcase! }
  before_validation :assign_default_password_to_standard_user
  enum role: { standard: 0, administrator: 1 }
  has_many :quizzes
  has_many :attempts, :dependent => :destroy
  has_secure_password
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :first_name, :last_name, presence: true, length: { maximum: 50 }
  validates :password, presence: true, length: { minimum: 6 }
  validates :role, presence: true
  validates :email, format: { with: VALID_EMAIL_REGEX },
  uniqueness: { case_sensitive: false }

  def assign_default_password_to_standard_user
    unless administrator?
      self.password = "password1234"
      self.password_confirmation = "password1234"
    end
  end
end
