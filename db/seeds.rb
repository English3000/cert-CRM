# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

admin = User.create(name: 'Demo Admin', email: 'admin@cert.crm',
                    password: 'adminDemo', admin?: true)

customer1 = User.create(name: 'Demo User', email: 'user1@demo.com',
                        password: 'demoUser', admin?: false)
customer2 = User.create(name: 'Demo User 2', email: 'user2@demo.com',
                        password: 'demoUser2', admin?: false)
customer3 = User.create(name: 'Demo User 3', email: 'user3@demo.com',
                        password: 'demoUser3', admin?: false)
customer4 = User.create(name: 'Demo User 4', email: 'user4@demo.com',
                        password: 'demoUser4', admin?: false)
customer5 = User.create(name: 'Demo User 5', email: 'user5@demo.com',
                        password: 'demoUser5', admin?: false)
customer6 = User.create(name: 'Demo User 6', email: 'user6@demo.com',
                        password: 'demoUser6', admin?: false)
customer7 = User.create(name: 'Demo User 7', email: 'user7@demo.com',
                        password: 'demoUser7', admin?: false)
customer8 = User.create(name: 'Demo User 8', email: 'user8@demo.com',
                        password: 'demoUser8', admin?: false)
customer9 = User.create(name: 'Demo User 9', email: 'user9@demo.com',
                        password: 'demoUser9', admin?: false)
customer10 = User.create(name: 'Demo User 10', email: 'user10@demo.com',
                        password: 'demoUser10', admin?: false)
