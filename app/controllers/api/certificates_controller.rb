class Api::CertificatesController < ApplicationController
  # def index
  #   private_key = params[:certificate][:private_key]
  #   if private_key
  #     cert = Certificate.find_by(private_key: private_key)
  #     #email certificate to customer using ActionMailer
  #     cert ? (render json: true) : (render json: false)
  #   else
  #     #if there were another GET 'api/customers' request w/o a payload
  #   end
  # end

  def create
    @cert = Certificate.new(cert_params)
    if @cert.save
      @cert.user.updated_at = @cert.updated_at
      @cert.user.save
      #because :updated_at isn't passed to frontend, won't update dynamically--
        #which is good from a UI standpoint--but whenever you sign in again,
        #customer list will be in updated order (b/c a new fetch request is made upon sign-in)
      render :certificate
    else
      render json: @cert.errors.full_messages, status: 422
    end
  end

  def update
    @cert = Certificate.find(params[:id])
    if @cert && @cert.update_attributes(cert_params)
      #also update customer's :updated_at for dynamic CustomersIndex
      @cert.user.updated_at = @cert.updated_at
      @cert.user.save
      render :certificate
    else
      render json: @cert.errors.full_messages, status: 422
    end
  end

  private
  def cert_params
    params.require(:certificate).permit(:id, :body, :active?, :user_id, :private_key)
  end
end
