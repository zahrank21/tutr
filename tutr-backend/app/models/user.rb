class User < ApplicationRecord
  validates :username, :first_name, :last_name, :password, presence: true
  validates :username, uniqueness: true

  belongs_to :subject
  has_many :reviews
end
