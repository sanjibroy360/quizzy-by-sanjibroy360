class User < ApplicationRecord
  before_save { email.downcase! }
  enum role: { standard: 0, administrator: 1 }
  has_secure_password

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :first_name, :last_name, presence: true, length: { maximum: 50 }
  validates :password, presence: true, length: { minimum: 6 }
  validates :role, presence: true
  validates :email, format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
end
