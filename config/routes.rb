Rails.application.routes.draw do
  root "home#index"
  get "users/new"
  resource :session, only: [:create, :destroy]
  get "*path", to: "home#index", via: :all
end
