class User < ApplicationRecord
  has_many :family_members
  has_one_attached :avatar
  has_many :scheduled_recipes
  has_many :recipe_ingredients, through: :scheduled_recipes
  has_many :stocks, through: :scheduled_recipes
  has_secure_password


  def positive_preferences
    self.family_members.map{|member|
      member.positive_preferences
    }.flatten.uniq
  end

  def negative_preferences
    self.family_members.map{|member|
      member.negative_preferences
    }.flatten.uniq
  end

  def relevant_recipes
    prefs = negative_preferences
    Recipe.all.includes(:tags).where.not(tags: {name: self.negative_preferences}).sort{ |a, b|
      a.relevance(prefs) <=> b.relevance(prefs)
    }.map{ |recipe|
      recipe.to_index
    }
  end


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
        description: member.description,
        preferences: {
          positive: member.positive_preferences,
          negative: member.negative_preferences
        }
      }
    }.sort{|a,b| a[:id] <=> b[:id]}
  end

end
