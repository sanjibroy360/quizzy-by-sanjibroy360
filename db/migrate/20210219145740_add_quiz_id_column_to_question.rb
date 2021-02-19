class AddQuizIdColumnToQuestion < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :quiz_id, :integer, null: false
  end
end
