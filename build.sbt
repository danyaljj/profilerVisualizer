import org.allenai.plugins.CoreDependencies._

organization := "org.allenai.example"

name := "webapp"

description := "An example web application"

enablePlugins(WebappPlugin)

libraryDependencies ++= Seq(
  "org.allenai.common" %% s"common-core" % "2015.04.01-0",
  "org.allenai.common" %% s"common-webapp" % "2015.04.01-0",
  "io.spray" %% "spray-json" % "1.3.1",
  "edu.illinois.cs.cogcomp" % "profiler-client" % "2.0-SNAPSHOT",
  "org.scala-lang.modules" %% "scala-pickling" % "0.10.1",
  "net.debasishg" %% "redisclient" % "3.0"
)

libraryDependencies ~= { _.map(_.exclude("ch.qos.logback", "logback-classic")) }

javaOptions ++= Seq(s"-Dlogback.appname=${name.value}")

resolvers += Resolver.mavenLocal
