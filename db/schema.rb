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

ActiveRecord::Schema.define(version: 20150221211548) do

  create_table "cities", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "offerings", force: :cascade do |t|
    t.date     "start"
    t.date     "end"
    t.integer  "roaster_id"
    t.float    "price"
    t.string   "link_to_buy"
    t.string   "name"
    t.string   "origin"
    t.string   "region"
    t.string   "producer"
    t.string   "farm"
    t.string   "elevation"
    t.string   "varietals"
    t.string   "process"
    t.string   "sourced"
    t.text     "flavors"
    t.string   "flavors_brief"
    t.text     "description"
    t.string   "harvest"
    t.boolean  "organic"
    t.boolean  "blend"
    t.boolean  "decaf"
    t.boolean  "direct_trade"
    t.boolean  "fair_trade"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "roasters", force: :cascade do |t|
    t.integer  "city_id"
    t.string   "name"
    t.string   "email"
    t.string   "phone"
    t.string   "website"
    t.text     "address"
    t.string   "city"
    t.string   "state"
    t.integer  "zip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
