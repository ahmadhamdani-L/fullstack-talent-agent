import { sequelize } from '../../config/config-db';
import defaultImage from '../../client/assets/images/default.jpg'
import formidable from 'formidable';
import fs from 'fs';
import { Op } from 'sequelize'
import Pagination from '../../client/auth/Pagination';


//1.declare pathDir untuk menyimpan image di local storage
const pathDir = __dirname + '../../uploads/';
const findAll = async(req, res) => {
    const talents = await req.context.models.Talents.findAll({
        include: [{
            all: true
        }]
    });
    return res.send(talents);
}

/* const findOne = async (req, res) => {
    const talents= await req.context.models.Talents.findOne({
        where: { tale_id: req.params.id }
    });
    return res.send(talents);
} */

const findOne = async(req, res) => {
    try {
        const talents = await req.context.models.Talents.findOne({
            where: { tale_id: req.params.id },
            include: [{
                all: true
            }]
        });
        return res.send(talents);
    } catch (error) {
        return res.status(500).send({ message: `find talent ${error}` })
    }
}

const findOne3 = async(req, res) => {
    const talents = await req.context.models.Talents.findOne({
        include: [{
            all: true
        }],
        where: { tale_id: req.params.id },
    });
    return res.send(talents);
}

const findOne2 = async(req, res) => {
    try {
        const talents = await req.context.models.Talents.findOne({
            where: { tale_id: req.params.id },
            include: [{
                all: true
            }]
        });
        return res.send(talents);
    } catch (error) {
        return res.status(500).send({ message: `find talent ${error}` })
    }
}

const findOne1 = async(req, res, next) => {
    const { item } = req.data

    let price = 0;
    let discount = 0;

    for (let x of item) {
        const talent = await req.context.models.Talents.findOne({
            //create body cors_id 
            where: { tale_id: x.lite_tale_id }
        })
        price = Math.round(talent.tale_price * x.lite_days)

        if (x.lite_days > 2) {
            discount = Math.round(5 / 100 * (talent.tale_price))
        }
    }

    req.price = {
        harga: price,
        discount: discount
    }

    next()
}


const create = async(req, res) => {
    const talents = await req.context.models.Talents.create({
        tale_fullname: req.body.tale_fullname,
        tale_nationality: req.body.tale_nationality,
        tale_age: req.body.tale_age,
        tale_birth: req.body.tale_birth,
        tale_weight: req.body.tale_weight,
        tale_height: req.body.tale_height,
        tale_price: req.body.tale_price,
        tale_account_social: req.body.tale_account_social,
        tale_user_id: req.body.tale_user_id,
    });

    return res.send(talents);
};



const update = async(req, res) => {

    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }

    const form = formidable({
        multiples: true,
        uploadDir: pathDir,
        keepExtensions: true
    });


    form
        .on('fileBegin', function(name, file) {
            //rename the incoming file to the file's name
            file.path = pathDir + file.name;
        })
        .parse(req, async(err, fields, files) => {
            if (err) {
                res.status(400).json({
                    message: "Image tidak bisa diupload"
                })
            }

            let talent = new req.context.models.Talents(fields);
            //talent = extend(talent,fields)

            if (files) {
                talent.tale_profile = files.tale_profile.name;
                console.log(talent);
            }

            try {
                const result = await req.context.models.Talents.update(talent.dataValues, { returning: true, where: { tale_id: parseInt(req.params.id) } });
                return res.send(result);
            } catch (error) {
                res.send(error.message)
            }


        });


}
const remove = async(req, res) => {
    await req.context.models.Talents.destroy({
        where: { tale_id: req.params.id }
    }).then(result => {
        console.log(result);
        return res.status(200).json({ message: 'delete product success' })
    });

}



const rawSQL = async(req, res) => {
    await sequelize.query('SELECT * FROM talents where user_id = :userId', { replacements: { talentId, userId: parseInt(req.params.id) }, type: sequelize.QueryTypes.SELECT }).then(result => {
        return res.send(result);
    })
}

/* const createTalent = async (req, res, next) => {
    const { talents } = req.body;
    const { talents_comments } = talents_comments;
    try {
        const emps = await req.context.models.Talents.create(talents);

        req.emps = {
            tale_id: emps.tale_id,
            talents: talents_comments
        }
       

    } catch (error) {
        let x = error;
        res.send(error.message)
    }
    next()
}
 */
const createProfile = (req, res) => {

    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }

    const form = formidable({
        multiples: true,
        uploadDir: pathDir,
        keepExtensions: true
    });


    form
        .on('fileBegin', function(name, file) {
            //rename the incoming file to the file's name
            file.path = pathDir + file.name;
        })
        .parse(req, async(err, fields, files) => {
            if (err) {
                res.status(400).json({
                    message: "Image tidak bisa diupload"
                })
            }

            let talents = new req.context.models.Talents(fields);


            if (files) {

                talents.tale_profile = files.tale_profile.name;
                console.log(talents);
            }

            try {
                const result = await req.context.models.Talents.create(talents.dataValues);
                return res.send(result)
            } catch (error) {
                res.send(error.message)
            }


        });
}

const photo = async(req, res, next) => {
    const fileName = `${pathDir}/${req.params.filename}`

    if (req.params.filename !== 'null') {
        res.set("Content-Type", "image/jpeg")
        return res.download(fileName);
    }

    next()
}

const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd() + defaultImage)
}

const findout = async(req, res, next) => {
    try {
        const talents = await req.context.models.Talents.findOne({
            where: { tale_id: req.body.tale_id }
        })
        req.talents = talents;
        next()
    } catch (error) {
        return res.status(500).send({ message: `find talent ${error}` })
    }

}

const findAllSearch = async(req, res) => {
    console.log(req.query)
    const { tale_fullname } = req.query
    console.log(tale_fullname)
    const talent = await req.context.models.Talents.findAll(

        {
            where: {
                tale_fullname: {
                    [Op.iLike]: `%${tale_fullname}%`
                }
            },
            include: [{
                model: req.context.models.Talents_images
            }],
        }
    );
    return res.send(talent);
}
const talentPaging = async(req, res) => {
    const { page } = req.query;
    const Talent = req.params.id ? req.params.id : null;
    const { limit, offset } = Pagination.getPagination(page);
    let condition =
        Talent && Talent ? {
            cors_id: Talent,
        } :
        null;

    try {
        const talent = await req.context.models.Talents.findAndCountAll({
            where: condition,
            limit,
            offset,
        });

        const response = Pagination.getPagingData(talent, page, limit);

        res.send(response);
    } catch (error) {
        console.log(error.message);
    }
};

const sortinggirl = async(req, res) => {
    const talent = await req.context.models.Talents.findAll({
        where: {

            status: "jomb"
        },
        include: [{
            all: true
        }]
    });
    return res.send(talent);
}

export default {
    sortinggirl,
    findAll,
    findOne,
    findOne1,
    findOne2,
    findOne3,
    create,
    update,
    remove,
    rawSQL,
    createProfile,
    photo,
    defaultPhoto,
    findout,
    findAllSearch,
    talentPaging
    /* createTalent */
}