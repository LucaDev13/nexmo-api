class ChangeSctsFieldToString < ActiveRecord::Migration
  def change
    change_column :dlrs, :scts, :string
    change_column :messages, :scts, :string
  end
end
