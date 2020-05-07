class Api::V1::ScheduleController < ApplicationController

  def create
    ScheduledRecipe.create(strong_params)
    render json: ScheduledRecipe.to_frontend(@user)
  end

  def index
    render json: ScheduledRecipe.to_frontend(@user)
  end

  def change
    recipe = ScheduledRecipe.find(params[:id])
    if recipe.user == @user
      recipe.update(
        date: params[:date].to_datetime,
        cooked: params[:cooked],
        ingredients_bought: params[:ingredients_bought],
      )
    end
    render json: ScheduledRecipe.to_frontend(@user)
  end

  def delete
    recipe = ScheduledRecipe.find(params[:id])
    if recipe.user == @user
      recipe.destroy
    end
    render json: ScheduledRecipe.to_frontend(@user)
  end

  def grocery
    render json: ScheduledRecipe.grocery_list(@user)
  end

  def add_stock
    ScheduledRecipe.recipes_for_ingred(@user, params[:ingredient]).each{|recipe|
      ingred = recipe.recipe_ingredients.find{ |ri| ri.ingredient.name == params[:ingredient]}
      stock = Stock.create(scheduled_recipe: recipe, recipe_ingredient: ingred)
    }
    render json: ScheduledRecipe.grocery_list(@user)
  end

  def delete_stock
    @user.stocks.where(recipe_ingredient_id: ScheduledRecipe.ingreds_to_delete(@user, params[:ingredient])).destroy_all
    render json: ScheduledRecipe.grocery_list(@user)
  end

  def strong_params
    params.require(:schedule).permit(:recipe_id, :date, :cooked, :ingredients_bought).merge(user: @user)
  end

end

