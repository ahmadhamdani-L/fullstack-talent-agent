import users from "./users";
import talents_images from './talents_images'
const talents = (sequelize, DataTypes) => {
  const Talents = sequelize.define('talents', {
    tale_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tale_fullname: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    tale_nationality: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    tale_age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tale_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tale_height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tale_weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tale_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    tale_account_social: {
      type: DataTypes.STRING(55),
      allowNull: true
    },

    tale_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }

  }, {
    sequelize,
    tableName: 'talents',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "talents_pkey",
        unique: true,
        fields: [
          { name: "tale_id" },
        ]
      },
    ]
  });

 

  Talents.associate = models => {
    Talents.belongsTo(models.Users, { foreignKey: 'tale_user_id' });
    Talents.hasMany(models.Talents_comments, { foreignKey: 'taco_tale_id', onDelete: 'CASCADE' });
    Talents.hasMany(models.Talents_images, { foreignKey: 'taim_tale_id', onDelete: 'CASCADE' });
  };

  return Talents;
};

export default talents;
