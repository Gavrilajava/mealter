class FamilyMember < ApplicationRecord
  belongs_to :user
  has_one_attached :avatar
  has_many :preferences
  has_many :tags, through: :preferences, source: :label, source_type: "Tag"
  has_many :categories, through: :preferences, source: :label, source_type: "Category"


  
  

  def positive_preferences
    self.tags.includes(:preferences).where(preferences: {positive: true}).pluck(:name) + self.categories.includes(:preferences).where(preferences: {positive: true}).pluck(:name)
  end

  def negative_preferences
    self.tags.includes(:preferences).where(preferences: {positive: false}).pluck(:name) + self.categories.includes(:preferences).where(preferences: {positive: false}).pluck(:name)
  end


  def self.init_desc
    "This is family member representing you. You can change his name, picture and description. Or may keep it. You can not delete yourself"
  end

  def self.stand_desc
    "This is one of your family members. You can change his name and this description by clicking on it. Change image and delete icons are on the top left and right corner, they will appear when you hover the mouse button"
  end

  def avatar_link
    Rails.application.routes.url_helpers.rails_blob_path(self.avatar, only_path: true)
  end
end
