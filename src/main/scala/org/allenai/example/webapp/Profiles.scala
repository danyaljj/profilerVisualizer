package org.allenai.example.webapp

import spray.httpx.SprayJsonSupport._
import spray.json.DefaultJsonProtocol._
import spray.httpx.SprayJsonSupport._
import spray.json.DefaultJsonProtocol._

import scala.collection.JavaConverters._

case class SchemaMap(schemaMap: scala.collection.immutable.Map[String, Int])
case class Profile(counts: scala.collection.immutable.Map[String, SchemaMap])
case class Profiles(profiles: scala.collection.immutable.Seq[Profile])

object Profiles {
  implicit val schemaMapMarshall = jsonFormat1(SchemaMap.apply)
  implicit val profileMarshall = jsonFormat1(Profile.apply)
  implicit val profilesMarshall = jsonFormat1(Profiles.apply)

  def convertASchemaMapToScala(javaSchemaMap: java.util.Map[String, Integer]): SchemaMap = {
    val tmp = javaSchemaMap.asScala.map { item => (item._1, item._2.toInt) }.toMap
    SchemaMap(tmp)
  }

  def convertAProfileToScala(javaProfile: edu.illinois.cs.cogcomp.profilerNew.model.Profile): Profile = {
    val out = javaProfile.getAllSchema.asScala.map { item =>
      (item._1, convertASchemaMapToScala(item._2))
    }.toMap
    Profile(out)
  }

  def convertProfilesToScala(javaProfiles: java.util.List[edu.illinois.cs.cogcomp.profilerNew.model.Profile]): Profiles = {
    val a: collection.mutable.Seq[Profile] = javaProfiles.asScala.map { convertAProfileToScala }
    val immutableSeq = collection.immutable.Seq[Profile](a: _*)
    Profiles(immutableSeq)
  }
}
