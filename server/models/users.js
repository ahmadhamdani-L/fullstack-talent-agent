const users = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
      user_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      user_name: {
        type: DataTypes.STRING(25),
        allowNull: true
      },
      user_email: {
        type: DataTypes.STRING(25),
        allowNull: true
      },
      user_password: {
        type: DataTypes.STRING(225),
        allowNull: true
      },
      user_salt: {
        type: DataTypes.STRING(225),
        allowNull: true
      },
      user_birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      user_gender: {
        type: DataTypes.STRING(25),
        allowNull: true
      },
      user_avatar: {
        type: DataTypes.STRING(225),
        allowNull: true
      },
      user_type: {
        type: DataTypes.STRING(25),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'users',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "users_pkey",
          unique: true,
          fields: [
            { name: "user_id" },
          ]
        },
      ]
    });

    Users.associate = models => {
      Users.hasMany(models.Talents, { foreignKey: 'tale_user_id', onDelete: 'CASCADE' });
      Users.hasMany(models.Talents_comments, { foreignKey: 'taco_user_id', onDelete: 'CASCADE' });
      Users.hasMany(models.Talents_cart, { foreignKey: 'taca_user_id', onDelete: 'CASCADE' });
    };
   
  
      return Users;
}





export default users;