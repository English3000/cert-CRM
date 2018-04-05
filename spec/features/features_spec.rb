# require 'rails_helper'
#
# feature 'FUNCTIONALITY', js: true do
#   before(:each) do
#     visit '/'
#     click_on 'Admin'
#     click_on 'Sign In'
#   end
#
#   feature 'Sign In' do
#     scenario 'upon success, renders CustomersIndex' do
#       expect(page).to have_content 'Demo Admin'
#     end
#   end
#
#   scenario 'Search for Customer' do
#     expect(page).to have_content('Demo User')
#     fill_in 'search-bar', with: 'N'
#     expect(page).not_to have_content('Demo User')
#   end
#
#   feature 'Customers' do
#     scenario '#create' do
#       click_button('add-customer')
#       fill_in 'name', with: 'Test Customer'
#       fill_in 'email', with: 'Test@Customer.com'
#       fill_in 'password', with: 'TestCustomer'
#       click_button 'Submit'
#       expect(page).to have_content 'Test Customer'
#     end
#
#     feature 'Certificates' do
#       before(:each) do
#         fill_in 'search-bar', with: 'Demo User 7'
#         expect(page).not_to have_content 'Basic'
#         click_button('cert-user7@demo.com')
#         fill_in 'cert-body', with: 'Basic'
#         click_button 'Submit'
#       end
#
#       scenario '#create' do
#         expect(page).to have_content 'Basic'
#       end
#
#     #   scenario '#update' do
#     #     #https://coderwall.com/p/aklybw/wait-for-ajax-with-capybara-2-0
#     #     Timeout.timeout(Capybara.default_wait_time) do
#     #       active = page.evaluate_script('jQuery.active')
#     #       until active == 0
#     #         active = page.evaluate_script('jQuery.active')
#     #       end
#     #     end
#     #
#     #     click_button('deactivate-cert-Basic')
#     #     click_button('deactivate-confirm')
#           #for some reason, Capybara doesn't send backend the certificate object, causing failed update
#     #     expect(page).not_to have_content 'Basic'
#     #   end
#     end
#
#     scenario '#delete' do
#       expect(page).to have_content 'New Customer'
#       fill_in 'search-bar', with: 'New Customer'
#       click_button('delete-customer@new.org')
#       click_button('confirm-delete-customer@new.org')
#       expect(page).not_to have_content 'New Customer'
#     end
#   end
# end
