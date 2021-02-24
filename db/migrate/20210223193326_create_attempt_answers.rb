class CreateAttemptAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :attempt_answers do |t|
      t.integer :attempt_id, null: false
      t.integer :question_id, null: false
      t.integer :option_id, null: false

      t.timestamps
    end
  end
end
