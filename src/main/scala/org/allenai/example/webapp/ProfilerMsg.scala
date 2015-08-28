package org.allenai.example.webapp

import java.io._

import edu.illinois.cs.cogcomp.profilerNew.model.EntityTypes
import edu.illinois.cs.cogcomp.profilerNew.profilerclient.ProfilerClient
import edu.illinois.cs.cogcomp.profilerNew.profilerclient.models.SchemaCategories
import spray.json._
import spray.json.DefaultJsonProtocol._

case class ProfilerMsg(text: String)

object ProfilerMsg {
  implicit val profilerMsg = jsonFormat1(ProfilerMsg.apply)
  def main(args: Array[String]) {
    val host = "localhost"
    val port = 27017
    val profilerClient = new ProfilerClient(host, port)

    val profiles = profilerClient.queryProfiles("grow", "01", EntityTypes.VERBSENSE_ENTITY, SchemaCategories.BASIC, 20)

    println(profiles.size())
    //profiles.forEach( profile =>  println( profile ) )
    println(profiles)
//    val writer = new PrintWriter(new File("/Users/i-danielk/ideaProjects/profileSample.txt"))
//    writer.write(profiles.toString)
//    writer.close()
  }
}
