import React from 'react';
import { connect } from 'react-redux';
import { Hidden, Drawer, Divider, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import './SafnariDrawer.scss';

interface ISafnariDrawerProps {
  container?: Element;
  user: any;
}

class SafnariDrawer extends React.Component<ISafnariDrawerProps> {
  state = {
    mobileOpen: false
  }
  handleDrawerToggle() {

  }
  renderDrawerList(): JSX.Element {
    const listItems = [
      { to: '/', label: 'Dashboard', icon: 'fas fa-table' },
      { to: '/collections', label: 'Collections', icon: 'fas fa-database' },
      { to: '/settings', label: 'Settings', icon: 'fas fa-sliders-h' }
    ];
    const listElements = listItems.map((item) => (
      <NavLink
          exact
          key={item.label}
          to={item.to}
          className="SafnariDrawer__list__item"
          activeClassName="SafnariDrawer__list__item--active"
        >
          <ListItem button>
            <ListItemIcon>
              <i className={item.icon}></i>
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
          <Divider />
        </NavLink>
    ));

    return (
      <List className="SafnariDrawer__list">
        {listElements}
      </List>
    );
  }
  render(): JSX.Element | null {
    return (
      <nav className={`SafnariDrawer ${!this.props.user.loggedIn && 'SafnariDrawer--hidden'}`}>
         <Hidden smUp implementation="css">
          <Drawer
            container={this.props.container}
            variant="temporary"
            anchor="left"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {this.renderDrawerList()}
            <Divider />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <div className="SafnariDrawer__desktop">
            <Drawer
              variant="permanent"
              open
            >
              {this.renderDrawerList()}
            </Drawer>
          </div>
        </Hidden>
      </nav>
    )
  }
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(SafnariDrawer);
