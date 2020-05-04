class Api::V1::FamilyMembersController < ApplicationController

  def index
    render json: {family: @user.family}
  end

  def delete 
    member = FamilyMember.find(params[:member][:id])
    if member.user == @user
      member.destroy
    end
  end

  def update
    member = FamilyMember.find(params[:member][:id])
    if member.user == @user
      member.update(member_params)
    end
  end

  def create

    member = FamilyMember.create(name: new_member_params[:name], userpic: 'family' + rand(1...8).to_s, user: @user, description: FamilyMember.stand_desc)
    
    render json: {family: @user.family}
  end

  def new_member_params
    params.require(:member).permit(:name, :userpic)
  end

  def member_params
    params.require(:member).permit(:id, :name, :userpic, :description)
  end

end