class OfferingsController < ApplicationController

  def index
    @origins = Offering.all_origins  
    @roasters = Roaster.all_roasters
    @flavors = Offering.all_flavors.compact
    @process = [ 'Any', 'Washed','Natural','Honey' ]

    if !params[:coffee_info].nil?
      info = params[:coffee_info]
      @decaf   = info[:decaf] == "1" ? 'true' : nil
      @blend   = info[:blend] == "1" ? 'true' : nil
      @direct  = info[:direct] == "1" ? 'true' : nil
      @organic = info[:organic] == "1" ? 'true' : nil

      @search = Offering.checkboxes(@decaf, @blend, @organic, @direct) 
                        .search_all(info[:search])
                        .where(current: 'true')
      @search = @search.all_of_process(info[:process]) if info[:process] != 'Any'
      @offerings = @search.paginate(page: params[:page], per_page: 8)
    end
  end

  def show
    @offering = Offering.find(params[:id])
    @stats = [ @offering.origin,
               @offering.region,
               @offering.producer,
               @offering.farm,
               @offering.elevation,
               @offering.varietals,
               @offering.process,
               @offering.harvest ].compact
    @origins = Offering.all_origins  
    @roasters = Roaster.all_roasters
    @flavors = Offering.all_flavors.compact
    @process = [ 'Any', 'Washed','Natural','Honey' ]

    if !params[:coffee_info].nil?
      info = params[:coffee_info]
      @decaf   = info[:decaf] == "1" ? 'true' : nil
      @blend   = info[:blend] == "1" ? 'true' : nil
      @direct  = info[:direct] == "1" ? 'true' : nil
      @organic = info[:organic] == "1" ? 'true' : nil

      @search = Offering.checkboxes(@decaf, @blend, @organic, @direct) 
                        .search_all(info[:search])
                        .where(current: 'true')
      @search = @search.all_of_process(info[:process]) if info[:process] != 'Any'
      @offerings = @search.paginate(page: params[:page], per_page: 8)
      render 'index'
    end
  end
end
