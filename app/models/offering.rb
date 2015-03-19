class Offering < ActiveRecord::Base
  belongs_to :roaster

  validates :name, presence: true, uniqueness: true
  validates :roaster_id, presence: true


  # Returns all current available unique origins.
  def self.all_origins
    unique = Offering.uniq.pluck(:origin).compact
    unique.unshift("Choose an origin")
    unique.each do |x|
      # why is 'Colombia, Rwanda' staying?
      if (x.include?(";") || x.include?(","))
        origins = x.split(/[;,]/)
        origins.each { |origin| unique << origin.strip }
        unique.delete(x)
      end
    end
    unique.map! { |x| x.downcase.titleize }
    unique.uniq
  end

  # Return array of all listed flavors_brief
  def self.all_flavors
    Offering.all.collect { |f| f.flavors_brief }
  end

  # Return all unique flavors from coffees
  def self.all_flavors_brief
    flavors = []
    Offering.all.each do |offering|
      flavors.concat(offering.flavors_brief.split(/[;,]/))
    end
    flavors.uniq
  end

  # Build up longer search query to split on ;,
  def self.search_all query
    if query == ""
      Offering.all
    else
      search_items = query.split(/[;,]/)
      sql = "flavors LIKE '%#{search_items[0]}%'"
      if search_items.length > 1
        1.upto(search_items.length - 1) do |i|
          sql += " OR flavors LIKE '%#{search_items[i]}%'"
        end
      end
      Offering.where(sql)
    end
  end

  # Return all offerings of certain process.
  def self.all_of_process process
    Offering.where("process LIKE '%#{process}%'")
  end

  # build custom query depending on selected checkboxes
  def self.checkboxes decaf, blend, organic, direct
    args = [['decaf', decaf], ['blend', blend],
            ['organic', organic], ['direct_trade', direct]]
    query = "Offering.all"
    args.each do |category|
      if category[1].nil?
        next
      else
        query += ".where(#{category[0]}: '#{category[1]}')"
      end
    end
    return eval(query)
  end
end
