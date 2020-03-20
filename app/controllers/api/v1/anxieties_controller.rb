class Api::V1::AnxietiesController < ApplicationController
  before_action :set_anxiety, only: [:show]

  def show
  end

  def new
    @ids_and_names_categories = Category.all.pluck(:id, :name)
  end

  def index
    @anxieties_each_day_hash = add_day_format_to_array(Anxiety.order(created_at: "desc")).group_by{|a| I18n.l(a[:created_at].to_date, format: :long)}
    render json: {anxieties_each_day: @anxieties_each_day_hash}
  end

  def create
    @anxiety = Anxiety.new(anxiety_params)
    if @anxiety.save
      render json: {anxiety: @anxiety}
    else
      #errorを返す時の処理ってreactだとどうやるんだろう　
      render json: {data: "error"}
    end
  end

  private
    def anxiety_params
      params.require(:anxiety).permit(:content, :thinking, :physical, :action, :category_id)
    end

    def set_anxiety
      @anxiety = Anxiety.find_by(id: params[:id])
    end

    # created_atをいい感じに加えてjsonで返すための準備をするメソッド
    def add_day_format_to_array(anxieties)
      #インスタンス変数を配列に入れ直す+created_atのデータ型変えたやつを返すメソッド
      anxieties_array = []
      anxieties.each do |anxiety|
        anxieties_array.push({
          id: anxiety.id,
          content: anxiety.content,
          thinking: anxiety.thinking,
          physical: anxiety.physical,
          action: anxiety.action,
          created_at: anxiety.created_at,
          updated_at: anxiety.updated_at,
          category_id: anxiety.category_id,
          time_of_created_at: I18n.l(anxiety.created_at, format: :long)
        })
      end
      return anxieties_array
    end

end
