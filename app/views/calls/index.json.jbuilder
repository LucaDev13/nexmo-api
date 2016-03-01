json.array!(@calls) do |call|
  json.extract! call, :id, :call_id, :to, :from, :status
  json.url call_url(call, format: :json)
end
