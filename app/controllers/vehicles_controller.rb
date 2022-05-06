class VehiclesController < ApplicationController
  def index
    render json: Vehicle.where(user_id: params[:user_id])
  end

  def show
    vehicle = Vehicle.find_by(id: params[:id], user_id: params[:user_id])
    render json: vehicle
  end

  def destroy
    vehicle = Vehicle.find_by(id: params[:id], user_id: params[:user_id])
    if vehicle
      vehicle.delete
      render json: nil, success: :true, status: :no_content
    else
      render json: { error: "Vehicle does not exist" }, status: :not_found
    end
  end
end
