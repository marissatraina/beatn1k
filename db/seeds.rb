# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(user_name: "swedish_chef",
              email: "a",
              password: "a")

Upload.create(title: "Laser - Laser (1981)",
              file_name: "Laser - Laser (1981).mp3",
              user_id: 1)
