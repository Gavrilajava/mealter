class UsersController < ApplicationController

  skip_before_action :logged_in?, only: [:create]


  def create
    user = User.new(user_params)
    
    if user.valid?
      user.save
      member = FamilyMember.create(name: user.name, description: FamilyMember.init_desc, user: user)
      member.avatar.attach(params[:avatar])
      render json: {user: user.to_f, token: encode_token({user_id: user.id})}, status: :created
    else
      render json: {error: "Failed to create a user"}, status: :not_acceptable
    end
  end

  def avatar
    user = logged_in?
    render json: {link: user.avatar_link}
  end

  private

  def user_params
    params.permit(:name, :password, :email, :avatar)
  end

end

