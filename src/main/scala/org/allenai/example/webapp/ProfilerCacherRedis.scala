package org.allenai.example.webapp

import edu.illinois.cs.cogcomp.profilerNew.profilerclient.ProfilerClient
import edu.illinois.cs.cogcomp.profilerNew.profilerclient.models.SchemaCategories
import com.redis._

/** Created by i-danielk on 7/16/15.
  */
object ProfilerCacherRedis {
  val host = "ec2-54-157-219-247.compute-1.amazonaws.com"
  val port = 27017
  lazy val profilerClient = new ProfilerClient(host, port)
  val r = new RedisClient("localhost", 6379)
  def queryProfileWithCaching(querySurface: String, queryLabel: String,
    queryEntity: String,
    querySchemaCategory: SchemaCategories,
    maxProfileContextSize: Int): String = {
    val key = querySurface + queryLabel + queryEntity + querySchemaCategory + maxProfileContextSize.toString
    val profiles = if (r.exists(key)) {
      println("Reading from Redis! ")
      r.get(key).get.toString
    } else {
      println("Loading from server .... ")
      val tmp = profilerClient.queryProfiles(querySurface, queryLabel, queryEntity, querySchemaCategory, maxProfileContextSize)
      r.set(key, tmp)
      tmp.toString
    }
    println("Done reading! ")
    profiles
  }

//  def main(args: Array[String]): Unit = {
//
//  }

}
