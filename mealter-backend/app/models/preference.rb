class Preference < ApplicationRecord
  belongs_to :family_member
  belongs_to :label, polymorphic: true
  # belongs_to :tag, foreign_type: "Tag"
  # validates :label, uniqueness: {scope: :family_member}
  validate :only_one_tag_per_member

  def only_one_tag_per_member


    if family_member.tags.include?(label) || family_member.categories.include?(label)
      errors.add(:label, "must be unique")
    end
  end

end
