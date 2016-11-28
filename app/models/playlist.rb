class Playlist < ApplicationRecord
  validates_presence_of :name
  has_many :uploads, through: :playlists_uploads
  belongs_to :user
end
