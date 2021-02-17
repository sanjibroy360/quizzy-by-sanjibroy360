Rails.application.routes.draw do
  root "home#index"
  resources :quizzes, only: [:create, :index, :edit, :update, :destroy]
  resource :session, only: [:create, :destroy]
  get "*path", to: "home#index", via: :all
end
