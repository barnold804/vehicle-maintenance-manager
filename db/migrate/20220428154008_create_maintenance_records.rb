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

      t.belongs_to :vehicle, null: true, foreign_key: :true

      t.timestamps
    end
  end
end
