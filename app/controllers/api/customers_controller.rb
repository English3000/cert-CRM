class Api::CustomersController < ApplicationController
  def index
    @customers = User.where(admin?: false).order(updated_at: :desc)#.limit(50) #for a larger db
  end

  def destroy
    @customer = User.find(params[:id])
    @customer.destroy
    render :user
  end

  def create
    @customer = User.new(customer_params)
    @customer.save ? (render :user) :
      (render json: @customer.errors.full_messages, status: 422)
  end

  def update
    @customer = User.find(params[:id])
    @customer && @customer.update_attributes(customer_params) ? (render :user) :
      (render json: @customer.errors.full_messages, status: 422)
  end

  private
  def customer_params
    params.require(:user).permit(:id, :name, :email, :password, :admin?)
  end
end
