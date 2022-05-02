class MaintenanceRecord < ApplicationRecord
    belongs_to :vehicle
    has_one :user, through: :vehicle
end
