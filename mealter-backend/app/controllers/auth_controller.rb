class AuthController < ApplicationController

  skip_before_action :logged_in?, only: [:create]


  def create
      user = User.find_by(name: params[:name])
      if user && user.authenticate(params[:password]) #.authenticate method to check password using bcrypt gem
          render json: {user: user.to_f, token: encode_token({user_id: user.id})}
      else
          render json: {error: "invalid username or password"}
      end
  end
end
