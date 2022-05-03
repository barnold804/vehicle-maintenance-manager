require 'faker'

User.destroy_all
Vehicle.destroy_all
MaintenanceRecord.destroy_all

puts "🌱 🌱 Seeding started..."

puts "Creating User..."

5.times do
    user = User.create(name: Faker::Name.name, email_address: "email@address.com", password: "password" )
    
    puts "Creating Vehicles..."
    5.times do
        vehicle = Vehicle.create(user: user, year: rand(1980..2022), make: Faker::Vehicle.make, model: Faker::Vehicle.model, mileage: Faker::Vehicle.mileage)
        
        puts "Creating Maintenance Records..."
        5.times do
            MaintenanceRecord.create(vehicle: vehicle, category: "category here", description: "descripton here", comment: "comment here", date: Faker::Date.between(from: 5.years.ago, to: Date.today), mileage: Faker::Vehicle.mileage, address: "address here", cost: rand(50...2500))
        end
    end
end

puts "Seeding completed!"
