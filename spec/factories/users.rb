FactoryBot.define do
  factory :user do
    name "MyString"
    email "MyString"
    password_digest "MyString"
    session_token "MyString"
    admin? false
  end
end
