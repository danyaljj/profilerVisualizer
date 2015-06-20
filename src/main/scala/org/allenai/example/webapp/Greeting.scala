package org.allenai.example.webapp;

import spray.json._
import spray.json.DefaultJsonProtocol._

/** model for a Greeting */
case class Greeting(text: String)

object Greeting {
  // create a json format for the Greeting model
  implicit val greetingJsonFormat = jsonFormat1(Greeting.apply)
}