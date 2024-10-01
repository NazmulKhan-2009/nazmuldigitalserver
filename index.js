const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
const nodemailer =require('nodemailer')
require('dotenv').config()

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.swu9d.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const uri=`mongodb+srv://nkadmin:nazifa---9@cluster0.qnbwm.mongodb.net/nazmulinmarket?retryWrites=true&w=majority`

const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('doctors'));
app.use(fileUpload());

// const port = 3000;
const port=process.env.PORT ||3000

// Email Setup start
// UNIQUE WEB MEDIA INFO(INFOL@INMARKETDIGITAL.COM)
let transporter_uwmInfo = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    host: 'smtp.hostinger.com',
    // port: 587,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
     user: 'info@inmarketdigital.com', // Admin Gmail Id
     pass:'Nazif@98531309'      
    },
  })
  
  // inmarket digital INFO(NAZMUL@INMARKETDIGITAL.COM)
  let transporter_nazmul = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    host: 'smtp.hostinger.com',
    // port: 587,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
     user: 'nazmul@inmarketdigital.com', // Admin Gmail Id
     pass:'Nazifinmar@98531309'      
    },
  })

  let transporter_nazmuldigital_info = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    host: 'smtp.hostinger.com',
    // port: 587,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
     user: 'info@nazmuldigital.com', // Admin Gmail Id
     pass:'Nazifinfo@98531309'      
    },
  })

  let transporter_nazmuldigital = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    host: 'smtp.hostinger.com',
    // port: 587,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
     user: 'nazmul-digital@nazmuldigital.com', // Admin Gmail Id
     pass:'Nazifnazmu@98531309'      
    },
  })
// Email Setup end

app.get('/', (req, res) => {
    res.send("hello from db it's working working")
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    
    const messageCollection = client.db("nazmulinmarket").collection("formmessage");
    const newsLetterCollection = client.db("nazmulinmarket").collection("newsletter");


// Message receive from nazmul.inmarketdigital.com start
app.post('/message', (req, res) => {
    console.log(req.body)

    const name = req.body.name;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const subject = req.body.subject;
    const textarea=req.body.textarea;
    const checkmesssage="unread"

    

    messageCollection.insertOne({ name,email,telephone,subject,textarea,checkmesssage})
        .then(result => {

            async function mess (){
                let info = await transporter_nazmuldigital.sendMail({
                    from: "nazmul-digital@nazmuldigital.com",
                    // to: email,
                    bcc: email,
                    subject: `Reply- ${subject}`,
                    html: `<h3><span style="color: crimson;">Hi ${req.body.name}</span>,<br><br> Thank you, <br><br>I’ve received your message! <br><br>I’ll reach out to you shortly.</h3>
                    
                    <p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<hr />
<div style="display: flex; align-items: center; font-family: Arial, sans-serif; max-width: 600px;">
<div style="flex-shrink: 0; margin-right: 15px;"><img style="border-radius: 10%;" src="https://nazmuldigital.com/wp-content/uploads/2024/10/nazmulhk.jpg" width="100" height="100"/></div>
<div>
<p style="margin: 0; font-size: 16px; color: crimson; font-weight: bold;">Nazmul Hossain</p>
<p style="margin: 0; font-size: 12px; color: #555; font-weight: bold;">Web Developer &amp; Marketing Expert</p>
<p style="margin: 0; font-size: 14px; color: #555;">Phone: +880 161-298-5380</p>
<p style="margin: 0; font-size: 14px; color: #555;">Email: <a style="color: #555; text-decoration: none;" href="mailto:youremail@example.com">info@nazmuldigital.com</a></p>
<p style="margin: 0; font-size: 14px; color: #555;">www.nazmuldigital.com</p>
</div>
</div>`
                  })
                  if(info.accepted.length>0){
                    let info = await transporter_nazmuldigital.sendMail({
                      from: "nazmul-digital@nazmuldigital.com",
                      // to: email,
                      bcc: ["nazmulnazif18@gmail.com" , "nazmulustc09@gmail.com" , "info@nazmuldigital.com" , "nazmulustc09@outlook.com" , "nazmulustc09@yahoo.com"],
                      subject: "User Message",
                    //   html: `<h3>Please check the user message, Info- ${email}| ${name}</h3>`
                      html: `<h3>Hey Nazmul <br><br> Please Check Bellow Message</h3>
                    
                   


<hr />
<div style="display: flex; align-items: center; font-family: Arial, sans-serif; max-width: 600px;">

<div>
<p style="margin: 0; font-size: 16px; color:  #555; font-weight: bold;"><span style="color: crimson; font-weight: bold;">Name: </span>${name}</p>
<p style="margin: 0; font-size: 14px; color: #555; font-weight: bold;"><span style="color: crimson; font-weight: bold;">Email: </span> ${email}</p>
<p style="margin: 0; font-size: 14px; color: #555;"><span style="color: crimson; font-weight: bold;">Phone: </span>${telephone}</p>
<p style="margin: 0; font-size: 14px; color: #555;"><span style="color: crimson; font-weight: bold;">Subject: </span>${subject} </p>
<p style="margin: 0; font-size: 14px; color: #555;"><span style="color: crimson; font-weight: bold;">Message:</span> ${textarea}</p>
<p style="margin: 0; font-size: 14px; color: #555;"><span style="color: crimson; font-weight: bold;">Status: </span>${checkmesssage}</p>
</div>
</div>`
                    })
                    if(info.accepted.length>0){
                    //   res.send("your Email has sent")
                    res.send({name:`Thank you ${req.body.name}, I’ve received your message!  I’ll reach out to you shortly.`})
                    }
                    
                  }
            }
            
            mess()

            // res.send({name:`Thank you ${req.body.name}, I have received your message`})
        })
})

app.post('/newsLetter', (req, res) => {
    console.log(req.body)

    
    const email = req.body.email;
    

    newsLetterCollection.insertOne({email})
        .then(result => {
            
            res.send({name:"Thank you, your email has been stored successfully"})
        })
})

app.get('/messagelist', (req, res) => {
    messageCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
});

app.get('/newsletterlist', (req, res) => {
    newsLetterCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
});

app.patch('/checkmesssage/:id', (req, res) => {
    
    const ObjectId = require('mongodb').ObjectId;
    const id = req.params.id;
        const { checkmessage } = req.body;
        console.log(id)


        messageCollection.updateOne({_id:new ObjectId(id)}, // Find the document by ID
        { $set: { checkmessage } }, // Update checkmessage field
        (err, result) => {
            if (err) {
                res.status(500).send({ message: 'Error updating message', error: err });
            } else if (result.matchedCount === 0) {
                res.status(404).send({ message: 'Message not found' });
            } else {
                res.status(200).send({ message: 'Checkmessage updated successfully' });
            }
        })

});


// Message receive from nazmul.inmarketdigital.com end

    

});


// app.listen(process.env.PORT || port)


app.listen( port , ()=>console.log(`Server listening from  ${port}`)) ;
