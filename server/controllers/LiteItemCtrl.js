import { sequelize } from "../../config/config-db";

const findAll = async (req, res) => {
  const lite_items = await req.context.models.Lite_items.findAll({
    include: [
      {
        all: true,
      },
    ],
  });
  return res.send(lite_items);
};

const findOne = async (req, res) => {
  const lite_items = await req.context.models.Lite_items.findOne({
    include: [
      {
        all: true,
      },
    ],
    where: { lite_id: req.params.id },
  });
  return res.send(lite_items);
};

// create new region
const create = async (req, res) => {
  const lite_items = await req.context.models.Lite_items.create({
    lite_days: req.body.lite_days,
    lite_status: req.body.lite_status,
    lite_order_name: req.body.lite_order_name,
    lite_tale_id: req.body.lite_tale_id,
    lite_taca_id: req.body.lite_taca_id,
  });

  return res.send(lite_items);
};

const update = async (req, res) => {
  const {
    lite_id,
    lite_days,
    lite_status,
    lite_order_name,
    lite_tale_id,
    lite_taca_id,
  } = req.body;
  const lite_items = await req.context.models.Lite_items.update(
    {
      lite_id: lite_id,
      lite_days: lite_days,
      lite_status: lite_status,
      lite_order_name: lite_order_name,
      lite_tale_id: lite_tale_id,
      lite_taca_id: lite_taca_id,
      
    },
    { returning: true, where: { lite_id: req.params.id } }
  );
  return res.send(lite_items);
};

const update1 = async (req, res) => {
  const { item } = req.data;

  for (let x of item) {
    await req.context.models.Lite_items.update(
      {
        lite_status: "ordered",
      },
      { returning: true, where: { lite_id: x.lite_id } }
    );
  }

  res.send(req.order);
};

// delete
const remove = async (req, res) => {
  await req.context.models.Lite_items.destroy({
      where: { lite_id: req.params.id }
  }).then(result => {
      console.log(result);
      return res.status(200).json({message:'delete product success'})
  });

}

const rawSQL = async (req, res) => {
  await sequelize
    .query("SELECT * FROM lite_items where lite_tale_id = :taleId", {
      replacements: { liteId, taleId: parseInt(req.params.id) },
      type: sequelize.QueryTypes.SELECT,
    })
    .then((result) => {
      return res.send(result);
    });
};

/* const createlite = async (req, res) => {
  const cart = req.cart;
  const talent = req.talent;
  try {
    
    const item = await req.context.models.Lite_items.create(
      {
        lite_days: req.body.lite_days,
        lite_status: "open",
        lite_tale_id: talent.tale_id,
        lite_taca_id: cart.taca_id,
      },
      { returning: true, where: { lite_id: req.params.id } }
    );

    return res.send(item);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
}; */

const createlineItem = async (req, res) => {
  try {
    const item = await req.context.models.Lite_items.create(
      {
        lite_days: req.body.lite_days,
        lite_status: "open",
        lite_tale_id: req.body.lite_tale_id,
        lite_taca_id: req.dataLine.taca_id,
        price: req.body.price,
      },
      { returning: true, where: { lite_id: req.params.id } }
    );

    return res.send(item);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const ceklite = async (req, res, next) => {
  const ceklt = req.taca || req.cekcart
  const cektale = req.talents
  try{
  const item = await req.context.models.Lite_items.findOne({
      where: { lite_taca_id : ceklt.taca_id,
               lite_tale_id : cektale.tale_id,
               lite_status : 'cart' }
  });
  req.liteitem = item
  next()
  } catch (error){
      return res.status(500).json({message : "Input Error"+error})
  }
}
const createlite = async(req,res) => {

  try {
      const talents = req.talents
      const taca = req.taca || req.cekcart
      const ceklite = req.liteitem
      const price = talents.tale_price * req.body.lite_days
      if (!ceklite){
      const item = await req.context.models.Lite_items.create(
          {   
              lite_days : req.body.lite_days,
              lite_status : 'cart',
              lite_tale_id : talents.tale_id,
              lite_taca_id : taca.taca_id,
              price : price      
      })
      req.lite = item
  }
  next()
  return res.send(item)
  } catch (error) {
      return res.send(error);
  }
  }

  const checkline = async (req,res)=>{
    const orderd = req.orders 
    const closes = req.cekcart

    for (const data of closes.lite_items) {
        try {
            await req.context.models.Lite_items.update({
            lite_status : 'checkout',
            lite_order_name : orderd.order_name
        },
        {returning : true, where :{lite_id : data.lite_id }})
        } catch (error) {
            return res.send(error)
        }
    }
    return res.send(orderd)
}

const updatelite = async (req,res)=>{  
  try {
      const ceklite = req.liteitem
      const cektale = req.talents
      const price = cektale.tale_price * req.body.lite_days
      const item = await req.context.models.Lite_items.update({
                      lite_days : req.body.lite_days,
                      price : price
     },{returning : true, where :{lite_id : ceklite.lite_id }})

     return res.send(item)
     }catch (error) {
      return res.send(error)   
     }
}

const cancelitem = async(req,res)=>{
  const closes = req.cekcart

  for (const data of closes.lite_items) {
      try {
          await req.context.models.Lite_items.update({
          lite_status : 'cart'
      },
      {returning : true, where :{lite_id : data.lite_id }})
      } catch (error) {
          return res.send(error)
      }
  }
  return res.send("Happy shopping")

}

const checkpay = async (req,res)=>{
  const orderd = req.orders || req.cekord
  const closes = req.cekcart

  for (const data of closes.lite_items) {
      try {
          await req.context.models.Lite_items.update({
          lite_status : 'ordered',
          lite_order_name : orderd.order_id
      },
      {returning : true, where :{lite_id : data.lite_id }})
      } catch (error) {
          return res.send(error)
      }
  }
  return res.send("Thanks for your shopping")
}


export default {
  findAll,
  findOne,
  create,
  update,
  update1,
  remove,
  rawSQL,
  createlite,
  createlineItem,
  ceklite,
  updatelite,
  checkline,
  cancelitem,
  checkpay
  
};
