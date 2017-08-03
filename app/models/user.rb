class User < ApplicationRecord
  has_many :messages,dependent: :destroy
  has_many :whiteboards,dependent: :destroy
  has_many :chatrooms,through: :messages
  has_secure_password
  validates :email, presence: true, uniqueness: true, length: {minimum: 5}
  validates :name, presence: true
end
