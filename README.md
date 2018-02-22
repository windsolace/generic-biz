## Installation

Install npm dependencies with `npm install`

## Content

# Service Types

2 Types of services available:
* Aircon
* CCTV

# Available Services

Available services for each service type can be found under `api/services`

Format is in JSON where each service is a single object with the following fields:

* id - unique service identifier (small caps, - replaces spaces)
* name - legible name that will be displayed in UI
* description - short description that will appear in the service card when listing services

# Service Detail

Service detail content (e.g. Aircon Maintenance) is found under `content/services` and further grouped by service type.

Content is HTML, should only contain HTML snippet, without head, body and footer tags.

Name of HTML file must match the `id` defined in JSON of available services.

## Tests

-
