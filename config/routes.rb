Rails.application.routes.draw do
  get 'home/index'
  get "users/new"
  resource :session, only: [:create, :destroy]
  root "home#index"
  get "*path", to: "home#index", via: :all
end
