import * as mongoose from "mongoose";

const uri: string = "mongodb+srv://alastor:nuwqen-4jaqNu-fuzkoh@cluster0-1z5qu.mongodb.net/test?retryWrites=true&w=majority";
// https://tutorialedge.net/typescript/typescript-mongodb-beginners-tutorial/

mongoose.connection.on("open", function (ref) {
  return console.log("Connected to mongo server!");
});

mongoose.connection.on("error", function (err) {
  console.log("Could not connect to mongo server!");
  return console.log(err.message);
});

mongoose.connect(uri, { useNewUrlParser: true });

export interface IMember extends mongoose.Document {
  id: string;
  name: string;
  title: string;
  description: string;
  cash: number;
  bank: number;
  experience: number;
  level: number;
  reputation: number;
}

export const MemberSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, required: false, default: '' },
  description: { type: String, required: false, default: 'hi there OwO!' },
  cash: { type: Number, required: false, default: 100 },
  bank: { type: Number, required: false, default: 0 },
  experience: { type: Number, required: false, default: 0 },
  level: { type: Number, required: false, default: 0 },
  reputation: { type: Number, required: false, default: 0 }
});

const Member = mongoose.model<IMember>("Member", MemberSchema);
export default Member;