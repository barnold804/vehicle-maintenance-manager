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
end
