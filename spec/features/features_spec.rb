require 'rails_helper'

feature 'Sign In', js: true do
  scenario 'upon success, renders CustomersIndex' do
    visit root_url
    expect(page).to have_content 'Admin'
    click_on 'Admin'
    click_on 'Sign In'
    expect(page).to have_content 'Demo Admin'
  end
end

# feature 'add customer' do
#   visit api_customers_url
# end
