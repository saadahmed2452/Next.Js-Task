// import mongoose from "mongoose";

// const config = {
//   isConnected: 0,
// };

// export const connectDB = async () => {
//   if (config.isConnected) {
//     return;
//   }

//   try {
//     const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
//       dbName: "Practice",
//     });

//     config.isConnected = connection.readyState;

//     console.log(connection.readyState);

//     console.log("Db Connected...");
//     // console.log(connection);

//     // const Users = new User({
//     //     name : "test name",
//     //     email: "test@gmail.com",
//     //     password: "testPassword",
//     //     about: "this is testing"
//     // });
//     // await Users.save();

//     console.log("connected with host", connection.host);
//   } catch (error) {
//     console.log("failted to connect with DB");
//     console.log(error);
//   }
// };


// // helper/db.js
// import mongoose from "mongoose";

// const config = {
//   isConnected: 0,
// };

// export const connectDB = async () => {
//   if (config.isConnected) {
//     console.log("DB already connected."); // Informative log
//     return;
//   }

//   try {
//     const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
//       dbName: "Practice",
//       // Add recommended options for new connections:
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,
//       // useCreateIndex: true, // Deprecated in recent Mongoose versions, usually not needed.
//       // useFindAndModify: false, // Deprecated in recent Mongoose versions.
//     });

//     config.isConnected = connection.readyState;
//     console.log(`DB Connected: ${connection.host}, State: ${connection.readyState}`);
//   } catch (error) {
//     console.error("Failed to connect to DB:", error); // Use console.error for errors
//     process.exit(1); // Exit process if DB connection fails on startup (consider graceful shutdown in production)
//   }
// };


import mongoose from "mongoose";

const config = {
  isConnected: 0,
};

export const connectDB = async () => {
  console.log("📡 Attempting DB connection...");
  console.log("🔐 MONGO_DB_URL:", process.env.MONGO_DB_URL ? "✔️ exists" : "❌ MISSING");

  if (config.isConnected) {
    console.log("✅ DB already connected.");
    return;
  }

  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "Practice",
    });

    config.isConnected = connection.readyState;
    console.log(`✅ DB Connected: ${connection.host}, State: ${connection.readyState}`);
  } catch (error) {
    console.error("❌ Failed to connect to DB:", error.message);
    process.exit(1);
  }
};









