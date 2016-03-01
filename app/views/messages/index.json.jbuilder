json.array!(@messages) do |message|
  json.extract! message, :id, :from, :to, :text
  json.url message_url(message, format: :json)
end
