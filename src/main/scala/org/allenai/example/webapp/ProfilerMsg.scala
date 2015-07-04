package org.allenai.example.webapp

//import java.io.File
import java.io._

import edu.illinois.cs.cogcomp.profilerNew.model.EntityTypes
import edu.illinois.cs.cogcomp.profilerNew.profilerclient.ProfilerClient
import edu.illinois.cs.cogcomp.profilerNew.profilerclient.models.SchemaCategories
import spray.json._
import spray.json.DefaultJsonProtocol._

case class ProfilerMsg(text: String)

object ProfilerMsg {
  implicit val profilerMsg = jsonFormat1(ProfilerMsg.apply)
//    def main(args: Array[String]) {
//      val host = "ec2-54-205-18-221.compute-1.amazonaws.com"
//      val port = 27017
//      val profilerClient = new ProfilerClient(host, port)
//
//      val profiles = profilerClient.queryProfiles("go", "01", EntityTypes.VERBSENSE_ENTITY, SchemaCategories.TRIPLE, 20)
//      println(profiles.size())
//      println(profiles)
//      val writer = new PrintWriter(new File("/Users/i-danielk/ideaProjects/tripleSchemaExample.txt" ))
//      writer.write(profiles.toString)
//      writer.close()
//    }
}
