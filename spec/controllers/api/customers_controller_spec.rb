# require 'rails_helper'
#
# RSpec.describe Api::CustomersController, type: :controller do
#   describe '#create' do
#     context 'with invalid params' do
#       it 'responds with 422 status code' do
#         post :create, format: :json, params: {
#           customer: {name: '', email: '', password: '', admin?: false}
#         }
#         expect(response).to have_http_status(422)
#       end
#     end
#
#     context 'with valid params' do
#       it 'renders show json view' do
#         post :create, format: :json, params: {
#           customer: {name: 'Customer', email: 'cust@mer.com',
#                      password: 'customer', admin?: false}
#         }
#         expect(response).to be_success
#         expect(response).to render_template(:show)
#       end
#     end
#   end
#
#   describe '#destroy' do
#     it 'renders show json view upon success' do
#       delete :destroy, format: :json, params: {id: 1}
#       expect(response).to be_success
#       expect(response).to render_template(:show)
#     end
#   end
# end
