Rails.application.routes.draw do


  root :to => 'session#root'            # Replace this with whatever you want your root_path to be.
                                        # This path is where unauthorized users will be redirected_to.
  get '/login' => 'session#new'         # This will be our sign-in page.
  post '/login' => 'session#create'     # This will be the path to which the sign-in form is posted
  delete '/login' => 'session#destroy'  # This will be the path users use to log-out.

  mount ActionCable.server => '/cable'

  resources :chatrooms
  resources :messages
  resources :whiteboards
  resources :users

  post "/chatrooms/direct" => "chatrooms#direct", :as => "direct_chatroom"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
