class Api::V1::FamilyMembersController < ApplicationController

  def index
    render json: {family: @user.family, tags: Recipe.tags}
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
      member.update(name: member_params[:name], userpic: member_params[:userpic], description: member_params[:description])
    end
    if member_params[:tags]
      label = Tag.find_by(name: member_params[:tags][:tag])
      if !label
        label = Category.find_by(name: member_params[:tags][:tag])
      end
      if member_params[:tags][:action] == "add"
        Preference.create(family_member_id: member.id, positive:  member_params[:tags][:direction] == "tagsPositive", label: label)
      else
        Preference.find_by(family_member_id: member.id, label: label).destroy
      end
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
    params.require(:member).permit(:id, :name, :userpic, :description, preferences:[positive: [], negative: []] , tags:[:action, :tag, :direction] )
  end

end