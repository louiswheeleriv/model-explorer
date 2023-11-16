class AddUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :encrypted_password, null: false
      t.string :encrypted_password_iv, null: false

      t.timestamps
    end

    add_index :users, :username, unique: true
  end
end
