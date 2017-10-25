const readline = require('readline');
const fs = require('fs');

let data = fs.readFileSync('data.json', 'utf8');

data=JSON.parse(data)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let next = 0;
let count =0
rl.setPrompt('tebakan:')
console.log('selamat datang dipermainan tebak kata,silahkan isi dengan jawaban yang benar ya!');
console.log(`pertanyaan : ${data[next].definition}`);
rl.prompt()

rl.on('line', (answer) => {
  if(answer.trim().toLowerCase() == "skip"){
    data.push(data[next])
    next++;
    console.log(`\npertanyaan : ${data[next].definition}`);
  //if jawaban benar
}else{
  if(answer.trim().toLowerCase() == data[next].term.toLowerCase()){
    console.log('anda benar');
    next++;

  //check soal habis
  if(data.length > next){
    console.log(`pertanyaan : ${data[next].definition}`);
    rl.prompt();
  }else{ //soal habis
    console.log('anda menang');
    rl.close();
  }
}else{  //kalau ngga bener
  count++;
  console.log(`\nanda kurang beruntung! anda telah salah ${count} kali,silahkan coba lagi`);
}
}
rl.prompt();
  }).on('close', () => {
    console.log('good bye');
    process.exit(0);
  });
