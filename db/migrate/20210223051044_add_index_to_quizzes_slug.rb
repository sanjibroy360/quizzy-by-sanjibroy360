class AddIndexToQuizzesSlug < ActiveRecord::Migration[6.1]
  def change
    add_index :quizzes, :slug, unique: true
  end
end
