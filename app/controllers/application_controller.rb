class ApplicationController < ActionController::Base
    # Prevent CSRF attacks by raising an exception.
    # For APIs, you may want to use :null_session instead.
    protect_from_forgery with: :null_session

    before_action :transform

    #Require login
    before_action :require_login



    def transform
        #convert parameters with hyphen to parameters with underscore.
        params.deep_transform_keys! { |key| key.tr('-', '_') }
    end

    private
    # Overwrite the method sorcery calls when it
    # detects a non-authenticated request.
    def not_authenticated
      # Make sure that we reference the route from the main app.
      redirect_to main_app.log_in_path
    end

end
