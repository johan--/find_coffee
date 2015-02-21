class Roaster < ActiveRecord::Base
  has_many :offerings
  belongs_to :city

  validates :name, presence: true
end
