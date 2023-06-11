const { application, response } = require('express');
const express = require('express');
const cookieParser = require('cookie-parser')
const brand = require('../model/brandSchema');
const router = express.Router();
const bcrypt = require('bcryptjs')
require('../db/conn');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const brands = require("../model/brandSchema");
const influencer = require("../model/influencerSchema");
const admin = require("../model/adminSchema");
const categories = require("../model/categoriesSchema");
const queries = require("../model/queriesSchema");
const invitations = require("../model/invitationsSchema");
const influencerAuthenticate = require('../middleware/influencerAuthenticate.js');
const brandAuthenticate = require('../middleware/brandAuthenticate');
const adminAuthenticate = require('../middleware/adminAuthenticate');
const { ObjectId } = require('mongodb');
router.use(cookieParser())
router.use(express.json())
router.get('/', (req, res) => {
    res.send('Hello world');
});

router.use(cookieParser())


// BRANDS

router.post('/brand-registration', async (req, res) => {


    const { fname, lname, company, Designation, companyEmail, contactNo, password, accepted } = req.body;
    console.log(req.body)
    try {
        const brandExists = await brands.findOne({ companyEmail: companyEmail });
        if (brandExists) {
            return res.status(422).json({ error: "Email already exists" });
        }
        const brandss = new brand({ fname, lname, company, Designation, companyEmail, contactNo, password, accepted });
        const brandRegistered = await brandss.save();
        if (brandRegistered) {
            return res.status(201).json({ message: "User Registered Successfully" });
        }

    } catch (err) {
        console.log(err);
    }
});

router.patch('/brand-registration', async (req, res) => {

    const { companyEmail, companyWebsite, companySize, companyType, industry, state, city, brandLogo, category } = req.body;

    try {
        const brandExists = await brand.findOne({ companyEmail: companyEmail });
        if (brandExists) {

            await brand.updateOne({ companyEmail: companyEmail }, { $set: { companyEmail: companyEmail, companyWebsite: companyWebsite, companySize: companySize, companyType: companyType, industry: industry, state: state, city: city, brandLogo: brandLogo, category: category } });
            return res.status(201).json({ message: "Details Entered Successfully" })
        } else {
            return res.status(422).json({ error: "Details not saved" })
        }
    } catch (err) {
        console.log(err)
    }


});

router.get('/brand-registration', async (req, res) => {


    categories.find((error, value) => {
        if (error) {
            console.log(error);
        } else {
            return res.json(value)

        }
    })
})

router.post('/brand-login', async (req, res) => {

    try {
        const { companyEmail, password } = req.body;
        if (!companyEmail || !password) {
            return res.status(400).json({ error: "Please Enter Data" })
        }
        const brandLogin = await brand.findOne({ companyEmail: companyEmail });
        if (brandLogin) {
            const isMatch = await bcrypt.compare(password, brandLogin.password);
            if (!isMatch) {
                res.status(400).json({ error: "Invalid Creds - Wrong Password" });
            } else {
                const token = await brandLogin.generateAuthToken();
                res.cookie("brandToken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                })
                res.status(201).json({ error: "Login Successfull" });
            }
        } else {
            res.status(400).json({ error: "Email Does not exist" });
        }
    } catch (err) {
        console.log(err);
    }
});

router.get('/brand-dashboard', brandAuthenticate, async (req, res) => {

    brandCategory = req.brandUser.companyType
    var brandSubCat = await categories.findOne({ category: brandCategory })
    var cat = await categories.find()
    let response = [req.brandUser]
    try {

        let recommendaions = []
        let result = await influencer.find({ accepted: 1, category: { $in: brandSubCat.subCategory } }).sort({ engagementRate: -1, followers: -1 });

        for (let i = 0; i < result.length && i < 9; i++) {
            recommendaions.push(result[i]);
        }
        console.log(recommendaions)
        response.push(recommendaions)
        response.push(cat)

    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching fashion influencers');
    }

    let count = await influencer.countDocuments({});
    let a = [req.brandUser.companyEmail, "Brand", req.brandUser.companySize, req.brandUser.companyType, req.brandUser.city, req.brandUser.state, req.brandUser.company ]
    console.log(a)
    var invitationsRecieved = await invitations.find({to: a}).cursor().toArray()
    var invitationsSent = await invitations.find({from: a}).cursor().toArray()

    
    response.push(count);
    response.push(invitationsRecieved)
    response.push(invitationsSent)
    console.log(invitationsSent)
    console.log(invitationsRecieved)
    res.send(response);
})

router.post("/brand-dashboard-search", async (req, res) => {

    const { text, engagementRate, followers, city, state, filterCategories } = req.body
    let query = {}
    if (text != "") {

        query.$text = { $search: text }
    }
    if (engagementRate === -1) {
        query.$sort = { engagementRate: -1 }
    }
    if (followers === -1) {
        if (engagementRate === -1) {
            query.$sort = { engagementRate: -1, followers: -1 }
        } else {
            query.$sort = { followers: -1 }
        }
    }
    if (city != "") {
        query.city = { $regex: city, $options: "i" }
    }
    if (state != "") {
        query.state = { $regex: state, $options: "i" }
    }
    if (filterCategories.length != 0) {
        query.category = { $in: filterCategories }
    }

    var results = influencer.find(query)
    var a = await results.cursor().toArray()
    res.send(a)


})

router.post("/influencer-dashboard-search", async (req, res) => {

    const { text, companySize, city, state, filterCategories } = req.body
    let query = {}
    if (text != "") {

        query.$text = { $search: text }
    }
    if (companySize!="") {
        query.companySize = companySize
    }
    if (city != "") {
        query.city = city
    }
    if (state != "") {
        query.state = state
    }
    if (filterCategories.length != 0) {
        query.companyType = { $in: filterCategories }
    }
    console.log(query)
    var results = brand.find(query)
    var a = await results.cursor().toArray()
    console.log("_______________________________")
    console.log(a)
    res.send(a)
})


router.post('/brand-dashboard', async (req, res) => {


    const { from, entityType, contactEmail, contactNo, dateOfQuery, status, query } = req.body;
    console.log(req.body)
    try {

        const quer = new queries({ from, entityType, contactEmail, contactNo, dateOfQuery, status, query });
        const queryRaised = await quer.save();
        if (queryRaised) {
            return res.status(201).json({ message: "Query Raised Successfully" });
        }

    } catch (err) {
        console.log(err);
    }
});

router.put('/brand-profile-page/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const subcat = req.body.selectedSubcategories;
        console.log(id);
        console.log(subcat);
        const objectId = new ObjectId(id);
        const brandProfileExists = await brands.findOne({ _id: objectId });
        if (brandProfileExists) {
            await brands.updateOne({ _id: objectId }, { $set: { category: subcat } });
            console.log(`Document with ID ${id} updated successfully from Influencers`);
            res.status(200).send();
        } else {
            res.status(404).send('Brand profile not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating brand profile');
    }
});

router.put('/influencer-profile-page/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const subcat = req.body.selectedSubcategories;
        console.log(id);
        console.log(subcat);
        const objectId = new ObjectId(id);
        const influencerProfileExists = await influencer.findOne({ _id: objectId });
        if (influencerProfileExists) {
            await influencer.updateOne({ _id: objectId }, { $set: { category: subcat } });
            console.log(`Document with ID ${id} updated successfully from Influencers`);
            res.status(200).send();
        } else {
            res.status(404).send('Brand profile not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating brand profile');
    }
});







//INFLUENCERS

router.post('/influencer-registration', async (req, res) => {


    const { fname, lname, DOB, age, instaURL, email, contactNo, password, accepted } = req.body;
    console.log(req.body)
    try {
        const influencerExists = await influencer.findOne({ email: email });
        if (influencerExists) {
            console.log(" exists")
            return res.status(422).json({ error: "Email already exists" });
        }
        const influencers = new influencer({ fname, lname, DOB, age, instaURL, email, contactNo, password, accepted });
        const influencerRegistered = await influencers.save();
        if (influencerRegistered) {
            return res.status(201).json({ message: "User Registered Successfully" });
        }

    } catch (err) {
        console.log(err);
    }
});

router.patch('/influencer-registration', async (req, res) => {
    const { email, instaID, followers, likes, views, engagementRate, state, city, category } = req.body;
    try {
        const influencerExists = await influencer.findOne({ email: email });
        if (influencerExists) {
            await influencer.updateOne({ email: email }, { $set: { email: email, instaID: instaID, followers: followers, likes: likes, views: views, engagementRate: engagementRate, state: state, city: city, category: category } });
            return res.status(201).json({ message: "Details Entered Successfully" })
        } else {
            cosole.log("Influencer doesnot exist")
            return res.status(422).json({ error: "Details not saved" })
        }

    } catch (err) {
        console.log(err)
    }

});



router.get('/influencer-registration', async (req, res) => {

    categories.find((error, value) => {
        if (error) {
            console.log(error);
        } else {
            return res.json(value)

        }
    })
})

router.post('/influencer-login', async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please Enter Data" })
        }
        const influencerLogin = await influencer.findOne({ email: email });
        if (influencerLogin) {
            const isMatch = await bcrypt.compare(password, influencerLogin.password);

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Creds - Wrong Password" });
            } else {
                const token = await influencerLogin.generateAuthToken();
                res.cookie("influencerToken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                })
                res.status(201).json({ error: "Login Successfull" });
            }
        } else {
            res.status(400).json({ error: "Email Does not exist" });
        }
    } catch (err) {
        console.log(err);
    }
});


router.get('/influencer-dashboard', influencerAuthenticate, async (req, res) => {
    console.log(req.influencerUser)
    influencerCategory = req.influencerUser.category
    var cat = await categories.find()

    let response = [req.influencerUser]
    try {
        let recommendaions = []
        let result = await brands.find({ accepted: 1, category: { $in: influencerCategory } });

        for (let i = 0; i < result.length && i < 9; i++) {
            recommendaions.push(result[i]);
        }
        console.log(recommendaions)
        response.push(recommendaions)
        response.push(cat)

    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching brands');
    }

    let count = await brands.countDocuments({});
    let a = [req.influencerUser.email, "Influencer", req.influencerUser.engagementRate, req.influencerUser.followers, req.influencerUser.city, req.influencerUser.state, req.influencerUser.fname, req.influencerUser.lname]
    console.log(a)
    var invitationsRecieved = await invitations.find({to: a}).cursor().toArray()
    var invitationsSent = await invitations.find({from:  a}).cursor().toArray()
    response.push(count);
    response.push(invitationsRecieved)
    response.push(invitationsSent)
    console.log(invitationsSent)
    console.log(invitationsRecieved)
    
    res.send(response);
})

router.post('/influencer-dashboard', async (req, res) => {


    const { from, entityType, contactEmail, contactNo, dateOfQuery, status, query } = req.body;
    console.log(req.body)
    try {

        const quer = new queries({ from, entityType, contactEmail, contactNo, dateOfQuery, status, query });
        const queryRaised = await quer.save();
        if (queryRaised) {
            return res.status(201).json({ message: "Query Raised Successfully" });
        }

    } catch (err) {
        console.log(err);
    }
});

//ADMIN

router.post('/admin-registration', async (req, res) => {
    const { fname, lname, Designation, companyEmail, contactNo, password } = req.body;
    if (!fname || !lname || !Designation || !companyEmail || !contactNo || !password) {
        return res.status(422).json({ error: "please enter data" })
    }
    try {
        const adminExists = await admin.findOne({ companyEmail: companyEmail });
        if (adminExists) {
            return res.status(422).json({ error: "Email already exists" });
        }
        const admins = new admin({ fname, lname, Designation, companyEmail, contactNo, password });
        const adminRegistered = await admins.save();
        if (adminRegistered) {
            return res.status(201).json({ message: "User Registered Successfully" });
        }
    } catch (err) {
        console.log(err);
    }

});



router.post('/admin-login', async (req, res) => {
    try {
        const { companyEmail, password } = req.body;
        if (!companyEmail || !password) {
            return res.status(400).json({ error: "Please Enter Data" })
        }

        const adminLogin = await admin.findOne({ companyEmail: companyEmail });

        if (adminLogin) {

            const isMatch = await bcrypt.compare(password, adminLogin.password);
            if (!isMatch) {
                res.status(400).json({ error: "Invalid Creds - Wrong Password" });
            } else {
                const token = await adminLogin.generateAuthToken();
                res.cookie("adminToken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                })

                res.status(201).json({ error: "Login Successfull" });
            }
        } else {
            res.status(400).json({ error: "Email Does not exist" });
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/admin-dashboard', async (req, res) => {
    try {
        const { category, subCategory } = req.body;
        console.log(req.body)
        if (!category || !subCategory) {
            console.log("Enter data")
            return res.status(400).json({ error: "Please Enter Data" })
        }

        const categoryExists = await categories.findOne({ category: category });
        if (categoryExists) {
            console.log("1")
            return res.status(422).json({ error: "Category already exists" });
        }



        const cat = new categories({ category, subCategory });
        console.log(cat)

        const categoryRegistered = await cat.save();
        if (categoryRegistered) {
            return res.status(201).json({ message: "category Registered Successfully" });
        }
    } catch (err) {
        console.log(err);
    }
})

//router.get('/admin-dashboard', adminAuthenticate, (req, res) => {
//    console.log(req.adminUser)
//    res.send(req.adminUser)
//})


router.get('/admin-dashboard', async (req, res) => {
    let combinedResult = []
    const brand = brands.find();
    brand.exec((err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'An error occurred while fetching brands' })
        } else {
            combinedResult.push(results)
            const influencers = influencer.find();

            influencers.exec((err2, results2) => {
                if (err2) {
                    console.log(err2)
                    return res.status(500).json({ error: 'An error occurred while fetching influencers' })
                } else {
                    combinedResult.push(results2)
                    const query = queries.find();

                    query.exec((err3, results3) => {
                        if (err3) {
                            console.log(err3)
                            return res.status(500).json({ error: 'An error occurred while fetching queries' })
                        } else {
                            combinedResult.push(results3)
                            return res.json(combinedResult)
                        }
                    });
                }
            });
        }
    });
});

router.get("/admin-logout", (req, res) => {

    console.log("Admin Logout");
    res.clearCookie("adminToken", { path: '/admin-login' })
    res.status(200);

});

router.get("/brand-logout", (req, res) => {

    console.log("Brand Logout");
    res.clearCookie("brandToken", { path: '/brand-login' })
    res.status(200);

});

router.get("/influencer-logout", (req, res) => {

    console.log("Influencer Logout");
    res.clearCookie("influencerToken", { path: '/influencer-login' })
    res.status(200);

});

router.put("/admin-dashboard/:id", async (req, res) => {
    try {
        const Id = req.params.id;
        console.log(Id)
        const objectId = new ObjectId(Id);

        const influencerExists = await influencer.findOne({ _id: objectId });
        const brandExists = await brand.findOne({ _id: objectId });
        const queryExists = await brand.findOne({ _id: objectId });
        if (influencerExists) {
            influencer.updateOne({ _id: objectId }, { $set: { accepted: "1" } }, function (err, result) {
                if (err) {
                    brands.updateOne({ _id: objectId }, { $set: { accepted: "1" } }, function (err, result) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(`Document with ID ${Id} updated successfully from Brands`);
                        }
                    })
                } else {
                    console.log(`Document with ID ${Id} updated successfully from Influencers`);
                }
            });
        } else if (brandExists) {
            brands.updateOne({ _id: objectId }, { $set: { accepted: "1" } }, function (err, result) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Document with ID ${Id} updated successfully from Brands`);
                }
            })
        } else if (queryExists) {
            queries.updateOne({ _id: objectId }, { $set: { status: "1" } }, function (err, result) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Document with ID ${Id} updated successfully from Query`);
                }
            })
        }


    } catch (err) {
        console.log(err)
    }
})

router.delete("/admin-dashboard/:id", async (req, res) => {
    try {
        const Id = req.params.id;
        console.log(Id)
        const objectId = new ObjectId(Id);

        const entityExists = await influencer.findOne({ _id: objectId });

        if (entityExists) {
            influencer.deleteOne({ _id: objectId }, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`Document with ID ${Id} deleted successfully from Influencers`);
                }
            });
        } else {

            brands.deleteOne({ _id: objectId }, function (err, result) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Document with ID ${Id} deleted successfully from Brands`);
                }
            })
        }
    } catch (err) {
        console.log(err)
    }


})

router.post("/brand-dashboard-invite", async (req, res) => {

    try{
        const { to, from, status } = req.body;
        console.log(req.body)
        const invitationExists = await invitations.findOne({
            to: to,
            from: from
        })

        console.log(invitationExists)

        if (invitationExists) {
            return res.status(422).json({message:"Invitation sent already"})
        }else{
            
            const invitation = new invitations({ to, from, status })
            const invitationSent = await invitation.save();
            if (invitationSent) {
                return res.status(201).json({ message: "Invitation sent successfully" })
            }
        }
    }catch(err){
        console.log(err)
    }


})

router.post("/influencer-dashboard-invite", async (req, res) => {

    try{
        const { to, from, status } = req.body;
        console.log(req.body)
        const invitationExists = await invitations.findOne({
            to: to,
            from: from
        })

        console.log(invitationExists)

        if (invitationExists) {
            return res.status(422).json({message:"Invitation sent already"})
        }else{
            
            const invitation = new invitations({ to, from, status })
            const invitationSent = await invitation.save();
            if (invitationSent) {
                return res.status(201).json({ message: "Invitation sent successfully" })
            }
        }
    }catch(err){
        console.log(err)
    }


})


module.exports = router;






