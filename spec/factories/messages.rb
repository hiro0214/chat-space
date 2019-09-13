FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}~/projects/icon_031760.svg")}
    user
    group
  end
end