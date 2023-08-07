const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const nodemailer = require('nodemailer');
const Transport = require("nodemailer-brevo-transport");
const dbconnect = require('./utils/dbConnect');
const blogsRouter = require('./routes/v1/blogs.route');
const viewCount = require('./middleWare/viewCount');
const { rateLimit } = require('express-rate-limit');
const { limiter } = require('./middleWare/limiter');
const port = process.env.PORT || 5000;
const app = express();

// middle ware 
app.use(cors());
app.use(express.json());
//app.use(viewCount);

// Apply the rate limiting middleware to all requests
 //app.use(limiter)

// mongodb uri/ mongodb connect
dbconnect();

app.use("/api/v1/blogs",blogsRouter);


async function run() {
    try {
        // await client.connect();
        // const addresssCollection = client.db('Mahsez').collection('Address');
        // const productsCollection = client.db('Mahsez').collection('Products');
        // const ordersCollection = client.db('Mahsez').collection('Orders');
        // const usersCollection = client.db('Mahsez').collection('Users');
        // const blogsCollection = client.db('Mahsez').collection('Blogs');

        // const verifyAdmin = async (req, res, next) => {
        //     const requester = req.decoded.email;
        //     const requesterAccount = await usersCollection.findOne({ email: requester });
        //     if (requesterAccount.role === 'admin') {
        //         next();
        //     }
        //     else {
        //         req.status(403).send({ message: 'Forbidden access' });
        //     }
        // };

        // /* Create Address api */
        // app.post('/address', async (req, res) => {
        //     const newAddress = req.body;
        //     const address = await addresssCollection.insertOne(newAddress);
        //     res.send(address);
        // });
        // /* get my Address api */
        // app.get('/myAddress', verifyJWT, async (req, res) => {
        //     const email = req.query.email;
        //     const decodedEmail = req.decoded.email;
        //     if (email === decodedEmail) {
        //         const query = { email: email };
        //         const myAddress = await addresssCollection.find(query).toArray();
        //         return res.send(myAddress);
        //     }
        //     else {
        //         return res.status(403).send({ message: 'Forbidden access' });
        //     };
        // });
        // /* get my Address detail api */
        // app.get('/myAddress/:id', verifyJWT, async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const myAddressDetails = await addresssCollection.findOne(query);
        //     res.send(myAddressDetails);
        // });
        // /* update address api */
        // app.put('/address/:id', async (req, res) => {
        //     const address = req.body;
        //     const id = req.params.id;
        //     const filter = { _id: ObjectId(id) };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: { coustomerName: address.coustomerName, companyName: address.companyName, address1: address.address1, address2: address.address2, city: address.city, postCode: address.postCode, state: address.state, phoneNumber: address.phoneNumber }
        //     }
        //     const result = await addresssCollection.updateOne(filter, updateDoc, options);
        //     res.send(result);
        // })
        // /* delete address api */
        // app.delete('/myAddress/:_id', verifyJWT, async (req, res) => {
        //     const _id = req.params._id;
        //     const query = { _id: ObjectId(_id) };
        //     const result = await addresssCollection.deleteOne(query);
        //     res.send(result);
        // });

        // /* create product api */
        // app.post('/products', async (req, res) => {
        //     const newProduct = req.body;
        //     const result = await productsCollection.insertOne(newProduct);
        //     res.send(result);
        // });
        // /* get Products api */
        // app.get('/products', async (req, res) => {
        //     const query = {};
        //     const cursor = productsCollection.find(query);
        //     const products = await cursor.toArray();
        //     res.send(products);
        // });

        // /* get product Details api */
        // app.get('/product/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const product = await productsCollection.findOne(query);
        //     res.send(product);
        // });
        // /* update product api */
        // app.put('/products/:id', async (req, res) => {
        //     const info = req.body;
        //     const id = req.params.id;
        //     const filter = { _id: ObjectId(id) };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: { mainCategory: info.mainCategory, category: info.category, subCategory: info.subCategory, name: info.name, brand: info.brand, stockStatus: info.stockStatus, availableQuantity: info.availableQuantity, ragularPrice: info.ragularPrice, offerPrice: info.offerPrice }
        //     };
        //     const result = await productsCollection.updateMany(filter, updateDoc, options);
        //     res.send(result);
        // });
        // /* Delete Product api */
        // app.delete('/products/:_id', async (req, res) => {
        //     const _id = req.params._id;
        //     const query = { _id: ObjectId(_id) };
        //     const result = await productsCollection.deleteOne(query);
        //     res.send(result);
        // });
        // // post porduct key localhost
        // app.post('/productsByKeys', async (req, res) => {
        //     const keys = req.body;
        //     const ids = keys.map(_id => ObjectId(_id));
        //     const query = { _id: { $in: ids } }
        //     const cursor = productsCollection.find(query);
        //     const products = await cursor.toArray();
        //     res.send(products);
        // });

        // /* get blogs api */
        // app.get('/blogs', async (req, res) => {
        //     const query = {};
        //     const cursor = blogsCollection.find(query);
        //     const blogs = await cursor.toArray();
        //     res.send(blogs);
        // });

        // /* get my order api */
        // app.get('/myOrder', verifyJWT, async (req, res) => {
        //     const email = req.query.email;
        //     const decodedEmail = req.decoded.email;
        //     if (email === decodedEmail) {
        //         const query = { email: email };
        //         const myOrder = await ordersCollection.find(query).toArray();
        //         return res.send(myOrder);
        //     }
        //     else {
        //         return res.status(403).send({ message: 'Forbidden access' });
        //     };
        // });
        // /* get my order details api */
        // app.get('/myOrder/:id', verifyJWT, async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const myOrderDetails = await ordersCollection.findOne(query);
        //     res.send(myOrderDetails);
        // });

        // /* post order api */
        // app.post('/allOrder', async (req, res) => {
        //     const newOrder = req.body;
        //     const result = await ordersCollection.insertOne(newOrder);
        //     res.send(result);
        // });
        // /* get Order all order collection */
        // app.get("/allOrder", verifyJWT, async (req, res) => {
        //     const query = {};
        //     const cursor = ordersCollection.find(query);
        //     const result = await cursor.toArray();
        //     res.send(result);
        // });
        // /* get allOrder Details api */
        // app.get('/allOrder/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const orderDetail = await ordersCollection.findOne(query);
        //     res.send(orderDetail);
        // });
        // /* Delete order from admin */
        // app.delete('/deleteOrder/:_id', verifyJWT, verifyAdmin, async (req, res) => {
        //     const _id = req.params._id;
        //     const query = { _id: ObjectId(_id) };
        //     const result = await ordersCollection.deleteOne(query);
        //     res.send(result);
        // });

        // /* get all user api */
        // app.get('/allUsers', verifyJWT, async (req, res) => {
        //     const users = await usersCollection.find().toArray();
        //     res.send(users);
        // });
        // /*  get admin api */
        // app.get('/admin/:email', verifyJWT, async (req, res) => {
        //     const email = req.params.email;
        //     const user = await usersCollection.findOne({ email: email });
        //     const isAdmin = user.role === 'admin';
        //     res.send({ admin: isAdmin });
        // });
        // /* put admin api */
        // app.put('/user/admin/:email', verifyJWT, verifyAdmin, async (req, res) => {
        //     const email = req.params.email;
        //     const filter = { email: email };
        //     const updateDoc = {
        //         $set: { role: 'admin' },
        //     };
        //     const result = await usersCollection.updateOne(filter, updateDoc);
        //     res.send({ result });
        // });
        // /* put users api */
        // app.put('/user/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const user = req.body;
        //     const filter = { email: email };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: user,
        //     };
        //     const result = await usersCollection.updateOne(filter, updateDoc, options);
        //     const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        //     res.send({ result, token });
        // });

        // /* get current date with month */
        // var today = new Date();
        // var optionss = { year: 'numeric', month: 'long', day: 'numeric' };
        // const cDates = today.toLocaleString('en-US', optionss);
        // const cDate = cDates;
        // /* get current time  */
        // let cTime = new Date().toLocaleTimeString();
        // /*  console.log(cTime)
        //  console.log(cDate) */

        // /* update order confirm order status api */
        // app.put('/confirmOrderStatus/:id',verifyJWT,verifyAdmin, async (req, res) => {
        //     const confirmOrder = req.body;
        //     const id = req.params.id;
        //     const filter = { _id: ObjectId(id) };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: { confirmOrderStatus: 'Confirm Order', confirmOrderDate: confirmOrder.confirmOrderDate, confirmOrderTime: confirmOrder.confirmOrderTime }
        //     };
        //     const result = await ordersCollection.updateOne(filter, updateDoc, options);
        //     res.send(result);
        // });

        // /* update order cancel order status api */
        // app.put('/cancelOrderStatus/:id',verifyJWT, verifyAdmin, async (req, res) => {
        //     const cancelOrder = req.body;
        //     const id = req.params.id;
        //     const filter = { _id: ObjectId(id) };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: { cancelOrderStatus: 'Cancel Order', cancelOrderDate: cancelOrder.cancelOrderDate, cancelOrderTime: cancelOrder.cancelOrderTime }
        //     };
        //     console.log(cancelOrder.cancelOrderDate,cancelOrder.cancelOrderTime)
        //     const result = await ordersCollection.updateOne(filter, updateDoc, options);
        //     res.send(result);
        // });

        // /* update order delivered order status api */
        // app.put('/deliveredOrderStatus/:id',verifyJWT, verifyAdmin, async (req, res) => {
        //     const deliveredOrder = req.body;
        //     const id = req.params.id;
        //     const filter = { _id: ObjectId(id) };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: { deliveredOrderStatus: 'Delivered Order', deliveredOrderDate: deliveredOrder.deliveredOrderDate, deliveredOrderTime: deliveredOrder.deliveredOrderTime }
        //     };
        //     const result = await ordersCollection.updateOne(filter, updateDoc, options);
        //     res.send(result);
        // });

        // /* update order Fake order status api */
        // app.put('/fakeOrderStatus/:id', verifyJWT, async (req, res) => {
        //     const fakeOrder = req.body;
        //     const id = req.params.id;
        //     const filter = { _id: ObjectId(id) };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: { fakeOrderStatus: 'Fake Order', fakeOrderDate: fakeOrder.fakeOrderDate, fakeOrderTime: fakeOrder.fakeOrderTime }
        //     };
        //     const result = await ordersCollection.updateOne(filter, updateDoc, options);
        //     res.send(result);
        // });

        // /* Update order status feild only */
        // app.put('/updateOrderStatus/:id', verifyJWT, verifyAdmin, async (req, res) => {
        //     const info = req.body;
        //     const id = req.params.id;
        //     const filter = { _id: ObjectId(id) };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //         $set: {
        //             status: info.status
        //         }
        //     };
        //     const result = await ordersCollection.updateOne(filter, updateDoc, options);
        //     res.send(result);
        // })


        /* post user info api */
        /*      app.patch('/user/:id', async (req, res) => {
                 const _id = req.params._id;
                 const updateInfo = req.body;
                 const filter = { _id: ObjectId(_id) };
                 const updateDoc = {
                     $set: {
     
                     }
                 }
                 const updateProfileInfo = await usersCollection.updateOne(filter, updateDoc);
                 res.send(updateProfileInfo);
             }); */

        /*   console.log(date_ob);
          let minutes = date_ob.getMinutes();
          let hours = date_ob.getHours();
          console.log(hours) */

    }
    finally {

    }
}
run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send((`hello from Mahsez_server ${port}`));
});

app.all("*", (req,res) =>{
    res.send('No Route Found')
});

app.listen(port, () => {
    console.log(`Mahsez_server app listening on port${port})`);
});







































/* 

function sendOrderEmail(newOrder) {
    const { name, email, productName } = newOrder;
    const transporter = nodemailer.createTransport(
        new Transport({ apiKey: process.env.Brevo_API_KEY })
    );
       const transporter = nodemailer.createTransport({
           host: "smtp.forwardemail.net",
           port: 465,
           secure: true,
           auth: {
               user: 'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
               pass: process.env.Brevo_API_KEY
           }
       });
    transporter.sendMail({
        from: 'hasanalipersonal720@gmail.com', 
        to: email,
        subject: `Place yoru order ${productName}`,
        text: "Hello world?",
        html: `
        <h4>Your order is panding</h4>
        <div>
        <p>আপনার অর্ডারটি কনফার্ম করার জন্য আপনাকে ফোন করা হবে।</p>
        </div>
        `
    });
    console.log("Message sent: %s",);
}
*/