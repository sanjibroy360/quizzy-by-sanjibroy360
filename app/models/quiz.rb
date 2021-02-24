class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy
  has_many :attempts, dependent: :destroy
  validates :title, presence: true
  
  def generate_slug
    self.slug = get_unique_slug
  end

  def get_unique_slug
    occurance = 1
    loop do
      if occurance > 1
        slug = "#{title.dasherize.parameterize}-#{occurance}"
      else
        slug = "#{title.dasherize.parameterize}"
      end
      break slug unless Quiz.where(slug: slug).exists?
      occurance = occurance + 1
    end
  end
end
