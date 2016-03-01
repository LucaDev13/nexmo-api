class CreateMos < ActiveRecord::Migration
  def change
    create_table :mos do |t|
      t.integer :status

      t.timestamps null: false
    end
  end
end
