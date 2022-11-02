import React from 'react';

const Header = () => {
    return (
        <div className="header">
            <div className='image'>
                <a id='logo-tag' href="https://github.com/TheMikePizza"> <img className='logo' src={require('../../static/assets/images/mike-pizza-high-resolution-logo-black-on-white-background.png')} />  </a>
            </div>
            <div className='title'>
                <h1>Draggable To Do List</h1>
            </div>
        </div>
        

    );
}
export default Header