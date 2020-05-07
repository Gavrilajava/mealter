class Stock < ApplicationRecord
  belongs_to  :scheduled_recipe
  belongs_to :recipe_ingredient
end
