const upload = require("../libraries/multerInit");
const path = require("path");
const {
  makeNewMovie,
  getMoviePage,
  getSelectOptions,
  setMovieAttribte,
} = require("../services/movieService");

const route = require("express").Router();

route.post("/", upload.single("movieImage"), async (req, res) => {
  try {
    let { title, released, rating, genre, language, industry } = req.body;
    const imageURL = req.file ? "uploads" + "/" + req.file.filename : "";

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
    console.log(error);

    res
      .status(500)
      .json({ status: "Failure", message: "Oops! Something went wrong :/" });
  }
});

route.get("/", async (req, res) => {
  try {
    const { start: offset = 0, count: limit = 10, filter, sort } = req.query;
    const movieData = await getMoviePage({ offset, limit, filter, sort });
    return res.json(movieData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
});

route.get("/options/:optionType", async (req, res) => {
  try {
    const { optionType } = req.params;
    const options = await getSelectOptions({ optionType });

    return res.json(options);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
});

route.put("/", async (req, res) => {
  try {
    const { id, attribute, value } = req.body;
    const row = await setMovieAttribte({ id, attribute, value });
    return res.json({
      status: "Success",
      message: `${row.length} movie updated successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Something went wrong" });
  }
});

module.exports = route;
