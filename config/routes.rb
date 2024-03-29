Rails.application.routes.draw do
  root "home#index"

  resources :quizzes, only: [:show, :create, :index, :edit, :update, :destroy] do
    member do
      patch :publish
    end
    resources :questions, only: [:create, :index, :edit, :update, :destroy]
  end
  resources :public, param: :slug, only: [:show] do
    member do
      get :details
      get :questions
    end
  end
  resources :attempts, only: [:create, :update, :show] 
  resources :reports,  only: [:index]
  resource :report_download, only: [:create, :show]
  resource :session, only: [:create, :destroy]
  get "*path", to: "home#index", via: :all
end
