// express 참고: https://codingcoding.tistory.com/560
// multer로 업로드하기 참고: https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=psj9102&logNo=221127724119

// express 모듈 인스턴스 작성
const express = require('express');
const app = express();
// path 지정용 모듈
const path = require('path');
// port 지정
const port = 8085;
// multer 모듈 인스턴스 생성
// Multer는 multipart/form-data 처리를 위한 미들웨어임
const multer = require('multer');
// fs는 node.js에 들어 있는 module로 file system의 약자입니다. 
// 서버의 파일/폴더에 접근할 수 있는 함수들이 들어 있습니다. 
// fs 모듈은 파일업로드와 직접적인 연관이 있는 모듈은 아니고, 업로드될 파일을 저장할 폴더를 생성하기 위해서만 사용했습니다.
const fs = require('fs');


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

/* upload 경로 */
app.post('/doUpload',  upload.any(), (req, res) => {
  console.log(req.files)

})


//route to download a file
app.get('/download/:file(*)',(req, res) => {
  const file = req.params.file;
  const fileLocation = path.join('./uploads', file);
  console.log(fileLocation);
  res.download(fileLocation, file);
  console.log(file)
});

app.get('/download2',(req, res) => {
  console.log('log1');

  

});




// 8085번 포트로 기다림
// listen 함수로 8085 포트를 가진 서버를 실행한다. 
app.listen(port, () => {
    // 서버가 실행된 것을 콘솔창에서 확인하기 위해 'Running at http://127.0.01:8085' 로그를 출력한다
    console.log('Running at http://127.0.01:8085');
});

// 요청 파일 라우팅
app.use(express.static('public'));
