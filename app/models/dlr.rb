class Dlr < ActiveRecord::Base
  validates_uniqueness_of :messageId

  #pagination with will_paginate
  self.per_page = 20

end
