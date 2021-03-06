# Profiler Visualization

This is a web interface for the Profiler (More can be found in [this paper](http://web.engr.illinois.edu/~khashab2/files/2014_2015_profiler/2015_ijcai_profiler.pdf)). 

- The assumptions is that the profiler data base is running on a machine on a AWS EC2 machine. 
- The user will be able to choose knowledge schema and qeuery based on that. 
- Querying is simply filling out the missing values (dependant on the type of schema).  
- The output will be all matching results to the query, sorted by their score. 
- The tabular representation seems to be appropriate enough. 

This web application which includes a ReactJS client-side application and an API emitting JSON.

## Technologies

* less
* ReactJS
* gulp
* nodejs
* spray
* sbt
* [bootstrap](http://react-bootstrap.github.io/introduction.html)


## Dependencies

* nodejs

  ```shell
  brew install node
  ```

* sbt

  ```shell
  brew install sbt
  ```

## Getting Started

1. Make sure you have `sbt`, `scala` and `scalac`.  

2. `sbt`

3. `reStart`

4. Navigate to [http://localhost:8095](http://localhost:8095) to see the front-end.

5. Navigate to [http://localhost:8095/api/hello](http://localhost:8095/api/hello) to see the service response.

After the step 4, you should be able to see the following in your screen: 

![alt text](screenshot.png)

## Development

* Dynamically recompile as you make changes via: `~compile`.
* Dynamically restart the service as you make changes via `~reStart`.

## Front End Development

Changes to the front-end code will be applied as you make them, even if you only run the `reStart` command without the `~`. If you make changes to the frontend build configuration and need to restart `npm`, you'll have to use `reStop` to stop the background `npm` process, then run `reStart` again to restart it.

There's a slight lag, but keep an eye on your `sbt` console for information regarding the front-end build.

## Questions?

[http://web.engr.illinois.edu/~khashab2/](http://web.engr.illinois.edu/~khashab2/)

