class Offering < ActiveRecord::Base
  belongs_to :roaster

  validates :name, presence: true
  validates :roaster_id, presence: true
end
