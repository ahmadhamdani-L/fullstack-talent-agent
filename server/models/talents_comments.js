
const talents_comments = (sequelize, DataTypes)=> {
  const Talents_comments =  sequelize.define('talents_comments', {
    taco_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    taco_comments: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    taco_created_on: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    taco_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    taco_tale_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'talents',
        key: 'tale_id'
      }
    },
    taco_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'talents_comments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "talents_comments_pkey",
        unique: true,
        fields: [
          { name: "taco_id" },
        ]
      },
    ]
  });

  Talents_comments.associate = models => {
    Talents_comments.belongsTo(models.Talents, { foreignKey: 'taco_tale_id' });
    Talents_comments.belongsTo(models.Users, { foreignKey: 'taco_user_id' });
  };

 
  return Talents_comments;
};

export default talents_comments;
