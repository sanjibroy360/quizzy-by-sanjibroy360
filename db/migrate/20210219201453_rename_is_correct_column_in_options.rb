class RenameIsCorrectColumnInOptions < ActiveRecord::Migration[6.1]
  def change
    rename_column :options, :isCorrect, :is_correct
  end
end
