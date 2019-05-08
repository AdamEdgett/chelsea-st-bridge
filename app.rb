require 'date'
require 'json'
require 'base64'
require 'uri'
require 'net/http'
require 'sinatra'
require 'sinatra/cross_origin'

enable :cross_origin
set :allow_origin, :any
set :allow_methods, [:get]
set :expose_headers, ['Content-Type']

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

get '/' do
  File.read(File.join('public', 'index.html'))
end

get '/api/status' do
  content_type :json
  tweet = get_latest_tweet

  status = up?(tweet['text']) ? 'up' : 'down'
  date = DateTime.parse(tweet['created_at'])
  {
    'openStatus' => status,
    'dateTime' => date,
    'tweet' => tweet['text'],
    'tweetUrl' => "https://twitter.com/LoganToChelsea/status/#{tweet['id_str']}"
  }.to_json
end

TWEET_REGEX = /Chelsea (st |st. |street )?bridge (is )?(?<status>down|up|open|closed)/i

def parse_tweet(tweet)
  TWEET_REGEX.match(tweet)
end

def up?(tweet)
  status = parse_tweet(tweet)['status'].downcase
  if status.eql? 'open' then
    return true
  elsif status.eql? 'closed' then
    return false
  elsif status.eql? 'up' then
    return true
  elsif status.eql? 'down' then
    return false
  end
end

def get_latest_tweet
  uri = URI('https://api.twitter.com/1.1/statuses/user_timeline.json?count=1&screen_name=logantochelsea')
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  headers = {
    'Authorization' => "Bearer #{bearer_token}"
  }
  res = http.get(uri.request_uri, headers)
  JSON.parse(res.body).first
end

def bearer_token
  @bearer_token ||= get_new_bearer_token
end

def get_new_bearer_token
  token_uri = URI('https://api.twitter.com/oauth2/token')
  http = Net::HTTP.new(token_uri.host, token_uri.port)
  http.use_ssl = true
  auth_token = Base64.strict_encode64("#{ENV['TWITTER_API_KEY']}:#{ENV['TWITTER_API_SECRET']}")
  headers = {
    'Content-Type' => 'application/x-www-form-urlencoded; charset=utf-8',
    'Authorization' => "Basic #{auth_token}"
  }
  data = 'grant_type=client_credentials'
  res = http.post(token_uri.request_uri, data, headers)
  JSON.parse(res.body)['access_token']
end
