class AddFieldsToDlr < ActiveRecord::Migration
  def change
    add_column :dlrs, :network_code, :integer
    add_column :dlrs, :messageId, :integer
    add_column :dlrs, :msisdn, :integer
    add_column :dlrs, :status, :integer
    add_column :dlrs, :err_code, :integer
    add_column :dlrs, :price, :integer
    add_column :dlrs, :scts, :integer
    add_column :dlrs, :message_timestamp, :timestamp
    add_column :dlrs, :client_ref, :string
  end
end
