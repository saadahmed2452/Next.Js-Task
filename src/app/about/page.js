import { resolve } from "styled-jsx/css";

// const async TakeTime = () => {
//      await new Promise ((resolve)=>{
//         setTimeout(resolve, 3000);
//     });

// }

async function TakeTime() {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
}

export default async function About() {
  await TakeTime();
  // throw new Error("This is created error");

  return (
    <>
      <div>
        <h1>this is about page</h1>
      </div>
    </>
  );
}
