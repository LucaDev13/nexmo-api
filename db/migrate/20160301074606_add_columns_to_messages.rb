class AddColumnsToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :msisdn, :integer
    add_column :messages, :keyword, :string
    add_column :messages, :type, :string
  end
end
