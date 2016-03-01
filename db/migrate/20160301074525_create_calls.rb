class CreateCalls < ActiveRecord::Migration
  def change
    create_table :calls do |t|
      t.integer :call_id
      t.integer :to
      t.integer :from
      t.integer :status

      t.timestamps null: false
    end
  end
end
