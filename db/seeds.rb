require 'faker'

MaintenanceRecord.destroy_all
Vehicle.destroy_all
User.destroy_all

puts "🌱 🌱 Seeding started..."

puts "Creating User..."

users = [
    [ "Brian Arnold", "arnold804@brian.com" ],
    [ "Pam Smith ", "pam@smith.com" ],
    [ "George Weber", "george@weber.com" ],
    [ "Pete Perkins", "pete@perkins.com" ],
    [ "Ken Hofmeister", "ken@hofmeister.com" ]
]

# brian = User.create(name: "Brian Arnold", email_address: "arnold804@brian.com", password: "password" )
# vehicle = Vehicle.create(user: brian, year: 2004, make: "BMW", model: "330Ci", mileage: 167000)
# maintenance_record = MaintenanceRecord.create(vehicle: vehicle, category: "category here", description: "descripton here", comment: "comment here", date: Faker::Date.between(from: 5.years.ago, to: Date.today), mileage: vehicle.mileage + 100, address: "address here", cost: rand(50...2500))     

users.each do |u|
    user = User.create(name: u[0], email_address: u[1], password: "password" )
    
    puts "Creating Vehicles..."
        vehicle = Vehicle.create(user: user, year: rand(1990..2022), make: "Toyota", model: "Corolla", mileage: Faker::Vehicle.mileage)
        vehicle = Vehicle.create(user: user, year: rand(1990..2022), make: "Subaru", model: "Forester", mileage: Faker::Vehicle.mileage)
        
        puts "Creating Maintenance Records..."
            MaintenanceRecord.create(vehicle: vehicle, category: "Engine", description: "Oil change", comment: "5w-30 oil, new filter installed", date: Faker::Date.between(from: 5.months.ago, to: Date.today), mileage: Faker::Vehicle.mileage, address: "123 Main St.", cost: rand(50...250))
            MaintenanceRecord.create(vehicle: vehicle, category: "Wheels", description: "Installed new all-season tires", comment: "Uneven tire wear noticed, may need alignemnt", date: Faker::Date.between(from: 5.months.ago, to: Date.today), mileage: Faker::Vehicle.mileage, address: "359 Fifth Ave.", cost: rand(50...250))
end

puts "Seeding completed!"
