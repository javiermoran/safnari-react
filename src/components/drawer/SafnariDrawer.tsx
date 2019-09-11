import React from 'react';
import { Hidden, Drawer, Divider, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import './SafnariDrawer.scss';
import { NavLink } from 'react-router-dom';

interface ISafnariDrawerProps {
  container?: Element
}

class SafnariDrawer extends React.Component<ISafnariDrawerProps> {
  state = {
    mobileOpen: false
  }
  handleDrawerToggle() {

  }
  renderDrawerList(): JSX.Element {
    return (
      <List className="SafnariDrawer__list">
        <NavLink to="/">
          <ListItem button>
            <ListItemIcon>
              <i className="fas fa-table"></i>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink>
        <Divider />
        <NavLink to="/collections">
          <ListItem button>
            <ListItemIcon>
              <i className="fas fa-database"></i>
            </ListItemIcon>
            <ListItemText primary="Collections" />
          </ListItem>
        </NavLink>
        <Divider />
      </List>
    );
  }
  render(): JSX.Element {
    return (
      <nav className="SafnariDrawer">
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

export default SafnariDrawer;
