class AddColumnToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :messageId, :integer
    add_column :messages, :network_code, :integer
    add_column :messages, :price, :float
    add_column :messages, :status, :string
    add_column :messages, :scts, :integer
    add_column :messages, :err_code, :integer
    add_column :messages, :message_timestamp, :timestamp
    remove_column :messages, :from, :integer
  end
end
