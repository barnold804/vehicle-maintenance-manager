class VehicleSerializer < ActiveModel::Serializer
  attributes :id, :year, :make, :model, :mileage, :owner_id
  has_many :maintenance_records
end
