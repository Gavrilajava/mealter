class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.integer :mealdb_id
      t.string :name
      t.string :category
      t.string :area
      t.string :instructions
      t.string :picture
      t.string :video

      t.timestamps
    end
  end
end
