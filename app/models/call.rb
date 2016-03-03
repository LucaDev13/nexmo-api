class Call < ActiveRecord::Base
  validates_uniqueness_of :call_id 
end
