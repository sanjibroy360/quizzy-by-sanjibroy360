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
    resources :attempts, only: [:create, :update] do
      member do
        get :submitted_answers
      end
    end
  end

  resource :session, only: [:create, :destroy]
  get "*path", to: "home#index", via: :all
end
