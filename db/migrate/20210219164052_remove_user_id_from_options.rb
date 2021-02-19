class RemoveUserIdFromOptions < ActiveRecord::Migration[6.1]
  def change
    remove_column :options, :user_id
  end
end
