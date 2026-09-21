#!/usr/bin/env bash
# ================================================================
# scripts/check.sh — 과제 제약을 '문서'가 아니라 '실행되는 검사'로 강제한다.
#
# 여기 있는 검사들은 원래 README 의 「🧪 실행 검증 기록」에 손으로 적혀
# 있던 grep 들이다. 적어만 두면 아무도 돌리지 않으므로 이 파일로 옮겼고,
# .github/workflows/static.yml 의 check job 이 push 마다 실행한다.
# check 가 실패하면 deploy job 이 아예 시작되지 않는다(needs: check).
#
# 의존성: bash + grep + sed 뿐. 과제 제약상 빌드 도구·패키지 설치는 금지다.
# 로컬 실행:  bash scripts/check.sh
# 종료 코드:  위반 0건이면 0, 1건이라도 있으면 1
#
# 검사 범위 메모: 인라인 style / 인라인 핸들러 검사는 '제출물'인
#   index.html 과 js/ 만 본다. docs/*.html 은 과제 산출물이 아니라
#   해설 문서이고 인라인 style 을 의도적으로 쓰고 있다(README 0.10 격차 6번).
#   범위를 넓히고 싶다면 그 문서를 먼저 고치고 아래 SCOPE 를 바꿔라.
# ================================================================
set -uo pipefail

cd "$(dirname "$0")/.." || exit 2

fail_count=0
check_count=0   # 실행한 검사 수 — 마지막에 README 가 적어 둔 숫자와 대조한다

# 검사 하나를 실행한다.
#   $1 = 검사 이름(어떤 요구사항인지 포함)
#   $2 = 기대 건수(항상 0)
#   나머지 = 실행할 grep 명령
# grep 이 찾아낸 줄이 있으면 그 줄을 그대로 출력해 '어디가 위반인지'를 보여준다.
expect_none() {
  local name="$1"; shift
  local hits
  check_count=$((check_count + 1))
  hits=$("$@" || true)
  if [ -n "$hits" ]; then
    printf 'FAIL  %s\n' "$name"
    printf '%s\n' "$hits" | sed 's/^/        /'
    fail_count=$((fail_count + 1))
  else
    printf 'ok    %s\n' "$name"
  fi
}

echo "=== 과제 제약 검사 (scripts/check.sh) ==="

# --- R4-2: var 금지, const/let 만 ---
expect_none "R4-2  js/ 에 var 선언 0건" \
  grep -rnE '(^|[^a-zA-Z_.$])var[[:space:]]+[a-zA-Z_$]' js/

# --- R4-3: HTML 인라인 이벤트 핸들러 금지(addEventListener 사용) ---
expect_none "R4-3  index.html 에 인라인 on* 핸들러 0건" \
  grep -rniE 'on(click|submit|change|input|load|mouseover|keydown)[[:space:]]*=' index.html

# --- 제약(0.6): 인라인 스타일 금지 — HTML 속성 ---
expect_none "0.6   index.html/js 에 style=\" 속성 0건" \
  grep -rn 'style="' index.html js/

# --- 제약(0.6): 인라인 스타일 금지 — JS 의 element.style.* 직접 조작 ---
expect_none "0.6   js/ 에 .style.* 직접 조작 0건" \
  grep -rn '\.style\.' js/

# --- R3-6: 모바일 퍼스트 — 미디어쿼리는 min-width 만 ---
expect_none "R3-6  css/ 에 max-width 미디어쿼리 0건" \
  grep -rnE '@media[^{]*max-width' css/

# --- 제약(0.6): 프레임워크/라이브러리 금지 ---
expect_none "0.6   index.html 에 React/Vue/jQuery/Bootstrap/Tailwind 참조 0건" \
  grep -rniE '(src|href)="[^\"]*(react|vue|jquery|bootstrap|tailwind)' index.html

# --- 제약(0.6): 외부 스크립트 로드 금지(허용 예외는 폰트·아이콘 CSS 뿐) ---
expect_none "0.6   index.html 에 외부 도메인 <script src> 0건" \
  grep -rniE '<script[^>]*src="https?:' index.html

# --- 제약(0.6): 허용된 외부 출처 화이트리스트 ---
# 허용: Google Fonts(fonts.googleapis.com / fonts.gstatic.com), Font Awesome(cdnjs.cloudflare.com)
# 그 외 도메인이 등장하면 새 외부 의존성이 들어온 것이므로 실패시킨다.
# (본문 앵커·mailto·github.com 프로필 링크는 <a href> 라 여기서 걸리지 않게 link/script 태그만 본다.)
check_count=$((check_count + 1))
unlisted_hosts=$(
  grep -oiE '<(link|script)[^>]*(href|src)="https?://[^"/]+' index.html \
    | sed -E 's#.*https?://##' \
    | sort -u \
    | grep -viE '^(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)$' || true
)
if [ -n "$unlisted_hosts" ]; then
  printf 'FAIL  %s\n' "0.6   허용되지 않은 외부 출처"
  printf '%s\n' "$unlisted_hosts" | sed 's/^/        /'
  fail_count=$((fail_count + 1))
else
  printf 'ok    %s\n' "0.6   index.html 외부 출처는 허용 목록(Google Fonts·Font Awesome) 뿐"
fi

# --- R4-1: 모든 <script> 에 defer ---
check_count=$((check_count + 1))
script_no_defer=$(grep -n '<script' index.html | grep -v 'defer' || true)
if [ -n "$script_no_defer" ]; then
  printf 'FAIL  %s\n' "R4-1  defer 없는 <script> 발견"
  printf '%s\n' "$script_no_defer" | sed 's/^/        /'
  fail_count=$((fail_count + 1))
else
  printf 'ok    %s\n' "R4-1  index.html 의 <script> 전부 defer ($(grep -c '<script' index.html)개)"
fi

# --- R1-2 / R3-1: 참조 무결성 — HTML 과 CSS 가 가리키는 로컬 파일이 실제로 있는가 ---
# README 가 "참조 경로 12건 전부 실재 확인" 이라고 주장하던 것을 실제 검사로 옮긴 것.
check_count=$((check_count + 1))
missing_refs=""
while IFS= read -r ref; do
  [ -z "$ref" ] && continue
  [ -e "$ref" ] || missing_refs="${missing_refs}index.html -> ${ref}"$'\n'
done < <(grep -oE '(src|href)="[^"#]+"' index.html \
           | sed -E 's/^(src|href)="//; s/"$//' \
           | grep -vE '^(https?:|mailto:|#|//)' | sort -u)

while IFS= read -r ref; do
  [ -z "$ref" ] && continue
  [ -e "css/$ref" ] || missing_refs="${missing_refs}css/style.css -> css/${ref}"$'\n'
done < <(grep -oE "@import[[:space:]]+(url\()?['\"][^'\"]+" css/style.css \
           | sed -E "s/.*['\"]//" | sort -u)

if [ -n "$missing_refs" ]; then
  printf 'FAIL  %s\n' "R1-2  참조 대상 파일이 없음"
  printf '%s' "$missing_refs" | sed 's/^/        /'
  fail_count=$((fail_count + 1))
else
  printf 'ok    %s\n' "R1-2  index.html·css/style.css 의 로컬 참조 전부 실재"
fi

# --- 문서 좌표 검사: README 가 자기 자신을 가리킬 때 줄번호를 쓰지 않는가 ---
# 2026-09-19 에 README 맨 앞에 「0. 과제 명세」가 삽입되면서 0.10 절의 자기 참조
# 줄번호가 전부 밀려 거짓이 됐던 적이 있다. 줄번호는 편집에 견디지 못하는 좌표다.
# 그래서 자기 참조는 `README.md § 섹션명` 형태만 허용하고, 여기서 강제한다.
# (`images/README.md:1-3` 처럼 다른 파일을 가리키는 것은 대상이 아니다.)
expect_none "문서  README 자기 참조에 줄번호 0건 (§ 섹션명 만 허용)" \
  grep -nE '(^|[^/])README\.md:[0-9]' README.md

# --- 그 `README.md § 섹션명` 이 실제로 존재하는 헤딩을 가리키는가 ---
# 섹션명을 바꿔도 아무도 모르는 일을 막는다. ' › ' 가 있으면 마지막 조각이 찾을 헤딩이다.
check_count=$((check_count + 1))
bad_anchors=""
while IFS= read -r anchor; do
  [ -z "$anchor" ] && continue
  heading="${anchor##* › }"
  grep -qF -- "# $heading" README.md || bad_anchors="${bad_anchors}${anchor}"$'\n'
done < <(grep -oE '`README\.md § [^`]+`' README.md \
           | sed 's/^`README\.md § //; s/`$//' | sort -u)
if [ -n "$bad_anchors" ]; then
  printf 'FAIL  %s\n' "문서  존재하지 않는 섹션을 가리키는 README 참조"
  printf '%s' "$bad_anchors" | sed 's/^/        /'
  fail_count=$((fail_count + 1))
else
  printf 'ok    %s\n' "문서  README 의 § 섹션 참조 전부 실재"
fi

# --- 문서 좌표 검사: README 가 적어 둔 검사 건수가 실제와 같은가 ---
# 2026-09-21 검수에서 README 가 "10개 검사"라고 적어 두었는데 실제로는 12건이었다.
# 같은 숫자를 사람이 여러 곳에 옮겨 적으면 반드시 어긋난다. 그래서 숫자는 README 의
# 「과제 체크리스트」 한 줄에만 두고, 그 한 곳이 이 스크립트의 실제 검사 수와 같은지
# 여기서 강제한다. (이 검사 자신도 한 건으로 센다.)
check_count=$((check_count + 1))
claimed=$(grep -oE '`scripts/check\.sh` [0-9]+건' README.md | grep -oE '[0-9]+')
claimed_n=$(printf '%s\n' "$claimed" | grep -c .)
if [ "$claimed_n" -ne 1 ]; then
  printf 'FAIL  %s\n' "문서  README 의 \`scripts/check.sh\` N건 표기가 정확히 1곳이어야 하는데 ${claimed_n}곳"
  fail_count=$((fail_count + 1))
elif [ "$claimed" != "$check_count" ]; then
  printf 'FAIL  %s\n' "문서  README 는 검사 ${claimed}건이라는데 실제로는 ${check_count}건 실행했다"
  fail_count=$((fail_count + 1))
else
  printf 'ok    %s\n' "문서  README 가 적어 둔 검사 건수(${claimed}건)가 실제와 일치"
fi

echo
if [ "$fail_count" -gt 0 ]; then
  printf '검사 %d건 중 실패 %d건 — 위 FAIL 줄을 보고 고쳐라.\n' "$check_count" "$fail_count"
  exit 1
fi
printf '검사 %d건 전부 통과.\n' "$check_count"
