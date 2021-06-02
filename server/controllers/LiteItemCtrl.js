import { sequelize } from '../../config/config-db';



const findAll = async (req, res) => {
    const lite_items = await req.context.models.Lite_items.findAll(
        {
            include: [{
             all :true
            }]
        }
    );
    return res.send(lite_items);
}

const findOne = async (req, res) => {
    const lite_items= await req.context.models.Lite_items.findOne({
        where: { lite_id: req.params.id }
    });
    return res.send(lite_items);
}

// create new region
const create = async (req, res) => {
    const lite_items = await req.context.models.Lite_items.create({
        lite_days: req.body.lite_days,
        lite_status: req.body.lite_status,
        lite_order_name: req.body.lite_order_name,
        lite_tale_id:req.body.lite_tale_id,
        lite_taca_id:req.body. lite_taca_id

      
    });
  
    return res.send(lite_items);
  };

const update = async (req, res) => {
    const {lite_id, lite_days, lite_status , lite_order_name,  lite_tale_id ,lite_taca_id} = req.body;
    const lite_items = await req.context.models.Lite_items.update(


        {  
            lite_id:lite_id,
            lite_days: lite_days,
            lite_status: lite_status,
            lite_order_name: lite_order_name,
            lite_tale_id: lite_tale_id,
            lite_taca_id: lite_taca_id
    
           
        },
        { returning: true, where: { lite_id: req.params.id } }
    );
    return res.send(lite_items);
}

const update1 = async (req, res) => {
    const {item} = req.data;

    for (let x of item) {
        await req.context.models.Lite_items.update(
            {  
                lite_status: "ordered",      
            },
            { returning: true, where: { lite_id: x.lite_id } }
        );
    }

    res.send(req.order);
}

// delete 
const remove = async (req, res) => {
    await req.context.models.Lite_items.destroy({
        where: { lite_id: req.params.id }
    }).then(result => {
        console.log(result);
        return res.send("delete " + result + " rows.");
    });

}

const rawSQL = async (req, res) => {
    await sequelize.query('SELECT * FROM lite_items where lite_tale_id = :taleId',
        { replacements: { liteId , taleId: parseInt(req.params.id) }, type: sequelize.QueryTypes.SELECT }
    ).then(result => {
        return res.send(result);
    })
}
 
const createlite = async(req,res) => {
    const cart = req.cart
    const talent = req.talent
try {
   /*  const course = req.course */
    /* let price = course.course_price * req.body.lite_qty * 0.95 */
    const item = await req.context.models.Lite_items.create(
        {  
            lite_days : req.body.lite_days,
            lite_status : 'open',
            lite_tale_id : talent.tale_id,
            lite_taca_id : cart.taca_id,
            
    },
   {returning: true, where: {lite_id: req.params.id}}
    )
    
    return res.send(item)
} catch (error) {
    console.log(error)
    return res.send(error);
}
}



export default {
    findAll,
    findOne,
    create,
    update,
    update1,
    remove,
    rawSQL,
    createlite
}