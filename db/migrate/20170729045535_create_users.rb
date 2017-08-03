class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name
      t.text :email
      t.text :avatar
      t.text :profile
      t.text :password_digest

      t.timestamps
    end
  end
end
