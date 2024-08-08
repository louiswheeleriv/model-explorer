Rails.application.routes.draw do
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

  get 'my-collection' => 'collection#index'
  get 'user-factions/:user_faction_id' => 'collection#show_faction'
  post 'user-factions' => 'collection#add_faction'
  put 'user-factions/:user_faction_id' => 'collection#update_user_faction'
  delete 'user-factions/:user_faction_id' => 'collection#delete_user_faction'
  post 'user-factions/:user_faction_id/user-models' => 'collection#add_user_model'
  put 'user-models/:user_model_id' => 'collection#edit_user_model'
  delete 'user-models/:user_model_id' => 'collection#delete_user_model'
  post 'user-factions/:user_faction_id/group' => 'collection#create_group'
  post 'user-factions/:user_faction_id/groups' => 'collection#set_user_model_groups'
  post 'user-factions/:user_faction_id/images' => 'collection#set_user_faction_image_associations'
  get 'user-models/:user_model_id' => 'collection#show_user_model'
  post 'user-models/:user_model_id/images' => 'collection#set_user_model_image_associations'

  get 'user-assets/upload' => 'user_assets#uploadable_url'
  post 'user-assets/upload' => 'user_assets#create'

  post 'game-systems' => 'game_systems#create'
  post 'factions' => 'factions#create'
  put 'factions/:faction_id' => 'factions#update_faction'
  post 'factions/:faction_id/models' => 'factions#create_model'
  put 'models/:model_id' => 'factions#update_model'

  get 'social' => 'social#index'
  get 'users/:user_id' => 'social#show_user'

  get 'explore' => 'explore#index'
  get 'game-systems/:game_system_id' => 'explore#show_game_system'
  get 'factions/:faction_id' => 'explore#show_faction'
  get 'models/:model_id' => 'explore#show_model'
end
