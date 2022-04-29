class Owner < ApplicationRecord
    has_secure_password
    has_many :vehicles
    has_many :maintenance_records, through: :vehicles
end
