class Call < ActiveRecord::Base
  validates_uniqueness_of :call_id

  #resolve issue with type being a reserved word in Rails
  self.inheritance_column = nil


end
