class Upload < ApplicationRecord
  validates_presence_of :title, :file_name
  has_many :playlists, through: :playlists_uploads, dependent: :destroy
  belongs_to :user
end
