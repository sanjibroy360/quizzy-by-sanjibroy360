class CreateOptions < ActiveRecord::Migration[6.1]
  def change
    create_table :options do |t|
      t.integer :quiz_id, null: false
      
      t.integer :user_id, null: false
      t.string :name, null: false
      t.boolean :isCorrect, null: false, default: false

      t.timestamps
    end
  end
end
