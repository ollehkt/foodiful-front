# 푸디풀

한식 디저트 판매 및 수강 클래스 예약이 가능한 웹 사이트입니다.

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fdavidktlee%2Ffoodiful-front&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

## 프로젝트 목적 및 기간

- **목적**  
  지인의 요청으로 만들게 되었으며 예약 시스템 및 전체적인 쇼핑몰 기능을 만들어 보고 배포해 실제 상용 서비스를 운영해 보기 위해 개발했습니다.
- **기간**  
   2023년 5월에 개발을 시작했고 중간에 다른 팀 프로젝트들을 진행하면서 개발 기간이 늦어졌지만 현재 90% 이상 진행되었고 추후 관리자 페이지 개발 예정입니다.

## 배포 주소

### [www.foodiful.shop](https://www.foodiful.shop)

## 주요 기능

- JWT를 이용해 로그인 기능 구현
- 포트원 결제 시스템을 이용해 결제 기능 구현
- naver 문자 api를 이용해 휴대폰 인증 기능 구현
- 달력을 만들어 예약 기능 구현
- AWS S3를 통해 이미지 저장
- Docker와 AWS EC2를 이용해 배포
- toast ui를 통해 editor 기능 구현
- Nginx와 letsencrypt를 이용한 ssl 인증

## 상세 기능

- 회원
  - 회원가입
  - 로그인
  - 내 정보 수정
  - 마이페이지
- 상품
  - 상품 상세
  - 상품 추가
  - 상품 업데이트
  - 상품 리뷰
- 클래스
  - 클래스 상세
  - 클래스 추가
  - 클래스 업데이트
  - 클래스 문의
  - 클래스 문의 댓글
- 주문
  - 상품 주문
  - 상품 주문 취소
- 예약
  - 클래스 예약
- 장바구니
- 소개 페이지

## 트러블 슈팅

### JWT 토큰으로 유저 검증

- 로그인 시에 유저 검증을 해야 하는데 쿠키로 진행했을 때 유저의 주요 정보가 매 번 요청 시에 담기는 보안 상의 단점 발견
- JWT 토큰은 구현 복잡도가 올라가고 시크릿 키 유출 시 JWT 조작이 가능하다는 단점이 있지만 키가 유출 될 가능성은 아주 낮다고 생각해 JWT 토큰을 이용해 유저 검증을 진행
- 인증 정보를 서버에 별도로 저장 할 필요가 없어 보안 강화 및 서버 부하 감소

### presigned url을 이용한 서버 부하 감소

- 백엔드 서버로 파일 전달 후 백엔드 서버에서 S3 스토리지에 업로드 후 결과에 따라 response를 프론트에 전달하는 방식으로 백엔드에 저장하지도 않는 무거운 이미지 파일 전달해야 하는 단점 발견
- 프론트에서 상품 추가 시 백엔드 서버로 요청을 보내고 백엔드 서버에서 aws와 통신을 통해 업로드가 가능한 사진이라면 presigned url을 응답, 프론트에서 사진을 S3로 직접 업로드 하는 방식으로 구현
- 무거운 파일을 전달하지 않아도 됨으로써 업로드 시간 2000/ms에서 1500/ms로 25% 감소

### hook 분리로 코드량 50% 감소 및 관심사 분리

- 휴대폰 검증 기능에서 검증 되어야 하는 목록이 여러 개 있었고, 여러 화면에서 휴대폰 검증 기능을 사용하니 각각의 컴포넌트에서 state가 많아지고 코드가 길어지는 문제점 발견
- 검증하는 부분과 api 요청 보내는 부분을 훅으로 분리
- 원하는 곳에서 원하는 함수만 꺼내서 사용할 수 있도록 처리해 관심사를 기능을 사용하는 부분에서의 코드량을 50% 줄임

### Docker를 이용한 프로젝트 관리

- 프론트 ec2, 백엔드 ec2, rds(db)까지 3가지를 관리해야 하고 각각 프로젝트에 의존성 설치가 필요한 번거로운 상황
- 프로젝트에서 docker-compose를 이용해 하나의 파일로 여러 개의 이미지를 관리할 수 있게 만듬.
- 모든 환경 설정이 완료된 컨테이너로 프로젝트 관리 및 배포가 쉽게 가능한 환경을 만들어 DX 개선

### db 조회 성능 개선

- 전체 상품을 조회한 후 각 상품에 대해 현재 사용자가 좋아요를 눌렀는지 확인하는 로직으로 조회했을 때 product의 개수만큼 favorite-product 테이블에 쿼리를 날리기 때문에 상품의 개수가 증가할수록 데이터베이스에 부하를 줄 수 있다고 생각  
  -> 이런 경우를 **N+1 쿼리 문제**라고 부르는데, 이는 한 번의 쿼리로 해결할 수 있는 문제를 N번의 쿼리로 해결하게 되어 성능이 저하되는 문제를 의미
- 유저가 좋아요 누른 상품을 먼저 조회 후 전체 상품과 비교하는 로직으로 수정  
  -> 상품의 개수와 관계없이 쿼리의 횟수를 일정하게 유지할 수 있으므로 데이터베이스의 부하를 줄일 수 있음
- 조회 시간 37ms -> 30ms ⇒ **0.7ms** 단축

## 상세 기능 영상

### 회원가입 및 로그인

![회원가입 및 로그인](https://github.com/davidktlee/foodiful-front/assets/97086762/1b235743-3d29-4779-829f-33e23de4871d)

### 상품 추가 (추후 관리자 기능으로 이동 될 예정입니다.)

![상품 추가](https://github.com/davidktlee/foodiful-front/assets/97086762/b9ca7950-3511-46cf-b120-5dbd03002466)

### 상품 추가 상세

![상품 추가 상세](https://github.com/davidktlee/foodiful-front/assets/97086762/202f663f-1c0e-4e96-b74d-b06206993d2f)

### 상품 상세 페이지

![상품 상세](https://github.com/davidktlee/foodiful-front/assets/97086762/8b0a9bb8-d727-4384-89e4-2882584a1589)

### 상품 주문

![상품 주문](https://github.com/davidktlee/foodiful-front/assets/97086762/48bd4198-5a8d-46e0-b539-5cd9321d898b)

### 상품 후기 등록 / 수정 / 삭제

![상품 후기](https://github.com/davidktlee/foodiful-front/assets/97086762/de137560-067d-471e-9293-2a7deab515b3)

### 클래스 추가

![클래스 추가](https://github.com/davidktlee/foodiful-front/assets/97086762/65cc733f-2cdd-4562-8f21-cb340f3f02d2)

### 클래스 추가 상세

![클래스 추가 상세](https://github.com/davidktlee/foodiful-front/assets/97086762/c5000418-0677-49d0-a07b-fe1c4078f9e1)

### 클래스 상세 페이지

![클래스 상세](https://github.com/davidktlee/foodiful-front/assets/97086762/5e788dcf-5a20-42cc-95c0-1c5e02200bd2)

### 장바구니

![장바구니](https://github.com/davidktlee/foodiful-front/assets/97086762/8b86e8e6-98df-429c-994b-0cd0bd07cac7)

### 클래스 문의 추가 / 수정 / 삭제

![클래스 문의](https://github.com/davidktlee/foodiful-front/assets/97086762/821efd58-9688-4921-aa32-d7f8dca922e1)

### 소개 페이지

![소개](https://github.com/davidktlee/foodiful-front/assets/97086762/6d669d89-03a5-4d9d-a6a7-fe16435eec11)
