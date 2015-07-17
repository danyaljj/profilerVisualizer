import org.allenai.plugins.CoreDependencies._

organization := "org.allenai.example"

name := "webapp"

description := "An example web application"

enablePlugins(WebappPlugin)

libraryDependencies ++= Seq(
  allenAiCommon,
  allenAiWebapp,
  sprayJson,
  "edu.illinois.cs.cogcomp" % "profiler-client" % "2.0-SNAPSHOT",
  "org.scala-lang.modules" %% "scala-pickling" % "0.10.1",
  "net.debasishg" %% "redisclient" % "3.0"
)

javaOptions ++= Seq(s"-Dlogback.appname=${name.value}")

resolvers += Resolver.mavenLocal
