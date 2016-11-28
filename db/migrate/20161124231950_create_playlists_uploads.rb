class CreatePlaylistsUploads < ActiveRecord::Migration[5.0]
  def change
    create_table :playlists_uploads do |t|
      t.integer  :playlist_id
      t.integer  :upload_id
    end
  end
end
