const express = require('express');
const BookModel = require('../models/books');
const RateBookModel = require('../models/ratebooks');
const ShelvBooks = require('../models/shelvbooks');
const router = express.Router();

// router.get('/', (req, res, next) => {
//     return BookModel.find({}).populate('book_id','name', 'image', 'category', 'author').exec((err, posts) => {
//         if (err) return res.send(err);
//         res.json(posts);
//     });
// });
// router.get('/:id', (req, res, next) => {
//     return PostModel.findById(req.params.id).populate('auther_id', ['firstName', 'lastName']).exec((err, posts) => {
//         if (err) next(err);
//         res.json(posts);
//     });
// });
router.post('/', async(req, res, next) => {
    try {
        const { name, image, category, author } = req.body;
        const book = await BookModel.create({
            name, 
            image, 
            category, 
            author
        });
        res.send(book)
    } catch{
        next("Erorr while adding a book");
    }
});

router.patch('/:id', async(req, res, next) => {
    try {
        const book = await BookModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        if (!book) next("book not found");
        else res.json(book);
    } catch{
        next("Error in editing book")
    }
});

router.delete('/:id', async(req, res, next) => {
    try {
        const book = await BookModel.findByIdAndDelete(req.params.id);
        if (!book) next("book not found");
        else res.json(book);
    } catch{
        next("Error in removing book")
    }
});

router.post('/rate', async(req, res, next) => {
    try {
        const { rate,user,book } = req.body;
        options = { upsert: true, new: true, setDefaultsOnInsert: true }; 
        bookRate=await RateBookModel.findOneAndUpdate({user,book},{ rate,user,book },options);
        res.send(bookRate)
    } catch(err){
        next(err);
    }
});

router.post('/shelf', async(req, res, next) => {
    try {
        const { state,user,book } = req.body;
        options = { upsert: true, new: true, setDefaultsOnInsert: true }; 
        bookState=await ShelvBooks.findOneAndUpdate({user,book},{ state,user,book },options);
        res.send(bookState)
    } catch(err){
        next(err);
    }
});

router.get('/rate', async(req, res, next) => {
    try {
        const {user,book } = req.body;
        bookState=await ShelvBooks.find({user,book});
        res.send(bookState)
    } catch(err){
        next(err);
    }
});

router.get('/shelf', async(req, res, next) => {
    try {
        const {user,book } = req.body;
        bookState=await ShelvBooks.find({user,book});
        res.send(bookState)
    } catch(err){
        next(err);
    }
});

router.use((err, req, res, next) => {
    res.send("oh no there is some thing wrong happend :( \n" + err);
});

module.exports = router;