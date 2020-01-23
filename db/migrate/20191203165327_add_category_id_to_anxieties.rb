class AddCategoryIdToAnxieties < ActiveRecord::Migration[5.2]
  def change
    add_column :anxieties, :category_id, :integer
  end
end
