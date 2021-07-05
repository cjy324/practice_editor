// 참고: https://codingcoding.tistory.com/560

// express 모듈 인스턴스 작성
const express = require('express');
const app = express();
// path 지정용 모듈
const path = require('path');

// 8085번 포트로 기다림
// listen 함수로 8085 포트를 가진 서버를 실행한다. 서버가 실행된 것을 콘솔창에서 확인하기 위해 'Running at http://127.0.01:8085' 로그를 출력한다
app.listen(8085, () => {
    console.log('Running at http://127.0.01:8085');
});

// 요청 파일 루팅
app.use(express.static(path.join(__dirname, 'public')));

// 기타 요청에 대한 404에러
app.use((req, res) => {
    res.sendStatus(404);
})