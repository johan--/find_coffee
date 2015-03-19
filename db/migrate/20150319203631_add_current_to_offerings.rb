class AddCurrentToOfferings < ActiveRecord::Migration
  def change
    add_column :offerings, :current, :boolean
  end
end
