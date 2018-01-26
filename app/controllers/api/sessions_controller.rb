class Api::SessionsController < ApplicationController
  def destroy
    render status: 404 unless signed_in?

    sign_out
    render json: {}
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      sign_in(@user)

      #just for practice
      email = UserMailer.welcome_email(@user)
      email.deliver_now
      #--works--#

      render json: {name: @user.name}
      # render :current_user, user: @user #to handle Customer sign-ins too
    else
      render json: ['Invalid user credentials'], status: 422
    end
  end
end
