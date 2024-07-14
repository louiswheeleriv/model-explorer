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

  get 'sign_in' => 'auth#show_sign_in'
  post 'sign_in' => 'auth#sign_in'
  get 'sign_up' => 'auth#show_sign_up'
  post 'sign_up' => 'auth#sign_up'
  get 'sign_out' => 'auth#show_sign_out'
  get 'my_user' => 'auth#my_user'

  get 'my_collection' => 'my_collection#index'
  get 'my_collection/:faction_name' => 'my_collection#show_faction'
  post 'my_collection/factions' => 'my_collection#add_faction'
  post 'my_collection/factions/:faction_id/user_models' => 'my_collection#add_user_model'
  put 'my_collection/factions/:faction_id/models/:model_id' => 'my_collection#edit_model'
  post 'my_collection/factions/:faction_id/groups' => 'my_collection#set_user_model_groups'

  get 'user_assets/upload' => 'user_assets#uploadable_url'
  post 'user_assets/upload' => 'user_assets#create'

  post 'game_systems' => 'game_systems#create'
  post 'factions' => 'factions#create'
  post 'factions/:faction_id/models' => 'factions#create_model'
end
