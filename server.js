// express 참고: https://codingcoding.tistory.com/560
// multer로 업로드하기 참고: https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=psj9102&logNo=221127724119

// express 모듈 인스턴스 작성
const express = require('express');
const app = express();
// router 
const router = express.Router();
// path 지정용 모듈
const path = require('path');
// port 지정
const port = 8085;
// multer 모듈 인스턴스 생성
// multer는 multipart/form-data 처리를 위한 미들웨어임
const multer = require('multer');
// fs는 node.js에 들어 있는 module로 file system의 약자입니다. 
// 서버의 파일/폴더에 접근할 수 있는 함수들이 들어 있습니다. 
// fs 모듈은 파일업로드와 직접적인 연관이 있는 모듈은 아니고, 업로드될 파일을 저장할 폴더를 생성하기 위해서만 사용
// const fs = require('fs');

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
// Static File(정적 파일)
// 정적 파일이란, 직접 값에 변화를 주지 않는 이상 변하지 않는 파일을 의미합니다. 
// 예를 들면, image, css 파일, js 파일 등을 의미합니다. 
// express는 이러한 정적 파일들을 손쉽게 제공할 수 있는 기능을 가지고 있습니다.
// express 변수에는 stastic이라는 메서드가 포함되어있습니다. 
// 이 메서드를 미들웨어로서 로드해줍니다. 
// static의 인자로 전달되는 'public'은 디렉터리의 이름입니다. 
// 따라서 'public' 이라는 디렉터리 밑에 있는 데이터들은 웹브라우저의 요청에 따라 서비스를 제공해줄 수 있습니다.
// 가령, 사용자가 127.0.0.1:3000/images/cat.jpg 로 접근한다면, 
// 해당 파일을 public/images/cat.jpg에 존재하는지 검색하게 됩니다
// https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=pjok1122&logNo=221545195520

//서버는 띄어 놓고, 하위 주소로 관련 문서들이나 프로젝트를 접근하는 개념이다.
//index.html 파일 이름은 바꾸면 안됩니다. 웹사이트에 접속했을때 정적 폴더 세팅이 되어 있다면 그 폴더 안에 index파일이 있는지를 가장 먼저 찾도록 되어 있습니다.
// __dirname 은 node 에서 제공하는 node 파일의 경로를 담고 있는 변수
app.use(express.static(path.join(__dirname, 'public')));  //root 개념으로 설정??
app.use(express.static('uploads'));
