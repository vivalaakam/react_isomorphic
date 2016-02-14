import React from 'react'
import Authentificated from './authentificated.jsx'
import { Link } from 'react-router';
import classnames from 'classnames';

if (process.env.BROWSER) {
    require('../styles/leftMenu.less');
}

export  default class LeftMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let checkboxClass = classnames('menu__item-element', 'icon-checklist', {'menu__item-active': this.props.isActive('todos')});
        let pagesClass = classnames('menu__item-element', 'icon-page', {'menu__item-active': this.props.isActive('pages')});
        let mapClass = classnames('menu__item-element', 'icon-map', {'menu__item-active': this.props.isActive('map')});
        return (
            <div className="menu">
                <ul className="menu__list">
                    <Authentificated>
                        <li className="menu__list-element menu__item">
                            <Link className={checkboxClass} to='/todos'>
                                <span className="menu__item-textWrapper">Todos</span>
                            </Link>
                        </li>
                    </Authentificated>
                    <li className="menu__list-element menu__item">
                        <Link className={pagesClass} to="/pages">
                            <span className="menu__item-textWrapper">Pages</span>
                        </Link>
                    </li>
                    <li className="menu__list-element menu__item">
                        <Link className={mapClass} to="/map">
                            <span className="menu__item-textWrapper">Map</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}
