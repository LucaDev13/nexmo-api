class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :from
      t.integer :to
      t.string :text

      t.timestamps null: false
    end
  end
end
