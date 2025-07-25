// import { NextResponse } from "next/server";

// const responseMess = (message, statusCode, succesStatus) => {
//   return NextResponse.json(
//     {
//       message: message,
//       success: succesStatus,
//     },
//     {
//       status: statusCode,
//     }
//   );
// };

// export default responseMess;

// helper/responseMess.js
import { NextResponse } from "next/server";

const responseMess = (message, statusCode, succesStatus) => {
  return NextResponse.json(
    {
      message, // Shorthand for message: message
      success: succesStatus,
    },
    {
      status: statusCode,
    }
  );
};

export default responseMess;
