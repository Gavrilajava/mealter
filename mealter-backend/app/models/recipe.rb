class Recipe < ApplicationRecord
  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients
  has_many :tag_recipes
  has_many :tags, through: :tag_recipes
  has_many :scheduled_recipes

  def self.relevant
    Recipe.all.includes(:tags).map{ |recipe|
      recipe.to_index
    }
  end

  def relevance(preferences)
    p = self.tags.pluck(:name)
    p.length - (p - preferences).length
  end

  def to_index
    {
      id: self.id,
      name: self.name,
      category: self.category,
      area: self.area,
      picture: self.picture,
      tags: self.tags.map{|tag| tag.name}
    }
  end

  def to_frontend
    {
      id: self.id,
      mealdb_id: self.mealdb_id,
      name: self.name,
      category: self.category,
      instructions: self.instructions,
      video: self.video,
      area: self.area,
      picture: self.picture,
      tags: self.tags.map{|tag| tag.name},
      ingredients: self.recipe_ingredients.map{ |r_ingred| r_ingred.to_frontend}
    }
  end

  def self.tags 
    Tag.all.pluck(:name) + Area.all.pluck(:name)
  end




  def self.changeRecipes
    Recipe.all.each { |recipe|
      cat = Category.find_or_create_by(name: recipe.category)
      area = Area.find_or_create_by(name: recipe.area)
      recipe.update(category_id: cat.id, area_id: area.id)
    }
  end


  
end
