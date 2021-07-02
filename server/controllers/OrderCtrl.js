

/* const create = async (req,res, next) => {
        const {harga, discount} = req.price;
        const {order_user_id} = req.body;
        const {item} = req.data
        const {order_start_date} = req.body
        const {order_description} = req.body
        const {order_city} = req.body
        

        let x = item[0].lite_days
       const realdiscon = Math.round(x * discount)
       const to = Math.round(harga * x) - realdiscon
        const tax = Math.round(to * 5/100);
        const total = (to + tax );
        const today = order_start_date;
        const end = new Date(today)
        end.setDate(end.getDate() + x)

        

    try {        
        const order = await req.context.models.Orders.create({
            order_tax: tax,
            order_discount: realdiscon,
            order_total_due: total,
            order_user_id: order_user_id,
            order_created_on: new Date(),
            order_end_date : end,
            order_start_date : order_start_date,
            order_total_days: x ,
            order_description:order_description,
            order_city : order_city ,
            order_status : "Booked"


         
        })

        req.order = order;
        
        next();
    } catch (error) {
         console.log(error);
    }
} */

const findOne = async (req, res) => {
    const order = await req.context.models.Orders.findOne({
        where: { order_id: req.params.id,
                 order_status : 'open' },
        include:[{
            all:true
        }]
    });
    return res.send(order);
}

const history = async (req, res) => {
    const order = await req.context.models.Orders.findAll({
        where: { order_user_id: req.params.id,
            order_status : "paid" },
        include:[{
            all:true
        }]
    });
    return res.send(order);
}
const payment = async(req,res,next) =>{
    const prices = req.cekcart
    const payment =  {}
    let price = 0
    let discount = 0
    let tax = 0
    let due = 0
    let qty = 0

    
    for (const data of prices.lite_items) {
        try{
            price += parseInt(data.price)
            qty +=  parseInt(data.lite_days)
            if(req.all.qty > 1){
                discount = 0.05 * price
            }
            tax = (price - discount) * 0.1
            due = price - discount + tax
            payment['price'] = price
            payment['discount'] = discount
            payment['tax'] = tax
            payment['due'] = due
            payment['qty'] = qty 
        }catch (error){
            return res.status(500).json({message : "Order Error"+error})
        }
    }
    req.payment = payment
    next()
}

const cekord = async (req, res, next) => {
    const user = req.cekUser
    //const user = req.cart
    try{
    const order = await req.context.models.Orders.findOne({
        include : [{
            all:true
        }],
        where: { order_user_id: user.user_id,
                order_status : 'open' },
    });
    req.cekord=order
    next()
    } catch (error){
        return res.status(500).json({message : "Input Error"+error})
    }
}
const create = async(req,res,next) =>{   
    const {order_start_date} = req.body
    const x = req.payment.qty
    const today = order_start_date;
    const end = new Date(today)
    end.setDate(end.getDate() + x) 
    try {
    const user = req.cekUser
    const cekorder = req.cekord
   
   
        if(!cekorder){
          
        const order = await req.context.models.Orders.create({
            order_total_due:req.payment.due,
            order_created_on : new Date() ,
            order_start_date : req.body.order_start_date,
            order_end_date : end,
            order_subtotal: req.payment.price,
            order_discount : req.payment.discount,
            order_tax:req.payment.tax,
            order_total_days:req.payment.qty,
            order_user_id:user.user_id,
            order_city:req.body.order_city,
            order_description: req.body.order_description ,
            order_status:'open'
        })
        req.orders = order
        
    }next()
   
    } catch (error) {
        return res.status(500).json({message : "Order Error"+error})
    }
}

const cancel = async(req,res,next)=>{
    try {
        const user = req.cekUser
        const cekorder = req.cekord
            if(cekorder){
                const order = await req.context.models.Orders.update({
                    order_status:'cancelled'
                }, {where:{order_user_id: user.user_id, order_id:cekorder.order_id}})
                req.cancel = order
            }
            next()
    } catch (error) {
        return res.status(500).json({message : "Order Error"+error})
    }
}

const update = async(req,res,next) =>{    
    try {
    const user = req.cekUser
    const cekorder = req.cekord
        if(cekorder){
        const order = await req.context.models.Orders.update({
            order_payt_trx_number:req.body.order_payt_trx_number,
            order_status:'paid'
        },{where: { order_user_id: user.user_id,order_id:cekorder.order_id}})
        req.orders = order
    }
    next()
    } catch (error) {
        return res.status(500).json({message : "Order Error"+error})
    }
}

export default {
    create,
    payment,
    cekord,
    findOne,
    cancel,
    history,
    update
}