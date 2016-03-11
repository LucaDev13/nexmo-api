class Message < ActiveRecord::Base
  validates_uniqueness_of :messageId
  self.inheritance_column = nil

  #pagination with will_paginate
  self.per_page = 20
end
