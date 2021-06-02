
const talents_cart = (sequelize, DataTypes)=> {
    const Talents_cart =  sequelize.define('talents_cart', {
        taca_id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
          },
          taca_created_on: {
            type: DataTypes.DATEONLY,
            allowNull: true
          },
          taca_status: {
            type: DataTypes.STRING(225),
            allowNull: true
          },
          taca_user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'users',
              key: 'user_id'
            }
          }
        }, {
          sequelize,
          tableName: 'talents_cart',
          schema: 'public',
          timestamps: false,
          indexes: [
            {
              name: "talents_cart_pkey",
              unique: true,
              fields: [
                { name: "taca_id" },
              ]
            },
          ]
        });

        Talents_cart.associate = models => {
          Talents_cart.belongsTo(models.Users, { foreignKey: 'taca_user_id' });
          Talents_cart.hasMany(models.Lite_items, { foreignKey: 'lite_taca_id' });
         
        };

    return Talents_cart;
  };
  
  export default talents_cart;
  