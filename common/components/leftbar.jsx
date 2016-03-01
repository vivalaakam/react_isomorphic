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
        let pushClass = classnames('menu__item-element', 'icon-push', {'menu__item-active': this.props.isActive('push')});
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
                        <Link className={pushClass} to="/push">
                            <span className="menu__item-textWrapper">Push messages</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}
