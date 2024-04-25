# Welcome to the Cloverpop Api Example

## Introduction

The Cloverpop Api Example allows you to make requests to the Cloverpop server and create decisions.

The Cloverpop Api is built on:
- Ruby 3.1.2
- Rails 7.1.3
- postgresql 10.0 or higher

---

## Table of Contents
- [Secrets](#secrets)
- [Methods](#methods)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Security](#security)
- [Start Rails server](#start-rails-server)
- [License](#license)

---

## Secrets
Make sure you have the following environment variables set. For security reasons they should not be saved in your code base.
- `CLOVERPOP_DOMAIN` - the base URL of the Cloverpop API.
- `CLOVERPOP_ORG_API_TOKEN` - your organization's API token for authentication. 
- `API_DECISIONS_PATH` - external security path.

## Methods

### [init_data](https://github.com/wahanegi/cloverpop_api_example/blob/master/app/controllers/pages_controller.rb#L12)
- **Description**: Retrieves organization data from the Cloverpop API.
The returned data includes information about the organization, such as its ID, name, associated templates, and users.
These data can be used to create a new decision.
- **HTTP Method**: GET
- **Endpoint**: `{CLOVERPOP_DOMAIN}/api/v1/{API_DECISIONS_PATH}/organization?include=org_users,templates`

### [create_decision](https://github.com/wahanegi/cloverpop_api_example/blob/master/app/controllers/pages_controller.rb#L16)
- **Description**: Creates a new decision via the Cloverpop API.
- **HTTP Method**: POST
- **Endpoint**: `{CLOVERPOP_DOMAIN}/api/v1/{API_DECISIONS_PATH}/decisions`
- **Request Body**: The request body includes information necessary for creating the decision, such as its description, app name, associated template, user, and collaborators.
 ```json
    {
      "data": {
        "type": "string",
        "attributes": {
          "description": "string",
          "app_name": "string"
        },
        "relationships": {
          "template": {
            "data": {
              "type": "string",
              "id": "string"
            }
          },
          "user": {
            "data": {
              "type": "string",
              "id": "string"
            }
          },
          "collaborators": [
            {
              "data": {
                "type": "string",
                "id": "string"
              }
            }
          ]
        }
      }
    }
 ```
- **Response**: Upon successful creation, the API returns information about the newly created decision, including its ID, description, and a link to view the decision in the Cloverpop application.
 ```json
  {
    "data": {
      "id": "ede45gh23bhd",
      "type": "decision",
      "attributes": {
        "description": "Decision Title"
      },
      "links": {
        "decision_url": "https://app.cloverpop.com/decisions/ede45gh23bhd/tree_viewer"
      }
    }
  }
 ```

## Usage
To utilize this code in your own application, follow these steps:

1. Ensure the required environment variables (secrets) are correctly set in your application environment.
2. Look at the method/function [init_data](https://github.com/wahanegi/cloverpop_api_example/blob/master/app/controllers/pages_controller.rb#L12) to do an initial call to receive X and Y data from Cloverpop.
3. Look at the method/function [create_decision](https://github.com/wahanegi/cloverpop_api_example/blob/master/app/controllers/pages_controller.rb#L16) to use parameters X and Y retrieved from init_data, with other fields A, B and C to create a new decision.

## Error Handling
If an error occurs during an API request, the controller will log the error and return an appropriate JSON response with an error message.

## Security
Ensure that sensitive information such as API tokens (`CLOVERPOP_ORG_API_TOKEN`, `API_DECISIONS_PATH`) are handled securely and not exposed publicly.

---

## Start Rails server

To start a Rails server with React, you need to  use the command every time you start the server:

`rake assets:precompile`

To start the Rails server use: `./bin/dev`

otherwise you won't be able to see your updated CSS and JavaScript

NOTE: `rails s` - is not used

At this point you can point your browser to http://localhost:3001/ and start development work.
To stop the server click `CNTL-C` in all three tabs.

## License

The MIT License (MIT)

Copyright (c) 2024 Clearbox Decisions Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

