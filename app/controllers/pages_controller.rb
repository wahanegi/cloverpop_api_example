# frozen_string_literal: true

class PagesController < ApplicationController
  include HTTParty

  DECISIONS_API_URL = "#{ENV['CLOVERPOP_DOMAIN']}/api/v1/decisions".freeze
  CLOVERPOP_ORG_API_TOKEN = ENV['CLOVERPOP_ORG_API_TOKEN'].freeze

  def home; end

  def init_data
    make_api_request(DECISIONS_API_URL, :get)
  end

  def create_decision
    body = { decision: params['decision'] }
    make_api_request(DECISIONS_API_URL, :post, body)
  end

  private

  def make_api_request(url, method, body = nil)
    response = HTTParty.send(method, url, body: body&.to_json, headers:)
    render json: { data: response }, status: :ok
  rescue HTTParty::Error => e
    Rails.logger.info "HTTParty::Error: #{e}"
    render json: { error: 'Failed to make API request' }, status: :internal_server_error
  end

  def headers
    {
      'Content-Type' => 'application/json',
      'Authorization' => CLOVERPOP_ORG_API_TOKEN.to_s
    }
  end
end
