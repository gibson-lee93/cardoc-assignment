# Cardoc-assignment

원티드x위코드 백엔드 프리온보딩 7번째 과제입니다.

## 제출 기업 정보

- 기업명 : 카닥
- 주요 서비스 사이트: [카닥](https://www.cardoc.co.kr/)

## 과제 : 사용자가 소유한 타이어 정보를 저장하는 API

### [과제 안내]

**배경 및 공통 요구사항.**
- 언어는 **JavaScript / TypeScript** 기반의 **Node.js** 프레임워크(Express/NestJS 등) 혹은 **Java** 기반의 **Spring Framework** 중 선택하여 사용합니다.
- 데이터베이스 환경은 별도로 제공하지 않습니다.
 **RDB중 원하는 방식을 선택**하면 되며, sqlite3 같은 별도의 설치없이 이용 가능한 in-memory DB도 좋으며, 가능하다면 Docker로 준비하셔도 됩니다.
- 단, 결과 제출 시 README.md 파일에 실행 방법을 완벽히 서술하여 DB를 포함하여 전체적인 서버를 구동하는데 문제없도록 해야합니다.
- 데이터베이스 관련처리는 raw query가 아닌 **ORM을 이용하여 구현**합니다.
- Response Codes API를 성공적으로 호출할 경우 200번 코드를 반환하고, 그 외의 경우에는 아래의 코드로 반환합니다.

| Response Code | Description |
|---------------|--------------|
| 200 OK        | 성공         |
| 400 Bad Request | Parameter가 잘못된 (범위, 값 등) |
| 401 Unauthorized | 인증을 위한 Header가 잘못됨 |
| 500 Internal Server Error | 기타 서버 에러 |

### [개발 요구사항]

**사용자 생성 API**

- ID/Password로 사용자를 생성하는 API.
- 인증 토큰을 발급하고 이후의 API는 인증된 사용자만 호출할 수 있다.

```jsx
/* Request Body 예제 */

 { "id": "candycandy", "password": "ASdfdsf3232@" }
```
---

**사용자가 소유한 타이어 정보를 저장하는 API**

- 자동차 차종 ID(trimID)를 이용하여 사용자가 소유한 자동차 정보를 저장한다.
- 한 번에 최대 5명까지의 사용자에 대한 요청을 받을 수 있도록 해야한다. 즉 사용자 정보와 trimId 5쌍을 요청데이터로 하여금 API를 호출할 수 있다는 의미이다.

```jsx
/* Request Body 예제 */
[
  {
    "id": "candycandy",
    "trimId": 5000
  },
  {
    "id": "mylovewolkswagen",
    "trimId": 9000
  },
  {
    "id": "bmwwow",
    "trimId": 11000
  },
  {
    "id": "dreamcar",
    "trimId": 15000
  }
]
```
**상세구현 가이드**

- 자동차 정보 조회 API의 사용은 아래와 같이 5000, 9000부분에 trimId를 넘겨서 조회할 수 있다.
- **자동차 정보 조회 API 사용 예제 →** 
  - [https://dev.mycar.cardoc.co.kr/v1/trim/5000](https://dev.mycar.cardoc.co.kr/v1/trim/5000)
  - [https://dev.mycar.cardoc.co.kr/v1/trim/9000](https://dev.mycar.cardoc.co.kr/v1/trim/9000)
  - [https://dev.mycar.cardoc.co.kr/v1/trim/11000](https://dev.mycar.cardoc.co.kr/v1/trim/11000)
  - [https://dev.mycar.cardoc.co.kr/v1/trim/15000](https://dev.mycar.cardoc.co.kr/v1/trim/15000)
- 조회된 정보에서 타이어 정보는 spec → driving → frontTire/rearTire 에서 찾을 수 있다.
- 타이어 정보는 205/75R18의 포맷이 정상이다. 205는 타이어 폭을 의미하고 75R은 편평비, 그리고 마지막 18은 휠사이즈로써 {폭}/{편평비}R{18}과 같은 구조이다.
 위와 같은 형식의 데이터일 경우만 DB에 항목별로 나누어 서로다른 Column에 저장하도록 한다.
---

**사용자가 소유한 타이어 정보 조회 API**

- 사용자가 소유한 타이어 정보 조회 API

---

## 조원

| 이름         | 외부링크                                                                                                                                        | 담당 기능                                                        |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 이현준(조장) | [깃허브](https://github.com/lhj0621)/[블로그](https://supiz.tistory.com/)                                                                       | 총괄, 킥보드 대여, 반납, 이용내역 목록조회, 상세조회, 배포       |
| 김태련       | [깃허브](https://github.com/nojamcode)/[블로그](https://velog.io/@code-link)                                                                    | 회원가입, 로그인, 인증, 이벤트 생성, 이벤트 조회                 |
| 신영학       | [깃허브](https://github.com/yhshin0)/[블로그](https://nbkw.tistory.com/)                                                                        | 회원가입, 로그인, 인증, 유저 테스트                              |
| 임유라       | [깃허브](https://github.com/BangleCoding)/[블로그](https://banglecoding.github.io/)                                                             | 회원가입, 로그인, 인증, 이벤트 DB설계, 초기데이터 구성           |
| 이기범       | [깃허브](https://github.com/gibson-lee93)/[블로그](https://mysterious-laborer-518.notion.site/Gibson-s-Notion-2dd7f598fba64f1c9806cded5b4b83a0) | 킥보드 대여, 반납, 이용내역 목록조회, 상세조회, 이벤트 수정      |
| 정진산       | [깃허브](https://github.com/chinsanchung)/[블로그](https://chinsanchung.github.io/)                                                             | 킥보드 대여, 반납, 이용내역 목록조회, 상세조회, 이벤트 조건 검증 |

---

## 개발 환경

- 언어: TypeScript
- 프레임워크: NestJs
- 데이터베이스: SqLite
- 라이브러리: typeorm, passport, passport-jwt, bcrypt, class-validator, class-transformer

---

## ERD

![카닥 ERD](https://user-images.githubusercontent.com/57168321/143802852-134cfd04-2325-47c2-bdc7-7967825354c7.png)

---

## 구현 기능

### 회원가입

- bcrypt의 단방향 암호화로 입력받은 비밀번호를 암호화하여 저장했습니다.
- class-validator으로 입력 값의 유효성을 검사해 회원가입에서 발생가능한 오류를 줄였습니다.
- 유저 아이디 중복 체크를 통해 동일한 아이디로 가입을 하지 않도록 했습니다.

### 로그인, 로그인 인증

- passport 으로 로그인 과정에서 보안을 유지합니다.
- 로그인 성공 시 유저 인증을 위한 JWT(Json Web Token)이 발급됩니다.

### 자동차

- 타이어는 자동차의 일부이기 때문에 타이어의 정보를 저장하기 위해서는 자동차가 필요하다고 생각하여 자동차 테이블을 만들었습니다.
- 하나의 유저가 여러 대의 자동차를 소유할 수 있고 같은 모델의 자동차가 여러 유저를 가질 수 있기 때문에 유저와 자동차의 관계를 다대다로 정의했습니다.
- 신규 자동차 차종을 데이터베이스에 입력하기 위해 이에 맞는 API를 구현하였습니다.
  - 신규 자동차 차종을 입력할 때 request body로 브랜드명, 모델명과 타이어 사이즈를 입력받습니다.
  - 타이어 사이즈는 'class-validator' 라이브러리를 사용하여 정규 표현식 확인을 거쳐 {폭}/{편평비}R{휠사이즈} 구조를 입력받지 못하면 에러를 내보냅니다.
- 자동차 정보를 상세 조회라는 API를 구현하였습니다.

### 타이어

- 타이어 정보를 저장하기 위해 타이어 테이블을 정의하였고 폭, 편평비와 휠 사이즈를 attribute로 갖습니다.
- 자동차의 앞타이어와 뒷타이어의 사이즈는 동일하다고 판단하여 타이어와 자동차와의 관계는 1대1로 정의했습니다.

#### 사용자가 소유한 타이어 정보 저장

- 자동차 차종 ID(trimID)를 이용하여 사용자가 소유한 자동차 정보를 저장합니다.
- 한 번에 최대 5명까지의 사용자에 대한 요청을 받을 수 있도록 하였고 5명을 초과하면 에러를 내보내도록 구현하였습니다.

#### 사용자가 소유한 타이어 정보 조회

- 사용자가 소유한 타이어 정보 조회 API를 구현하였습니다.
  - 사용자 ID를 parameter로 받으면 해당 ID의 사용자가 소유한 모든 타이어 정보를 리턴합니다.

---

## API 문서

<!-- TODO -->

API 테스트를 위한 방법을 [POSTMAN document](https://documenter.getpostman.com/view/15323948/UVJWqKhp)에서 확인하실 수 있습니다.

## 배포

<!-- TODO -->

Heroku를 이용해 배포를 진행했으며, 사이트의 주소는 [https://pocky-deer-subject.herokuapp.com/](https://pocky-deer-subject.herokuapp.com/) 입니다.

## 설치 및 실행 방법

### 공통

**로컬에서는 준비한 데이터를 활용할 수 없기 때문에 로컬 환경에서 실행은 권장하지 않습니다.**

1. 최상위 폴더에 `.env` 파일에 `JWT_SECRET`에 임의의 문자열을 작성해 저장합니다.
1. `npm install`으로 패키지를 설치합니다.
1. 테스트
   - 개발일 경우: `npm run start`으로 `localhost:3000`에서 테스트하실 수 있습니다.
   - 배포일 경우: `npm run build`으로 애플리케이션을 빌드합니다. 그리고 `npm run start:prod`으로 실행합니다.
1. POST `localhost:3000/user`에서 `user_id`, `password`를 입력해 유저를 생성합니다.
1. POST `localhost:3000/user/signin`에 `user_id`, `password`을 입력하신 후 결과값으로 accessToken을 발급받습니다.
1. 대여나 반납 등 권한이 필요한 API의 주소를 입력한 후, Headers 의 Authorization에 accessToken을 붙여넣어 권한을 얻은 후 API를 호출합니다.


## 폴더 구조
```
+---src
|   |   app.controller.spec.ts
|   |   app.controller.ts
|   |   app.module.ts
|   |   app.service.ts
|   |   main.ts
|   |
|   +---auth
|   |   |   auth.module.ts
|   |   |   auth.service.ts
|   |   |   get-user.decorator.ts
|   |   |
|   |   +---auth-guard
|   |   |       jwt-auth.guard.ts
|   |   |
|   |   \---strategies
|   |           jwt.strategy.ts
|   |
|   +---deer
|   |       deer.module.ts
|   |       deer.service.ts
|   |
|   +---entities
|   |       area.entity.ts
|   |       deer.entity.ts
|   |       event.entity.ts
|   |       forbidden_area.entity.ts
|   |       history.entity.ts
|   |       parkingzone.entity.ts
|   |       user.entity.ts
|   |
|   +---event
|   |   |   event.controller.ts
|   |   |   event.module.ts
|   |   |   event.repository.ts
|   |   |   event.service.ts
|   |   |
|   |   \---dto
|   |           create-event.dto.ts
|   |           update-event.dto.ts
|   |
|   +---history
|   |   |   history.controller.ts
|   |   |   history.module.ts
|   |   |   history.repository.ts
|   |   |   history.service.ts
|   |   |
|   |   \---dto
|   |           create-history.dto.ts
|   |           query-history.dto.ts
|   |           update-history.dto.ts
|   |
|   \---user
|       |   user.controller.ts
|       |   user.module.ts
|       |   user.service.spec.ts
|       |   user.service.ts
|       |
|       \---dto
|               create-user.dto.ts
|               sign-in.dto.ts
|   .eslintrc.js
|   .gitignore
|   .prettierrc
|   nest-cli.json
|   package-lock.json
|   package.json
|   Procfile
|   README.md
|   tsconfig.build.json
|   tsconfig.json
```
