class User < ApplicationRecord
  has_one_attached :avatar
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
end
