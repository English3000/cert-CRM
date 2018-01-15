class CreateCertificates < ActiveRecord::Migration[5.1]
  def change
    create_table :certificates do |t|
      t.string :private_key, null: false
      t.text :body, null: false
      t.boolean :active?, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :certificates, :user_id
    add_index :certificates, :private_key, unique: true
  end
end
