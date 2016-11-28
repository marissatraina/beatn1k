class User < ApplicationRecord
  has_secure_password
  validates_presence_of :user_name, :email
  validates_uniqueness_of :user_name, :email
  has_many :uploads
  has_many :playlists
end
