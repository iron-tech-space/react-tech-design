<style>
	.markdown-body h4 {
		margin-bottom: 0;
	}
	.markdown-body p {
		margin-top: 0;
	}
</style>

# TreeSelect - Компонент выбора элемента(ов) из древовидного списка
## Props
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
undefined
```

#### <span style="color: #669900;">defaultFilter</span>  <span style="color: #990055;">`object`</span> defaults to `{}`
Объект фильтрации по умолчанию

#### <span style="color: #669900;">defaultSearchValue</span>  <span style="color: #990055;">`string`</span> defaults to `undefined`
Значение строки поиска по умолчанию строк

#### <span style="color: #669900;">sortBy</span>  <span style="color: #990055;">`object`</span> defaults to `undefined`
Сортировка

#### <span style="color: #669900;">filter</span>  <span style="color: #990055;">`object`</span> defaults to `undefined`
Фильтр

#### <span style="color: #669900;">searchValue</span>  <span style="color: #990055;">`string`</span> defaults to `undefined`
Значение строки поиска

#### <span style="color: #669900;">searchParamName</span>  <span style="color: #990055;">`string`</span> defaults to `undefined`
Имя параметра для поиска

#### <span style="color: #669900;">requestLoadRows</span>  <span style="color: #990055;">`func`</span> defaults to `undefined`
Функция запроса для загрузки строк (данных)

#### <span style="color: #669900;">optionConverter</span> **`required`** <span style="color: #990055;">`func`</span> defaults to `undefined`
Функция преобразования загруженных объектов в объекты для селекта.
Сигнатура `(option) => ({})`
Требоваеть вернуть объект с параметрам
`{ label: ReactNode, value: any, children: any, checkable: bool, selectable: bool }`
##### Example:
``` JS
(option) => ({
	label: (<span><MehOutlined />{option.name}</span>),
	value: option.id,
	children: option.children,
	checkable: !option.isGroup,
	selectable: !option.isGroup,
})
```

#### <span style="color: #669900;">options</span>  <span style="color: #990055;">`arrayOf [object]`</span> defaults to `undefined`
Select options `[{ label, value, children, checkable, selectable }]`
