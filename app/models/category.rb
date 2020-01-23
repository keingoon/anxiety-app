class Category < ApplicationRecord
  before_validation :delete_whitespace

  validates :name, uniqueness: true, presence: true, null: false

  private
    def delete_whitespace
      self.name = name.strip
    end
end
