class Ingredient < ApplicationRecord
  has_many :recipe_ingredients
  has_many :recipes, through: :recipe_ingredients
  

  def self.get
    url = "https://www.themealdb.com/api/json/v2/9973533/list.php?i=list"
    resp = RestClient::Request.execute(method: :get, url: url, timeout: 50)
    resp = JSON.parse(resp)["meals"]
    resp.each{|ing|
      Ingredient.find_or_create_by(
        name: ing["strIngredient"],
        description: ing["strDescription"],
        picture: "https://www.themealdb.com/images/ingredients/#{ing["strIngredient"].gsub(" ","%20")}.png"
      )
    }

  end
end
