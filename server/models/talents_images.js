import Talents from './talents'
const talents_images = (sequelize, DataTypes)=> {
  const Talents_images =  sequelize.define('talents_images', {
    taim_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    taim_filename: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    taim_filesize: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    taim_file_type: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    taim_primary: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
   
    taim_tale_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'talents',
        key: 'tale_id'
      }
    }
  }, {
    sequelize,
    tableName: 'talents_images',
    schema: 'public',
    timestamps: false
  });
  Talents_images.associate = models => {
    Talents_images.belongsTo(models.Talents, { foreignKey: 'taim_tale_id' });
  };
  
  return Talents_images;
};

export default talents_images;
