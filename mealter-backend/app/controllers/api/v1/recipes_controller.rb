class Api::V1::RecipesController < ApplicationController

  skip_before_action :logged_in?, only: [:index, :show]


  def index
    if request.headers["user"] != "undefined"
      user = User.find_by(name: request.headers["user"])
      render json: user.relevant_recipes
    else
      render json: Recipe.relevant
    end
  end

  def show
    recipe = Recipe.find(params[:id])
    render json: recipe.to_frontend
  end

  def measurments
    render json: RecipeIngredient.to_index
  end

  def change_ingredient
    unit = MeasurmentUnit.find_by(name: params[:unit])
    ingred = RecipeIngredient.find(params[:id])
    if unit && ingred
      ingred.update(measurment_unit: unit, quantity: params[:quantity])
    end
  end
end