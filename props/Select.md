<style>
	.markdown-body h4 {
		margin-bottom: 0;
	}
	.markdown-body p {
		margin-top: 0;
	}
</style>

# Select - Компонент выбора элемента(ов) из списка
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

#### <span style="color: #669900;">searchParamName</span>  <span style="color: #990055;">`string`</span> defaults to `'searchValue'`
Имя параметра для поиска

#### <span style="color: #669900;">infinityMode</span>  <span style="color: #990055;">`bool`</span> defaults to `false`
Режим загружки по скроллу

#### <span style="color: #669900;">requestLoadRows</span>  <span style="color: #990055;">`func`</span> defaults to `undefined`
Функция запроса для загрузки строк (данных)

#### <span style="color: #669900;">optionConverter</span> **`required`** <span style="color: #990055;">`func`</span> defaults to `undefined`
Функция преобразования загруженных объектов в объекты для селекта.
Сигнатура `(option) => ({})`
Требоваеть вернуть объект с параметрам
`{ label: ReactNode, value: any, className: string, disabled: bool }`
##### Example:
``` JS
(option) => ({
	label: (<span><MehOutlined />{option.name}</span>),
	value: option.id,
	className: 'some-class',
	disabled: false,
})
```

#### <span style="color: #669900;">options</span>  <span style="color: #990055;">`arrayOf [object]`</span> defaults to `[]`
Select options `[{ label, value, className, disabled }]`

#### <span style="color: #669900;">widthControl</span>  <span style="color: #990055;">`oneOfType [string, number]`</span> defaults to `'100%'`
Ширина поля выбора в пикселях

#### <span style="color: #669900;">pageSize</span>  <span style="color: #990055;">`number`</span> defaults to `50`
Размер страницы
