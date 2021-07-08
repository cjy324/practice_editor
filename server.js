// express 모듈 인스턴스 작성
const express = require('express');
const app = express();
// path 지정용 모듈
const path = require('path');
// port 지정
const port = 8085;
// multer 모듈 인스턴스 생성
// multer는 multipart/form-data 처리를 위한 미들웨어임
const multer = require('multer');

// ./uploads 에 파일을 저장한다는 의미 만약에 uploads 폴더가 없을 시 자동 생성한다.
let upload = multer({ dest: './uploads' });

// 업로드된 파일의 원래 이름으로 파일명을 변경해준다.
const storage = multer.diskStorage({  // diskStorage: 파일을 디스크에 저장하기 위한 모든 제어 기능을 제공
    destination: function (req, file, cb) {   // diskStorage옵션  ->  destination: 파일을 저장할 폴더 경로, 경로 설정 전 폴더가 있는지 확인
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {   // diskStorage옵션  ->  filename: 파일의 이름 지정
        cb(null, file.originalname)
    }
})
upload = multer({storage : storage})

/* upload */
app.post('/doUpload',  upload.any(), (req, res) => {
  console.log(req.files);

  let fileNames = {};
  for(let i = 0; i < req.files.length; i++){
    fileNames[i] = req.files[i].originalname;
  }
  fileNames = JSON.stringify(fileNames)  // stringify: 객체를 json 형식으로 변환
  
  res.send(fileNames)
})


/* route to download a file */
app.get('/download/:file(*)',(req, res) => {
  const file = req.params.file;
  const fileLocation = path.join('./uploads', file);
  console.log(fileLocation);
  res.download(fileLocation, file);
  console.log(file)
});


/* 테스트용 */
app.get('/forTest',(req, res) => {
  console.log('----- TEST start -----');
  res.send('<p>test</p>')
  console.log('----- TEST end -----');
});


// 8085번 포트로 기다림
// listen 함수로 8085 포트를 가진 서버를 실행한다. 
app.listen(port, () => {
    // 서버가 실행된 것을 콘솔창에서 확인하기 위해 'Running at http://127.0.01:8085' 로그를 출력한다
    console.log('Running at http://127.0.01:8085');
});

// 요청 파일 라우팅
// __dirname 은 node 에서 제공하는 node 파일의 경로를 담고 있는 변수
app.use(express.static(path.join(__dirname, 'public')));  //root 개념으로 설정??
app.use(express.static('uploads'));