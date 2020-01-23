class RemoveFeelingFromAnxieties < ActiveRecord::Migration[5.2]
  def change
    remove_column :anxieties, :feeling, :text
  end
end
