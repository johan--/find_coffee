class Roaster < ActiveRecord::Base
  has_many :offerings
  belongs_to :city

  validates :name, presence: true

  # Returns all current roasters.
  def self.all_roasters
    Roaster.uniq.pluck(:name)
  end

end
