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

  def grocery
    render json: ScheduledRecipe.grocery_list(@user)
  end

  def strong_params
    params.require(:schedule).permit(:recipe_id, :date, :cooked, :ingredients_bought).merge(user: @user)
  end

end

