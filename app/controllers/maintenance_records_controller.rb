class MaintenanceRecordsController < ApplicationController

    def index
        maintenance_records = MaintenanceRecord.all
        render json: maintenance_records
    end
    
end
