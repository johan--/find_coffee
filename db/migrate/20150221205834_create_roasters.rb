class CreateRoasters < ActiveRecord::Migration
  def change
    create_table :roasters do |t|

      t.integer  :city_id
      t.string   :name
      t.string   :email
      t.string   :phone
      t.string   :website
      t.text     :address
      t.string   :city
      t.string   :state
      t.integer  :zip

      t.timestamps null: false
    end
  end
end
