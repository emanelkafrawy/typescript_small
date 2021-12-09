import {Schema, model, Document} from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document{
    username: string;
    email: string;
    password: string;
    encryptmethod(password: string): Promise<string>;
    validatepassword(password: string): Promise<boolean>
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    }
})
userSchema.methods.encryptmethod = async(password: string): Promise<string> =>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt)
}
userSchema.methods.validatepassword = async function(password: string): Promise<boolean>{
    return await bcrypt.compare(password, this.password);  //this. ->from the schema

}

export default model<IUser>('User', userSchema)