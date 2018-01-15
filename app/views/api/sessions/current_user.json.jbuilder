if user.admin?
  json.partial! 'api/customers/user', user: user
else
  json.extract! user, :name, :admin? #for determining which page to redirect to upon sign-in
end
