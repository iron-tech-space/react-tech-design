<style>
	.markdown-body h4 {
		margin-bottom: 0;
	}
	.markdown-body p {
		margin-top: 0;
	}
</style>

# Table - Компонент таблицы
## Props
#### <span style="color: #669900;">columns</span> **`required`** <span style="color: #990055;">`arrayOf [object]`</span> defaults to `undefined`
Столбцы таблицы

#### <span style="color: #669900;">infinityMode</span>  <span style="color: #990055;">`bool`</span> defaults to `undefined`
Режим загрузки данных по скроллу

#### <span style="color: #669900;">defaultRows</span>  <span style="color: #990055;">`arrayOf [object]`</span> defaults to `[]`
Строки по умолчанию

#### <span style="color: #669900;">defaultSelectedRowKeys</span>  <span style="color: #990055;">`arrayOf [oneOfType [string, number]]`</span> defaults to `[]`
Ключи выделенных по умолчанию строк

#### <span style="color: #669900;">defaultSearchValue</span>  <span style="color: #990055;">`string`</span> defaults to `''`
Значение строки поиска по умолчанию строк

#### <span style="color: #669900;">defaultFilter</span>  <span style="color: #990055;">`object`</span> defaults to `{}`
Объект фильтрации по умолчанию

#### <span style="color: #669900;">defaultSortBy</span>  <span style="color: #990055;">`shape`</span> 
Сортировка по умолчанию
Описание типа 
```json
{
	// Ключ поля для сортировки
	key: string,
	// Направление сортировки
	order: oneOf ['asc', 'desc']
}
```
Defaults to 
```json
{}
```

#### <span style="color: #669900;">rows</span>  <span style="color: #990055;">`arrayOf [object]`</span> defaults to `[]`
Строки таблицы. Используется для контроля таблицы из вне.

#### <span style="color: #669900;">setRows</span>  <span style="color: #990055;">`func`</span> defaults to `noop`
Функция задания строк таблицы.

#### <span style="color: #669900;">selectedRowKeys</span>  <span style="color: #990055;">`arrayOf [oneOfType [string, number]]`</span> defaults to `[]`
Выделенные строки таблицы.

#### <span style="color: #669900;">searchValue</span>  <span style="color: #990055;">`string`</span> defaults to `''`
Значение строки поиска

#### <span style="color: #669900;">filter</span>  <span style="color: #990055;">`object`</span> defaults to `{}`
Объект фильтрации

#### <span style="color: #669900;">sortBy</span>  <span style="color: #990055;">`shape`</span> 
Объект сортировки
Описание типа 
```json
{
	// Ключ поля для сортировки
	key: string,
	// Направление сортировки
	order: oneOf ['asc', 'desc']
}
```
Defaults to 
```json
{}
```

#### <span style="color: #669900;">rowKey</span>  <span style="color: #990055;">`string`</span> defaults to `'id'`
Поле для уникальной идентификации строки

#### <span style="color: #669900;">customFields</span>  <span style="color: #990055;">`arrayOf [object]`</span> defaults to `undefined`
Дополнительные поля и валидация в объекты таблицы
Данный параметр (props) осуществляет дополнительную обработку объекта таблицы после закрытия модалки, но перед добавлением в таблицу.
Можно как изменить существующие поля объекта, так и добавить новые поля объекта.
`customFields` - массив объектов для дополнения или изменения полей объектов таблицы
```json
[
	{
		name: <String>,
		value: <func>,
		validate: <func>
	}
]
```
`name` – Имя параметра в объекте
`value` – Функция формирования значения - `(row, rows) => { return {} }`
`validate` – Функция проверки значения - `(row, rows) => { return <Bool> }`
Параметра **validate** работает **только** для модельного окна тип `select`.
Validate можно наложить на любое кол-во полей объекта и если хотя бы один `validate` === `false`, то исключает строку из добавления.

#### <span style="color: #669900;">customColumnProps</span>  <span style="color: #990055;">`arrayOf [object]`</span> defaults to `undefined`
Данный параметр (props) позволяет добавить или переопределить пропсы для колонок, которые заданы конфигурацией на сервере
`customColumnProps` - массив объектов `props` к `columns`. Один объект описывает доп. параметры для одной колонки
```json
[
	{
		name: <String>,
		cellRenderer: <func>,
		...advancedColProps
	}
]
```
`name` – key колонки к которой надо применить дополнительные пропсы
`cellRenderer` – `({ cellData, columns, column, columnIndex, rowData, rowIndex, container, isScrolling }) => return <ReactNode>`
`advancedColProps` – подолнительные свойства колонок тут -> [Column](https://autodesk.github.io/react-base-table/api/column)

#### <span style="color: #669900;">empty</span>  <span style="color: #990055;">`element`</span> defaults to `empty`
Вывод когда нет данных

#### <span style="color: #669900;">overlay</span>  <span style="color: #990055;">`element`</span> defaults to `overlay`
Отображение загрузки данных

#### <span style="color: #669900;">fixWidthColumn</span>  <span style="color: #990055;">`bool`</span> defaults to `false`
Фиксированная ширина столбцов. Появится боковой скрол

#### <span style="color: #669900;">footerProps</span>  <span style="color: #990055;">`shape`</span> 

Описание типа 
```json
{
	// Высота подвала
	height: number,
	// Массив элементов футтера, которые надо отобразить
	// ['selected', 'loaded', 'total']
	showElements: arrayOf [string],
	// Заколовок для кол-ва выбранных объектов
	selectedTitle: string,
	// Заколовок для кол-ва загруженны объектов
	loadedTitle: string,
	// Заколовок для кол-ва всего объектов
	totalTitle: string,
	// Левый кастомный элемент командной панели
	leftCustomSideElement: oneOfType [func, arrayOf],
	// Центральный кастомный элемент командной панели
	centerCustomSideElement: oneOfType [func, arrayOf],
	// Правый кастомный элемент командной панели
	rightCustomSideElement: oneOfType [func, arrayOf]
}
```
Defaults to 
```json
{
	height: 30,
	showElements: [],
	selectedTitle: 'Выделено:',
	loadedTitle: 'Загружено записей:',
	totalTitle: 'Всего записей:',
	leftCustomSideElement: null,
	centerCustomSideElement: null,
	rightCustomSideElement: null
}
```

#### <span style="color: #669900;">headerHeight</span>  <span style="color: #990055;">`number`</span> defaults to `30`
Высота заголовка таблицы

#### <span style="color: #669900;">rowHeight</span>  <span style="color: #990055;">`number`</span> defaults to `30`
Высота строки таблицы

#### <span style="color: #669900;">rowRenderer</span>  <span style="color: #990055;">`oneOfType [func, element]`</span> defaults to `undefined`
Custom row renderer
Параметры - `({ isScrolling, cells, columns, rowData, rowIndex, depth })`

#### <span style="color: #669900;">zebraStyle</span>  <span style="color: #990055;">`bool`</span> defaults to `false`
Строки будут в зебро-стиле

#### <span style="color: #669900;">estimatedRowHeight</span>  <span style="color: #990055;">`number`</span> defaults to `undefined`
Высота расширения

#### <span style="color: #669900;">loadThreshold</span>  <span style="color: #990055;">`number`</span> defaults to `300`
Порог в пикселях для вызова _onLoad.
Кол-во пикселей от низа таблицы для срабатывания события загрузки (onEndReached)

#### <span style="color: #669900;">pageSize</span>  <span style="color: #990055;">`number`</span> defaults to `50`
Размер страницы

#### <span style="color: #669900;">requestLoadConfig</span>  <span style="color: #990055;">`func`</span> defaults to `undefined`
Функция запроса для конфигурации

#### <span style="color: #669900;">requestLoadRows</span>  <span style="color: #990055;">`func`</span> defaults to `noop`
Функция запроса для загрузки строк (данных)

#### <span style="color: #669900;">requestLoadCount</span>  <span style="color: #990055;">`func`</span> defaults to `noop`
Функция запроса для загрузки строк (данных)

#### <span style="color: #669900;">searchParamName</span>  <span style="color: #990055;">`string`</span> defaults to `'searchLine'`
Имя параметра для поиска

#### <span style="color: #669900;">selectable</span>  <span style="color: #990055;">`bool`</span> defaults to `false`
Таблица с возможностью выбора строки

#### <span style="color: #669900;">nodeAssociated</span>  <span style="color: #990055;">`bool`</span> defaults to `true`
Родительский узел и дочерние узлы связаны (Работает только при `selectable`)

#### <span style="color: #669900;">expandColumnKey</span>  <span style="color: #990055;">`string`</span> defaults to `undefined`
Ключ колонки по которой строить иерархию

#### <span style="color: #669900;">expandDefaultAll</span>  <span style="color: #990055;">`bool`</span> defaults to `true`
Открыть по умолчанию вложенность до уровня N или 'All'

#### <span style="color: #669900;">expandLazyLoad</span>  <span style="color: #990055;">`bool`</span> defaults to `false`
Загружать ноды иерархии по одной

#### <span style="color: #669900;">expandParentKey</span>  <span style="color: #990055;">`string`</span> defaults to `'parentId'`
Поле в котором хранится ссылка на родителя

#### <span style="color: #669900;">onRowClick</span>  <span style="color: #990055;">`func`</span> defaults to `noop`
Событие при клике на строку (только при `selectable` = `false`)
`({selected, rowData, rowIndex}) => {}`

#### <span style="color: #669900;">onRowDoubleClick</span>  <span style="color: #990055;">`func`</span> defaults to `noop`
Событие при двойном клике на строку.
`({rowData, rowIndex, rowKey}) => {}`

#### <span style="color: #669900;">onRowExpand</span>  <span style="color: #990055;">`func`</span> defaults to `noop`
События при открытии / закрытии ноды
`({ expanded, rowData, rowIndex, rowKey }) => {}`

#### <span style="color: #669900;">onSelectedRowsChange</span>  <span style="color: #990055;">`func`</span> defaults to `noop`
Событие при выборе строки.
`([rowKeys], [rowDatas]) => {}`

#### <span style="color: #669900;">onExpandedRowsChange</span>  <span style="color: #990055;">`func`</span> defaults to `noop`
События при открытии / закрытии ноды
`(expandedRowKeys) => {}` - массив ключей открытых нод

#### <span style="color: #669900;">showSelection</span>  <span style="color: #990055;">`bool`</span> defaults to `false`
Отображать ли панель выбранных элементов

#### <span style="color: #669900;">rowRenderShowSelection</span>  <span style="color: #990055;">`oneOfType [func, string]`</span> defaults to `undefined`
Строка или функция для отображения элементов списка выбранных
Строка - имя поля
Функция - рендер строк.
`({ rowData, rowIndex }) => { return <Component> }`

#### <span style="color: #669900;">dispatchPath</span>  <span style="color: #990055;">`string`</span> defaults to `undefined`
Путь в сторе куда класть выбранную строку таблицы

#### <span style="color: #669900;">subscribe</span>  <span style="color: #990055;">`arrayOf [object]`</span> defaults to `[]`
Объект для подписки на изменения в STORE
