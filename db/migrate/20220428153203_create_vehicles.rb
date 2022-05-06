class CreateVehicles < ActiveRecord::Migration[6.1]
  def change
    create_table :vehicles do |t|
      t.integer :year
      t.string :make
      t.string :model
      t.integer :mileage

      t.references :user, index: true, foreign_key: {on_delete: :cascade}

      t.timestamps
    end
  end
end
