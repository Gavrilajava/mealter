class FamilyMember < ApplicationRecord
  belongs_to :user
  has_one_attached :avatar


  def self.init_desc
    "This is family member representing you. You can change his name, picture and description. Or may keep it"
  end

  def avatar_link
    Rails.application.routes.url_helpers.rails_blob_path(self.avatar, only_path: true)
  end
end
