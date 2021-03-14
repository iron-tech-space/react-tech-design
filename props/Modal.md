<style>
	.markdown-body h4 {
		margin-bottom: 0;
	}
	.markdown-body p {
		margin-top: 0;
	}
</style>

# Modal - Компонент модального окна
## Props
#### <span style="color: #669900;">buttonProps</span>  <span style="color: #990055;">`object`</span> defaults to `undefined`
Свойства [Button](https://ant.design/components/button/) из Ant Design
Добавлено свойство `label` с типом `ReactNode` или `string` для формирования контента кнопки

#### <span style="color: #669900;">modalConfig</span>  <span style="color: #990055;">`shape`</span> 
Объект модального окна. Стандартная конфигурация.
Описание типа 
```json
{
	// Тип модального окна
	type: oneOf ['addOnServer', 'editOnServer', 'addGroupOnServer', 'editGroupOnServer', 'addOnLocal', 'addGroupOnLocal', 'editOnLocal', 'editGroupOnLocal', 'select', 'viewGroup', 'viewObject'],
	// Ссылка на функцию сохранения данных
	requestSaveRow: func,
	// Пропсы формы.
	// Если верстка через конфиги, то пропс body обязателен
	form: object
}
```
Defaults to 
```json
undefined
```

#### <span style="color: #669900;">modalData</span>  <span style="color: #990055;">`object`</span> defaults to `undefined`
Данные для модального окна

#### <span style="color: #669900;">dispatch</span>  <span style="color: #990055;">`object`</span> defaults to `{}`
Путь в сторе куда класть данных окна после закрытия

#### <span style="color: #669900;">subscribe</span>  <span style="color: #990055;">`arrayOf [object]`</span> defaults to `[]`
Объект для подписки на изменения в STORE.
Параметры в `onChange`:
* `value`: значение за которым ведется наблюдение,
* `extraData`: дополнительные данные, передаваемые при срабатывании события
* `setModalData`: функция задания объекта формы
* `setButtonProps`: функция задания пропсов кнопке
* `openModal`: функция открытия модального окна
* `closeModal`: функция закрытия модального окна
