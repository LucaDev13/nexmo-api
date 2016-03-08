json.array!(@tts) do |tt|
  json.extract! tt, :id, :to, :from, :text, :lg, :voice, :repeat, :machine_detection, :machine_timeout, :callback, :callback_method
  json.url tt_url(tt, format: :json)
end
