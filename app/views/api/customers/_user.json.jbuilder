json.id user.id
json.name user.name
json.email user.email
json.certificate_ids do
  json.array! user.certificates.order(created_at: :desc).pluck(:id)
end
