module.exports = (sequelize, DataTypes) => {
    const Reserva = sequelize.define('Reserva', {
      id: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,  // Genera automáticamente UUID v4
      },
      evento_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        references: {
          model: 'Evento',  // Nombre del modelo relacionado
          key: 'id'
        }
      },
      nombre_usuario: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      cantidad_boletos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
      fecha_reserva: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    }, {
      tableName: 'reserva',
      timestamps: false
    });
  
    // Definir la asociación con el modelo Evento
    Reserva.associate = function(models) {
      Reserva.belongsTo(models.Evento, { foreignKey: 'evento_id', as: 'evento' });
    };
  
    return Reserva;
  };
  