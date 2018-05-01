# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# subjects = Subject.create([{name: 'Biology'}, {name: 'Physics'}, {name: 'Chemistry'}, {name: 'Java'}, {name: 'Javascript'}, {name: 'Calculus'}, {name: 'Ruby'}, {name: 'React'}, {name: 'Geometry'}])
# users = User.create([{username: 'zahranStudent', first_name: 'Zahran', last_name: 'Kabir', password: '12345', tutor: false, subject_id: 2},{username: 'zahranTutor', first_name: 'Zahran', last_name: 'Kabir', password: '12345', tutor: true, subject_id: 2}])
reviews = Review.create([{tutor_id: 3, student_id: 1, body: 'Very good at what he does. Smart af.', title: 'Veeeery Nice', score: 4, subject_id: 2},{tutor_id: 4, student_id: 6, body: 'Talks about eggs all the time. Cant have cheese, very disappointed.', title: 'Meh', score: 3, subject_id: 5}])
