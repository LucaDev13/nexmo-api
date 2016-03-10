class ResolvePgUpdateFieldsType2 < ActiveRecord::Migration
  def change
    add_column :calls, :call_request, :timestamp
    add_column :dlrs, :price, :float
    add_column :tts, :call_start, :datetime
    add_column :tts, :call_end, :datetime
  end
end
