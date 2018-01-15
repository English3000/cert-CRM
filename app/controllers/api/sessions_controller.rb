class Api::SessionsController < ApplicationController
  def destroy
    render status: 404 unless signed_in?

    sign_out
    render {}
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      sign_in(@user)
      render :user # would return more for Customer sign-in;
      # conditional logic in json view
    else
      render json: ['Invalid user credentials'], status: 422
    end
  end
end
