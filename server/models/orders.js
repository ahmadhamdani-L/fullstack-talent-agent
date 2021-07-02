
const orders = (sequelize, DataTypes) => {
  const Orders =  sequelize.define('orders', {
    order_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_created_on: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    order_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    order_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    order_tax: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    order_discount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    order_total_due: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    order_total_days: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_description: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    order_payt_trx_number: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    order_city: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    order_status: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    order_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "orders_pkey",
        unique: true,
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  }
  );
   /*  Orders.associate = models => {
      
      Orders.hasMany(models.Lite_items, { foreignKey: 'lite_order_name', onDelete: 'CASCADE' });
    } */
  
   return Orders;
};

export default orders;
