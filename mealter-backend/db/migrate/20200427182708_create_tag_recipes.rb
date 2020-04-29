class CreateTagRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :tag_recipes do |t|
      t.integer :recipe_id
      t.integer :tag_id

      t.timestamps
    end
  end
end
