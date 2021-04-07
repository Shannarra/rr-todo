# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 20.times dorebo
#   pass = Faker::Internet.password
#
#   User.create!({name: Faker::Name.name,
#                email: Faker::Internet.email,
#                password: pass,
#                password_confirmation: pass})
# end

2.times do |i|
  pass = Faker::Internet.password
  u = User.create(name: Faker::Name.name, email: Faker::Internet.email, password: pass, password_confirmation: pass)

  10.times do
    u.todo_items.create!(
      title: Faker::Lorem.sentence(word_count: rand(1..6)),
      body: Faker::Lorem.paragraph(sentence_count: rand(3..10)),
      complete: rand(1..10) % 3 == 0,
      user_name: u.name
    )
  end

end