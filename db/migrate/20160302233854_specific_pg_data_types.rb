class SpecificPgDataTypes < ActiveRecord::Migration
  def change
      change_column :calls, :call_id, :integer,  limit: 6
      change_column :calls, :to, :integer, limit: 6
      change_column :calls, :from, :integer, limit: 6

      change_column :dlrs, :to, :integer, limit: 6
      change_column :dlrs, :messageId, :integer, limit: 6
      change_column :dlrs, :msisdn, :integer, limit: 6

      change_column :messages,  :msisdn,  :integer, limit: 6
      change_column :messages, :to, :integer, limit: 6
      change_column :messages, :messageId, :integer, limit: 6

      change_column :mos, :msisdn, :integer, limit: 6
      change_column :mos, :to, :integer, limit: 6
      change_column :mos, :messageId, :integer, limit: 6
  end
end
