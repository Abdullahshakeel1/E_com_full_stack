
import { stripe } from "../config/stripe.js"
import { CART } from "../models/AddToCart.Model.js"
import { Order } from "../models/ProductOrder.Model.js"
import { User } from "../models/User.model.js"

export const paymentController = async (req, res)=>{
  try {
    const {caritem} =req.body
    // console.log(caritem) 
    const user = await User.findOne({_id : req.userID}) 
    // console.log("user", user.email )
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection:"auto",
      shipping_options:[
        {
          shipping_rate:"shr_1Q3Go4Iyg95l0Ngypee1wZMl"
        }
      ],
      customer_email : user.email,
      metadata:{
        userId :req.userID
      },
      line_items: caritem.map((item) => {
          return{
          price_data:{
            currency : "pkr",
            product_data :{
              name : item.productId.productName,
              images: item.productId.productImage, // Corrected 'imgaes' to 'images'
              metadata: {
                productId: item.productId._id,
              },

            },
            unit_amount : item.productId.sellingPrice * 100
          },
          adjustable_quantity: { 
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };

      }),
      success_url : `${process.env.FRONT_END_URL}/success`,
      cancel_url : `${process.env.FRONT_END_URL}/cancel`,



    }
    const session = await stripe.checkout.sessions.create(params)
    // console.log(session)
    res.status(201).json(session)

  } catch (error) {
    res.json({
      success: false,
      error: true,
      message : error?.message || error 
    })

  }
}
const getlineitems =async (lineItems)=>{
  let productItems = [ ]
  if(lineItems?.data?.length){
    for(const item of lineItems.data){
      const product =await stripe.products.retrieve(item.price.product)
      const productId = product.metadata.productId
      const productData = {
        productId : productId,
        name : product.name,
        price : item.price.unit_amount / 100,
        quantity :item.quantity,
        image : product.images
      }
      // console.log("product",product)
      productItems.push(productData)
    
    }
  }
  return productItems

}
export const webHookController = async (req, res) => {
  const secret = process.env.STRIPE_WEB_HOOK_SECRET_KEY
  const sig= req.headers['stripe-signature'];
  const payloadString = JSON.stringify(req.body)
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret,
  });
  try {
    const event = stripe.webhooks.constructEvent(payloadString, header, secret);
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log("session", session);

        // Fetch line items using the session ID
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const productDetails = await getlineitems(lineItems)
    const orderDetails ={
      productDetails : productDetails,
      email : session.customer_email,
      userId: session.metadata.userId,
      paymentDetails : {
        paymentId:session.payment_intent,
        payment_method_types :session.payment_method_types,
        payment_status : session.payment_status
       },
       shipping_options:session.shipping_options.map(s=>{
        return {
          ...s,shipping_amount : s.shipping_amount/100
         }
       }),
       amount_total : session.amount_total / 100



    }
    const order = new Order(orderDetails)
    const saveOrder = await order.save()
    if(saveOrder?._id){
      const delCartItems = await CART.deleteMany({userId :session.metadata.userId} )
    }

        console.log("lineItems", lineItems);

        // Add further processing as required for the line items and session
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }

    res.status(200).send(); // Send success response after processing the event
  } catch (error) {
    console.error(`Webhook Error: ${error.message}`);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

export const userOrders =async (req, res)=>{
  try {
    const userId = req.userID
    const orders = await Order.find({userId :userId} ).sort({createdAt: -1})
    res.json({
      data:orders,
      success:true,
      error : false,
      message : "ok"
    })
    
  } catch (error) {
    res.json({
      success:false,
      error : true ,
      message : error.message || error
    })
  }
}