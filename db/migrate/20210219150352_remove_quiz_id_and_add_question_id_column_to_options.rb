class RemoveQuizIdAndAddQuestionIdColumnToOptions < ActiveRecord::Migration[6.1]
  def change
    remove_column :options, :quiz_id
    add_column :options, :question_id, :integer, null: false
  end
end
