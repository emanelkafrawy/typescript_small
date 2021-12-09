import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/typescripttest')
.then(db => console.log('db connected successfully'))
.catch(err => console.log(err))
