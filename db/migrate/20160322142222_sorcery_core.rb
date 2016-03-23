class SorceryCore < ActiveRecord::Migration
  def change
    create_table :admins do |t|
      t.string :name
      t.string :email,            :null => false
      t.string :crypted_password
      t.string :salt

      t.timestamps
    end

    add_index :admins, :email, unique: true
  end
end
