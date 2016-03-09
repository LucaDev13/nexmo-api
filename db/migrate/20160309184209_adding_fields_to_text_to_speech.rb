class AddingFieldsToTextToSpeech < ActiveRecord::Migration
  def change
    add_column :tts, :call_id, :string
    add_column :tts, :status, :string
    add_column :tts, :call_direction, :string
    add_column :tts, :call_price, :float
    add_column :tts, :call_rate, :float
    add_column :tts, :call_duration, :integer
    add_column :tts, :call_request, :datetime
    add_column :tts, :network_code, :string
    add_column :tts, :call_start, :datetime
    add_column :tts, :call_end, :datetime
  end
end
