Rails.application.routes.draw do
  root        'offerings#index'
  resources :offerings
end
