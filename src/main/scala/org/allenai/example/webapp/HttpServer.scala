package org.allenai.example.webapp

import org.allenai.common.Version
import org.allenai.common.Config._
import org.allenai.common.webapp.InfoRoute
import org.allenai.common.webapp.{ Directives => Ai2Directives }

import akka.actor._
import com.typesafe.config.ConfigFactory
import spray.http.{ HttpHeaders, StatusCodes }
import spray.http.CacheDirectives._
import spray.http.HttpHeaders._
import spray.httpx.SprayJsonSupport
import spray.routing.{ ExceptionHandler, SimpleRoutingApp }

import scala.util.control.NonFatal

/** Sets up the HttpServer */
object HttpServer extends SimpleRoutingApp with Ai2Directives {

  val Package = "org.allenai.example"
  val ApplicationName = "webapp"

  // TODO: (codeviking): Add a flag to enable "clean" error messages for production where
  // we don't dump the full stack trace
  // TODO: (codeviking): Pretty 404 handling?
  val DefaultExceptionHandler = ExceptionHandler {
    case NonFatal(cause) => complete(StatusCodes.InternalServerError -> cause)
  }

  // Allow associated responses to be cached for up to a year
  val CacheAgeSeconds = 60L * 60L * 24L * 365L
  val CacheControlMaxAge = `Cache-Control`(`public`, `max-age`(CacheAgeSeconds))

  // Disable any storing / reuse of the response
  val DisableCache = `Cache-Control`(`no-cache`, `no-store`)

  // Start the server.
  def main(args: Array[String]): Unit = {
    implicit val system = ActorSystem(ApplicationName)

    // Provide an implicit ExecutionContext
    import system.dispatcher

    // Load configuration values from src/main/resources/application.conf
    val config = ConfigFactory.load()

    // Create a route that tells which version of the code is running.
    // This is used in conjunction with build hooks (sbt injectVersion) provided by sbt-plugins.
    val infoRoute = new InfoRoute()
      .withVersion(Version.fromResources(Package, ApplicationName))
      .withName(ApplicationName)
      .route

    // Load the port from the configuration value for
    // org.allenai.example.webservice.hello-service.http-server from
    // src/main/resources/application.conf
    val port = config[Int](s"$Package.$ApplicationName.http-server.port")

    //ProfileLocalCacher.unpickleFromFile()

    // Create an instance of the service
    val sampleService = new SampleService()

    // Disable Scalariform because it does some weird stuff with Spray routes.
    // format: OFF
    startServer(interface = "0.0.0.0", port) {
      // adds CORS headers which allow hosts in the list below to make asynchronous requests
      // from the browser to the api.  If you don't need this capability you can remove this
      // directive
      allowHosts("localhost", "someotherclient.ai2") {
        respondWithHeaders(DisableCache) {
          handleExceptions(DefaultExceptionHandler) {
            pathPrefix("api") {
              sampleService.route
            } ~
            infoRoute
          }
        }
      } ~
      // Disable the ability for clients to cache the root HTML document
      respondWithHeaders(DisableCache) {
        pathEndOrSingleSlash(getFromFile("public/index.html"))
      } ~
      // Allow all other static resources to be cached via the settings specified above.
      //
      // Note: Currently static resources are served with ETags and 304 support which currently
      // can't be disabled per https://github.com/spray/spray/issues/939
      respondWithHeaders(CacheControlMaxAge) {
        getFromDirectory("public")
      }
    }
    // format: ON
  }
}
