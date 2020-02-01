import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import EventIcon from '@material-ui/icons/Event';


class Tabbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0
        }
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue })
        console.log(this.state.value)
        this.props.getValue(this.state.value)
    };



    render() {
        return (
            <div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    variant="fullwidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="icon tabs example"
                >
                    <Tab icon={<ShoppingBasketIcon />} label="Product" aria-label="phone" />
                    <Tab icon={<EventIcon />} aria-label="person" label="Event" />
                    <Tab icon={<BookmarkIcon />} aria-label="favorite" label="Offer" />
                </Tabs>
            </div>
        )
    }
}
export default Tabbar;