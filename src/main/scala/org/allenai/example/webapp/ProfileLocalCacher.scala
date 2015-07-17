package org.allenai.example.webapp

import java.io.{ FileInputStream, ObjectOutputStream, FileOutputStream }

import edu.illinois.cs.cogcomp.profilerNew.model.EntityTypes
import edu.illinois.cs.cogcomp.profilerNew.profilerclient.ProfilerClient
import edu.illinois.cs.cogcomp.profilerNew.profilerclient.models.SchemaCategories
import edu.illinois.cs.cogcomp.profilerNew.model.Profile
import scala.collection.JavaConverters._
import java.io._
import scala.pickling.binary._, scala.pickling.Defaults._

object ProfileLocalCacher {
  val cacheFile = "profileCache.bin"
  var profileCache = scala.collection.mutable.Map[String, java.util.List[edu.illinois.cs.cogcomp.profilerNew.model.Profile]]()
  val host = "ec2-54-159-162-161.compute-1.amazonaws.com"
  val port = 27017
  val profilerClient = new ProfilerClient(host, port)

  def queryProfileWithCaching(querySurface: String, queryLabel: String,
    queryEntity: String,
    querySchemaCategory: SchemaCategories,
    maxProfileContextSize: Int): java.util.List[edu.illinois.cs.cogcomp.profilerNew.model.Profile] = {
    val key = querySurface + queryLabel + queryEntity + querySchemaCategory + maxProfileContextSize.toString
    println("key = " + key)
    val profiles = if (profileCache.keySet.contains(key)) {
      println("Loading from cache .... ")
      profileCache(key)
    } else {
      println("Loading from server .... ")
      val tmp = profilerClient.queryProfiles(querySurface, queryLabel, queryEntity, querySchemaCategory, maxProfileContextSize)
      profileCache += (key -> tmp)
      println("the size of map = " + profileCache.size)
      pickleCacheToFile()
      tmp
    }
    profiles
  }

  // save to disk
  def pickleCacheToFile(): Unit = {
    println("saving to file ... ")
    val cacheByteArray = cacheFile.pickle.value
    val fos = new FileOutputStream(cacheFile)
    fos.write(cacheByteArray)
    fos.close()
  }

  // load the cache
  def unpickleFromFile(): Unit = {
    println("loading from file.... ")
    val cacheByteArray = scala.io.Source.fromFile(cacheFile).map(_.toByte).toArray
    val cacheByteValue = BinaryPickle(cacheByteArray)
    profileCache = cacheByteValue.unpickle[scala.collection.mutable.Map[String, java.util.List[edu.illinois.cs.cogcomp.profilerNew.model.Profile]]]
  }
}
