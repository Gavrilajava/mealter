class CreateScheduledRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :scheduled_recipes do |t|
      t.integer :recipe_id
      t.integer :user_id
      t.datetime :date
      t.boolean :cooked
      t.boolean :ingredients_bought

      t.timestamps
    end
  end
end
