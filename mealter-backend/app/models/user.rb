class User < ApplicationRecord
  has_many :family_members
  has_one_attached :avatar
  has_many :scheduled_recipes
  has_secure_password

  def to_f
    {
      name: self.name,
      avatar: Rails.application.routes.url_helpers.rails_blob_path(self.avatar, only_path: true)
    }
  end

  def avatar_link
    Rails.application.routes.url_helpers.rails_blob_path(self.avatar, only_path: true)
  end

  def family 
    self.family_members.map{ |member|
      {
        id: member.id,
        name: member.name,
        userpic: member.avatar.attached? ? member.avatar_link : member.userpic,
        description: member.description
      }
    }.sort{|a,b| a[:id] <=> b[:id]}
  end

end
