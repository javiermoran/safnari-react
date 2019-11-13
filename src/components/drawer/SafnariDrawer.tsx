import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Hidden, Drawer, Divider, List, ListItem, ListItemText, ListItemIcon, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../context';
import './SafnariDrawer.scss';

interface ISafnariDrawerProps {
  container?: Element;
  user: any;
}

const SafnariDrawer = (props: ISafnariDrawerProps) => {
  const drawerContext = useContext(AppContext);;
  const renderDrawerList = (): JSX.Element =>  {
    const listItems = [
      { to: '/', label: 'Dashboard', icon: 'fas fa-table' },
      { to: '/collections', label: 'Collections', icon: 'fas fa-database' },
      { to: '/tags', label: 'Tags', icon: 'fas fa-tags' },
      { to: '/settings', label: 'Settings', icon: 'fas fa-sliders-h' }
    ];
    const listElements = listItems.map((item) => (
      <NavLink
          exact
          key={item.label}
          to={item.to}
          className="SafnariDrawer__list__item"
          activeClassName="SafnariDrawer__list__item--active"
          onClick={onCloseDrawer}
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
  const onCloseDrawer = () => {
    drawerContext.setDrawerOpen(false);
  }
  return (
    <nav className={`SafnariDrawer ${!props.user.loggedIn && 'SafnariDrawer--hidden'}`}>
       <Hidden smUp implementation="css">
        <Drawer
          className={`SafnariDrawer__mobile ${props.user.darkMode && 'SafnariDrawer__mobile--dark-mode'}`}
          container={props.container}
          variant="temporary"
          anchor="left"
          open={drawerContext.drawerOpen}
          onClose={onCloseDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className="SafnariDrawer__mobile__list">
            <ListItem>
              <Typography className="SafnariDrawer__mobile__logo" variant="h6">Safnari</Typography>
            </ListItem>
            {renderDrawerList()}
          </div>
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <div className="SafnariDrawer__desktop">
          <Drawer
            variant="permanent"
            open
          >
            {renderDrawerList()}
          </Drawer>
        </div>
      </Hidden>
    </nav>
  )
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(SafnariDrawer);
