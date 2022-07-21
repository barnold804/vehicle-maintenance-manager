FactoryBot.define do
  factory :maintenance_record do
    association :user
    association :vehicle

    category { "Engine" }
    description { "Oil filter" }
    comment { "5w-30 full synthetic used" }
    date { "2022-7-1" }
    mileage { 415000 }
    address { "318 Mileage Dr" }
  end
end
