class Message < ActiveRecord::Base
  validates_uniqueness_of :messageId
  self.inheritance_column = nil
end
