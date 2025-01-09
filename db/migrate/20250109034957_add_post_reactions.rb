class AddPostReactions < ActiveRecord::Migration[7.1]
  def change
    create_table :post_reactions do |t|
      t.integer :user_id, null: false
      t.integer :post_id, null: false
      t.string :reaction, null: false

      t.timestamps
    end

    add_index :post_reactions, [:post_id, :reaction]
  end
end
