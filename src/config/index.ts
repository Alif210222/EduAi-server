// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: path.join(process.cwd(), '.env') });

// export default {
//   port: process.env.PORT,
//   database_url: process.env.DATABASE_URL,

//    jwt_access_secret:
//     process.env.JWT_ACCESS_SECRET as string,

//   jwt_refresh_secret:
//     process.env.JWT_REFRESH_SECRET as string,

//   jwt_access_expires:
//     process.env.JWT_ACCESS_EXPIRES as string,

//   jwt_refresh_expires:
//     process.env.JWT_REFRESH_EXPIRES as string,
// };


import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,

  jwt_access_secret:
    process.env.JWT_ACCESS_SECRET as string,

  jwt_refresh_secret:
    process.env.JWT_REFRESH_SECRET as string,

  jwt_access_expires:
    process.env.JWT_ACCESS_EXPIRES as
      `${number}${"s" | "m" | "h" | "d"}`,

  jwt_refresh_expires:
    process.env.JWT_REFRESH_EXPIRES as
      `${number}${"s" | "m" | "h" | "d"}`,
};


