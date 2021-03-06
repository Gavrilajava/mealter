class ScheduledRecipe < ApplicationRecord
  belongs_to :user
  has_many :family_members, through: :user
  belongs_to :recipe
  has_many :recipe_ingredients, through: :recipe
  has_many :ingredients, through: :recipe_ingredients
  has_many :measurment_units, through: :recipe_ingredients
  has_many :stocks
  has_many :bought_ingredients, through: :stocks, source: :recipe_ingredient


  def self.shopping_list(user)
    m = user.family_members.count
    user.scheduled_recipes.includes(:recipe_ingredients, :ingredients, :measurment_units, :stocks).map { |sched_recipe|
      sched_recipe.groceries.map{ |ingredient|
        {
          name: ingredient.ingredient.name,
          quantity: ingredient.quantity == 0? "To " : ingredient.quantity * m,
          unit: ingredient.quantity == 0? "Your taste " : ingredient.measurment_unit.name
        }
      }
    }.flatten.reduce({}){|result, ingredient|
      if result[ingredient[:name]] 
        if result[ingredient[:name]][ingredient[:unit]]
          result[ingredient[:name]][ingredient[:unit]] += ingredient[:quantity]
        else
          result[ingredient[:name]][ingredient[:unit]] = ingredient[:quantity]
        end
      else
        result[ingredient[:name]] = {ingredient[:unit] => ingredient[:quantity]}
      end
      result
    }
  end

  def self.to_frontend(user)
    user.scheduled_recipes.map { |sched_recipe|
      {
      id: sched_recipe.id,
      name: sched_recipe.recipe.name,
      picture: sched_recipe.recipe.picture,
      recipe_id: sched_recipe.recipe.id,
      date: sched_recipe.date,
      cooked: sched_recipe.cooked,
      ingredients_bought: sched_recipe.ingredients_bought
      }
    }
  end

  def groceries
    self.recipe_ingredients.includes(:stocks).where(stocks: {id: nil})
  end

  def self.recipes_for_ingred(user, ingr_name)
    user.scheduled_recipes.includes(:recipe_ingredients, :ingredients).where(ingredients: {name: ingr_name})
  end

  def self.ingreds_to_delete(user, ingr_name)
    user.recipe_ingredients.includes(:ingredient).where(ingredients: {name: ingr_name}).pluck(:id)
  end


  def self.grocery_list(user)
    {
      shopping_list: ScheduledRecipe.shopping_list(user),
      stock: ScheduledRecipe.stock(user)
    }
  end




  def self.stock(user)
    m = user.family_members.count
    user.scheduled_recipes.includes(:recipe_ingredients, :ingredients, :measurment_units, :stocks).map { |sched_recipe|
      sched_recipe.bought_ingredients.map{ |ingredient|
        {
          name: ingredient.ingredient.name,
          quantity: ingredient.quantity == 0? "To " : ingredient.quantity * m,
          unit: ingredient.quantity == 0? "Your taste " : ingredient.measurment_unit.name
        }
      }
    }.flatten.reduce({}){|result, ingredient|
      if result[ingredient[:name]] 
        if result[ingredient[:name]][ingredient[:unit]]
          result[ingredient[:name]][ingredient[:unit]] += ingredient[:quantity]
        else
          result[ingredient[:name]][ingredient[:unit]] = ingredient[:quantity]
        end
      else
        result[ingredient[:name]] = {ingredient[:unit] => ingredient[:quantity]}
      end
      result
    }
  end

end
