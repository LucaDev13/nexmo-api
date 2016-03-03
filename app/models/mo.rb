class Mo < ActiveRecord::Base
  validates_uniqueness_of :messageId
end
