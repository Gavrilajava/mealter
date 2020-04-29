class Api::V1::RecipesController < ApplicationController

  def index
    render json: Recipe.relevant
  end

  def show
    recipe = Recipe.find(params[:id])
    render json: recipe.to_frontend
  end
end