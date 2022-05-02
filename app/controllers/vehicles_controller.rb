class VehiclesController < ApplicationController

    def index
        render json: Vehicle.where(user_id: params[:user_id])
    end

    def show
        vehicle = Vehicle.find_by(id: params[:id], user_id: params[:user_id])
        render json: vehicle
    end

end
