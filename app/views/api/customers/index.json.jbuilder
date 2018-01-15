json.customers do
  json.by_id do
    @customers.each do |customer|
      json.set! customer.id do
        json.partial! 'api/customers/user', user: customer
      end
    end
  end

  json.all_ids do
    json.array! @customers.pluck(:id)
  end
end

json.certificates do
  @customers.each do |customer|
    customer.certificates.each do |certificate|
      json.set! certificate.id do
        json.extract! certificate, :id, :body
      end
    end
  end
end
