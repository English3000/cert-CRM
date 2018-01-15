class Api::CertificatesController < ApplicationController
  def create
    @cert = Certificate.new(cert_params)
    @cert.save ? (render :certificate) :
      (render json: @cert.errors.full_messages, status: 422)
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
    params.require(:certificate).permit(:id, :body, :active?, :user_id)
  end
end
