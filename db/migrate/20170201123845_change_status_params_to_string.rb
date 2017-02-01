class ChangeStatusParamsToString < ActiveRecord::Migration
  def change
    change_column :dlrs, :status, :string
    change_column :calls, :status, :string
    change_column :messages, :status, :string
    change_column :mos, :status, :string
    change_column :tts, :status, :string
  end
end
