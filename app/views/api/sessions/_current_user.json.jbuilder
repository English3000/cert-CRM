if user.admin?
  json.id user.id
  json.name user.name
  json.email user.email
  json.certificate_ids do
    json.array! user.certificates.order(created_at: :desc).pluck(:id)
  end
else
  json.extract! user, :name, :admin? #for determining which page to redirect to upon sign-in
end
