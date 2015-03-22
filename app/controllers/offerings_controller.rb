class OfferingsController < ApplicationController

  def index
    @origins = Offering.all_origins
    @roasters = Roaster.all_roasters
    @flavors = Offering.all_flavors.compact

    unless params[:coffee_info].nil?
      @offerings = Offering.get_matches(params[:coffee_info])
                           .paginate(page: params[:page], per_page: 8)
    end
  end

  def show
    @offering = Offering.find(params[:id])
    @stats = Offering.get_stats @offering
    @released = Offering.released @offering

    @origins = Offering.all_origins  
    @roasters = Roaster.all_roasters
    @flavors = Offering.all_flavors.compact

    unless params[:coffee_info].nil?
      @offerings = Offering.get_matches(params[:coffee_info])
                           .paginate(page: params[:page], per_page: 8)
      render 'index'
    end
  end
end
