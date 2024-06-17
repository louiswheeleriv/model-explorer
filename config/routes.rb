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
end
