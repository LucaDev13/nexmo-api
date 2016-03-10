class UpdateFieldsTypes < ActiveRecord::Migration
  def change
    change_column :calls, :call_request, :timestamp
    change_column :dlrs, :price, :float
    change_column :tts, :call_start, :datetime
    change_column :tts, :call_end, :datetime
  end
end
