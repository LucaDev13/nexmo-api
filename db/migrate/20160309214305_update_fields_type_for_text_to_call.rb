class UpdateFieldsTypeForTextToCall < ActiveRecord::Migration
  def change
    change_column :tts, :call_start, :string
    change_column :tts, :call_end, :string
  end
end
