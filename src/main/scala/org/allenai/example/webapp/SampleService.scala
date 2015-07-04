package org.allenai.example.webapp

import edu.illinois.cs.cogcomp.profilerNew.model.EntityTypes
import edu.illinois.cs.cogcomp.profilerNew.profilerclient.ProfilerClient
import edu.illinois.cs.cogcomp.profilerNew.profilerclient.models.SchemaCategories
import spray.routing._
import spray.httpx.SprayJsonSupport
import spray.json._
import DefaultJsonProtocol._ // if you don't supply your own Protocol (see below)

import scala.io.Source

/** SampleService provides a definition for some routes in the web application. */
class SampleService extends Directives with SprayJsonSupport {

  val route = {
    pathPrefix("hello") {
      pathEnd {
        get {
          parameters("surface", "label", "entityType", "queryType") {
            (surface, label, entityType, queryType) =>
              println("Surface = " + surface)
              println("Label = " + label)
              println("entityType = " + entityType)
              println("queryType = " + queryType)
              val host = "ec2-54-205-18-221.compute-1.amazonaws.com"
              val port = 27017
              val profilerClient = new ProfilerClient(host, port)

              val queryEntity = if (entityType.toInt == 1) EntityTypes.WIKIFIER_ENTITY else EntityTypes.VERBSENSE_ENTITY
              val querySurface = if (surface == "") null else surface
              val queryLabel = if (label == "") null else label
              val querySchemaCategory = queryType.toInt match {
                case 0 => SchemaCategories.BASIC
                case 1 => SchemaCategories.DEPENDENCY
                case 2 => SchemaCategories.TRIPLE
              }
              //println("querySchemaCategory = " + querySchemaCategory)
              val profiles = profilerClient.queryProfiles(querySurface, queryLabel, queryEntity, querySchemaCategory, 20)
              println("number of profiles found = " + profiles.size())

              //            val scalaProfiles = Profiles.convertProfilesToScala(profiles)
              //            println("number of profiles in Scala = " + scalaProfiles.profiles.length)

              // query here
              complete {
                //ProfilerMsg("howdy")
                //              println(scalaProfiles.toJson)
                //              scalaProfiles
                ProfilerMsg(profiles.toString)
              }
          }
        }
      }
    }
  }
}