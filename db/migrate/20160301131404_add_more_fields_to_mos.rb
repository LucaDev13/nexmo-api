class AddMoreFieldsToMos < ActiveRecord::Migration
  def change
    add_column :mos, :text, :string
    add_column :mos, :keyword, :string
  end
end
