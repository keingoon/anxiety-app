class AnxietiesController < ApplicationController
  before_action :set_anxiety, only: [:show]

  def new
    @ids_and_names_categories = Category.all.pluck(:id, :name)
  end

  def show
  end

  def index
    @anxieties_each_day_hash = Anxiety.order(created_at: "desc").group_by{|a| I18n.l(a.created_at.to_date, format: :long)}
  end

  def create
    @anxiety = Anxiety.new(anxiety_params)
    if @anxiety.save
      redirect_to @anxiety
    else
      render "new"
    end
  end

  private
    def anxiety_params
      params.require(:anxiety).permit(:content, :think, :feeling, :physical, :action, :category_id)
    end

    def set_anxiety
      @anxiety = Anxiety.find_by(id: params[:id])
    end
end
