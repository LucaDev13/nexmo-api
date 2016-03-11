class Tt < ActiveRecord::Base
    validates_uniqueness_of :call_id

    #pagination with will_paginate
    self.per_page = 20
end
