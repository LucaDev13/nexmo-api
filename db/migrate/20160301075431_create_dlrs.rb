class CreateDlrs < ActiveRecord::Migration
  def change
    create_table :dlrs do |t|
      t.integer :to

      t.timestamps null: false
    end
  end
end
