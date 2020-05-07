class CreatePreferences < ActiveRecord::Migration[6.0]
  def change
    create_table :preferences do |t|
      t.integer :family_member_id
      t.boolean :positive
      t.references :label, polymorphic: true

      t.timestamps
    end
  end
end
