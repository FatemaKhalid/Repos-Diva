# RepoDiva

A small webapp that will list the most starred Github repos that were created in the last 30 days with the framework Angular.

## To run the project

* Clone this repo.
* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Libraries used in this project

* *HttpClientModule:* To make the send API request and receive the response, its benefits:
   * JSON assumed by default(As the used Github API responds with JSON Data) so no need for mapping
   * Immutable request/response objects
   * Better support for interceptors as middleware as this helps better error handling in case of more feature 
* *Angular Material:* To use a range of UI angular material components which are:
  * Cross-browser, and can be utilized to form reusable web components
  * It has an inbuilt responsive pattern so no need for restructure for purpose of responsiveness
* *rxJS:* For reactive programming using observables to make it easier to compose asynchronously
  ** Observables allow synchronously or asynchronously receive data from an HTTP response without blocking
  

## Future growth

* Unit and E2E tests 
* Hendle HTTP request Errors
