class CreateMaintenanceRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :maintenance_records do |t|
      t.string :category
      t.string :description
      t.string :comment
      t.date :date
      t.integer :mileage
      t.string :address
      t.integer :cost

      t.references :vehicle, index: true, foreign_key: {on_delete: :cascade}

      t.timestamps
    end
  end
end
