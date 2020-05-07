class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.string :icon
      t.string :color

      t.timestamps
    end
  end
end
