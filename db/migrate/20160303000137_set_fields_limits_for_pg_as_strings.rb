class SetFieldsLimitsForPgAsStrings < ActiveRecord::Migration
  def change
    change_column :calls, :call_id, :string
    change_column :calls, :to, :string
    change_column :calls, :from, :string

    change_column :dlrs, :to, :string
    change_column :dlrs, :messageId, :string
    change_column :dlrs, :msisdn, :string

    change_column :messages,  :msisdn,  :string
    change_column :messages, :to, :string
    change_column :messages, :messageId, :string

    change_column :mos, :msisdn, :string
    change_column :mos, :to, :string
    change_column :mos, :messageId, :string
  end
end
