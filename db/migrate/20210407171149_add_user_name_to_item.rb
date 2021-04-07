class AddUserNameToItem < ActiveRecord::Migration[6.1]
  def change
    add_column :todo_items, :user_name, :string
  end
end
