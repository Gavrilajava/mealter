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






  def self.get
    alph= "abcdefghijklmnopqrstuvwxyz".split("")
    alph.each { |letter|
      url = "https://www.themealdb.com/api/json/v2/9973533/search.php?f=#{letter}"
      resp = RestClient::Request.execute(method: :get, url: url, timeout: 50)
      resp = JSON.parse(resp)["meals"]
      if !resp
        resp = []
      end
      resp.each{|recipe|
        record = Recipe.find_or_create_by(
          mealdb_id: recipe["idMeal"].to_i,
          name: recipe["strMeal"],
          category: recipe["strCategory"],
          area: recipe["strArea"],
          instructions: recipe["strInstructions"],
          picture: recipe["strMealThumb"],
          video: recipe["strYoutube"] 
        )
        i = 1
        while recipe["strIngredient#{i}"] && recipe["strIngredient#{i}"].length > 0
          if recipe["strIngredient#{i}"].titlecase == "Free Range Eggs, Beaten" || recipe["strIngredient#{i}"].titlecase == "Free Range Egg, Beaten"
            recipe["strIngredient#{i}"] = "Eggs"
          end
          if recipe["strIngredient#{i}"].titlecase == "Blackberrys"
            recipe["strIngredient#{i}"] = "Blackberries"
          end
          if recipe["strIngredient#{i}"].titlecase == "Green Chili"
            recipe["strIngredient#{i}"] = "Green Chilli"
          end
          if recipe["strIngredient#{i}"].titlecase == "Red Chili Powder"
            recipe["strIngredient#{i}"] = "Red Chilli Powder"
          end
          if recipe["strIngredient#{i}"].titlecase == "All Spice"
            recipe["strIngredient#{i}"] = "Mixed Spice"
          end
          if recipe["strIngredient#{i}"].titlecase == "Spring Onion"
            recipe["strIngredient#{i}"] = "Spring Onions"
          end
          if recipe["strIngredient#{i}"].titlecase == "Chicken Thigh"
            recipe["strIngredient#{i}"] = "Chicken Thighs"
          end

          if recipe["strIngredient#{i}"].titlecase == "Gruyere Cheese"
            recipe["strIngredient#{i}"] = "Chicken Thighs"
          end

          if recipe["strIngredient#{i}"].titlecase == "Carrot"
            recipe["strIngredient#{i}"] = "Carrots"
          end

          if recipe["strIngredient#{i}"].titlecase == "Potato"
            recipe["strIngredient#{i}"] = "Potatoes"
          end

          if recipe["strIngredient#{i}"].titlecase == "Clove"
            recipe["strIngredient#{i}"] = "Cloves"
          end

          if recipe["strIngredient#{i}"].titlecase == "Tarragon"
            recipe["strIngredient#{i}"] = "Tarragon Leaves"
          end

          if recipe["strIngredient#{i}"].titlecase == "Tomato Purée"
            recipe["strIngredient#{i}"] = "Tomato Puree"
          end

          if recipe["strIngredient#{i}"].titlecase == "Red Chili"
            recipe["strIngredient#{i}"] = "Red Chilli"
          end

          if recipe["strIngredient#{i}"].titlecase == "Red Onion"
            recipe["strIngredient#{i}"] = "Red Onions"
          end

          if recipe["strIngredient#{i}"].titlecase == "Parmigiano Reggiano"
            recipe["strIngredient#{i}"] = "Parmesan Cheese"
          end

          if recipe["strIngredient#{i}"].titlecase == "Harissa"
            recipe["strIngredient#{i}"] = "Harissa Spice"
          end

          if recipe["strIngredient#{i}"].titlecase == "Vermicelli"
            recipe["strIngredient#{i}"] = "Vermicelli Pasta"
          end



          
          

          ingredient = Ingredient.find_by(name: recipe["strIngredient#{i}"].titlecase)

          if recipe["strIngredient#{i}"].titlecase == "Self Raising Flour"
            ingredient = Ingredient.find_by(name: "Self-raising Flour")
          end

          if recipe["strIngredient#{i}"].titlecase == "Stir Fry Vegetable" || recipe["strIngredient#{i}"].titlecase == "Stir Fry Vegetables"
            ingredient = Ingredient.find_by(name: "Stir-fry Vegetables")
          end

          if recipe["strIngredient#{i}"].titlecase == "Cooking Wine"
            ingredient = Ingredient.find_by(name: "Cooking wine")
          end
          
          if recipe["strIngredient#{i}"].titlecase == "Sun Dried Tomatoes"
            ingredient = Ingredient.find_by(name: "Sun-Dried Tomatoes")
          end
          
          if recipe["strIngredient#{i}"].titlecase == "Semi Skimmed Milk"
            ingredient = Ingredient.find_by(name: "Semi-skimmed Milk")
          end

          if recipe["strIngredient#{i}"].titlecase == "Ras El Hanout"
            ingredient = Ingredient.find_by(name: "Ras el hanout")
          end


          if recipe["strIngredient#{i}"].titlecase == "Rose Water"
            ingredient = Ingredient.find_by(name: "Rose water")
          end

          quantity = recipe["strMeasure#{i}"].split(" ")[0].to_i rescue 1
          unit = recipe["strMeasure#{i}"].split(" ")[1] rescue recipe["strMeasure#{i}"]
          if !unit
            unit = recipe["strMeasure#{i}"]
          end
          meas_unit = MeasurmentUnit.find_or_create_by(name: unit.to_s)

          if !ingredient
            byebug
          end
          RecipeIngredient.find_or_create_by(
            recipe_id: record.id,
            ingredient_id: ingredient.id,
            quantity: quantity,
            measurment_unit_id: meas_unit.id
          )
          i+= 1
        end
        if recipe["strTags"]
          tags = recipe["strTags"].split(",")
          tags.each{ |tag|
            # byebug
            t = Tag.find_or_create_by(name: tag)
            TagRecipe.find_or_create_by(recipe_id: record.id, tag_id: t.id)
          }
        end
      }
    }
  end
end
