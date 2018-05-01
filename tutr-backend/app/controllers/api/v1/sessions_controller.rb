class Api::V1::SessionsController < ApplicationController
  def index
    @sessions = Session.all
    render json: @sessions
  end

  def show
    @session - Session.find(params[:id])
    render json: @session
  end


  def create
    @session = Session.create(session_params)
    render json: @session
  end

  def update
    @session = Session.find(params[:id])

    @session.update(session_params)
    if @session.save
      render json: @session
    else
      render json: {errors: @session.errors.full_messages}, status: 422
    end
  end

  def destroy
    @session = Session.find(params[:id])
    @session.destroy
    render json: {}
  end

  private
    def session_params
      params.require(:session).permit(:tutor_id, :student_id, :title, :subject_id)
    end
end
