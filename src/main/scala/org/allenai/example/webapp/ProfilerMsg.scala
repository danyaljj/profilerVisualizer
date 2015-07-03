package org.allenai.example.webapp

import edu.illinois.cs.cogcomp.profilerNew.model.EntityTypes
import edu.illinois.cs.cogcomp.profilerNew.profilerclient.ProfilerClient
import edu.illinois.cs.cogcomp.profilerNew.profilerclient.models.SchemaCategories
import spray.json._
import spray.json.DefaultJsonProtocol._

case class ProfilerMsg(text: String)

object ProfilerMsg {
  implicit val profilerMsg = jsonFormat1(ProfilerMsg.apply)
  //  def main(args: Array[String]) {
  //    val host = "ec2-54-205-18-221.compute-1.amazonaws.com"
  //    val port = 27017
  //    val profilerClient = new ProfilerClient(host, port)
  //
  //    val profiles = profilerClient.queryProfiles("Obama", null, EntityTypes.WIKIFIER_ENTITY, SchemaCategories.BASIC)
  //    println(profiles.size())
  //  }
}
