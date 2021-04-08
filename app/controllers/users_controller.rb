class UsersController < ApplicationController

  def show
    respond_to do |fmt|
      fmt.html { render :show}
    end
  end
end
