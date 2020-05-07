class AddAreaIdToRecipes < ActiveRecord::Migration[6.0]
  def change
    add_column :recipes, :area_id, :integer
    add_column :recipes, :category_id, :integer
  end
end
