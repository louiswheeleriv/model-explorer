# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_06_14_204755) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "factions", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "game_system_id", null: false
  end

  create_table "game_systems", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "models", force: :cascade do |t|
    t.string "name", null: false
    t.integer "faction_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "game_system_id", null: false
    t.index ["faction_id"], name: "index_models_on_faction_id"
  end

  create_table "user_image_associations", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "user_image_id", null: false
    t.integer "user_model_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_image_associations_on_user_id"
    t.index ["user_image_id"], name: "index_user_image_associations_on_user_image_id"
    t.index ["user_model_id"], name: "index_user_image_associations_on_user_model_id"
  end

  create_table "user_images", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_images_on_user_id"
  end

  create_table "user_models", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "model_id", null: false
    t.string "name"
    t.integer "quantity", null: false
    t.integer "status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["model_id"], name: "index_user_models_on_model_id"
    t.index ["user_id"], name: "index_user_models_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "encrypted_password", null: false
    t.string "encrypted_password_iv", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "foo@test.com", null: false
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
