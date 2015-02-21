class City < ActiveRecord::Base
  has_many :roasters
  has_many :offerings, :through => :roasters

  validates :name, presence: true
end
