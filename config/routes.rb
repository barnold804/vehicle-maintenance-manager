Rails.application.routes.draw do

  resources :users do
    resources :vehicles do
      resources :maintenance_records
    end
  end

  post '/login', to: 'sessions#create'
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"
  get "/me", to: "users#me"
  get "/sessions", to: "sessions#index"
  get "/vehicles", to: "vehicles#index"
  get "/maintenance_records", to: "maintenance_records#index"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
