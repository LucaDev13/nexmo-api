class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session


  before_action :transform

  def transform
      #convert parameters with hyphen to parameters with underscore.
      params.deep_transform_keys! { |key| key.tr('-', '_') }
  end
end
