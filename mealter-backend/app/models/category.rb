class Category < ApplicationRecord
  has_many :preferences, as: :label
  has_many :family_members, through: :preferences
end
