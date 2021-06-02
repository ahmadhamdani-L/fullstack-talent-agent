import { sequelize } from '../../config/config-db';
const findAll = async (req, res) => {
    const talents = await req.context.models.Talents.findAll(
        {
            include: [{
             all :true
            }]
        }
    );
    return res.send(talents);
}

/* const findOne = async (req, res) => {
    const talents= await req.context.models.Talents.findOne({
        where: { tale_id: req.params.id }
    });
    return res.send(talents);
} */

const findOne = async (req, res, next) => {
    try {
     const talent = await req.context.models.Talents.findOne({
         //create body cors_id 
         where: { tale_id: req.body.tale_id }
     });
        req.talent = talent
         next()
    } catch (error) {
        console.log(error)
    }
 }

 const findOne1 = async (req, res, next) => {
    const {item} = req.data 

    let price = 0;
    let discount = 0;

    for ( let x of item ) {
        const talent = await req.context.models.Talents.findOne({
            //create body cors_id 
            where: { tale_id: x.lite_tale_id }
        })
        price = Math.round(talent.tale_price*x.lite_days)

        if (x.lite_days > 2) {
            discount = Math.round(5/100 *(talent.tale_price))
        }
 }

 req.price = {
     harga: price ,
     discount: discount
 }

 next()
}


const create = async (req, res) => {
    const talents = await req.context.models.Talents.create({
      tale_fullname: req.body.tale_fullname,
      tale_nationality: req.body.tale_nationality,
      tale_age: req.body.tale_age,
      tale_birth: req.body.tale_birth,
      tale_weight: req.body.tale_weight,
      tale_height: req.body.tale_height,
      tale_price: req.body.tale_price,
      tale_account_social :req.body.tale_account_social,
      tale_user_id: req.body.tale_user_id,
    });
  
    return res.send(talents);
  };

const update = async (req, res) => {
    const {taco_id, taco_comments, taco_created_on , taco_rating ,taco_tale_id,taco_user_id } = req.body;
    const talents_comments = await req.context.models.Talents_comments.update(
        {   tale_id :tale_id ,
            tale_fullname:tale_fullname,
            tale_nationality:tale_nationality,
            tale_age:tale_age,
            tale_birth:tale_birth,
            tale_weight:tale_weight,
            tale_height:tale_height,
            tale_price:tale_price,
            tale_account_social :tale_account_social,
            tale_user_id:tale_user_id,
        },
        { returning: true, where: { tale_id: req.params.id } }
    );
    return res.send(talents);
}


const remove = async (req, res) => {
    await req.context.models.Talents.destroy({
        where: { tale_id: req.params.id }
    }).then(result => {
        console.log(result);
        return res.status(200).json({message:'delete product success'})
    });

}



const rawSQL = async (req, res) => {
    await sequelize.query('SELECT * FROM talents where user_id = :userId',
        { replacements: { talentId , userId: parseInt(req.params.id) }, type: sequelize.QueryTypes.SELECT }
    ).then(result => {
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

  

export default {
    findAll,
    findOne,
    findOne1,
    create,
    update,
    remove,
    rawSQL,
    /* createTalent */
}