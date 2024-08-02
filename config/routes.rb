Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  get '/.well-known/acme-challenge/:id' => 'ssl#certificate'

  root 'home#index'
  get 'welcome' => 'home#welcome'

  get 'sign-in' => 'auth#show_sign_in'
  post 'sign-in' => 'auth#sign_in'
  get 'sign-up' => 'auth#show_sign_up'
  post 'sign-up' => 'auth#sign_up'
  get 'sign-out' => 'auth#show_sign_out'
  get 'my-user' => 'auth#my_user'

  get 'my-profile' => 'my_profile#index'
  put 'my-profile/username' => 'my_profile#update_username'
  put 'my-profile/password' => 'my_profile#update_password'
  put 'my-profile/display-name' => 'my_profile#update_display_name'
  put 'my-profile/email' => 'my_profile#update_email'
  put 'my-profile/bio' => 'my_profile#update_bio'
  put 'my-profile/profile-picture' => 'my_profile#update_profile_picture'

  get 'my-collection' => 'my_collection#index'
  get 'my-collection/:user_faction_id' => 'my_collection#show_faction'
  post 'my-collection/factions' => 'my_collection#add_faction'
  put 'my-collection/factions/:faction_id' => 'my_collection#update_user_faction'
  delete 'my-collection/factions/:faction_id' => 'my_collection#delete_user_faction'
  post 'my-collection/factions/:faction_id/user-models' => 'my_collection#add_user_model'
  put 'my-collection/factions/:faction_id/user-models/:user_model_id' => 'my_collection#edit_user_model'
  delete 'my-collection/factions/:faction_id/user-models/:user_model_id' => 'my_collection#delete_user_model'
  post 'my-collection/factions/:faction_id/groups' => 'my_collection#set_user_model_groups'
  get 'my-collection/:user_faction_id/user-models/:user_model_id' => 'my_collection#show_user_model'

  get 'user-assets/upload' => 'user_assets#uploadable_url'
  post 'user-assets/upload' => 'user_assets#create'

  post 'game-systems' => 'game_systems#create'
  post 'factions' => 'factions#create'
  post 'factions/:faction_id/models' => 'factions#create_model'
end
