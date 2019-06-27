import * as mongoose from "mongoose";

const uri: string = "mongodb+srv://alastor:nuwqen-4jaqNu-fuzkoh@cluster0-1z5qu.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connection.on("open", function (ref) {
  return console.log("Connected to mongo server!");
});

mongoose.connection.on("error", function (err) {
  console.log("Could not connect to mongo server!");
  return console.log(err.message);
});

mongoose.connect(uri, { useNewUrlParser: true });

export interface IGuild extends mongoose.Document {
  _id: string;
  name: string;
  owner: string;
  createdAt: Date;
  joinedAt: Date;
  icon: string;
  adminRole: string;
  moderatorRole: string;
  color: string;
  notificationChannel: string;
  botChannel: string;
}

export const GuildSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  owner: { type: String, required: true },
  createdAt: { type: Date, required: true },
  joinedAt: { type: Date, required: true },
  icon: { type: String },
  adminRole: { type: String },
  moderatorRole: { type: String },
  color: { type: String },
  notificationChannel: { type: String },
  botChannel: { type: String },
});

const dbGuild = mongoose.model<IGuild>("Guild", GuildSchema);
export default dbGuild;