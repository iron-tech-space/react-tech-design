const reactDocs = require('react-docgen');
const fs = require('fs');

// const pgp = require('pg-promise')(/*options*/);
// const connectionString = 'postgres://postgres:postgres@10.5.121.117:5432/readme';
// const db = pgp(connectionString);

const filePrefix = './props/';
const filePrefix_2 = './props/';
const filesForGenerate = [
    // '../src/components/Form/Form.js',
    // '../src/components/Form/FormTable.js',
    // '../src/components/Form/FormModal.js',
    // '../src/components/Layout/Layout.tsx',
    // '../src/components/Table/Table.js',
    // '../src/components/AdvancedTable/AdvancedTable.js',
    // '../src/components/List/List.js',
    // '../src/components/SingleDate/SingleDate.js',
    // '../src/components/DateRange/DateRange.js',
    // '../src/components/CommandPanel/CommandPanel.js',
    // '../src/components/FilterPanel/FilterPanel.js',

    './src/components/Form/Form.js',
    './src/components/Select/Select.js',
    './src/components/TreeSelect/TreeSelect.js',
    './src/components/UploadFile/UploadFile.js',
    './src/components/Modal/Modal.js',
    './src/components/Table/Table.js',
];

const sortProps = (array, field) => {
    // console.log('array', array);
    // console.log('field', field);
    // return array;

    return array.sort((a, b) => {
        let x = a[field].toLowerCase();
        let y = b[field].toLowerCase();
        // console.log("sort", x, y);
        if (x > y) {
            return 1;
        }
        if (x < y) {
            return -1;
        }
        return 0;
    });
};

const convertPropsToJsonTable = (componentInfo) => {
    let tableData = {
        params: {
            headers: [
                {
                    "dataKey": "name",
                    "title": "Наименование",
                    "width": 200
                },
                {
                    "dataKey": "required",
                    "title": "Обязательность",
                    "width": 200
                },
                {
                    "dataKey": "description",
                    "title": "Описание",
                    "width": 200
                },
                {
                    "dataKey": "type",
                    "title": "Тип",
                    "width": 200
                },
                {
                    "dataKey": "default",
                    "title": "Значение по умолчанию",
                    "width": 200
                }
            ]
        }
    };

    tableData.data = componentInfo.props.map((item) => {
        const rItem = {};
        rItem.name = item.name;
        rItem.required = item.required;
        const defaultValue = item.defaultValue && item.defaultValue.value ? item.defaultValue.value : 'undefined';
        const type = getType(item.type);

        if(item.type.name === 'shape'){
            rItem.type = item.type.name;
            rItem.default = ''; //return `Описание типа \n\`\`\`json\n{\n${fields.join(',\n')}\n}\n\`\`\``;
            rItem.description = `${item.description}\nОписание типа \n\`\`\`json\n${type}\n\`\`\`\nDefaults to \n\`\`\`json\n${defaultValue}\n\`\`\``;

        } else {
            rItem.type = type; // getType(item.type);
            rItem.default = `defaults to \`${defaultValue}\``;
            rItem.description = item.description;
        }
        // console.log('Type => ', getType(item.type));
        // console.log('tableData.data type = ', item.type.name, Array.isArray(item.type.value));
        // rItem.default = item.defaultValue;
        return rItem;
    })

    // return tableData;
    const mdTitle = `# ${componentInfo.displayName} - ${componentInfo.description}\n## Props\n`
    const mdContent = tableData.data.map((item) => {

        const required = item.required ? `**\`required\`**` : '';

        return `#### <span style="color: #669900;">${item.name}</span> ${required} <span style="color: #990055;">\`${item.type}\`</span> ${item.default}\n${item.description}\n`
    })
    return `<style>\n\t.markdown-body h4 {\n\t\tmargin-bottom: 0;\n\t}\n\t.markdown-body p {\n\t\tmargin-top: 0;\n\t}\n</style>\n\n${mdTitle}${mdContent.join('\n')}`;
}

const getType = (type, level = 1) => {

    // if(!type || !type.value) return 'Ufn'
    // console.log("getType: ", type);
    if(Array.isArray(type.value)){
        // console.log('Recursive', type.name);
        switch (type.name) {
            case 'enum':
                return `oneOf [${type.value.map((item) => item.value).join(', ')}]`;
            case 'union':
                return `oneOfType [${type.value.map((item) => item.name).join(', ')}]`;
            default:
                return type.name
        }
    } else if(type.value){
        if(type.name === 'shape'){
            let fields = [];
            let tabs = getTabs(level);
            for (const keyValue in type.value) {
                console.log("Level: ", level, keyValue);

                if (type.value[keyValue].description)
                    type.value[keyValue].description = type.value[keyValue].description.split('\n').map(desc => `${tabs}// ${desc}`).join('\n');
                else
                    type.value[keyValue].description = `${tabs}// Описание не заполнено`;

                fields.push(`${type.value[keyValue].description}\n${tabs}${keyValue}: ${getType(type.value[keyValue], level + 1)}`)

            }
            return `{\n${fields.join(',\n')}\n${getTabs(level - 1)}}`;
        } else return `${type.name} [${getType(type.value, level + 1)}]`;
    } else {
        return type.name;
    }
}

const getTabs = (level) => {
    let tabs = '';
    for (let i = 0; i < level; i++) tabs += '\t';
    return tabs;
}


filesForGenerate.forEach((item) => {
    console.log('Read for ', item);
    const fileContent = fs.readFileSync(item, 'utf8');

    console.log('Doc gen');
    const componentInfo = reactDocs.parse(fileContent, undefined, undefined, {babelrc: false, babelrcRoots: false, configFile: false});

    console.log('Some fuck for ');
    let editableComponentInfo = {...componentInfo};
    editableComponentInfo.props = [];
    for (const prop in componentInfo.props) {
        // console.log('prop ', JSON.stringify(prop));
        const nObject = {
            name: prop,
            ...componentInfo.props[prop],
        };
        // console.log('prop ', JSON.stringify(nObject));
        editableComponentInfo.props.push(nObject);
    }

    // console.log('Sorting props');
    // const requiredPropNames = sortProps(
    //     editableComponentInfo.props.filter((prop) => prop.required),
    //     'name'
    // );
    // const optionalPropNames = sortProps(
    //     editableComponentInfo.props.filter((prop) => !prop.required),
    //     'name'
    // );
    // const sortedProps = requiredPropNames.concat(optionalPropNames);
    //
    // editableComponentInfo.props = sortedProps;

    // console.log('Generating JSON ');
    // const fileName = filePrefix + editableComponentInfo.displayName + '.json';
    // fs.writeFileSync(fileName, JSON.stringify(editableComponentInfo));

    console.log('Generating MD ');
    const fileName_2 = filePrefix_2 + editableComponentInfo.displayName + '.md';
    // fs.writeFileSync(fileName_2, JSON.stringify(convertPropsToJsonTable(editableComponentInfo)));
    const markDown = convertPropsToJsonTable(editableComponentInfo);
    fs.writeFileSync(fileName_2, markDown);

    // const query = 'UPDATE public.readme_data SET markdown = ${markDown} where id = ${id};'

    // db.none(query, {markDown: markDown, id: '9e4932f5-2479-444d-9e53-39c44d97b5b4' });

    // console.log('Generate file: ', fileName);
});
