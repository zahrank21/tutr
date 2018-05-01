class Api::V1::SubjectsController < ApplicationController

  def index
    @subjects = Subject.all
    render json: @subjects
  end

  def show
    @subject = Subject.find(params[:id])
    render json: @subject
  end

  def create
    @subject = Subject.create(subject_params)
    render json: @subject
  end

  def update
    @subject = Subject.find(params[:id])

    @subject.update(subject_params)
    if @subject.save
      render json: @subject
    else
      render json: {errors: @subject.errors.full_messages}, status: 422
    end
  end

  def destroy
    @subject = Subject.find(params[:id])
    @subject.destroy
    render json: {}
  end

  private
    def subject_params
      params.require(:subject).permit(:name)
    end
end
