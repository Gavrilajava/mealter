class CreateStocks < ActiveRecord::Migration[6.0]
  def change
    create_table :stocks do |t|
      t.integer :scheduled_recipe_id
      t.integer :recipe_ingredient_id

      t.timestamps
    end
  end
end
