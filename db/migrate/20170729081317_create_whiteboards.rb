class CreateWhiteboards < ActiveRecord::Migration[5.0]
  def change
    create_table :whiteboards do |t|
      t.text :image
      t.integer :user_id
      t.integer :chatroom_id

      t.timestamps
    end
  end
end
