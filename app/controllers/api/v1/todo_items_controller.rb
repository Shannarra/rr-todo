class Api::V1::TodoItemsController < ApplicationController

  before_action :authenticate_user!

  before_action :set_todo_item, only: [:show, :edit, :update, :destroy]

  def index
    @todo_items = current_user.todo_items.all
  end

  def show
    if authorized?
      respond_to do |fmt|
        fmt.json { render :show }
      end
    else
      handle_unauthorized
    end
  end

  def create
    @todo_item = current_user.todo_items.build(item_params)

    if authorized?
      respond_to do |fmt|
        if @todo_item.save
          fmt.json {render :show, status: :created, location: api_v1_todo_item_path(@todo_item)}
        else
          fmt.json {render json: @todo_item.errors, status: :unprocessable_entity}
        end
      end
    else
      handle_unauthorized
    end
  end

  def update
    if authorized?
      respond_to do |fmt|
        if @todo_item.update(item_params)
          fmt.json { render :show, status: :created, location: api_v1_todo_item_path(@todo_item)}
        else
          fmt.json {render json: @todo_item.errors, status: :unprocessable_entity}
        end
      end
    else
      handle_unauthorized
    end
  end

  def destroy
    if authorized?
      @todo_item.destroy

      respond_to do |fmt|
        fmt.json { head :no_content}
      end
    else
      handle_unauthorized
    end
  end


  private

  def item_params
    params.require(:todo_item).permit(:title, :body, :complete)
  end

  def set_todo_item
    @todo_item = TodoItem.find(params[:id])
  end

  def authorized?
    @todo_item.user == current_user
  end

  def handle_unauthorized
    unless authorized?
      respond_to do |fmt|
        fmt.json { render 'api/v1/todo_items/unauthorized', status: 401}
      end
    end
  end
end
