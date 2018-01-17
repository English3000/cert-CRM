Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'application#home'

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :customers, only: [:index, :create, :destroy, :update] do
      resources :certificates, only: [:create]
    end
    resources :certificates, only: [:update]
  end
end
