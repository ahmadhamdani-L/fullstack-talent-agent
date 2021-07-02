const update = async (req, res) => {
    console.log(req.fileName);
    const result = await req.context.models.Talents_images.update(
      { profile: req.fileName },
      { returning: true, where: { tale_id: parseInt(req.params.id) } }
    );
    return res.send(result);
  };
  const create = async (req, res, next) => {
    // jika gunakan spread operator
    const dataTalentsimage = req.dataTalentsimage;
  
    for (const data of dataTalentsimage) {
      await createImage(req, res, data);
    }
  
    // using middleware
    //return res.send(dataTalentsimage)
    next()
  };
  const remove = async (req, res) => {
    const talents_image = await req.context.models.Talents_images.destroy({
      where: { taim_id: req.params.id },
    });
  
    return res.send(true);
  };
  
  
  const createImage = async (req, res, data) => {
    const { empId, empName, taim_id ,fileName, fileSize,  fileType ,taim_primary } = data;
    await req.context.models.Talents_images.create({
        
        taim_filename: fileName,
        taim_filesize: fileSize,
        taim_file_type: fileType,
        taim_primary : taim_primary,
        taim_tale_id: empId
    }).catch((error) => {
      console.log(error);
    });
  };
  
  const findAll = async (req, res) => {
    const talents_image = await req.context.models.Talents_images.findAll(
        {
            include: [{
                model: req.context.models.Talents
            }],
            order: [
                ['taim_tale_id']
            ],
        }
    );
    return res.send(talents_image);
  }

  const findOne = async (req, res) => {
    const talents_images = await req.context.models.Talents_images.findOne({
      where: { taim_id: req.params.id },
    });
    return res.send(talents_images);
  };
  
  export default {
    create,
    findAll,
    remove,
    createImage,
    findOne
  };
  