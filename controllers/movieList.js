const upload = require("../libraries/multerInit");
const winston = require("winston")
const {
  makeNewMovie,
  getMoviePage,
  getSelectOptions,
  setMovieAttribte,
} = require("../services/movieService");

const {uploadImageToBucket} = require("../services/imageService")

const newrelicFormatter = require('@newrelic/winston-enricher')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.label({label: 'movielist'}),
    newrelicFormatter()
  ),
  transports:[
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'E:/NRLogs/new_relic.log'})
  ]
});

const route = require("express").Router();

route.post("/", upload.single("movieImage"), async (req, res) => {
  try {
    logger.info("Add a new movie")
    let { title, released, rating, genre, language, industry,imagePath } = req.body;
    
    if(imagePath){
      const fileData = await uploadImageToBucket({filePath:imagePath})
      imageURL = fileData.Key
    }

    const newMovie = await makeNewMovie({
      title,
      released,
      rating,
      imageURL,
      genre,
      language,
      industry,
    });

    return res.json({
      status: "Success",
      message: `Movie ${newMovie.title} added successfully`,
    });
  } catch (error) {
    logger.error(error);

    res
      .status(500)
      .json({ status: "Failure", message: "Oops! Something went wrong :/" });
  }
});

route.get("/", async (req, res) => {
  try {
    logger.info("Get movies JSON")
    const { start: offset = 0, count: limit = 10, filter, sort } = req.query;
    const movieData = await getMoviePage({ offset, limit, filter, sort });
    return res.json(movieData);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
});

route.get("/options/:optionType", async (req, res) => {
  try {
    logger.info("Get options JSON")
    const { optionType } = req.params;
    const options = await getSelectOptions({ optionType });

    return res.json(options);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
});

route.put("/", async (req, res) => {
  try {
    logger.info("Update movie data")
    const { id, attribute, value } = req.body;
    const row = await setMovieAttribte({ id, attribute, value });
    return res.json({
      status: "Success",
      message: `${row.length} movie(s) updated successfully`,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
});

module.exports = route;
