const figlet =require("figlet");
async function doStuff() {
  const text = await figlet.text("Hello World!!");
  console.log(text);
}

doStuff();