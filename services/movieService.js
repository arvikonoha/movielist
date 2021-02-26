const { Op } = require("sequelize");
const movieDAO = require("../persistance/movieDAO");

module.exports.makeNewMovie = async function ({
  title,
  released,
  rating,
  imageURL,
  genre,
  language,
  industry,
}) {
  return movieDAO.makeNewMovie({
    title,
    released,
    rating,
    imageURL,
    genre,
    language,
    industry,
  });
};

module.exports.getMoviePage = async function ({ offset, limit, filter, sort }) {
  if (filter !== undefined) {
    for (let attribute in filter)
      if (filter[attribute] === "") {
        delete filter[attribute];
      } else if (attribute === "title") {
        filter[attribute] = { [Op.like]: `${filter[attribute]}%` };
      }
  } else {
    filter = {};
  }

  if (sort !== undefined) {
    for (let attribute in sort)
      sort = { order: [[attribute, sort[attribute].toUpperCase()]] };
  } else {
    sort = {};
  }

  const data = await movieDAO.getMoviePage({ offset, limit, filter, sort });
  const total_count = await movieDAO.getMoviesCount();

  return { data, total_count, pos: offset };
};

module.exports.getSelectOptions = async function ({ optionType }) {
  const options = await movieDAO.getSelectOptions({ optionType });
  return options.map((option) => option.dataValues[optionType] + "");
};

module.exports.setMovieAttribte = async function ({ id, attribute, value }) {
  const row = await movieDAO.setMovieAttribte({ id, attribute, value });
  return row;
};
