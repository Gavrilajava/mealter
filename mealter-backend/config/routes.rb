Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post "/login", to: "auth#create"
  post '/users', to: "users#create"
  get 'user/avatar', to: "users#avatar"

  namespace :api do
    namespace :v1 do
      get '/family', to: "family_members#index"
      post '/family', to: "family_members#create"
      patch '/family', to: "family_members#update"
      delete '/family', to: "family_members#delete"
    end
  end

end
