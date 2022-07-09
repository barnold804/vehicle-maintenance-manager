class User < ApplicationRecord
    has_secure_password
    has_many :vehicles
    has_many :maintenance_records, through: :vehicles
    validates :name, presence: true
    validates :email_address, presence: true, uniqueness: :true, format: /\w+@\w+\.{1}[a-zA-Z]{2,}/, on: :create

    PASSWORD_FORMAT = /\A
        (?=.{8,})          # Must contain 8 or more characters
        (?=.*\d)           # Must contain a digit
        (?=.*[a-z])        # Must contain a lower case character
        (?=.*[A-Z])        # Must contain an upper case character
        (?=.*[[:^alnum:]]) # Must contain a symbol
    /x
  
    validates :password, presence: true, length: { minimum:8 }, format: { with: PASSWORD_FORMAT }, confirmation: true, on: :create 
end
