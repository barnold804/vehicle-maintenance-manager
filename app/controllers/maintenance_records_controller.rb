class MaintenanceRecordsController < ApplicationController

    def index
        user = User.find_by(id: params[:user_id])
        maintenance_records = MaintenanceRecord.where(vehicle_id: params[:vehicle_id]).select { |m| m.user == user }
        render json: maintenance_records
    end

    def show
        user = User.find_by(id: params[:user_id])
        maintenance_records = MaintenanceRecord.where(id: params[:id], vehicle_id: params[:vehicle_id]).find { |m| m.user == user }
        render json: maintenance_records
    end

    def create
        maintenance_record = MaintenanceRecord.create(maintenance_record_params.merge(vehicle_id: params[:vehicle_id]))
        if maintenance_record.valid?
          render json: maintenance_record, status: :created
        else
          render json: { errors: maintenance_record.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def maintenance_record_params
      params.permit(:category, :description, :comment, :date, :mileage, :address, :cost)
    end
  
    def render_unprocessable_entity(invalid)
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
  
    def render_not_found
      render json: { error: "Maintenance Record not found" }, status: 404
    end
end
