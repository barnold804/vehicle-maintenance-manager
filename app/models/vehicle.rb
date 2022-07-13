class Vehicle < ApplicationRecord
    belongs_to :user
    has_many :maintenance_records, dependent: :destroy
    validates :year, presence: true, :numericality => { :greater_than_or_equal_to => 1888 }
    validates :make, presence: true 
    validates :model, presence: true
    validates :mileage, presence: true, :numericality => { :greater_than_or_equal_to => 0 }

    def find_highest_maintenance_record_mileage
        maintenance_records.order(mileage: :desc).first&.mileage || mileage || 0
    end
end
