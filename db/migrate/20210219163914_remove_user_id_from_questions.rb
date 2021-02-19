class RemoveUserIdFromQuestions < ActiveRecord::Migration[6.1]
  def change
    remove_column :questions, :user_id
  end
end
