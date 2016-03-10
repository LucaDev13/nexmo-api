class ResolvePgUpdateFieldsType < ActiveRecord::Migration
  def change

    remove_column :calls, :call_request, :timestamp
    remove_column :dlrs, :price, :float
    remove_column :tts, :call_start, :datetime
    remove_column :tts, :call_end, :datetime

  end
end
