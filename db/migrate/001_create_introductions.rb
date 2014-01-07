class CreateIntroductions < ActiveRecord::Migration
  def change
    create_table :introductions do |t|
      t.string :name
      t.string :url
      t.date :start_at
      t.date :stop_at
    end
  end
end
