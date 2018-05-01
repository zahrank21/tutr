class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.integer :tutor_id
      t.integer :student_id
      t.string :body
      t.string :title
      t.integer :score
      t.integer :subject_id
      t.timestamps
    end
  end
end
