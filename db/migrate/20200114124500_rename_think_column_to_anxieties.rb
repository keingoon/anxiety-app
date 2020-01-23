class RenameThinkColumnToAnxieties < ActiveRecord::Migration[5.2]
  def change
    rename_column :anxieties, :think, :thinking
  end
end
