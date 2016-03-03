class Call < ActiveRecord::Base
  validates_uniqueness_of :call_id
  self.inheritance_column = nil
end
