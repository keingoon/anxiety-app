Rails.application.routes.draw do
  root to: 'anxieties#new'
  resources :anxieties
  resources :categories
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, format: 'json' do
    namespace :v1  do
      resources :categories
      resources :anxieties      
    end
  end
end
