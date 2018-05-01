class CreateSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :sessions do |t|
      t.string :title
      t.integer :tutor_id
      t.integer :student_id
      t.integer :subject_id
      t.boolean :completed
      t.timestamps
    end
  end
end
