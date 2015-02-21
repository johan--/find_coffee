class CreateOfferings < ActiveRecord::Migration
  def change
    create_table :offerings do |t|
      t.date      :start
      t.date      :end
      t.integer   :roaster_id
      t.float     :price
      t.string    :link_to_buy
      t.string    :name
      t.string    :origin
      t.string    :region
      t.string    :producer
      t.string    :farm
      t.string    :elevation
      t.string    :varietals
      t.string    :process
      t.string    :sourced
      t.text      :flavors
      t.string    :flavors_brief
      t.text      :description
      t.string    :harvest
      t.boolean   :organic
      t.boolean   :blend
      t.boolean   :decaf
      t.boolean   :direct_trade
      t.boolean   :fair_trade

      t.timestamps null: false
    end
  end
end
