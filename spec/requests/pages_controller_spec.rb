require 'rails_helper'

RSpec.describe PagesController, type: :controller do

  describe 'GET #home' do
    it 'returns http success' do
      get :home
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #init_data' do
    it 'makes a GET request to the API' do
      get :init_data

      expect(response).to have_http_status(:success)
      expect(response.parsed_body).to include('data')
    end
  end

  describe 'POST #create_decision' do
    it 'makes a POST request to the API' do
      post :create_decision, params: { decision: 'some decision' }

      expect(response).to have_http_status(:success)
      expect(response.parsed_body).to include('data')
    end
  end
end
