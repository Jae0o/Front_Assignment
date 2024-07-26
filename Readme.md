# 프론트엔드 이재영 개발 과제

과제 수행 과정에서 멀티 드래그 기능 구현 시 사용자 경험 향상을 위해 여러 예외 처리와 오류 방지를 위해 많은 고민을 하였습니다. <br>

이와 관련하여, `getValidationMessage`라는 별도의 유틸리티 함수를 만들어 예외 처리 로직을 모아두었습니다. <br>

`react-beautiful-dnd`에 제공할 수 있는 `onDragStart` `onDragUpdate` `onDragEnd` 이벤트와 별도의 `onClick` 이벤트를 통해 개선하였습니다.

 <br>

## 수행 목표

- [x] **Webpack 적용** : `react-scripts`를 사용하지 않고, Webpack을 직접 설정하여 React 애플리케이션을 구성합니다.
- [x] **칼럼 확장**: 기존의 한 칼럼에서 네 개의 칼럼으로 확장합니다.
- [x] **드래그 제약 조건 적용**: 특정 규칙에 따라 아이템의 드래그를 제한합니다.
- [x] **멀티 드래그 기능 구현**: 여러 아이템을 동시에 선택하고 드래그하는 기능을 추가합니다.

 <br>

### 1. Webpack 적용

- `webpack` 설정을 별도로 구현하여 `ts` `tsx` `js` `jsx`파일 형식의 React 애플리케이션이 빌드 될 수 있도록 구현하였습니다.

- `@` alias를 설정하여 `src`폴더에 쉽게 접근할 수 있도록 설정하였습니다.

- `typescript`를 별도로 설치하고, `ts-loader`를 설정해 webpack에서 사용할 수 있도록 설정하였습니다.

- `css-loader와` `style-loader를` 통해 css 파일을 webpack에서 사용할 수 있도록 설정하였습니다. ( 빌드 과정에서 별도 css 파일이 생성되는 설정은 제외하였습니다. )

- `dev-server`를 통해 개발할 수 있는 `3100:port`를 연결하고, `hot-loader` 기능이 동작하도록 설정하였습니다.

- 현재 프로젝트에서 별도 이미지 등 파일을 사용하지 않아 별도 파일에 대한 빌드는 제외하였습니다.

 <br>

### 2. 칼럼 확장

- Github Project의 Task Board 형태로 칼럼을 확장하고 디자인하였습니다.

- 각 칼럼별로 독립된 `Droppable` 공간을 지니도록 제작하였습니다.

- 드래그 중 이동이 가능한 Droppable에 대해서는 초록색의 테두리를, 이동이 불가능한 Droppable에 대해서는 빨간색 테두리를 통해 사용자가 제약을 확인할 수 있도록 구현하였습니다.

 <br>

### 3. 드래그 제약 조건

- 단일 아이템 혹은 멀티 드래그 시 첫 번째 칼럼에서 세 번째 칼럼으로 이동할 수 없도록 구현하였습니다.

- 단일 아이템 드래그 시 해당 아이템이 짝수인 경우 다른 짝수 아이템 앞으로 이동할 수 없도록 구현하였습니다.

- 멀티 드래그 시 선택된 항목 내부 아이템 중 짝수 아이템이 존재한다면 다른 짝수 아이템 앞으로 이동할 수 없도록 구현하였습니다.

- 칼럼과 동일하게 현재 선택된 아이템 혹은 단일 아이템이 이동할 수 없는 칼럼이라면 빨간색 테두리를, 이동할 수 있는 칼럼이라면 초록색 테두리를 통해 사용자가 제약을 확인할 수 있도록 구현하였습니다.

 <br>
 
### 4. 멀티 드래그 구현

- `click` `touch` 이벤트를 통해 다중 아이템을 선택하고 제외할 수 있도록 구현하였습니다.

- 파란색 테두리를 통해 다중 선택된 아이템을 확인할 수 있도록 구현하였습니다.

- 하나의 칼럼 항목에 대해서만 다중 선택이 가능하고, 다른 칼럼 아이템을 선택할 경우 기존 선택 항목이 해제되도록 구현하였습니다.

- 추가로 다중 선택을 쉽게 취소할 수 있도록 칼럼 영역 외 다른 `window` 또는 `element` 영역을 선택할 경우 취소될 수 있도록 구현하였습니다.

 <br>

## 그 외 구현 사항

### Toast 구현

- 사용자가 보다 명확하게 드래그를 통한 아이템 이동이 불가능한 이유를 확인 할 수 있도록 Toast를 통해 각각의 제약에 따른 메세지를 확인 할 수 있도록 구현하였습니다.

- 매번 알림 창을 닫아야 하는 `Modal UI`보다는 가볍게 확인할 수 있는 `Toast UI`를 선택하여 제공하였습니다.

### Custom Hook 패턴 적용

- dnd 제어 로직을 기능별로 관리하고, 유지 보수성 및 가독성 향상을 위해 Custom Hook 패턴을 적용하였습니다. <br>
  이를 통해 각 기능별 별도의 hook으로 로직을 분리하였습니다. <br>
  ( ex : `useDragStart` `useDragEnd` `useOnClick` )

### Styled component

- 드래그 상태와 각각의 제약에 따른 UI를 제공하는 경우가 많이 발생하여 이를 Props로 쉽게 제어할 수 있는 styled-component를 사용하였습니다.

 <br>

  <br>

<details>
  <summary style="font-size:18px"><b>폴더 구조</b></summary>
 <hr>
 <br>
📦src<br>
┣ 📂components<br>
┃ ┣ 📂TaskBoard<br>
┃ ┃ ┣ 📂components<br>
┃ ┃ ┃ ┣ 📂TaskList<br>
┃ ┃ ┃ ┃ ┣ 📂components<br>
┃ ┃ ┃ ┃ ┃ ┣ 📂TaskItem<br>
┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜TaskItem.styles.tsx<br>
┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜TaskItem.tsx<br>
┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts<br>
┃ ┃ ┃ ┃ ┣ 📜TaskList.styles.tsx<br>
┃ ┃ ┃ ┃ ┗ 📜TaskList.tsx<br>
┃ ┃ ┃ ┗ 📜index.ts<br>
┃ ┃ ┣ 📂hooks<br>
┃ ┃ ┃ ┣ 📂useDragEnd<br>
┃ ┃ ┃ ┃ ┗ 📜useDragEnd.ts<br>
┃ ┃ ┃ ┣ 📂useDragStart<br>
┃ ┃ ┃ ┃ ┗ 📜useDragStart.ts<br>
┃ ┃ ┃ ┣ 📂useDragUpdate<br>
┃ ┃ ┃ ┃ ┗ 📜useDragUpdate.ts<br>
┃ ┃ ┃ ┣ 📂useOnClick<br>
┃ ┃ ┃ ┃ ┗ 📜useOnClick.ts<br>
┃ ┃ ┃ ┗ 📜index.ts<br>
┃ ┃ ┣ 📂utils<br>
┃ ┃ ┃ ┣ 📂getCheckedStatusType<br>
┃ ┃ ┃ ┃ ┗ 📜getCheckedStatusType.ts<br>
┃ ┃ ┃ ┣ 📂getItems<br>
┃ ┃ ┃ ┃ ┗ 📜getItems.ts<br>
┃ ┃ ┃ ┣ 📂getValidationMessage<br>
┃ ┃ ┃ ┃ ┗ 📜getValidationMessage.ts<br>
┃ ┃ ┃ ┗ 📜index.ts<br>
┃ ┃ ┣ 📜TaskBoard.styles.tsx<br>
┃ ┃ ┗ 📜TaskBoard.tsx<br>
┃ ┣ 📂Toast<br>
┃ ┃ ┣ 📂components<br>
┃ ┃ ┃ ┣ 📂ToastItem<br>
┃ ┃ ┃ ┃ ┣ 📜ToastItem.styles.tsx<br>
┃ ┃ ┃ ┃ ┗ 📜ToastItem.tsx<br>
┃ ┃ ┃ ┗ 📜index.ts<br>
┃ ┃ ┣ 📜ToastProvider.styles.tsx<br>
┃ ┃ ┗ 📜ToastProvider.tsx<br>
┃ ┣ 📂icons<br>
┃ ┃ ┣ 📂CloseIcon<br>
┃ ┃ ┃ ┗ 📜CloseIcon.tsx<br>
┃ ┃ ┗ 📜index.ts<br>
┃ ┗ 📜index.ts<br>
┣ 📂hooks<br>
┃ ┣ 📂useToast<br>
┃ ┃ ┗ 📜useToast.ts<br>
┃ ┗ 📜index.ts<br>
┣ 📂styles<br>
┃ ┣ 📂GlobalStyles<br>
┃ ┃ ┗ 📜GlobalStyles.tsx<br>
┃ ┣ 📂theme<br>
┃ ┃ ┗ 📜theme.ts<br>
┃ ┗ 📜index.ts<br>
┣ 📂types<br>
┃ ┣ 📂Task<br>
┃ ┃ ┗ 📜Task.ts<br>
┃ ┗ 📜index.ts<br>
┣ 📜App.tsx<br>
┗ 📜index.tsx<br>

 <hr>
</details>
 <hr>
