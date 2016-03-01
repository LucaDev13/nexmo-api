class AddFieldsToMos < ActiveRecord::Migration
  def change
    add_column :mos, :type, :text
    add_column :mos, :to, :integer
    add_column :mos, :msisdn, :integer
    add_column :mos, :messageId, :integer
    add_column :mos, :message_timestamp, :timestamp
    

  end
end
