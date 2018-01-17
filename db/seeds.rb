# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

admin = User.create(name: 'Demo Admin', email: 'admin@cert.crm',
                    password: 'demoAdmin', admin?: true)

customer1 = User.create(name: 'Demo User 1', email: 'user1@demo.com',
                        password: 'demoUser1', admin?: false)
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
customer9 = User.create(name: 'New Customer', email: 'customer@new.org',
                        password: 'customer', admin?: false)
customer10 = User.create(name: 'Best Customer', email: 'customer@best.org',
                        password: 'theBest!', admin?: false)

certificate1 = Certificate.create(body: 'Platinum', user_id: customer10.id)
certificate2 = Certificate.create(body: 'Extra Security', user_id: customer10.id)
certificate3 = Certificate.create(body: 'Backup Server', user_id: customer10.id)
certificate4 = Certificate.create(body: 'Power Plan', user_id: customer10.id)
certificate5 = Certificate.create(body: 'Gold', user_id: customer10.id, active?: false)
certificate6 = Certificate.create(body: 'Gold', user_id: customer9.id)
certificate7 = Certificate.create(body: 'Backup Server', user_id: customer9.id, active?: false)
certificate8 = Certificate.create(body: 'Silver', user_id: customer8.id)
