class Owner < ApplicationRecord
    has_secure_password
    has_many :vehicles
    has_many :maintenance_records, through: :vehicles
    validates :name, presence: true
    validates :email_address, presence: true, uniqueness: :true, on: :create
    validates :password, presence: true, length: {minimum:8},on: :create

end
