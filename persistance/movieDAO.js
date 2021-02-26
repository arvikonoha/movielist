const { Sequelize } = require("sequelize");
const { MovieModel } = require("../models/initialize");

module.exports.makeNewMovie = async function ({
  title,
  released,
  rating,
  imageURL,
  genre,
  language,
  industry,
}) {
  return MovieModel.create({
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
  return MovieModel.findAll({
    offset: Number(offset),
    limit: Number(limit),
    where: { ...filter },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    ...sort,
  });
};

module.exports.getMoviesCount = async function () {
  return MovieModel.count();
};

module.exports.getSelectOptions = async function ({ optionType }) {
  return MovieModel.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col(optionType)), optionType],
    ],
  });
};

module.exports.setMovieAttribte = async function ({ id, attribute, value }) {
  return MovieModel.update(
    { [attribute]: value },
    {
      where: {
        id,
      },
    }
  );
};
