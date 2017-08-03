class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text :content
      t.integer :chatroom_id
      t.integer :user_id
      t.string :integer

      t.timestamps
    end
  end
end
