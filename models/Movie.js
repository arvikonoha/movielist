module.exports = function(sequalize,DataTypes){
  return sequalize.define('Movie',{
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    released: {
      type: DataTypes.DATE,
      allowNull: true
    },
    rating:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageURL:{
      type: DataTypes.STRING,
      allowNull: true
    },
    genre:{
      type: DataTypes.STRING,
      allowNull:false
    },
    language: {
      type: DataTypes.STRING,
      allowNull:false
    },
    industry: {
      type: DataTypes.STRING,
      allowNull:false
    }
  })  
}