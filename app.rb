require 'sinatra'
require 'json' # Need to include the json helper
require 'shotgun' # Not needed in production

get '/' do # Missing do
  File.read('views/index.html') # Need to include the directory
end

get '/favorites' do # Missing '/' to designate appropriate route
  response.header['Content-Type'] = 'application/json'
  File.read('data.json') rescue [] # Rescue handles if file is empty
end

post '/favorites' do # This needs to post to favorites
  file = JSON.parse(File.read('data.json')) rescue [] # Handle if file is empty
  unless params[:name] && params[:oid]
    return 'Invalid Request'
  end # remember to denote 'end' of 'unless'
  movie = { name: params[:name], oid: params[:oid] }
  file << movie
  File.write('data.json',JSON.pretty_generate(file))
  movie.to_json
end