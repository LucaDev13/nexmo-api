json.array!(@dlrs) do |dlr|
  json.extract! dlr, :id, :to
  json.url dlr_url(dlr, format: :json)
end
