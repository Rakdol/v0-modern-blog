# v0-modern-blog Architecture

Last updated: 2026-02-22

## 1) 프로젝트 개요
- 이 프로젝트는 Next.js App Router 기반의 기술 블로그 웹앱이다.
- Markdown 파일(`content/posts/*.md`)을 빌드/런타임에 읽어 목록/상세 페이지를 렌더링한다.
- UI는 커스텀 블로그 컴포넌트 + `components/ui` 공용 컴포넌트 조합으로 구성된다.

## 2) 핵심 기술 스택
- Framework: Next.js `16.1.6` (App Router, Turbopack dev)
- Runtime/UI: React `19.2.4`, TypeScript `5.7.3`
- Styling: Tailwind CSS v4 (`@import 'tailwindcss'`), CSS custom properties
- Content parsing: `gray-matter`, `remark`, `remark-html`
- Utilities/UI libs: Radix UI, lucide-react, date-fns 등

## 3) 디렉터리 구조
```txt
app/
  layout.tsx                 # 전역 레이아웃, 폰트/메타/배경/Analytics
  page.tsx                   # 홈(게시글 목록)
  preview/page.tsx           # 빠른 목록 미리보기 페이지
  posts/[slug]/page.tsx      # 게시글 상세 페이지(SSG params + metadata)

components/
  blog/                      # 블로그 도메인 컴포넌트 (hero, card, navbar 등)
  ui/                        # 재사용 UI 컴포넌트 세트
  theme-provider.tsx

content/
  posts/*.md                 # 게시글 원본(Markdown + frontmatter)

lib/
  posts.ts                   # 게시글 로딩/파싱/정렬/연관글 계산
  utils.ts

hooks/
styles/
public/
```

## 4) 라우팅
- `/` : 최신 글 목록 페이지 (`app/page.tsx`)
- `/preview` : 모든 글을 빠르게 스캔하는 리스트 페이지 (`app/preview/page.tsx`)
- `/posts/[slug]` : 글 상세 페이지 (`app/posts/[slug]/page.tsx`)

## 5) 콘텐츠 데이터 흐름
1. `lib/posts.ts`에서 `content/posts` 디렉터리의 Markdown 파일을 읽는다.
2. Frontmatter(`title`, `date`, `excerpt`, `tags`, `coverImage`)를 파싱한다.
3. 홈/프리뷰는 `getAllPosts()`로 메타데이터 목록을 렌더링한다.
4. 상세는 `getPostBySlug(slug)`로 본문을 HTML 변환(`remark-html`) 후 출력한다.
5. 연관 글은 `getRelatedPosts()`가 태그 중첩 점수 + 날짜 정렬로 산출한다.

## 6) 렌더링/메타데이터 전략
- 상세 페이지는 `generateStaticParams()`를 사용해 slug 기반 정적 경로를 생성한다.
- `generateMetadata()`에서 게시글 제목/요약 기반 메타데이터를 동적으로 구성한다.
- 게시글이 없거나 slug가 유효하지 않으면 `notFound()` 처리한다.

## 7) 스타일링/디자인 시스템
- 전역 스타일은 `app/globals.css`에 정의되어 있다.
- 다크 톤 기반 CSS 토큰(`--background`, `--primary` 등) + Tailwind theme 매핑 사용.
- 노이즈/메시 그라디언트/글래스 카드/글로우 호버 등 시각 효과 유틸리티 클래스 포함.
- 타이포그래피는 `Manrope` + `Space Grotesk` 조합을 사용한다.

## 8) 운영 메모
- 개발 서버: `npm run dev`
- 빌드: `npm run build`
- 프로덕션 실행: `npm run start`
- 새 글 추가 시 `content/posts/*.md`만 추가하면 목록/상세에 자동 반영된다.

## 9) 배포(Vercel) 메모
- 배포 설정 파일: `vercel.json`
  - `framework`: `nextjs`
  - `installCommand`: `npm ci`
  - `buildCommand`: `npm run build`
- 런타임 버전 힌트:
  - `package.json`의 `engines.node`: `>=20 <21`
  - `.nvmrc`: `20`
- GitHub Actions 워크플로: `.github/workflows/deploy-vercel.yml`
  - 트리거: `vercel` 브랜치 push + 수동 실행(`workflow_dispatch`)
  - 필요 시크릿: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
  - 실행 흐름: `vercel pull` → `vercel build --prod` → `vercel deploy --prebuilt --prod`

## 10) 배포(GitHub Pages) 메모
- GitHub Actions 워크플로: `.github/workflows/deploy.yml`
  - 트리거: `main` 브랜치 push + 수동 실행(`workflow_dispatch`)
  - 빌드 결과(`out/`)를 `deploy` 브랜치로 배포
- 정적 배포 설정:
  - `next.config.mjs`에서 `output: 'export'`, `trailingSlash: true`
  - `PAGES_BASE_PATH` 환경변수로 GitHub Pages 경로 prefix 적용
