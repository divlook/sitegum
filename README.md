# Sitegum

Handlebars를 사용한 정적 사이트 생성기입니다.

NodeJs를 사용하여 로컬 환경에서 실행할 수 있으며 [Github Pages](https://pages.github.com), [Netlify](https://www.netlify.com) 등을 사용하여 사이트를 배포할 수 있습니다.

## 참고 사이트

### Handlebars

https://handlebarsjs.com

Handlebars 문법은 위 주소에서 확인할 수 있습니다.

### Webpack

https://webpack.js.org

### Handlebars Webpack Plugin

https://github.com/sagold/handlebars-webpack-plugin

## 필요한 프로그램

### Git

https://git-scm.com/downloads

```bash
# 설치된 버전 확인
git --version
```

### NodeJs

NodeJs가 설치되있지 않은 경우 [여기](https://nodejs.org/ko/)에서 LTS버전을 설치해주세요.

```bash
# 설치된 버전 확인
node -v
```

### Yarn (선택사항)

아래 방법 또는 [설치방법](https://yarnpkg.com/getting-started/install)을 참고해주세요.

yarn 대신 npm을 사용하고 싶다면 `yarn.lock`을 지우고 npm을 사용하셔도 상관없습니다.

```bash
# npm 사용해서 설치하는 방법
npm install -g yarn

# 설치된 버전 확인
yarn -v
```

## 사용 방법

### 소스 다운로드

1. 소스를 [다운로드](https://github.com/divlook/sitegum/archive/main.zip) 받은 뒤 적당한 위치에 압축 해제

2. [VS Code](https://code.visualstudio.com/) 또는 다른 에디터를 사용하여 프로젝트 폴더를 열고 터미널 실행

### 패키지 설치

```bash
yarn install

# npm을 사용할 경우
npm install
```

### 개발 서버 실행

- http://localhost:3000

```bash
yarn run dev

# npm을 사용할 경우
npm run dev
```

### HTML 생성

빌드 명령어를 실행하면 `dist` 폴더에 html파일들이 생성됩니다.

```bash
yarn run build

# npm을 사용할 경우
npm run build
```

## 프로젝트 구조

```
workspace/
┣ .github/
┃ ┗ workflows/
┃   ┗ gh-pages.yml
┃
┣ helpers/ --------------------- 이 곳에 helper를 추가할 수 있습니다. (https://handlebarsjs.com/guide/expressions.html#helpers)
┃ ┗ route.helper.js ------------ publicPath와 입력한 경로를 합쳐주는 헬퍼입니다.
┃                                - 예제 (publicPath="/v2") : {{route '/home'}} -> "/v2/home"
┣ src/
┃ ┣ components/ ---------------- 컴포넌트 폴더입니다. (https://handlebarsjs.com/guide/partials.html#basic-partials)
┃ ┃ ┗ [폴더명]/[이름].hbs           - 예제 1 : {{> [폴더명]/[이름]}}
┃ ┃                              - 예제 2 : {{> [폴더명]/[이름] prop=value}}
┃ ┃                              - 예제 3 : {{> [폴더명]/[이름] prop=value prop2=value2}}
┃ ┃
┃ ┗ pages/ --------------------- 페이지 폴더입니다. 폴더 구조와 파일명에 따라서 페이지가 자동으로 생성됩니다.
┃   ┣ about/                     - 참고 : https://handlebarsjs.com/guide/partials.html#inline-partials
┃   ┃ ┗ index.hbs
┃   ┗ index.hbs
┣ webpack/
┃ ┣ env.js
┃ ┗ utils.js
┣ .gitignore
┣ README.md
┣ package.json
┣ sitegum.config.json ---------- 사이트 설정 파일입니다.
┣ webpack.config.js
┗ yarn.lock
```

## 설정

### 사이트 설정

- sitegum.config.json

```json
{
    "title": "Sitegum",
    "publicPath": "/"
}
```

| 이름 | 설명 |
| - | - |
| title | 사이트명 |
| publicPath | 사이트 기본 경로 |

## 배포

Github를 사용하실 경우 `push`할 때마다 사이트가 자동으로 배포됩니다.

자동으로 배포되는게 싫은 경우 `.github/workflows/gh-pages.yml` 이 파일을 삭제하시면 됩니다.
