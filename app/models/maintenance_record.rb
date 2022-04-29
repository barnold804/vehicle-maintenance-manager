class MaintenanceRecord < ApplicationRecord
    belongs_to :vehicle
    has_one :owner, through: :vehicle
end
