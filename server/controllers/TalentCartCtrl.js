
import { sequelize } from '../../config/config-db';
import talents_cart from '../models/talents_cart';


// findAll = select * from countries
const findAll = async (req, res) => {
    const talents_cart = await req.context.models.Talents_cart.findAll(
        {
            include: [{
             all :true
            }]
        }
    );
    return res.send(talents_cart);
}

const findOne = async (req, res) => {
    const talents_cart= await req.context.models.Talents_cart.findOne({
        include: [{
            all :true
           }],
        where: { taca_id: req.params.id }
    });
    return res.send(talents_cart);
}

const findOne1 =  async (req, res, next) => {
    const talents_cart= await req.context.models.Talents_cart.findOne({
        include: [{
            all :true
           }],
        where: { taca_user_id: req.body.order_user_id }
    });
    req.data = {
        taca_id: talents_cart.taca_id,
        item: talents_cart.lite_items,
        days: talents_cart.lite_id
    }

    next();
}

// create new region
/* const create = async (req, res) => {
    const talents_cart = await req.context.models.Talents_cart.create({
      taca_created_on: req.body.taca_created_on,
      taca_status: req.body.taca_status,
      taca_user_id: req.body.taca_user_id,
     
      
    });
  
    return res.send(talents_cart);
  };
 */

  const create = async (req,res, next) => {
        
    try {
        const user = req.user
        
        const cart = await req.context.models.Talents_cart.create(
            {   
                taca_status : "open",       
                taca_user_id: user.user_id,
            });
            req.cart = talents_cart
            next()
    } catch (error) {
         console.log(error);
    }
}


const update = async (req, res) => {
    const {taca_id, taca_created_on, taca_status , taca_user_id  } = req.body;
    const talents_cart = await req.context.models.Talents_cart.update(
        { taca_id:taca_id ,
            taca_created_on:taca_created_on ,
            taca_status:taca_status ,
            taca_user_id: taca_user_id,
           
        },
        { returning: true, where: { taca_id: req.params.id } }
    );
    return res.send(talents_cart);
}

const update1 = async (req, res, next) => {
    const {taca_id} = req.data;
    const talents_cart = await req.context.models.Talents_cart.update(
        { taca_id:taca_id ,
            taca_status:"closed",
        },
        { returning: true, where: { taca_id: taca_id } }
    );
    
    next();
}

// delete 
const remove = async (req, res) => {
    await req.context.models.Talents_cart.destroy({
        where: { taca_id: req.params.id }
    }).then(result => {
        console.log(result);
        return res.send("delete " + result + " rows.");
    });

}

const rawSQL = async (req, res) => {
    await sequelize.query('SELECT * FROM talents_cart where user_id = :userId',
        { replacements: { tacaId , userId: parseInt(req.params.id) }, type: sequelize.QueryTypes.SELECT }
    ).then(result => {
        return res.send(result);
    })
}

const createcart = async (req, res, next) => {
    const { user_id, talents_cart } = req.emps;
    req.params.id = user_id;

    for (const data of talents_cart) {
        try {
            data.taca_user_id = user_id;
            const  x = await req.context.models.Talents_cart.create(data);
            console.log(x);
        } catch (error) {
            res.send(error.message)
        }
    }

    next()


}
const createc = async (req,res,next) => {
    try {
        const user = req.user

        const cart = await req.context.models.Talents_cart.create(
            {
                taca_status :"open",
                taca_user_id: user.user_id,
            }
        )
        req.cart = cart
        next()
    } catch (error){
        console.log(error)
    }
}


export default {
    findAll,
    findOne,
    findOne1,
    create,
    update,
    update1,
    remove,
    rawSQL,
    createcart,
    createc
}