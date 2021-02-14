import React, {useState, useEffect} from 'react';

const Switcher = props => {

    const { value } = props;

    const [_value, _setValue] = useState(0);

    useEffect(() => {
        if(value !== undefined && value < props.children.length) {
            _setValue(value);
        }
    }, [value])

    return (props.children[_value]);
};


export default Switcher;
