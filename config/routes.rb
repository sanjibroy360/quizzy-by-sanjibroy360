Rails.application.routes.draw do
  root "home#index"
  resources :quizzes, only: [:show, :create, :index, :edit, :update, :destroy] do
    member do
      patch :publish
    end
    resources :questions, only: [:create, :index, :edit, :update, :destroy]
  end
  resources :public, param: :slug, only: [:show]
  resource :session, only: [:create, :destroy]
  get "*path", to: "home#index", via: :all
end
