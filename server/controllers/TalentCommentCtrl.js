import { sequelize } from '../../config/config-db';


// findAll = select * from countries
const findAll = async (req, res) => {
    const talents_comments = await req.context.models.Talents_comments.findAll(
        {
            include: [{
             all :true
            }]
        }
    );
    return res.send(talents_comments);
}
// findone = select * from countries where region_id=:id
const findOne = async (req, res) => {
    const talents_comments = await req.context.models.talents_comments.findOne({
        where: { taco_id: req.params.id }
    });
    return res.send(talents_comments);
}

// create new region
const create = async (req, res) => {
    try {
        const { taco_id, taco_comments, taco_created_on , taco_rating ,taco_tale_id,taco_user_id } = req.body;
        const talents_comments = await req.context.models.Talents_comments.create({
           taco_id:taco_id ,
           taco_comments:taco_comments ,
           taco_created_on:taco_created_on ,
           taco_rating:taco_rating,
           taco_tale_id:taco_tale_id,
           taco_user_id:taco_user_id ,



        });
        return res.send(talents_comments);
    } catch (error) {
       return res.send(error)
    }
}

// update countries set region_name=:2,region_desc=:4 where region_id=:3
const update = async (req, res) => {
    const {taco_id, taco_comments, taco_created_on , taco_rating ,taco_tale_id,taco_user_id } = req.body;
    const talents_comments = await req.context.models.Talents_comments.update(
        { taco_id:taco_id ,
            taco_comments:taco_comments ,
            taco_created_on:taco_created_on ,
            taco_rating:taco_rating,
            taco_tale_id:taco_tale_id,
            taco_user_id:taco_user_id ,
        },
        { returning: true, where: { taco_id: req.params.id } }
    );
    return res.send(talents_comments);
}

// delete 
const remove = async (req, res) => {
    await req.context.models.Talents_comments.destroy({
        where: { taco_id: req.params.id }
    }).then(result => {
        console.log(result);
        return res.send("delete " + result + " rows.");
    });

}

/* const rawSQL = async (req, res) => {
    await sequelize.query('SELECT * FROM talents_comments where region_id = :regionId',
        { replacements: { talentId , userId: parseInt(req.params.id) }, type: sequelize.QueryTypes.SELECT }
    ).then(result => {
        return res.send(result);
    })
} */

/* const createTalent = async (req, res, next) => {
    const { tale_id, talents_comments } = req.emps;
    req.params.id =emps.tale_id;

    for (const data of emps.talents_comments) {
        try {
            await req.context.models.Talents_comments.create({
                
                
                taco_comments: data.taco_comments ,
                taco_created_on: data.taco_created_on ,
                taco_rating: data.taco_rating,
                taco_tale_id: emps.taco_tale_id,
                taco_user_id: data.taco_user_id ,
            });
        } catch (error) {
            res.send(error.message)
        }
    }

    next()


}


 */



export default {
    findAll,
    findOne,
    create,
    update,
    remove,
   /*  createTalent */
    /* rawSQL */
}