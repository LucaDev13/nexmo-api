class Dlr < ActiveRecord::Base
  validates_uniqueness_of :messageId
end
