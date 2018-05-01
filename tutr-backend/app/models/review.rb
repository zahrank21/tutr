class Review < ApplicationRecord
  validates :title, :body, :score, :student_id, :tutor_id, :subject_id, presence: true

  belongs_to :user, :foreign_key => 'student_id'
  belongs_to :user, :foreign_key => 'tutor_id'
end
