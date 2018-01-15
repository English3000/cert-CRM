json.id user.id
json.name user.name
json.email user.email
json.active_certs do
  json.array! user.certificates.where(active?: true).order(created_at: :desc).pluck(:id)
end
json.inactive_certs do
  json.array! user.certificates.where(active?: false).order(created_at: :desc).pluck(:id)
end
