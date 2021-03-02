# Sitegum

Handlebars를 사용한 정적 사이트 생성기입니다.

NodeJs를 사용하여 로컬 환경에서 실행할 수 있으며 [Github Pages](https://pages.github.com), [Netlify](https://www.netlify.com) 등을 사용하여 사이트를 배포할 수 있습니다.

## Reference

### Demo

https://divlook.github.io/sitegum

### Handlebars

https://handlebarsjs.com

이 프로그램을 사용하려면 Handlebars에 대한 지식이 필요할 수 있습니다.

Handlebars 문법은 위 주소에서 확인할 수 있습니다.

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

### VS Code (선택사항)

https://code.visualstudio.com

VS Code 외에 이미 사용하시는 에디터가 있다면 해당 에디터를 사용하셔도 상관없습니다.

## 사용 방법

### 프로젝트 폴더 생성 및 이동

```bash
mkdir <프로젝트 이름>
cd <프로젝트 이름>

# 예제
mkdir ./my-site
cd my-site
```

### 프로젝트 초기화

```bash
yarn init -y

# npm을 사용할 경우
npm init -y
```

### 패키지 설치

아직 정식으로 배포된 패키지가 아닙니다.

이 방법은 github에서 바로 설치하는 방법이며, 정식 패키지가 배포되어도 사용할 수는 있습니다.

```bash
yarn add divlook/sitegum

# npm을 사용할 경우
npm install divlook/sitegum
```

### 명령어 추가

`package.json` 파일의 `scripts` 안에 아래 내용을 추가해주세요.

```jsonc
{
    "scripts": {
        "sitegum": "sitegum",
        "dev": "sitegum dev --open",
        "build": "sitegum build"
    },
}
```

### 초기 파일 생성

초기에 필요한 파일들을 자동으로 생성할 수 있습니다.

```bash
yarn run sitegum init

# npm을 사용할 경우
npm run sitegum init
```

### Dev Server

파일이 수정될 때마다 자동으로 업데이트되는 서버를 실행합니다.

개발 환경에 적합하며 상용 서비스에서 사용하면 안됩니다.

- http://localhost:3000

```bash
yarn run dev

# npm을 사용할 경우
npm run dev
```

### Build

빌드 명령어를 실행하면 `dist` 폴더에 html파일들이 생성됩니다.

```bash
yarn run build

# npm을 사용할 경우
npm run build
```

### Help

자세한 사용방법을 볼 수 있습니다.

```bash
yarn run sitegum --help
```

## 프로젝트 구조

```
workspace/
┣ .github/
┃ ┗ workflows/
┃   ┗ gh-pages.yml
┃
┣ dist/ ------------------------ 빌드 결과물이 생성되는 폴더입니다. (수정 금지)
┃ ┗ ...
┃
┣ node_modules/ ---------------- 패키지가 설치되는 폴더입니다. (수정 금지)
┃ ┗ ...
┃
┣ public/ ---------------------- 정적 리소스 폴더입니다.
┃ ┗ ...                          - 참고 : src/pages/example/index.hbs
┃
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
┃
┣ .gitignore
┣ package.json
┗ sitegum.config.json ---------- 사이트 설정 파일입니다.
```

## 설정

### 환경 변수

| 이름 | 타입 | 기본값 | 설명 |
| - | - | - | - |
| NODE_ENV | 'development' \| 'production' | development | 사이트명 |
| PUBLIC_PATH | string | '/' | 사이트 기본 경로 |
| PORT | number | 3000 | port |

### 사이트 데이터

- sitegum.config.json

```jsonc
{
    "title": "Sitegum",
    // 데이터 추가해서 사용 가능
}
```

## Helper

- Handlebars Helper 설명 : https://handlebarsjs.com/guide/expressions.html#helpers

### route

publicPath와 입력한 경로를 합쳐주는 헬퍼입니다.

아래는 `publicPath="/v2"` 일때의 예제입니다.

```hbs
<!-- input -->
<a href="{{route '/home'}}">Go to home</a>

<!-- output -->
<a href="/v2/home">Go to home</a>
```

## 배포

### Github Pages

Github를 사용하실 경우 `push`할 때마다 사이트가 자동으로 배포됩니다.

자동으로 배포되는게 싫은 경우 `.github/workflows/gh-pages.yml` 이 파일을 삭제하시면 됩니다.
