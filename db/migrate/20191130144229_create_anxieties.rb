class CreateAnxieties < ActiveRecord::Migration[5.2]
  def change
    create_table :anxieties do |t|
      t.text :content
      t.text :think
      t.text :feeling
      t.text :physical
      t.text :action

      t.timestamps
    end
  end
end
