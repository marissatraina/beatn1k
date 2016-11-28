class CreateUploads < ActiveRecord::Migration[5.0]
  def change
    create_table :uploads do |t|
      t.string   :title
      t.string   :genre
      t.string   :file_name
      t.integer  :user_id
      t.timestamps
    end
  end
end
