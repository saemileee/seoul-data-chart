## 📖 목차
- [과제 소개](https://github.com/saemileee/seoul-data-chart/blob/main/README.md#-%EA%B3%BC%EC%A0%9C-%EC%86%8C%EA%B0%9C)
- [목표 설정](https://github.com/saemileee/seoul-data-chart/blob/main/README.md#-%EB%AA%A9%ED%91%9C-%EC%84%A4%EC%A0%95)
- [개발 기간](https://github.com/saemileee/seoul-data-chart/blob/main/README.md#-%EA%B0%9C%EB%B0%9C-%EA%B8%B0%EA%B0%84)
- [시작 가이드](https://github.com/saemileee/seoul-data-chart/blob/main/README.md#-%EC%8B%9C%EC%9E%91-%EA%B0%80%EC%9D%B4%EB%93%9C)
- [구현 결과](https://github.com/saemileee/seoul-data-chart/blob/main/README.md#-%EA%B5%AC%ED%98%84-%EA%B2%B0%EA%B3%BC)
- [요구사항 구현](https://github.com/saemileee/seoul-data-chart/blob/main/README.md#-%EC%9A%94%EA%B5%AC%EC%82%AC%ED%95%AD)
- [서비스의 디테일을 위한 기능 추가](https://github.com/saemileee/seoul-data-chart/blob/main/README.md#-%EC%84%9C%EB%B9%84%EC%8A%A4%EC%9D%98-%EB%94%94%ED%85%8C%EC%9D%BC%EC%9D%84-%EC%9C%84%ED%95%9C-%EA%B8%B0%EB%8A%A5-%EC%B6%94%EA%B0%80)
- [성능 및 라이브러리 특징 고려](https://github.com/saemileee/seoul-data-chart/blob/main/README.md#-%EC%84%B1%EB%8A%A5-%EB%B0%8F-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%ED%8A%B9%EC%A7%95-%EA%B3%A0%EB%A0%A4)
- [관심사 분리 및 의존성 역전](https://github.com/saemileee/seoul-data-chart/blob/main/README.md#-%EA%B4%80%EC%8B%AC%EC%82%AC-%EB%B6%84%EB%A6%AC-%EB%B0%8F-%EC%9D%98%EC%A1%B4%EC%84%B1-%EC%97%AD%EC%A0%84)
- [기술스택](https://github.com/saemileee/seoul-data-chart/blob/main/README.md#-%EA%B8%B0%EC%88%A0%EC%8A%A4%ED%83%9D)

<br/>

## 💡 과제 소개
- 주어진 목데이터를 활용하여 시계열 차트를 구현하는 프로젝트입니다.
- 본 과제는 원티드 프리온보딩 4주차 개인과제입니다.
- 해당 리드미에는 구현한 과제에 대한 설명과 프로젝트를 진행하며 고려한 사항을 작성하였습니다.

<br/>

## 💡 목표 설정

- 데이터 시각화
    - 알맞은 형태로 데이터를 가공하여 시각화 하기
- 편리한 UI/UX
    - 다양한 차트 확대/축소/이동 기능 구현
- 차트 렌더링 성능 고려
    - 의도적인 로딩과 디바운싱을 활용하기
- 라이브러리 활용
    - 목적에 맞는 라이브러리를 선택하기
    - 라이브러리의 특징을 파악하여 다양한 기능 구현해 보기
- 클린코드 작성
    - 의존성 역전 원칙을 상기하며 관심사 분리하기

<br/>

## 💡 개발 기간
2023.09.10 - 2023.09.13


<br/>

## 💡 시작 가이드
* 배포 주소

  🔗 [https://seoul-data-chart.vercel.app/chart](https://seoul-data-chart.vercel.app/chart)

* 프로젝트 로컬 실행 방법
* 프론트 서버인 3000 포트와 json-server 4000포트가 동시에 실행됩니다.

    ```
    $ npm install
    $ npm run dev
    ```

<br/>

## 💡 구현 결과
|라이트 모드|다크 모드|
|------|-----|	
|![낮모드](https://github.com/saemileee/seoul-data-chart/assets/68241138/aa37c01e-def4-453e-91c8-3fd73ac52f00)|![밤모드](https://github.com/saemileee/seoul-data-chart/assets/68241138/343d3f9d-9578-4591-931a-a937cd9688bb)|

<br/>

## 💡 요구사항

### 시계열 차트 만들기

- [X] recharts 라이브러리를 활용해 차트를 구현하였습니다. 해당 라이브러리를 선택한 이유는 다음과 같습니다.
    
    - 컴포넌트 기반으로 모듈이 제공되어 커스텀을 위해 돔 요소를 직접 조작하는 경우를 줄일 수 있어 리액트 개발환경에 최적화 되어있습니다.
    
    - 차트 요소에 따라 여러 컴포넌트 및 속성, 포매팅 기능을 제공하여 세부적으로 요소를 조작하고 스타일링할 수 있습니다.
    
    - 형식에 맞는 데이터를 넣기만 하면 차트의 뼈대를 만들어주어 초심자가 사용하기 용이했습니다.
    
    - 공식 문서 정리가 잘 되어있으며, 8년 된 라이브러리이지만 최근까지 업데이트가 이루어지고 있어 커뮤니티가 활성화 되어있고 아티클 및 이슈 해결에 대한 내용도 손쉽게 찾을 수 있습니다.
    
    - SVG기반으로 차트를 구현하여 가볍습니다.
    
    - 기본적으로 다양한 기능을 제공하여 빠른시간 내 차트를 커스텀할 수 있으며 사용성이 차트를 구현할 수 있었습니다.
- 주어진 mock 데이터의 시간을 기반으로 Area형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합그래프입니다.

- Y축에 대략적인 수치를 표현하였습니다.

- 사용하는 차트 라이브러리 기준에 맞추어 하나의 그래프를 나타내고 있는 키 값인 날짜를 Time 키값의 value로 지정하여 가공하였습니다.

```jsx
{
	id : "성북구",
	time : "32:00",
	value_area : 46,
	value_bar : 13111
}
```

### 호버기능 구현

- 호버 시 id, value_area, value_bar 데이터가 툴팁 형태로 제공됩니다.

  <img width="162" alt="스크린샷 2023-09-13 오후 9 09 09" src="https://github.com/saemileee/seoul-data-chart/assets/68241138/5d05b8fa-dc7d-45d8-ab18-2c7ef05a18dd">

- recharts에서는 차트를 그리기 위해 사용한 데이터인 time, value_area, value_bar만 툴팁 데이터로 제공하기 때문에 CustomTooltip 컴포넌트를 만들어 content prop으로 주입하였습니다.

- <details>
      <summary>👈코드 보기</summary>
        <div markdown="1">
            <ul>
		    https://github.com/saemileee/seoul-data-chart/blob/b11868a364e9c052f77f7078cf8c27a5122943d9/src/components/Chart/Chart.tsx#L191-L193
		  https://github.com/saemileee/seoul-data-chart/blob/b11868a364e9c052f77f7078cf8c27a5122943d9/src/components/Chart/Custom/Tooltip.tsx#L4-L24
            </ul>
        </div>
  </details>
  
- [참고 자료](https://recharts.org/en-US/guide/customize)

### 필터링 기능 구현

- 필터링 시 특정 데이터 구역을 ReferenceArea와 커스텀 dot을 활용해 하이라이팅 하였습니다. 상태로 관리한 필터링 키 값을 기준으로, data의 id를 키 값으로 찾은 필터링 상태가 true라면 해당 구역을 하이라이팅 합니다.

- 차트 내 포함된 지역을 기준으로 필터링할 수 있습니다.

- 특정 데이터 구역을 클릭한 경우에도 필터링 기능이 동일하게 동작합니다.

- 필터 상태는 필터옵션을 키 값으로, 필터링 여부를 boolean 값으로 지정한 객체 형태로 다중선택 필터링을 구현하였습니다.

- <details>
	<summary>👈코드 보기</summary>
	<div markdown="1">
		<ul>
			- ReferenceArea opacity 활용
			https://github.com/saemileee/seoul-data-chart/blob/0bc5ce01c5895d1df186384aca5c20d1f0680ffd/src/components/Chart/Chart.tsx#L251-L278
			- 객체 형태 필터링 상태 관리
			https://github.com/saemileee/seoul-data-chart/blob/b11868a364e9c052f77f7078cf8c27a5122943d9/src/hooks/useChartFilter.tsx#L28-L39
		</ul>
	</div>
</details>


<br/>


## 💡 서비스의 디테일을 위한 기능 추가

### 데이터 시각화

아래 두 가지 구현 사항은 클라이언트 단에서는 서버로 부터 받아오는 방대한 데이터의 내용을 다 살펴 보기 힘들어, 수기로 데이터 가공 기준을 잡아 작업할 경우 발생할 수 있는 휴먼에러를 방지하는 것을 중점적으로 고려하여 데이터를 가공한 방법입니다.

- [X] 필터링 옵션 
    
    - useChartFilter 커스텀 훅에서는 인자 값으로 전달 받은 `기준 키 값`과 `초기 데이터`를 바탕으로 필터링 옵션을 반환 받을 수 있습니다. 제공 받은 데이터에서는 데이터의 지역을 값으로 저장하는 `id` 를 기준 키로 설정하고, id의 값을 배열로 반환하고,  `Set 메서드`로 중복요소를 제거하여  필터링 옵션 목록을 전달받을 수 있도록 하였습니다.
    
    - <details>
      <summary>👈코드 보기</summary>
        <div markdown="1">
            <ul>
		        https://github.com/saemileee/seoul-data-chart/blob/b11868a364e9c052f77f7078cf8c27a5122943d9/src/hooks/useChartFilter.tsx#L13
            </ul>
        </div>
     </details>
      
      
- [X] 날짜 포맷팅
    
    - 차트의 x축에는 데이터의 시간을 기준으로 데이터가 시각화 되고 있습니다.  방대한 양의 데이터라면 현재 표시하고 있는 시간이 어떤 그래프를 가리키는 것인지 헷갈릴 수 있는 가능성이 있습니다. 따라서 전체 차트가 그리고 있는 데이터가 `공통적인 시간대`를 나타내고 있다면 해당 공통 시간을 찾아 라벨을 활용하여 나타내고, 각 그래프에서는 `중복되지 않은 시간대만 정확히 확인`하고 구분할 수 있게 하였습니다.
    
    - 이를 위해 전체 시간 데이터 중 공통 시간대를 파악할 수 있는 유틸함수를 만들고, 반환받은 공통 시간 대는 다시 날짜 형식으로 포맷팅 하여 라벨로 사용할 수 있도록 데이터 상태로 반환합니다. 기존 데이터는 공통 시간대 문자열 부분을 제거하여 가공하고 반환하여 날짜 데이터를 차트에 그릴 수 있도록 하였습니다.
    
    - <details>
      <summary>👈코드 보기</summary>
        <div markdown="1">
            <ul>
	    - 공통 시간대 찾기
	      https://github.com/saemileee/seoul-data-chart/blob/b11868a364e9c052f77f7078cf8c27a5122943d9/src/utils/extractCommonTime.ts#L1-L18
	
	    - 공통 시간대 날짜 형식으로 포맷팅
	      https://github.com/saemileee/seoul-data-chart/blob/b11868a364e9c052f77f7078cf8c27a5122943d9/src/utils/formatDate.ts#L1-L28
	
	    - 패치 데이터 가공
	      https://github.com/saemileee/seoul-data-chart/blob/b11868a364e9c052f77f7078cf8c27a5122943d9/src/hooks/useChart.tsx#L16-L28
             </ul>
        </div>
     </details>

|날짜 포맷팅|
|----|
|<img width="728" alt="스크린샷 2023-09-13 오후 9 28 37" src="https://github.com/saemileee/seoul-data-chart/assets/68241138/c8bbe8b5-45cd-4514-9d79-2e200951e0b6">|

<br/>

### UXUI

- [X] brush를 이용한 차트 확대/축소/이동/전체 차트 모양 확인
    
    - 리차트에서 제공하는 `brush` 컴포넌트를 사용하여 방대한 양의 데이터를 확대/축소/이동하여 보다 디테일하게 데이터 확인을 할 수 있도록 했습니다.
    
    - 구역을 설정하여 차트를 확인할 수 있는 컴포넌트 특성에 따라 brush 컴포넌트 내부에 `동일한 차트를 렌더링`하여 전체 차트의 모양을 확인하고 사용자가 확인하고 있는 구역이 어디에 해당하는지 파악할 수 있도록 했습니다.
    
    - [참고 문서](https://recharts.org/en-US/examples/BrushBarChart)
      [커스텀 참고 문서](https://itc-engineering-blog.netlify.app/blogs/recharts-slider)
      
- [X] 마우스 휠 줌
    
    - 데스크탑에서 차트를 확인할 경우 `마우스 휠`을 활용하여 보다 간편하게 차트를 확대/축소 할 수 있도록 기능을 구현하였습니다.
    
    - onMouseWheel 이벤트를 활용하여 줌 확대/축소 되어 보여질 구역의 `startIdx`와 `endIdx`를 상태로 저장하고, 차트의 초기 렌더링 구역을 지정할 수 있는 Brush 컴포넌트의 `startIndex`, `endIndex` 속성을 활용하여 구현하였습니다.
    
    - 사용자의 마우스가 위치한 구역을 기준으로 확대/축소 할 수 있도록 useWheelZoom 커스텀 훅 내 줌인/줌아웃 함수에서는 마우스가 가리키고 있는 `fixedIndex 값`을 기준으로 좌/우의 비율을 확인하여 비율에 맞춰 인덱스가 줄어들고 늘어나며 확대/축소를 할 수 있도록 하였습니다.
    
    - <details>
      <summary>👈코드 보기</summary>
        <div markdown="1">
            <ul>
	    - 마우스 휠 이벤트 추가
	      https://github.com/saemileee/seoul-data-chart/blob/b11868a364e9c052f77f7078cf8c27a5122943d9/src/components/Chart/Chart.tsx#L254-L257
		    
	    - useWheelZoom
	      https://github.com/saemileee/seoul-data-chart/blob/b11868a364e9c052f77f7078cf8c27a5122943d9/src/hooks/useWheelZoom.tsx#L5-L76
            </ul>
        </div>
     </details>
  <br/>   

|마우스 휠 줌|
|----|
|![마우스 휠 줌](https://github.com/saemileee/seoul-data-chart/assets/68241138/7dcee88b-6573-423c-9d13-2816eb470f0c)|

      
- [X] 드래그앤드롭 줌
    
    - 데스크탑에서 차트를 확인할 경우 `드래그앤드롭 인터랙션`을 활용하여 보다 간편하게 차트의 구역을 정해 확대 할 수 있도록 기능을 구현하였습니다.
    
    - 클릭 필터링 이벤트와 인터랙션이 겹치는 것을 방지하기 위해 토글을 활용하여 `줌 모드를 on/off` 할 수 있습니다.
    
    - 라이브러리에서 제공하는 컴포넌트인 `ReferenceArea`에 `mousedown/move/up 이벤트`를 추가하여 드래그앤드롭한 인덱스를 확인하고 `brush의 start/endIndex에 반영`되도록 하였습니다.
    
    - 더불어 mousemove 이벤트를 통해 사용자가 선택하고 있는 영역을 박스 형태로 그릴 수 있게하였습니다. mousedown했던 좌표 값을 기준으로 좌/우측 움직임을 파악하고, 박스가 렌더링 되는 위치 값이 좌측을 기준으로 할지, 우측을 기준으로 할 지 정한 후 기준점과 현재 마우스 위치의 차의 절대값 만큼 박스의 폭이 정해집니다.
    
    - <details>
      <summary>👈코드 보기</summary>
        <div markdown="1">
            <ul>
	    - mouse event 적용
	      https://github.com/saemileee/seoul-data-chart/blob/b11868a364e9c052f77f7078cf8c27a5122943d9/src/components/Chart/Chart.tsx#L251-L279
	    - useDrageNDropZoom
	      https://github.com/saemileee/seoul-data-chart/blob/b11868a364e9c052f77f7078cf8c27a5122943d9/src/hooks/useDragNDropZoom.tsx#L3-L73
            </ul>
        </div>
     </details>

|드래그 앤 드롭 줌|
|----|
|![드래그앤 드롭 줌](https://github.com/saemileee/seoul-data-chart/assets/68241138/baf6270c-a559-4e5d-b53b-78c9519b1f8c)|


      
- [X] 파라미터를 활용한 필터링
      
    - 필터 선택 시 `쿼리스트링 형태`로 파라미터가 추가되고, 해당 url을 활용하여 `필터링 된 페이지에 접근`할 수 있습니다.
      
    - 유효하지 않은 쿼리스트링 값이 들어오면 파라미터는 초기화 되거나, `유효한 값까지만 필터링` 되도록 하였습니다.

  |파라미터를 활용한 필터링|
  |----|
  |![파라미터](https://github.com/saemileee/seoul-data-chart/assets/68241138/afbc605d-98a2-4873-8c3a-13a6d6719aa6)|

      
- [X] 다크모드
      
    - 사용자의 기호를 고려하여 다크모드 차트를 구현하였습니다. contextAPI를 활용하여 테마 상태를 저장하고 `styled-components`에서 제공하는 `StyledProvider`를 통해 스타일드 컴포넌트에 props를 전달할 수 있도록 하였습니다.
      
    - 차트 라이브러리에 직접적으로 할당해야하는 스타일은 커스텀 훅의 `themeObject`를 활용하여 모듈화 한 컬러 팔레트를 사용하도록 했습니다.
      
    - `로컬스토리지를 활용`해 다크모드 상태를 저장하고 브라우저를 껐다 켜도 사용자가 마지막으로 선택한 모드를 유지할 수 있도록 하였습니다.

<br/>

## 💡 성능 및 라이브러리 특징 고려

- [X] 로딩 시간 의도적 지연
      
    - 차트 렌더링 시 실행되는 차트가 그려지는 기본 애니메이션은 멋있었지만 줌 기능을 사용할 때마다 발생하였습니다. 따라서 해당 애니메이션이 비효율적이라고 생각하였고 모든 차트 컴포넌트의 `애니메이션을 inactive`하였습니다.
    
    - 이에따라 첫 차트 화면 진입 시, 차트의 데이터 패칭 후에 차트 컴포넌트가 렌더링 되게 하였음에도 불구하고 `svg가 모두 그려지는 동안 짧게 빈 화면이 노출` 되었고 이 부분이 사용자 경험을 떨어뜨린다고 판단하여 의도적으로 `디바운싱을 활용해 로딩 컴포넌트를 주입`하였습니다.
    
    - 해당 기능은 DeferredComponent를 통해 구현하였습니다. isDeferred 상태를 디바운싱 훅을 사용하여 변경하고, isDeferred인 경우 로딩 컴포넌트를 노출, 타이머가 해제되었을 경우 DeferredComponent로 감싸진 차트를 노출시켰습니다.
    
    - 상태에 따른 노출 방식은 `style`의 `visibility` 속성을 활용하였으며 해당 속성을 활용한 이유는 다음과 같습니다.
        1. `조건문`에 따라 리턴으로 children 렌더링 시 isDeferred 상태가 변경된 후 컴포넌트를 렌더링하기 때문에 svg 컴포넌트가 그려지는 동안 빈화면이 나와 로딩 시간을 의도적으로 부여한 의미가 퇴색됩니다.
        2. `display` 스타일 속성 사용 시 none ⇒ block 으로 변경 시 `리페인트` 뿐만 아니라, `레이아웃이 재계산 되는 리플로우`가 발생해 들어 빈화면이 보이는 시간이 좀 더 지연 되어 보였습니다.
        3. `visibility` 스타일 속성은 hidden인 상태에서도 레이아웃은 렌더링 되기 때문에 `리페인트만 발생`하여 display 속성이 변경될 때 보다 성능이 향상되고 로딩 컴포넌트가 사라짐과 동시에 화면에 차트가 노출됩니다.
    - <details>
      <summary>👈코드 보기</summary>
        <div markdown="1">
            <ul>
		- DeferredComponent
  		https://github.com/saemileee/seoul-data-chart/blob/0bc5ce01c5895d1df186384aca5c20d1f0680ffd/src/components/DeferredComponent.tsx#L10-L24
            </ul>
        </div>
     </details>
 <br/>

|DeferredComponent 사용 전|DeferredComponent 사용 후|
|----|----|
|![사용 전](https://github.com/saemileee/seoul-data-chart/assets/68241138/c0f1aa26-367b-48e7-9346-3cee6970751d)|![로딩 임시 지연](https://github.com/saemileee/seoul-data-chart/assets/68241138/b2317e5d-3162-40c8-b01b-89ce8af61a1d)|
  - 임시로 디바운싱 타임을 오래도록 지정하여 엘리먼트를 확인하였을 때 이미 svg 태그가 그려진 상태로 로딩 컴포넌트가 동작합니다.




           
- [X] Recharts 컴포넌트에 키 값 부여하여 리렌더링하기
      
    - recharts의 컴포넌트 특성 상 차트를 그리기 위한 특정 컴포넌트들은 관련 컴포넌트가 리렌더링 되지 않는 이상, 컴포넌트에 직접적으로 주입한 props 상태값이 변화해도 리렌더링 되지 않았습니다.
    
    - 가령  마우스 휠과 드래그앤드롭을 통해 brush 컴포넌트에 props로 주입된 `startIdx와 endIdx이 변경`됐다 하더라도, `차트와 Brush 컴포넌트가 리렌더링 되지 않았습니다`. 이와 같은 문제는 recharts 컴포넌트들의 속성 중 key를 활용하여 해결하였습니다.
      |키 값을 넣기 전에는 줌 기능이 작동하지 않음|
      |----|
      |![키 값 넣기 전엔 줌 기능이 작동안함](https://github.com/saemileee/seoul-data-chart/assets/68241138/df7a0387-5389-416e-82fe-d3117d577e21)|

    
    - Recharts 컴포넌트는 키 값이 변경될 때 마다 컴포넌트를 재렌더링 합니다. 해당 prop 에는 `string | number | null | undefined` 타입이 들어가도록 지정되어 있기 때문에 `zoom.counts`를 상태를 만들어 zoom.startIdx/zoom.endIdx가 변경될 때 마다 zoom.counts도 함께 카운팅 하여 상태를 변경하였습니다.
     
    - Brush에는 키 값을 넣을 수 없으므로 `ComposedChart`에 Key 값을 부여하였습니다.
     
    - <details>
      <summary>👈코드 보기</summary>
        <div markdown="1">
            <ul>
	    - Brush의 startIndex, endIndex에 주입될 상태인 zoom.startIdx/endIdx 값이 변경 되어도 줌인이 되지 않습니다. 
	      https://github.com/saemileee/seoul-data-chart/blob/0bc5ce01c5895d1df186384aca5c20d1f0680ffd/src/components/Chart/Chart.tsx#L280-L295
	    - 차트를 그리는 컴포넌트들을 감싸고 있는 ComposedChart에 Key 값을 부여하여 해결하였습니다.
	      https://github.com/saemileee/seoul-data-chart/blob/0bc5ce01c5895d1df186384aca5c20d1f0680ffd/src/components/Chart/Chart.tsx#L124-L128
            </ul>
        </div>
     </details>

     
 <br/>


- [X] Recharts 컴포넌트 자체 이벤트 속성을 활용하여 상태 값 업데이트 하기
    
    - Brush의 traveller를 활용하여 줌인/아웃, 구역 이동을 한 후 휠/드래그앤 드롭으로 줌 기능을 차례로 활용할 때 treveller가 마지막으로 잡은 영역을 기준으로 줌 기능을 실행시키도록 하였습니다.
    
    - Brush 의 onChange 이벤트를 활용하여 traveller의 index 값을 받아 zoomIdx에 세팅하였습니다. 이 경우, onChange할 때 마다 변경 되는 idx 값은 연쇄적으로 활용되지 않다 판단하여 디바운싱 훅을 활용해 마지막 change 이벤트의 상태만 300ms가 지나면 업데이트 되도록 하였습니다.
    
    - <details>
      <summary>👈코드 보기</summary>
        <div markdown="1">
            <ul>

        ```tsx
        const handleChangeBrush = (startIdx: number, endIdx: number) => {
                debounce(() => {
                    setZoom(prev => ({...prev, startIdx, endIdx}));
                }, 300);
            };
        ```
        
        ```tsx
        <Brush
        	...
        	onChange={e => handleChangeBrush(e.startIndex!, e.endIndex!)}
        />
        ```

            </ul>
        </div>
     </details>
        


  |traveller 조정 후 상태 값 업데이트 X (index 초기화가 일어남) |traveller 조정 후 상태 값 업데이트 O |
  |----|----|
  |![버그](https://github.com/saemileee/seoul-data-chart/assets/68241138/bf15c973-5084-4755-b5fa-7e90b7ae209e)|![키 값 넣어서 index 조정](https://github.com/saemileee/seoul-data-chart/assets/68241138/acb1a915-b7c9-4d7d-b777-f51cd11c1e3f)|
      
        
- [X] svg로 그려진 영역의 크기 및 위치 값 구하기
    
    - 줌 박스는 사용자가 드래그앤 드롭으로 줌인 기능을 활용할 경우 선택한 영역을 파악할 수 있도록 하는 박스 스타일의 컴포넌트입니다. 박스의 차트 영역만큼 고정된 높이 값, 마우스를 움직인 만큼 조정되어야하는 너비값, 박스가 그려지는 위치 값 등을 파악하고 차트의 스타일이 변경되어도 박스의 위치와 크기가 동적으로 변경될 수 있도록 해야했습니다.
    
    - 이에 따라 useRef 훅으로 차트의 돔요소를 찍어 차트의 위치 및 크기 값을 파악하고자 하였지만, ref를 주입하지  못하는 차트 컴포넌트도 있었고, svg태그로 그려진 영역의 위치 값을 파악하기 어려웠습니다.
    
    - Recharts의 컴포넌트 자체에 ref를 주입한 경우 컴포넌트 속성을 활용하였고, 그 외 컴포넌트 주입이 불가능하거나 속성으로만 원하는 값을 파악하기 어려운 경우 우회적인 방법으로 formatter로 주입한 컴포넌트의 돔요소에 ref를 주입하여 연관 노드의 속성을 확인하거나, 차트 자체를 감싼 컨테이너에 ref를 주입하여 원하는 값을 파악하였습니다.
    
    - <details>
      <summary>👈코드 보기</summary>
        <div markdown="1">
            <ul>
		https://github.com/saemileee/seoul-data-chart/blob/0bc5ce01c5895d1df186384aca5c20d1f0680ffd/src/components/Chart/Chart.tsx#L46-L54
            </ul>
        </div>
     </details>


<br/>

## 💡 관심사 분리 및 의존성 역전

- 이번 과제에서는 라이브러리를 사용하여 구현했기 때문에 라이브러리 사용법을 기준으로 코드를 작성하다보니 데이터를 보다 다양한 방법으로 가공해야했고, 컴포넌트를 조작하는 간단한 함수와 상태 관리도 복잡했습니다. 이에따라 추후 유지보수하기 쉬운 클린 코드로 작성하는 것을 더욱 신경써야했고, 지난 세션에서 학습한 의존성 역전 원칙(DIP)를 상기하며 관심사에 따라 함수를 추상화하고 모듈화하며 구체적인 요소에 직접적으로 의존하지 않도록 노력했습니다.

- 다음은 주요 기능의 함수 호출 및 의존성 흐름을 정리한 다이어그램입니다.
  
  ![의존성 역전](https://github.com/saemileee/seoul-data-chart/assets/68241138/aee9b18d-36f8-41e5-9db5-52fb17d386db)


- 위와 같이 모듈화 구조를 잡고 코드를 작성하니 버그를 파악하고 고치기에 용이하였습니다. 또한 시계열 데이터의 공통 시간대 추출 및 가공 로직, 필터링 파라미터 추가 로직은 요구사항 및 추가 기능을 모두 구현한 후 추가하였지만 각 모듈화한 파일 내에서 로직을 수정하여 큰 시간을 쏟지 않고 기능을 구현할 수 있었습니다.

- 이렇게 구조화 된 함수들을 가지고 추후 다른 데이터를 호출하여 또 다른 차트를 그리는 경우에도 용이하게 기존 함수를 재사용할 수 있을 것 같습니다.

<br/>

## 💡 기술스택

### Development
`React`

`JavaScript`

`TypeScript`

`vite`


### Chart Library
`Recharts`

### Styling
`styled-components`

`react-icons`

### Library
`react-router-dom`

`axios`

`json-server`

### Convention
`eslint`

`prettier`

`husky`

