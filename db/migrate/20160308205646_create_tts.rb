class CreateTts < ActiveRecord::Migration
  def change
    create_table :tts do |t|
      t.string :to
      t.string :from
      t.string :text
      t.string :lg
      t.string :voice
      t.integer :repeat
      t.string :machine_detection
      t.string :machine_timeout
      t.string :callback
      t.string :callback_method

      t.timestamps null: false
    end
  end
end
