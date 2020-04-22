class User < ApplicationRecord
  has_one_attached :avatar
  has_secure_password

  def to_f
    {
      name: self.name
    }
  end
end
