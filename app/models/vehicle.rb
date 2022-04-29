class Vehicle < ApplicationRecord
    belongs_to :owner
    has_many :maintenance_records
end
