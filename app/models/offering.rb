class Offering < ActiveRecord::Base
  belongs_to :roaster

  validates :name, presence: true, uniqueness: true
  validates :roaster_id, presence: true


  # Returns all current available unique origins.
  def self.all_origins
    unique = Offering.uniq.pluck(:origin).compact
    all = []
    unique.each do |c|
      if c =~ /[;,]/
        origins = c.split(/[;,]/)
        origins.each do |o|
          formatted = o.downcase.titleize.strip
          all << formatted unless all.include?(formatted)
        end
      else
        formatted = c.downcase.titleize.strip
        all << formatted unless all.include?(formatted)
      end
    end
    all
  end

  # Return array of all listed flavors_brief.
  def self.all_flavors
    Offering.all.collect { |f| f.flavors_brief }
  end

  # Return all unique flavors from coffees.
  def self.all_flavors_brief
    flavors = []
    Offering.all.each do |offering|
      flavors.concat(offering.flavors_brief.split(/[;,]/))
    end
    flavors.uniq
  end

  # Search all offerings by name or flavor.
  # TODO: currently returns offerings that match any 
  # of words entered.  change to narrow down
  def self.search_all info
    query = info[:search]
    if query == ""
      Offering.all
    else
      search_items = query.split(/[;,]/)
      sql = "flavors LIKE '%#{search_items[0]}%'" +
            " OR name LIKE '%#{search_items[0]}%'"
      if search_items.length > 1
        1.upto(search_items.length - 1) do |i|
          sql += (" OR flavors LIKE '%#{search_items[i]}%'" +
                  " OR name LIKE '#{search_items[i]}%'")
        end
      end
      Offering.where(sql)
    end
  end

  # Return all offerings of certain process.
  def self.get_all_of_process info
    if info[:process] != 'Any'
      Offering.where("process LIKE '%#{info[:process]}%'")
    else
      Offering.all
    end
  end

  # Return when coffee was released. ('Month, Year')
  def self.released offering
    offering.created_at.strftime('%B, %Y')
  end

  # Return all offerings currently available.
  def self.get_current
    Offering.where(current: 'true')
  end

  # Return all coffees of certain origin.
  def self.get_all_from_origin info
    if info[:origin] == 'Any'
      Offering.all
    else
      Offering.where("origin LIKE '%#{info[:origin]}%'")
    end
  end

  # Return all coffees from certain roaster.
  def self.get_all_from_roaster info
    if info[:roaster] == 'Any'
      Offering.all
    else
      id = Roaster.where(name: info[:roaster]).first.id
      Offering.where(roaster_id: id)
    end
  end

  # Return all coffees based on input from main form.
  def self.get_matches info
    query = Offering.checkboxes(info)
                    .search_all(info)
                    .get_all_of_process(info)
                    .get_all_from_origin(info)
                    .get_all_from_roaster(info)
                    .get_current
                    .order(created_at: :desc)
  end

  # Return stats on specific coffee.
  def self.get_stats offering
    { "Origin" => offering.origin,
      "Region" => offering.region,
      "Producer" => offering.producer,
      "Farm" => offering.farm,
      "Elevation" => offering.elevation,
      "Varietals" => offering.varietals,
      "Processing Method" => offering.process,
      "Harvest" => offering.harvest }
  end

  # build custom query depending on selected checkboxes
  def self.checkboxes info
    args = [['decaf', info[:decaf]], ['blend', info[:blend]],
            ['organic', info[:organic]], ['direct_trade', info[:direct]]]
    query = "Offering.all"
    args.each do |category|
      if category[1] == '0'
        next
      else
        query += ".where(#{category[0]}: 'true')"
      end
    end
    return eval(query)
  end
end
