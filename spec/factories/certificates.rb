FactoryBot.define do
  factory :certificate do
    private_key "MyString"
    body "MyText"
    active? false
    user_id 1
  end
end
