class Api::V1::ReviewsController < ApplicationController

  def index
    @reviews = Review.all
    render json: @reviews
  end

  def show
    @review = Review.find(params[:id])
    render json: @review
  end

  def create
    @review = Review.create(review_params)
    render json: @review
  end

  def update
    @review = Review.find(params[:id])

    @review.update(review_params)
    if @review.save
      render json: @review
    else
      render json: {errors: @review.errors.full_messages}, status: 422
    end
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy
    render json: {}
  end

  private
    def review_params
      params.require(:review).permit(:tutor_id, :student_id, :body, :title, :score)
    end
end
