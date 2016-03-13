RailsAdmin.config do |config|

  ### Popular gems integration

  ## == Devise ==
  # config.authenticate_with do
  #   warden.authenticate! scope: :user
  # end
  # config.current_user_method(&:current_user)

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

# solves issue with WillPaginate that was causing nomethoderror
        if defined?(WillPaginate)
      module WillPaginate
        module ActiveRecord
          module RelationMethods
            alias_method :per, :per_page
            alias_method :num_pages, :total_pages
            alias_method :total_count, :count
          end
        end

  end
end

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end
end