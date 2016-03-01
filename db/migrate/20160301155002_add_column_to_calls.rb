class AddColumnToCalls < ActiveRecord::Migration
  def change
  change_column :calls, :to, :string
  add_column :calls,:call_request, :string
  add_column :calls,  :call_direction, :string
  add_column :calls,  :call_price, :float
  add_column :calls,  :call_rate, :float
  add_column :calls,  :call_duration, :float
  add_column :calls,  :call_start, :timestamp
  add_column :calls,  :call_end, :timestamp
  end
end
