class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username
      t.string :first_name
      t.string :last_name
      t.string :password
      t.boolean :tutor
      t.integer :subject_id
      t.timestamps
    end
  end
end
