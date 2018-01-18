require 'rails_helper'

RSpec.describe Api::CertificatesController, type: :controller do
  describe '#create' do
    it { should route(:post, '/api/customers/1/certificates').to(action: :create, customer_id: 1, format: :json) }

    context 'with valid params' do
      it 'renders to certificate json view' do
        post :create, format: :json, params: { customer_id: 1, certificate: {body: 'Basic', user_id: 1} }
        expect(response).to be_success
        expect(response).to render_template(:certificate)
      end
    end

    context 'with invalid params' do
      it 'responds with 422 status code' do
        post :create, format: :json, params: { customer_id: 1, certificate: {body: 'Basic'} }
        expect(response).to have_http_status(422)
      end
    end
  end

  describe '#update' do
    it 'renders certificate json view upon success' do
      patch :update, format: :json, params: { id: 1, certificate: {id: 1, active?: true} }
      expect(response).to be_success
      expect(response).to render_template(:certificate)
    end
  end
end
