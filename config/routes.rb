Rails.application.routes.draw do
  root "home#index"
  resources :quizzes, only: [:show, :create, :index, :edit, :update, :destroy] do
    resources :questions, only: [:create, :index, :edit, :update, :destroy]
  end
  resource :session, only: [:create, :destroy]
  get "*path", to: "home#index", via: :all
end
