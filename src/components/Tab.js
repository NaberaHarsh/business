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
        // console.log(newValue);
        this.props.getValue(newValue)
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
                    <Tab icon={<ShoppingBasketIcon />} value={0} label="Product" aria-label="product" />
                    <Tab icon={<EventIcon />} value={1} aria-label="event" label="Event" />
                    <Tab icon={<BookmarkIcon />} value={2} aria-label="offer" label="Offer" />
                </Tabs>
            </div>
        )
    }
}
export default Tabbar;