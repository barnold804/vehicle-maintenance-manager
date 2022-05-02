class Vehicle < ApplicationRecord
    belongs_to :user
    has_many :maintenance_records
end
