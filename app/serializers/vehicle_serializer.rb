class VehicleSerializer < ActiveModel::Serializer
  attributes :id, :year, :make, :model, :mileage

  def mileage
    object.find_highest_maintenance_record_mileage
  end
end
