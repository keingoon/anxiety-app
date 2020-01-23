class Api::V1::CategoriesController < ApplicationController

  # POST /api/v1/categories/new
  def new
    #render json: { status: 'SUCCESS', data: Category.all.pluck(:id, :name) }
    render json: { status: 'SUCCESS', data: Category.all.pluck(:id, :name) }
  end

  # POST /api/v1/categories
  def create
    # なんでparamsでcategoryの中にnameというパラメータが入っているかわからないんご
    @category = Category.new(category_params)
    if @category.save
      render json: { status: 'SUCCESS', data: @category }
    else
      # reactでのエラー表示どうやってやるのかわからないんご
      render json: { status: 'ERROR', data: @category.errors }
    end
  end

  private
    def category_params
      params.permit(:name)
    end
end
