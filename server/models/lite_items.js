
const lite_items = (sequelize, DataTypes) => {
    const Lite_items =  sequelize.define('lite_items', {
      lite_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      lite_days: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      lite_status: {
        type: DataTypes.STRING(225),
        allowNull: true
      },
      lite_order_name: {
        type: DataTypes.STRING(225),
        allowNull: true
      },
      lite_tale_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'talents',
          key: 'tale_id'
        },
        unique: "lite_items_lite_tale_id_key"
      },
      lite_taca_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'talents_cart',
          key: 'taca_id'
        },
        unique: "lite_items_lite_taca_id_key"
      }
    }, {
      sequelize,
      tableName: 'lite_items',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "lite_items_lite_taca_id_key",
          unique: true,
          fields: [
            { name: "lite_taca_id" },
          ]
        },
        {
          name: "lite_items_lite_tale_id_key",
          unique: true,
          fields: [
            { name: "lite_tale_id" },
          ]
        },
        {
          name: "lite_items_pkey",
          unique: true,
          fields: [
            { name: "lite_id" },
          ]
        },
        {
          name: "lite_taca_id",
          unique: true,
          fields: [
            { name: "lite_taca_id" },
          ]
        },
        {
          name: "lite_tale_id",
          unique: true,
          fields: [
            { name: "lite_tale_id" },
          ]
        },
      ]
    });
    Lite_items.associate = models => {
      Lite_items.belongsTo(models.Talents, { foreignKey: 'lite_tale_id' });
      Lite_items.belongsTo(models.Talents_cart, { foreignKey: 'lite_taca_id' });
     
    };

    return Lite_items;
  };
  
  export default lite_items;
  