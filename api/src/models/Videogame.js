const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: 3 }
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: 10 }
    },
    Plataformas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Fecha_lanzamiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Rating: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}
