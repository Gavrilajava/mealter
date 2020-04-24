class CreateFamilyMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :family_members do |t|
      t.string :name
      t.string :userpic

      t.timestamps
    end
  end
end
