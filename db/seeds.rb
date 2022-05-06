require 'faker'

MaintenanceRecord.destroy_all
Vehicle.destroy_all
User.destroy_all

puts "🌱 🌱 Seeding started..."

puts "Creating User..."

brian = User.create(name: "Brian Arnold", email_address: "arnold804@brian.com", password: "password" )
vehicle = Vehicle.create(user: brian, year: 2004, make: "BMW", model: "330Ci", mileage: 167000)
maintenance_record = MaintenanceRecord.create(vehicle: vehicle, category: "category here", description: "descripton here", comment: "comment here", date: Faker::Date.between(from: 5.years.ago, to: Date.today), mileage: vehicle.mileage + 100, address: "address here", cost: rand(50...2500))     

5.times do
    user = User.create(name: Faker::Name.name, email_address: Faker::Internet.email, password: "password" )
    
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
