class RecipeIngredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient
  belongs_to :measurment_unit

  def to_frontend
    {
      name: self.ingredient.name,
      description: self.ingredient.description,
      picture: self.ingredient.picture,
      quantity: self.quantity,
      unit: self.measurment_unit.name
    }
  end

  def self.index
    RecipeIngredient.all.includes(:recipe, :ingredient, :measurment_unit).map{ |ing|
      {
        id: ing.id,
        recipe_id: ing.recipe.mealdb_id,
        ingredient: ing.ingredient.name,
        quantity: ing.quantity,
        unit: ing.measurment_unit.name,
        unit_id: ing.measurment_unit.id,

      }
    }

  end
end


