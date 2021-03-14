<style>
	.markdown-body h4 {
		margin-bottom: 0;
	}
	.markdown-body p {
		margin-top: 0;
	}
</style>

# Form - Компонент формы
## Props
#### <span style="color: #669900;">noPadding</span>  <span style="color: #990055;">`bool`</span> defaults to `false`
Не делать отступы у формы от краев блока. **Only config Form**

#### <span style="color: #669900;">scrollable</span>  <span style="color: #990055;">`bool`</span> defaults to `false`
Разрешит скролл внтри формы. **Only config Form**

#### <span style="color: #669900;">header</span>  <span style="color: #990055;">`arrayOf [object]`</span> defaults to `undefined`
Массив объектов для шапки формы. Как правило только заголовок.

#### <span style="color: #669900;">body</span>  <span style="color: #990055;">`arrayOf [object]`</span> defaults to `undefined`
Массив объектов для тела формы

#### <span style="color: #669900;">footer</span>  <span style="color: #990055;">`arrayOf [object]`</span> defaults to `undefined`
Массив объектов для подвала формы. Как правило только кнопки "Сохранить" и "Отмена"

#### <span style="color: #669900;">loadInitData</span>  <span style="color: #990055;">`func`</span> defaults to `noop`
Ссылка на функцию загрузки значений по умолчанию
`(callBack) => callBack(initObject)`

#### <span style="color: #669900;">autoSaveForm</span>  <span style="color: #990055;">`bool`</span> defaults to `true`
Производить ли автоматическое сохранение по параметрам `requestSaveForm` и `methodSaveForm`

#### <span style="color: #669900;">requestSaveForm</span>  <span style="color: #990055;">`func`</span> defaults to `undefined`
Запрос для автоматического сохранения формы

#### <span style="color: #669900;">methodSaveForm</span>  <span style="color: #990055;">`string`</span> defaults to `undefined`
HTTP Метод, передаваемый в запрос сохранения

#### <span style="color: #669900;">processBeforeSaveForm</span>  <span style="color: #990055;">`func`</span> defaults to `undefined`
Функция обработки перед сохранением формы
