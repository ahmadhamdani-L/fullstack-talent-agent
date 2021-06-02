import talents_cart from "../models/talents_cart";

const create = async (req,res, next) => {
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
        const total = (to + tax);
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


           /*  order_end_date :  */
        })

        req.order = order;
        
        next();
    } catch (error) {
         console.log(error);
    }
}

export default {
    create
}