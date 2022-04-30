class OwnerSerializer < ActiveModel::Serializer
  attributes :id, :name, :email_address
  has_many :vehicles
end
