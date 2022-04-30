class VehiclesController < ApplicationController

    def index
        render json: Vehicle.all
    end

end
