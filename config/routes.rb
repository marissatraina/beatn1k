Rails.application.routes.draw do
  resources :uploads do
    resources :playlists
  end

  resources :users
  get 'users/login' => 'users#login'

  root 'uploads#index'
end
