var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import objectPath from "object-path";
import { setDateStore } from "../../redux/rtd.actions";
import { dispatchToStore } from "../utils/baseUtils";

var Switcher = function Switcher(props) {
    var _useState = useState(0),
        _useState2 = _slicedToArray(_useState, 2),
        indexChild = _useState2[0],
        setIndexChild = _useState2[1];

    // Объект подписки на стор


    var subscribe = props.subscribe ? props.subscribe : {};

    // Объект публикации в стор
    var dispatch = props.dispatch ? props.dispatch : {};

    var _setIndexChild = function _setIndexChild(index) {
        if (index !== undefined && index < props.children.length) {
            setIndexChild(index);
            dispatchToStore({ dispatch: dispatch, setDateStore: props.setDateStore, value: index });
        }
    };

    /** Подписка на изменение props[subscribe.name] в сторе */
    useEffect(function () {
        if (subscribe.name) {
            // console.log("storeHOC => subscribe: ", props[subscribe.name]);
            subscribe.onChange && subscribe.onChange({ value: props[subscribe.name], setIndexChild: _setIndexChild });
        }
        // console.log("Change Props[2]: ", props.subscribeЗф);
    }, [props[subscribe.name]]);

    return props.children[indexChild];
};

Switcher.propTypes = {};

var mapStateToProps = function mapStateToProps(store, ownProps) {
    var subscribe = ownProps.subscribe;

    if (subscribe) {
        var name = subscribe.name,
            path = subscribe.path;

        if (name && path) return _defineProperty({}, name, objectPath.get(store, path));
    }

    return {};
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setDateStore: setDateStore }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Switcher);