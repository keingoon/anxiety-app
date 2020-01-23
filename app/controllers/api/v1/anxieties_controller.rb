class Api::V1::AnxietiesController < ApplicationController
  before_action :set_anxiety, only: [:show]

  def show
  end

  def new
    @ids_and_names_categories = Category.all.pluck(:id, :name)
  end

  def index
    @anxieties_each_day_hash = Anxiety.order(created_at: "desc").group_by{|a| I18n.l(a.created_at.to_date, format: :long)}
    render json: {anxieties_each_day: @anxieties_each_day_hash}
  end

  def create
    @anxiety = Anxiety.new(anxiety_params)
    if @anxiety.save
      render json: {anxiety: @anxiety}
    else
      #errorを返す時の処理ってreactだとどうやるんだろう　
      render json: {data: "tintin"}
    end
  end

  private
    def anxiety_params
      params.require(:anxiety).permit(:content, :thinking, :physical, :action, :category_id)
    end

    def set_anxiety
      @anxiety = Anxiety.find_by(id: params[:id])
    end

end
