import { Collapse, Drawer as WMDrawer } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import MailIcon from '@material-ui/icons/Mail'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import StarBorder from '@material-ui/icons/StarBorder'
import axios from 'axios'
import Base64 from 'base-64'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

const drawerWidth = 240
const Styles = makeStyles(theme => ({
  container: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

const useStyles = makeStyles({})

const Drawer = props => {
  const classes = Styles()
  const { history } = props
  const { drawer } = props

  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return drawer !== undefined ? (
    <WMDrawer
      elevation={2}
      classes={{ paper: classes.drawerPaper }}
      className={classes.drawer}
      variant='permanent'
      anchor='left'
    >
      <div className={classes.toolbar} />
      <Divider />
      <List
        component='nav'
        aria-labelledby='nested-list-subheader'
        className={classes.root}
      >
        {Object.keys(drawer).map(key => (
          <>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={key} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={open} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {drawer[key].map(item => {
                  return (
                    <ListItem
                      button
                      className={classes.nested}
                      onClick={() => history.push(`/${key}/` + item)}
                      key={item}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  )
                })}
              </List>
            </Collapse>
          </>
        ))}
      </List>
      <Divider />
    </WMDrawer>
  ) : (
    <div>asd</div>
  )
}

export default withRouter(Drawer)