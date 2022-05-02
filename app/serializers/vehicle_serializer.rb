class VehicleSerializer < ActiveModel::Serializer
  attributes :id, :year, :make, :model, :mileage
end
