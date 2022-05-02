class MaintenanceRecordSerializer < ActiveModel::Serializer
  attributes :id, :category, :description, :comment, :date, :mileage, :address, :cost, :vehicle_id, :created_at, :updated_at
end
