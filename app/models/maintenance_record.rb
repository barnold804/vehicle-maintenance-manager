class MaintenanceRecord < ApplicationRecord
    belongs_to :vehicle
    has_one :user, through: :vehicle
    validates :category, presence: true
    validates :description, presence: true
    validates :comment, presence: true
    validates :date, presence: true
    validates :mileage, presence: true, :numericality => { :greater_than_or_equal_to => 0 }
    validates :address, presence: true
    validates :cost, presence: true, :numericality => { :greater_than_or_equal_to => 0 }
end
