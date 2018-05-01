class Api::V1::UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user - User.find(params[:id])
    render json: @user
  end


  def create
    @user = User.create(user_params)
    render json: @user
  end

  def update
    @user = User.find(params[:id])

    @user.update(user_params)
    if @user.save
      render json: @user
    else
      render json: {errors: @user.errors.full_messages}, status: 422
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render json: {}
  end

  private
    def user_params
      params.require(:user).permit(:username, :first_name, :last_name, :password, :subject_id, :tutor)
    end
end
