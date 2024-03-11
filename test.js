const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { EMAIL, PASSWORD } = require('../env.js')

/** send mail from testing account */
// const signup = async (req, res) => {

//     /** testing account */
//     let testAccount = await nodemailer.createTestAccount();

//       // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: testAccount.user, // generated ethereal user
//             pass: testAccount.pass, // generated ethereal password
//         },
//     });

//     let message = {
//         from: '"Fred Foo 👻" <foo@example.com>', // sender address
//         to: "bar@example.com, baz@example.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Successfully Register with us.", // plain text body
//         html: "<b>Successfully Register with us.</b>", // html body
//       }


//     transporter.sendMail(message).then((info) => {
//         return res.status(201)
//         .json({
//             msg: "you should receive an email",
//             info : info.messageId,
//             preview: nodemailer.getTestMessageUrl(info)
//         })
//     }).catch(error => {
//         return res.status(500).json({ error })
//     })

//     // res.status(201).json("Signup Successfully...!");
// }

/** send mail from real gmail account */
const getbill = (req, res) => {

    const { userEmail } = req.body;
    let config = {
        service : 'gmail',
        auth : {
            user: EMAIL,
            pass: PASSWORD
        }
    }
    let transporter = nodemailer.createTransport(config);
    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : "from tom-blog-post team",
            intro: "You have Successfully created an account",
            table : {
                data : [
                    {
                        from : "tom-blog-post",
                        confirm: "'https://tom-blog-post.onrender.com/api/signup/confirm",
                        expires: "after 1 hour",
                    }
                ]
            },
            outro: "Enjoy our Website, and don't hesitate to contribute you work with us. so that everyone can see"
        }
    }
    let mail = MailGenerator.generate(response)

    let message = {
        from : 'thomaskitabadiary@gmail.com',
        to : 'thomaskitab@gmail.com',
        subject: "Confirem your Account",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("getBill Successfully...!");
}


module.exports = {
    signup,
    getbill
}