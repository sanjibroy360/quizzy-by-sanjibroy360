class RemoveIndexToQuizzesSlug < ActiveRecord::Migration[6.1]
  def change
    remove_index :quizzes, name:"index_quizzes_on_slug" 
  end
end
