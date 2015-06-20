package org.allenai.example.webapp

import spray.routing._
import spray.httpx.SprayJsonSupport

/** SampleService provides a definition for some routes in the web application. */
class SampleService extends Directives with SprayJsonSupport {

  val route = {
    // If the URL path starts with "hello"
    pathPrefix("hello") {
      // ...and there's nothing more
      pathEnd {
        // for all GET requests
        get {
          // respond with the following content
          complete {
            Greeting("howdy")
          }
        }
      }
    }
  }
}