# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160302231552) do

  create_table "calls", force: :cascade do |t|
    t.integer  "call_id",        limit: 8
    t.integer  "to",             limit: 8
    t.integer  "from",           limit: 8
    t.integer  "status"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "call_request"
    t.string   "call_direction"
    t.float    "call_price"
    t.float    "call_rate"
    t.float    "call_duration"
    t.datetime "call_start"
    t.datetime "call_end"
  end

  create_table "dlrs", force: :cascade do |t|
    t.integer  "to",                limit: 8
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "network_code"
    t.integer  "messageId",         limit: 8
    t.integer  "msisdn",            limit: 8
    t.integer  "status"
    t.integer  "err_code"
    t.integer  "price"
    t.integer  "scts"
    t.datetime "message_timestamp"
    t.string   "client_ref"
  end

  create_table "messages", force: :cascade do |t|
    t.integer  "to",                limit: 8
    t.string   "text"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "msisdn",            limit: 8
    t.string   "keyword"
    t.string   "type"
    t.integer  "messageId",         limit: 8
    t.integer  "network_code"
    t.float    "price"
    t.string   "status"
    t.integer  "scts"
    t.integer  "err_code"
    t.datetime "message_timestamp"
  end

  create_table "mos", force: :cascade do |t|
    t.integer  "status"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.text     "type"
    t.integer  "to"
    t.integer  "msisdn",            limit: 8
    t.integer  "messageId"
    t.datetime "message_timestamp"
    t.string   "text"
    t.string   "keyword"
  end

  create_table "pages", force: :cascade do |t|
    t.string   "index"
    t.string   "about"
    t.string   "contact"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
