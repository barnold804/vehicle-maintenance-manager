class VehiclesController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  def index
    render json: Vehicle.where(user_id: params[:user_id])
  end

  def show
    vehicle = Vehicle.find_by(id: params[:id], user_id: params[:user_id])
    render json: vehicle
  end

  def create
    vehicle = Vehicle.create(vehicle_params.merge(user_id: params[:user_id]))
    if vehicle.valid?
      render json: vehicle, status: :created
    else
      render json: { errors: vehicle.errors.full_messages }, status: :unprocessable_entity
    end
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

  private

  def vehicle_params
    params.permit(:user_id, :year, :make, :model, :mileage)
  end

  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found
    render json: { error: "User not found" }, status: 404
  end
end
