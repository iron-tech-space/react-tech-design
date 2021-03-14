<style>
	.markdown-body h4 {
		margin-bottom: 0;
	}
	.markdown-body p {
		margin-top: 0;
	}
</style>

# UploadFile - Компонент загрузки файлов
## Props
#### <span style="color: #669900;">requestUploadFile</span>  <span style="color: #990055;">`func`</span> defaults to `noop`
Функция запроса для отправки файла с данным на сервер

#### <span style="color: #669900;">dataObject</span>  <span style="color: #990055;">`object`</span> defaults to `{}`
Данные, прикрепляемые к файлу

#### <span style="color: #669900;">onCompletedUpload</span>  <span style="color: #990055;">`func`</span> defaults to `noop`
Функция, вызываемая при удачной загрузке файла

#### <span style="color: #669900;">onFailedUpload</span>  <span style="color: #990055;">`func`</span> defaults to `noop`
Функция, вызываемая при НЕ удачной загрузке файла

#### <span style="color: #669900;">uploadProps</span>  <span style="color: #990055;">`object`</span> defaults to `{}`
Ant Props для [Upload](https://ant.design/components/upload/) компонента

#### <span style="color: #669900;">toolTipProps</span>  <span style="color: #990055;">`object`</span> defaults to `{}`
Ant Props для [Tooltip](https://ant.design/components/tooltip/) компонента

#### <span style="color: #669900;">buttonProps</span>  <span style="color: #990055;">`object`</span> defaults to `{}`
Ant Props для [Button](https://ant.design/components/button/) компонента
