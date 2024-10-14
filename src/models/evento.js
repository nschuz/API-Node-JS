module.exports = (sequelize, DataTypes) => {
    const Evento = sequelize.define('Evento', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      ubicacion: {
        type: DataTypes.STRING(150),
        allowNull: false
      }
    }, {
      tableName: 'evento',
      timestamps: false
    });
  
    return Evento;
  };
  